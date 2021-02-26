# Cogment gRPC API

The low-level cogment communication API is implemented using [gRPC](https://grpc.github.io/) services.
These services are collections of procedures to be called remotely (RPC).
gRPC abstracts the network communication with familiar looking functions (representing the defined procedures), in any number of programming languages.
How services are implemented or accessed is highly dependant on the programming language being interfaced, and is beyond the scope of this document (see gRPC API documentation).

This reference requires a basic understanding of gRPC, and in particular the format of the `proto` files.

## General

In this API, the `bytes` data type is normally used to contain the serialized data of externally defined messages.  These messages are well defined in the `cogment.yaml` file.

On the other hand, the `google.protobuf.Any` data type is normally used to contain messages that are not pre-defined, and may be decided at runtime.

Empty messages are normally used as a placeholder for easy future, backward compatible, extension of the API.

In this API, [gRPC metadata](https://grpc.io/docs/what-is-grpc/core-concepts/#metadata) is normally used only for service request (procedure calls) for identifying purposes.  The details of the required metadata are described with the service calls.  Service replies are not expecting to provide metadata.

In many places in the API, we use a list of actor data without information about which actor is where in the list.
These lists have a constant length and order throughout a trial (set in the trial parameters), and thus can/must be cross referenced with other such lists within the same trial (e.g. `actors_in_trial`, `actors_map`).
The actor can be infered by the position in the list, and the index into the list can sometimes be used to identify an actor.

## Common types

Most of the messages are defined in the `common.proto` file.  `ObservationSet` is defined in `environment.proto`.

### `VersionRequest`

Empty message to serve as the request for the `Version` procedure (present in all gRPC services defined in the Cogment API).

```protobuf
message VersionRequest {}
```

### `VersionInfo`

Reply message for the `Version` procedure (present in all gRPC services defined in the API).
It contains a list of version information.
The Cogment framework expects at least "cogment-api" and "grpc" versions present in the list.  The "cogment-api" is for the local version of the Cogment API used by the service.  The "grpc" is for the version of gRPC used by the service.
Other reported versions are specific to the service called, possibly for use by utility and management tools.

```protobuf
message Version {
  string name = 1;
  string version = 2;
}

message VersionInfo {
  repeated Version versions = 1;
}
```

- versions: List of version information
- name: The name/software/module for which the version is given.  E.g. "cogment-api"
- version: The version related to the name.  E.g. "1.0.0b5"

### `TrialParams`

Global parameters for a trial.

```protobuf
message TrialParams {
  TrialConfig trial_config = 1;
  EnvironmentParams environment = 2;
  repeated ActorParams actors = 3;
  uint32 max_steps = 4;
  uint32 max_inactivity = 5;
}
```

- trial_config: (optional) The user config for the controler of the trial.
- environment: The parameters for the environment of the trial.
- actors: The parameters for all actors involved in the trial.  This length and order of this list defines the length and order of the lists of actors provided in different places in the API (e.g. `actors_in_trial`), for the trial.
- max_steps: The maximum number of steps/ticks that the trial should run.  After this number of steps/ticks, an end request will be sent to the environment.
- max_inactivity: The maximum amount of time (in seconds) that the trial should be without activity before an end request is sent to the environment (or the trial is forcefully terminated).  Activity is defined as a message received by the Orchestrator from a user component.

### `EnvironmentParams`

Parameters related to an environment.

```protobuf
message EnvironmentParams {
  string endpoint = 1;
  EnvironmentConfig config = 2;
  string implementation = 3;
}
```

- endpoint: The URL where the environment is being served.  This is used by the Orchestrator to connect to the environment using the `EnvironmentEndpoint` gRPC service.
- config: (optional) The user config for the environment.
- implementation: (optional) The name of the implementation of the environment to run.

### `ActorParams`

Parameters related to an actor.

```protobuf
message ActorParams {
  string name = 1;
  string actor_class = 2;
  string endpoint = 3;  
  string implementation = 4;
  ActorConfig config = 5;
}
```

- name: The name of the actor.
- actor_class: The name of the class of actor.  Actor classes are defined in the `cogment.yaml` file in the `actor_classes:id` sections.
- endpoint: The URL where the actor is being served, or "client".  The URL is used by the Orchestrator to connect to the actor using the `AgentEndpoint` gRPC service.  If set to "client", then the actor is a client and will connect to the Orchestrator instead, using the `ClientActor` gRPC service.
- implementation: (optional) The name of the implementation of the actor class to run.
- config: (optional) The user config for the actor.

### `TrialConfig`, `ActorConfig`, `EnvironmentConfig`

These contain the config data for various user components.

```protobuf
message EnvironmentConfig {
  bytes content = 1;
}

message ActorConfig {
  bytes content = 1;
}

message TrialConfig {
  bytes content = 1;
}

```

- content: The serialized protobuf message representing a config.  The actual message type is defined in the `cogment.yaml` file in its respective section: `environment:config_type`, `actor_classes:config_type`, and `trial:config_type`.  Environment config is for use by environments.  Actor config is for use by actors (each actor class can have a different config type).  Trial config is for use by controlers.

### `TrialActor`

Details of an actor participating in a trial.

```protobuf
message TrialActor {
  string actor_class = 1;
  string name = 2;
}
```

- actor_class: The name of the class of actor.  Actor classes are defined in the `cogment.yaml` file in the `actor_classes:id` sections.
- name: The name of the actor.

### `Observation`

A singular observation.

```protobuf
message Observation {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  ObservationData data = 3;
}
```

- tick_id: The monotonic Time, related to the number of observations since the start of the trial.
- timestamp: The wall-clock time of the observation.
- data: The observation data.

### `ObservationData`

The data payload of an observation.

```protobuf
message ObservationData {
  bytes content = 1;
  bool snapshot = 2;
}
```

- content: The serialized protobuf message representing an observation for a specific actor.  If the `snapshot` field value is true, the type of message is an observation _space_ (i.e. a full observation snapshot) defined in section `actor_classes:observation:space` of the `cogment.yaml` file.  If the `snapshot` field value is false, the type is an observation _delta_ (i.e. a difference from a previous observation) defined in the section `actor_classes:observation:delta` of the `cogment.yaml` file.  Note that the specific actor represented is defined by the enclosing message.
- snapshot: Determines the type of the message in the `content` field.

### `Action`

Data associated with an actor's action.

```protobuf
message Action {
  bytes content = 1;
}
```

- content: The serialized protobuf message representing an action from a specific actor.  The actual message type for the action space is defined in the `cogment.yaml` file for each actor class in section `actor_classes:action:space`.  Note that the specific actor represented is defined by the enclosing message.

### `Message`

Data associated with a communication (message) destined for an actor or the environment.

```protobuf
message Message {
  int32 tick_id = 1;
  string sender_name = 2;
  string receiver_name = 3;
  google.protobuf.Any payload = 4;
}
```

- tick_id: Time associated with the message.
- sender_name: The name of the sending actor.  "env" for the environment. This is optional when sending messages (i.e. the sender is already known).
- receiver_name: The name of the target/receiving actor.  "env" for the environment.
- payload: Data for the target actor/environment.  It is the responsibility of the target to understand the type received.

### `RewardSource`

Data representing a simple reward source made by a single component/sender, usually for the purpose of training automated agents.

```protobuf
message RewardSource {
  string sender_name = 1;
  float value = 2;
  float confidence = 3;
  google.protobuf.Any user_data = 4;
}
```

- sender_name: Name of the sender that sent the reward.  This is not needed when sending becasue it will be set by the orchestrator.  It is only used by receiving actors.
- value: The numerical value of the provided reward.
- confidence: The weight of this reward in computing the final (aggregated) reward.
- user_data: Additional user data to be consumed by the receiving actor.  It is the responsibility of the receiver to understand the type received.

### `Reward`

Data representing a reward sent or received, usually for the purpose of training automated agents.
This is an aggregate of possibly multiple `RewardSource` (but at least one).

```protobuf
message Reward {
  string receiver_name = 1;
  int32 tick_id = 2;
  float value = 3;
  repeated RewardSource sources = 4;
}
```

- receiver_name: Name of the receiving actor (the reward destination).
- tick_id: The time step associated with the reward.  If set to `-1` when sending a reward, the orchestrator will automatically assign the latest tick.  This will always be a valid tick when receiving a reward.
- value: The aggregated value (weighted sum) of the provided reward sources.  May be ignored when sending a reward; The final value will be computed by the orchestrator.
- sources: The simple reward sources that form this aggregated reward. There must be at least one.

### `ActorPeriodData`

Timely trial data sent to an actor.  The data may span a period of time.

```protobuf
message ActorPeriodData {
  repeated Observation observations = 1;
  repeated Reward rewards = 2;
  repeated Message messages = 3;
}
```

- observations: Observations from the environment for a period of time.  Typically only for one time step (tick). If there are multiple, they are ordered by tick_id.
- rewards: List of rewards sent by actors or the environment. Ordered by tick_id.
- messages: List of user data sent by actors or the environment. Ordered by tick_id.

### `ObservationSet`

A set of environment observations for all actors in the trial.

```protobuf
message ObservationSet {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  repeated ObservationData observations = 3;
  repeated int32 actors_map = 4;
}
```

- tick_id: The time step (tick) to which the observations relate to.
- timestamp: A wall clock time stamp when the observation set was made.  Unix Epoch in nanoseconds.
- observations: A list of observations.  Indexed into by the `actors_map`.
- actors_map: A list of indexes into the `observations` list above.  This list of indexes has the same length and order as the list of actors provided in different places in the API (e.g. `actors_in_trial`), for the same trial.

## Control API

This API is defined in `orchestrator.proto`. It is implemented by the cogment orchestrator, and client applications are expected to connect to it using the gRPC client API.

This API is used for general control and services related to trials, primarily to start trials.

### Service `TrialLifecycle`

```protobuf
service TrialLifecycle {
  rpc StartTrial(TrialStartRequest) returns (TrialStartReply) {}
  rpc TerminateTrial(TerminateTrialRequest) returns (TerminateTrialReply) {}
  rpc GetTrialInfo(TrialInfoRequest) returns (TrialInfoReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `StartTrial()`

Start a new trial.

Metadata: None

#### `TerminateTrial()`

Request the environment to terminate an existing trial.

Metadata:

- `trial-id`: UUID of the trial to terminate.

#### `GetTrialInfo()`

Get extra information about an existing trial.

Metadata:

- `trial-id`: (*optional*) UUID of the trial to terminate.  If not provided, the request is for informatrion about all running trials.

#### `Version()`

Request version data.

Metadata: None

### `TrialStartRequest`

Request message for the `StartTrial` procedure.

```protobuf
message TrialStartRequest {
  TrialConfig config = 1;
  string user_id = 2;
}
```

- config: The trial config data.  This data can be used by the pre-trial hooks to determine the config for the rest of the componenents.
- user_id: The ID of the user that is starting the trial.

### TrialStartReply

Reply message for the `StartTrial` procedure.

```protobuf
message TrialStartReply {
  string trial_id = 1;
  repeated TrialActor actors_in_trial = 2;
}
```

- trial_id: UUID of the newly started trial.
- actors_in_trial: The list of all actors in the trial.  This list has the same length and order as the list of actors provided in different places in the API, for the same trial.

### `TerminateTrialRequest`

Request message for the `TerminateTrial` procedure.

```protobuf
message TerminateTrialRequest {}
```

### `TerminateTrialReply`

Reply message for the `TerminateTrial` procedure.

```protobuf
message TerminateTrialReply {}
```

### `TrialInfoRequest`

Request message for the `GetTrialInfo` procedure.

```protobuf
message TrialInfoRequest {
  bool get_latest_observation = 1;
}
```

- get_latest_observation: If true, request the latest environment observation available for the trial (in addition to standard information).

### `TrialInfoReply`

Reply message for the `GetTrialInfo` procedure.

```protobuf
message TrialInfoReply {
  repeated TrialInfo trial = 1;
}
```

- trial: List of information about the trials.  Contains only the requested trial info if a trial ID was provided when the call was made (as metadata to the procedure).  Otherwise contains information about all active trials.

### `TrialInfo`

Message containing information about a trial.

```protobuf
enum TrialState {
  UNKNOWN = 0;
  INITIALIZING = 1;
  PENDING = 2;
  RUNNING = 3;
  TERMINATING = 4;
  ENDED = 5;
}

message TrialInfo {
  string trial_id = 1;
  TrialState state = 2;
  ObservationSet latest_observation = 3;
}
```

- trial_id: The UUID of the trial.
- state: The state of the trial.  `ENDED` trials will only appear in the list of trials for a short period after they are terminated (if they appear at all).
- latest_observation: The latest environment observation.  This will be provided only if requested in the `TrialInfoRequest`.

## Client Actor API

This API is defined in `orchestrator.proto`. It is implemented by the cogment orchestrator, and client applications are expected to connect to the orchestrator using the gRPC client API.

This API is used by client actors participating in existing trials.
Multiple simultaneous actors can connect using a single client application instance.
The actors connecting this way must have an endpoint set to "client" in the [trial parameters][1].

### Service `ClientActor`

```protobuf
service ClientActor {
  rpc JoinTrial(TrialJoinRequest) returns (TrialJoinReply) {}
  rpc ActionStream(stream TrialActionRequest) returns (stream TrialActionReply) {}
  rpc Heartbeat(TrialHeartbeatRequest) returns (TrialHeartbeatReply) {}
  rpc SendReward(TrialRewardRequest) returns (TrialRewardReply) {}
  rpc SendMessage(TrialMessageRequest) returns (TrialMessageReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `JoinTrial()`

Join an existing trial.

Metadata: None

#### `ActionStream()`

Main call to participate in the trial.  It is typically active for the duration of the trial.
Actor actions are provided to the orchestrator in the request stream, and trial data is provided by the orchestrator in the reply stream.

Metadata:

- `trial-id`: UUID of the trial the current actor is participating in.  This comes from the `JoinTrial` reply.
- `actor-name`: The name of the current actor participating in the trial.  This is supplied (or confirmed) in the `JoinTrial` reply.

#### `Heartbeat()`

This should be called on a regular basis (at least every 30 seconds), if there are no actions sent in the `ActionStream`.
Otherwise the actor will be considered terminated and be disconnected.

Metadata:

- `trial-id`: UUID of the trial the current actor is participating in.  This comes from the `JoinTrial` reply.
- `actor-name`: The name of the current actor participating in the trial.  This is supplied (or confirmed) in the `JoinTrial` reply.

#### `SendReward()`

Used to provide feedback to other actors in the same trial as current actor.

Metadata:

- `trial-id`: UUID of the trial the current actor is participating in.  This comes from the `JoinTrial` reply.
- `actor-name`: The name of the current actor participating in the trial.  This is supplied (or confirmed) in the `JoinTrial` reply.

#### `SendMessage()`

Used to asynchronously send data to other actors (or the environment) in the same trial as current actor.

Metadata:

- `trial-id`: UUID of the trial the current actor is participating in.  This comes from the `JoinTrial` reply.
- `actor-name`: The name of the current actor participating in the trial.  This is supplied (or confirmed) in the `JoinTrial` reply.

#### `Version()`

Request version data.

Metadata: None

### `TrialJoinRequest`

Request message for the `JoinTrial` procedure.

```protobuf
message TrialJoinRequest {
  string trial_id = 1;

  oneof slot_selection {
    string actor_class = 2;
    string actor_name = 3;
  }
}
```

- trial_id: The UUID of the trial the actor requests to join.
- actor_class: The class the actor requests to join as.  No actor name should be requested if this is used.
- actor_name: The name the actor requests to join as.  No actor class should be requested if this is used.

### `TrialJoinReply`

Reply message for the `JoinTrial` procedure.

```protobuf
message TrialJoinReply {
  string actor_name = 1;
  string trial_id = 2;
  ActorConfig config = 3;
  repeated TrialActor actors_in_trial = 4;
}
```

- actor_name: The name assignbed to the current actor in joining the trial.
- trial_id: The UUID of the trial joined.
- config: The configuration to start the actor.
- actors_in_trial: The list of all actors in the trial (including current actor). This list has the same length and order as the list of actors provided in different places in the API, for the same trial.

### `TrialHeartbeatRequest`

Request message for the `Heartbeat` procedure.

```protobuf
message TrialHeartbeatRequest {}
```

### `TrialHeartbeatReply`

Reply message for the `Heartbeat` procedure.

```protobuf
message TrialHeartbeatReply {}
```

### `TrialActionRequest`

Stream request message for the `ActionStream` procedure.

```protobuf
message TrialActionRequest {
  Action action = 1;
}
```

- action: The action taken by the current actor.  This is typically in response to an observation (from the reply message).  The first action after joining a trial (before any observations have been received) should be empty.

### `TrialActionReply`

Stream reply message for the `ActionStream` procedure.

```protobuf
message TrialActionReply {
  ActorPeriodData data = 1;
  bool final_data = 2;
}
```

- data: The trial data for the current actor.  This data can span a period of time, but is typically for one time step (tick).
- final_data: If this is true, the data provided is final and no more reply messages will be received after this one.

### `TrialRewardRequest`

Request message for the `SendReward` procedure.

```protobuf
message TrialRewardRequest {
  repeated Reward rewards = 1;
}
```

- rewards: The rewards to send to one or more actors.

### `TrialRewardReply`

Reply message for the `SendReward` procedure.

```protobuf
message TrialRewardReply {}
```

### `TrialMessageRequest`

Request message for the `SendMessage` procedure.

```protobuf
message TrialMessageRequest {
  repeated Message messages = 1;
}
```

- messages: User data to send to other actors or the environment.  The sender_name entry should not be set (it is part of the metadata of the procedure).

### `TrialMessageReply`

Reply message for the `SendMessage` procedure.

```protobuf
message TrialMessageReply {}
```

## Agent Actor API

This API is defined in `agent.proto`. It is implemented by the agent application using the gRPC server API, and the orchestrator connects to the agent application.

This API is used by agent actors that will be participating in new trials.
Multiple simultaneous agent actors can be served from a single agent application instance.
An actor endpoint, for the orchestrator to connect to, is defined in the [trial parameters][1].

### Service `AgentEndpoint`

```protobuf
service AgentEndpoint {
  rpc OnStart(AgentStartRequest) returns (AgentStartReply) {}
  rpc OnObservation(stream AgentObservationRequest) returns (stream AgentActionReply) {}
  rpc OnReward(AgentRewardRequest) returns (AgentRewardReply) {}
  rpc OnMessage(AgentMessageRequest) returns (AgentMessageReply) {}
  rpc OnEnd(AgentEndRequest) returns (AgentEndReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `OnStart()`

Called when a new trial is started.

Metadata:

- `trial-id`: UUID of the new trial the actor is participating in.
- `actor-name`: The name the actor has been assigned in the new trial.

#### `OnObservation()`

Called when a new observation from the environment is available.

Metadata:

- `trial-id`: UUID of the trial that is the source of the data.
- `actor-name`: The name of the actor for which the data is intended.

#### `OnReward()`

Called when a new reward is available.

Metadata:

- `trial-id`: UUID of the trial that is the source of the data.
- `actor-name`: The name of the actor for which the data is intended.

#### `OnMessage()`

Called when new user data (messages) is available.

Metadata:

- `trial-id`: UUID of the trial that is the source of the data.
- `actor-name`: The name of the actor for which the data is intended.

#### `OnEnd()`

Called at the end of the trial.
No more calls will be done related to the trial after this call.

Metadata:

- `trial-id`: UUID of the trial that ended.
- `actor-name`: The name of the actor for which the data is intended.

#### `Version()`

Called to request version data.

Metadata: None

### `AgentStartRequest`

Request message for the `OnStart` procedure.

```protobuf
message AgentStartRequest {
  string impl_name = 1;
  ActorConfig config = 2;
  repeated TrialActor actors_in_trial = 3;
}
```

- impl_name: (optional) Name of the implementation that should run the actor in this trial. If not provided, an arbitrary implementation will be used.
- config: The configuration to start the actor.
- actors_in_trial: The list of all actors in the trial (including current actor). This list has the same length and order as the list of actors provided in different places in the API, for the same trial.

### `AgentStartReply`

Reply message for the `OnStart` procedure.

```protobuf
message AgentStartReply {}
```

### `AgentObservationRequest`

Request message for the `OnObservation` procedure.

```protobuf
message AgentObservationRequest {
  Observation observation = 1;
}
```

- observation: An observation from the environment.

### `AgenActionReply`

Reply message for the `OnObservation` procedure.

```protobuf
message AgentActionReply {
  Action action = 1;
  repeated Reward rewards = 2;
  repeated Message messages = 3;
}
```

- action: An action for the environment.
- rewards: Rewards for other actors.
- messages: User data to send to other actors or the environment.  The sender_name entry should not be set.

### `AgentRewardRequest`

Request message for the `OnReward` procedure.

```protobuf
message AgentRewardRequest {
  Reward reward = 1;
}
```

- reward: Reward received from aggregating various rewards from actors or the environment.

### `AgentRewardReply`

Reply message for the `OnReward` procedure.

```protobuf
message AgentRewardReply {}
```

### `AgentMessageRequest`

Request message for the `OnMessage` procedure.

```protobuf
message AgentMessageRequest {
  repeated Message messages = 1;
}
```

- messages: List of messages from actors or the environment.

### `AgentMessageReply`

Reply message for the `OnMessage` procedure.

```protobuf
message AgentMessageReply {}
```

### `AgentEndRequest`

Request message for the `OnEnd` procedure.

```protobuf
message AgentEndRequest {
  ActorPeriodData final_data = 1;
}
```

- final_data: The final (last) data for the trial.

### `AgentEndReply`

Reply message for the `OnEnd` procedure.

```protobuf
message AgentEndReply {}
```

## Environment API

This API is defined in `environment.proto`. It is implemented by the environment application using the gRPC server API, and the orchestrator connects to the environment application.

This API is used by environments that will run trials.
There is only one environment per trial.
Multiple simultaneous environments can be served from a single environment application instance (for different trials).
The environment endpoint, for the orchestrator to connect to, is defined in the [trial parameters][1].

### Service `EnvironmentEndpoint`

```protobuf
service EnvironmentEndpoint {
  rpc OnStart(EnvStartRequest) returns (EnvStartReply) {}
  rpc OnAction(stream EnvActionRequest) returns (stream EnvActionReply) {}
  rpc OnMessage(EnvMessageRequest) returns (EnvMessageReply) {}
  rpc OnEnd(EnvActionRequest) returns (EnvActionReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `OnStart()`

Called when a new trial is started.

Metadata:

- `trial-id`: UUID of the new trial the environment is running.

#### `OnAction()`

Called when a set of actions from actors is available.

Metadata:

- `trial-id`: UUID of the trial that is the source of the data.

#### `OnMessage()`

Called when user data from actors is received.

Metadata:

- `trial-id`: UUID of the trial that is the source of the data.

#### `OnEnd()`

Called to request the end of the trial.
If no reply is sent within a pre-determined time, the environment is considered stalled, and the trial will force terminate.

Metadata:

- `trial-id`: UUID of the trial to end.

#### `Version()`

Called to request version data.

Metadata: None

### `EnvStartRequest`

Request message for the `OnStart` procedure.

```protobuf
message EnvStartRequest {
  string impl_name = 1;
  EnvironmentConfig config = 2;
  repeated TrialActor actors_in_trial = 3;
}
```

- impl_name: (optional) Name of the implementation that should run the environment for this trial. If not provided, an arbitrary implementation will be used.
- config: The configuration to start the environment.
- actors_in_trial: The list of all actors in the trial. This list has the same length and order as the list of actors provided in different places in the API, for the same trial.

### `EnvStartReply`

Reply message for the `OnStart` procedure.

```protobuf
message EnvStartReply {
  ObservationSet observation_set = 1;
}
```

- observation_set:  A set of observations for all actors of the trial.

### `EnvActionRequest`

Request message for the `OnAction` and `OnEnd` procedures.

```protobuf
message ActionSet {
  repeated bytes actions = 1;
}

message EnvActionRequest {
  ActionSet action_set = 1;
  bool reply_with_snapshot = 2;
}
```

- actions: A list of actions, one for each actor of the trial.  This list has the same length and order as the list of actors provided in different places in the API (e.g. `actors_in_trial`), for the same trial. Each action is the serialization of the appropriate type for the actor (as defined in the `cogment.yaml` file).
- action_set: The set of actions for all actors.
- reply_with_snapshot: If true, then request that the observations for the actors (in the reply) be snapshots.  If false, the observations can be snapshots or deltas (at the discretion of the environment).  See [ObservationData][2].

### `EnvActionReply`

Reply message for the `OnAction` and `OnEnd` procedures.

```protobuf
message EnvActionReply {
  ObservationSet observation_set = 1;
  repeated Reward rewards = 2;
  repeated Message messages = 3;
  bool final_update = 4;
}
```

- observation_set:  A set of observations for all actors of the trial.
- rewards: A list of rewards for actors.
- messages: User data to send to actors.  The sender_name entry should not be set.
- messages: A list of messages for actors.  The sender actor entry should not be filled.
- final_update: If true, this will be the final update of the environment for this trial (i.e. end of the trial). This should always be true when replying to an `OnEnd` procedure call.

### `EnvMessageRequest`

Request message for the `OnMessage` procedure.

```protobuf
message EnvMessageRequest {
  repeated Message messages = 1;
}
```

- messages: List of messages from actors.

### `EnvMessageReply`

Reply message for the `OnMessage` procedure.

```protobuf
message EnvMessageReply {}
```

## Data/Log API

This API is defined in `datalog.proto`. It is implemented by the data logger application using the gRPC server API, and the orchestrator connects to the data logger application.

The data logger endpoint, for the orchestrator to connect to, is defined in the `cogment.yaml` file.

### Service `LogExporter`

```protobuf
service LogExporter {
  rpc OnLogSample(stream LogExporterSampleRequest) returns (LogExporterSampleReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `OnLogSample()`

Called the first time a sample is available.
This call will normally stay active as long as the orchestrator is running.
If disconnected, the orchestrator will not reconnect unless restarted.
Data samples are provided by the orchestrator in the request stream.

Metadata: None

#### `Version()`

Called to request version data.

Metadata: None

### `LogExporterSampleRequest`

Stream request message for the `OnLogSample` procedure.

```protobuf
message DatalogSample {
  string user_id = 1;
  
  ObservationSet observations = 2;
  repeated Action actions = 3;
  repeated Reward rewards = 4;
  repeated Message messages = 5;
}

message LogExporterSampleRequest {
  oneof msg {
    TrialParams trial_params = 1;
    DatalogSample sample = 2;
  }
}
```

- user_id: The ID of the user that started the trial.
- observations: A set of observations for all actors.
- actions: Actions from all actors. This list has the same length and order as the list of actors provided in different places in the API (e.g. `actors_in_trial`), for the same trial. Of interest here; it matches the list of actors provided in `trial_params`.
- rewards: List of rewards sent to actors.
- messages: List of user data sent to actors or the environment.
- trial_params: Trial params used for a new trial.  This is usually sent on start of a trial before any other sample from the trial.
- sample: A data sample to be logged.

### `LogExporterSampleReply`

Reply message for the `OnLogSample` procedure.

```protobuf
message LogExporterSampleReply {}
```

## Hook API

This API is defined in `hooks.proto`. It is implemented by the pre-trial hook application using the gRPC server API, and the orchestrator connects to the application.

The pre-trial hook endpoint, for the orchestrator to connect to, is defined in the `cogment.yaml` file.

### Service `TrialHooks`

```protobuf
service TrialHooks {
  rpc OnPreTrial(PreTrialContext) returns (PreTrialContext) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `OnPreTrial()`

Called before a trial is started to set or modify the parameters for the trial.

Metadata:

- `trial-id`: UUID of the new trial that will be started.

#### `Version()`

Called to request version data.

Metadata: None

### `PreTrialContext`

Request and reply message for the `OnPreTrial` procedure.

```protobuf
message PreTrialContext {
  string impl_name = 1;
  TrialParams params = 2;
  string user_id = 3;
}
```

- impl_name: (optional) Name of the implementation that should run the hook. If not provided, an arbitrary implementation will be used. Set on a request, ignored when replying.
- params: The trial parameters so far. The first hook to be called will receive the default parameters present in the `cogment.yaml` file, and subsequent hooks will receive the parameters sent from the previous hook.  Typically, changes are made to this data and the message sent as a reply.
- user_id: The ID of the user that is starting the trial. Set on a request, ignored when replying.

[1]: concepts/glossary.md#trial-parameters
[2]: #ObservationData
