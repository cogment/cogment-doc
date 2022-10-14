---
sidebar_position: 6
---

# gRPC API

The low-level cogment communication API is implemented using [gRPC](https://grpc.github.io/) services.
These services are collections of procedures to be called remotely (RPC).
gRPC abstracts the network communication with familiar looking functions (representing the defined procedures), in any number of programming languages.
How services are implemented or accessed is highly dependant on the programming language being interfaced, and is beyond the scope of this document (see gRPC API documentation).

This reference requires a basic understanding of gRPC, and in particular the format of the `*.proto` files.

:::info
Cogment's gRPC API is defined and released alongside the [Cogment CLI](./cli/index.md), the latest version can be accessed at <https://github.com/cogment/cogment/tree/main/packages/grpc_api>.
:::

## General

In this API, the `bytes` data type is normally used to contain the serialized data of externally defined messages. These messages are well defined in the trial specifications file.

On the other hand, the `google.protobuf.Any` data type is normally used to contain messages that are not pre-defined (thus unknown by the framework), and may be decided at runtime. It is then the responsibility of the receiver to deserialize in the correct message type.

Empty messages are normally used as a placeholder for easy future, backward compatible, extension to the API.

In this API, [gRPC metadata](https://grpc.io/docs/what-is-grpc/core-concepts/#metadata) is normally used only for service request (by the caller) for identifying purposes. The details of the required metadata are described with the service calls. Service replies (the callees) are not expected to provide metadata.

In some places in the API, we use a list of actor data without information about which actor is where in the list.
These lists have a constant length and order throughout a trial (set in the trial parameters), and thus can/must be cross referenced with other such lists within the same trial (e.g. `actors_in_trial`, `actors_map`).
The actor can be inferred by the position in the list, and the index into the list can sometimes be used to identify an actor.

gRPC service names in Cogment are suffixed with "SP" (Service Point).

### Limitations

Due to normal network delays and unpredictability of the various components, there are limitations related to the communication with the Orchestrator that translate in issues that can arise.

-   In the current version, to simplify the implementation, there is an expectation of "good behavior" from the various components:
    -   Actors are expected to respond with an action only after receiving an observation, and to send only one action per observation received.
    -   The environment is expected to respond with an observation set only after receiving an action set, and to send only one observation set per action set received (and one initial observation set).
    -   All components are expected to respond within a reasonable amount of time.
    -   Hooks do not assume to receive specific parameters, they reply only with well formed parameters, and they do not assume a specific order of hooks being called (when multiple hooks are defined).
    -   A `TerminateTrial` (from the Control API) is called only a reasonable delay after a `StartTrial` (e.g. after at least two ticks have executed).
    -   Note that what constitutes a "reasonable" amount of time is dependent on many variables.

## Common types

Most of the messages are defined in the `common.proto` file. `ObservationSet` and `ActionSet` are defined in `environment.proto`.

### Common Values

Some values (and their standardized names) are recurrent throughout the gRPC API.

-   tick_id: (uint64/sint64) The monotonic time, in number of steps, since the start of the trial. As an ID, it represents a discrete step in the processing of the trial. A step starts with observations representing a specific point in time, that are followed by actions, rewards and messages in relation to these observations. The first tick ID is 0. Some of these values may accept -1, meaning the latest step (e.g. when sending an action).
-   timestamp: (fixed64) The wall-clock time in nanoseconds since 00:00:00UTC January 1, 1970 (Unix Epoch time).
-   trial_id: (string) The identifier (name) of the trial.

### `VersionRequest`

Empty message to serve as the request for the `Version` procedure (present in all gRPC services defined in the Cogment API).

```protobuf
message VersionRequest {}
```

### `VersionInfo`

Reply message for the `Version` procedure (present in all gRPC services defined in the API).
It contains a list of version information.
The Cogment framework expects at least "cogment-api" and "grpc" versions to be present in the list. The "cogment-api" is for the local version of the Cogment API used by the service. The "grpc" is for the version of gRPC used by the service.
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

-   versions: List of version information
-   name: The name/software/module for which the version is given. E.g. "cogment-api"
-   version: The version related to the name. E.g. "1.0.0b5"

### `TrialParams`

Global parameters for a trial (see [Trial Parameters](./parameters.md#trial-parameters)).

```protobuf
message TrialParams {
  SerializedMessage trial_config = 1;
  DatalogParams datalog = 2;
  EnvironmentParams environment = 3;
  repeated ActorParams actors = 4;
  uint32 max_steps = 5;
  uint32 max_inactivity = 6;
}
```

-   trial_config
-   datalog: (optional) The parameters for the datalog of the trial. If not present, data logging is disabled.
-   environment: The parameters for the environment of the trial.
-   actors: The parameters for all actors involved in the trial. This list's length and order define the length and order of the lists of actors provided in different places in the API (e.g. `actors_in_trial`) for the trial.
-   max_steps
-   max_inactivity

### `DatalogParams`

Parameters related to the data logger (see [Trial Parameters](./parameters.md#trial-parameters)).

```protobuf
message DatalogParams {
  string endpoint = 1;
  repeated string exclude_fields = 2;
}
```

-   endpoint: This is used by the Orchestrator to connect to the datalog using the `LogExporterSP` gRPC service.
-   exclude_fields

### `EnvironmentParams`

Parameters related to an environment (see [Trial Parameters](./parameters.md#trial-parameters)).

```protobuf
message EnvironmentParams {
  string endpoint = 1;
  SerializedMessage config = 2;
  string implementation = 3;
}
```

-   endpoint: This is used by the Orchestrator to connect to the environment using the `EnvironmentSP` gRPC service.
-   config
-   implementation

### `ActorParams`

Parameters related to an actor (see [Trial Parameters](./parameters.md#trial-parameters)).

```protobuf
message ActorParams {
  string name = 1;
  string actor_class = 2;
  string endpoint = 3;
  string implementation = 4;
  SerializedMessage config = 5;
  float initial_connection_timeout = 6;
  float response_timeout = 7;
  bool optional = 8;
  SerializedMessage default_action = 9;
}
```

-   name
-   actor_class
-   endpoint: The endpoint is used by the Orchestrator to connect to the actor using the `ServiceActorSP` gRPC service. If set to "cogment://client", then the actor is a client and will connect to the Orchestrator instead, using the `ClientActorSP` gRPC service.
-   implementation
-   config
-   initial_connection_timeout
-   response_timeout
-   optional
-   default_action

### `SerializedMessage`

This contains an optional serialized protobuf message (e.g. config) defined by the user in the spec file. The bytes content is wrapped in a message to be able to differentiate between a default content (i.e. length 0) and the absence of content. This is easily done by testing for the presence of the message.

```protobuf
message SerializedMessage {
  bytes content = 1;
}
```

-   content: A serialized protobuf message. E.g. for configs of a particular trial, the actual message type is defined in the spec file in its respective section: `trial:config_type`, `environment:config_type`, and `actor_classes:config_type`.

### `TrialActor`

Details of an actor participating in a trial.

```protobuf
message TrialActor {
  string name = 1;
  string actor_class = 2;
}
```

-   name: The name of the actor.
-   actor_class: The name of the class of actor. For a particular trial, the possible actor classes are defined in the the spec file in the `actor_classes:name` sections.

### `Observation`

A singular observation.

```protobuf
message Observation {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  bytes content = 3;
}
```

-   tick_id: Tick of this observation.
-   timestamp: The time of the observation.
-   content: The serialized protobuf message representing an observation for a specific actor. In a particular trial, the actual message type for the observation space is defined in the spec file for each actor class in section `actor_classes:observation:space`. Note that the specific actor represented is defined by the enclosing message.

### `Action`

Data associated with an actor's action.

```protobuf
message Action {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  bytes content = 3;
}
```

-   tick_id: The tick of the observation on which the action is taken.
-   timestamp: The time of the action.
-   content: The serialized protobuf message representing an action from a specific actor. In a particular trial, the actual message type for the action space is defined in the spec file for each actor class in section `actor_classes:action:space`. Note that the specific actor represented is defined by the enclosing message.

### `Message`

Data associated with a communication (message) destined for an actor or the environment.

```protobuf
message Message {
  sint64 tick_id = 1;
  string sender_name = 2;
  string receiver_name = 3;
  google.protobuf.Any payload = 4;
}
```

-   tick_id: Tick associated with the message.
-   sender_name: The name of the sending actor/environment. This is optional when sending messages (i.e. the sender is already known).
-   receiver_name: The name of the target/receiving actor/environment.
-   payload: Data for the target actor/environment. It is the responsibility of the target to understand the type received.

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

-   sender_name: Name of the sender that sent the reward. This is not needed when sending because it will be set by the orchestrator. It is only used by receiving actors.
-   value: The numerical value of the provided reward.
-   confidence: The weight of this reward in computing the final (aggregated) reward.
-   user_data: Additional user data to be consumed by the receiving actor. It is the responsibility of the receiver to understand the type received.

### `Reward`

Data representing a reward sent or received, usually for the purpose of training automated agents.
This is an aggregate of possibly multiple `RewardSource` (but at least one).

```protobuf
message Reward {
  sint64 tick_id = 1;
  string receiver_name = 2;
  float value = 3;
  repeated RewardSource sources = 4;
}
```

-   tick_id: The tick associated with the reward. If set to `-1` when sending a reward, the orchestrator will automatically assign the latest tick. This will always be a valid tick (i.e. >= 0) when receiving a reward.
-   receiver_name: Name of the receiving actor (the reward destination).
-   value: The aggregated value (weighted sum) of the provided reward sources. May be ignored when sending a reward; The final value will be computed by the orchestrator.
-   sources: The simple reward sources that form this aggregated reward. There must be at least one.

### `ObservationSet`

A set of environment observations for all actors in the trial.

```protobuf
message ObservationSet {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  repeated bytes observations = 3;
  repeated int32 actors_map = 4;
}
```

-   tick_id: The tick to which the observations relate to.
-   timestamp: The time when the observation set was made.
-   observations: A list of observations. Indexed into by the `actors_map`. Each `bytes` chunk is a serialized protobuf message representing an observation for a specific actor class. For a particular trial, the actual message type for the observation space is defined in the spec file for each actor class in section `actor_classes:observation:space`. Note that the specific actor represented is defined by the `actors_map`.
-   actors_map: A list of indexes into the `observations` list above. This list of indexes has the same length and order as the list of actors provided in different places in the API (e.g. `actors_in_trial`), for the same trial.

### `ActionSet`

A set of actions from all actors in the trial.

```protobuf
message ActionSet {
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  repeated bytes actions = 3;
  repeated uint32 unavailable_actors = 4;
}
```

-   tick_id: The tick to which the actions relate to.
-   timestamp: The time when the action set was made (usually after the last action arrived at the Orchestrator).
-   actions: A list of actions. Each `bytes` chunk is a serialized protobuf message representing an action from a specific actor. For an particular trial, the actual message type for the action space is defined in the spec file for each actor class in section `actor_classes:action:space`. This list has the same length and order as the list of actors provided in different places in the API (e.g. `actors_in_trial`), for the same trial.
-   unavailable_actors: List of actors (index of actors) that were not available. Actors in this list have invalid data in the `actions` list.

### `TrialState`

Enum representing the state of a trial.

```protobuf
enum TrialState {
  UNKNOWN = 0;
  INITIALIZING = 1;
  PENDING = 2;
  RUNNING = 3;
  TERMINATING = 4;
  ENDED = 5;
}
```

-   UNKNOWN: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
-   INITIALIZING: The trial is in the process of starting.
-   PENDING: The trial is waiting for its final parameters, all its components to be ready, and the first observation.
-   RUNNING: The trial is running.
-   TERMINATING: The trial is in the process of ending (either a request to end has been received or the last observation has been received).
-   ENDED: The trial has ended. Only a set number of ended trials will be kept in memory (configured in the Orchestrator).

### `CommunicationState`

Enum representing the state of communication with the actors and environment.

```protobuf
enum CommunicationState {
  UNKNOWN_COM_STATE = 0;
  NORMAL = 1;
  HEARTBEAT = 2;
  LAST = 3;
  LAST_ACK = 4;
  END = 5;
}
```

-   UNKNOWN_COM_STATE: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
-   NORMAL: Normal communication message. Always contains data.
-   HEARTBEAT: Heartbeat request/reply message. Contains no data. When received, must be responded in kind.
-   LAST: Message indicating that the trial is ending, and ending data is following (as `NORMAL`). Contains no data.
-   LAST_ACK: Message indicating that the last data has been sent (i.e. this is the last outgoing message). Contains no data.
-   END: Message indicating that the trial has ended (i.e. this is the final message). Contains no data, except maybe for `details`.

The normal (soft) end of a trial follows this sequence :

1. Orchestrator or Environment sends `LAST`
2. Exchange of `NORMAL` finalizing data
3. Component sends `LAST_ACK` (component stops sending after this)
4. Orchestrator sends `NORMAL` finalizing data
5. Orchestrator terminates communication with `END`

For a hard termination of a trial, the Orchestrator will send `END` to all components (with no `LAST`/`LAST_ACK` handshake).

## Control API

This API is defined in `orchestrator.proto`. It is implemented by the cogment orchestrator, and client applications are expected to connect to it using the gRPC client API.

This API is used for general control and services related to trials.

### Service `TrialLifecycleSP`

```protobuf
service TrialLifecycleSP {
  rpc StartTrial(TrialStartRequest) returns (TrialStartReply) {}
  rpc TerminateTrial(TerminateTrialRequest) returns (TerminateTrialReply) {}
  rpc GetTrialInfo(TrialInfoRequest) returns (TrialInfoReply) {}
  rpc WatchTrials(TrialListRequest) returns (stream TrialListEntry) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `StartTrial()`

Start a new trial.

Metadata: None

#### `TerminateTrial()`

Request the environment to terminate existing trial(s).

Metadata:

-   `trial-id`: (_one or more_) Identifier(s) of the trial(s) to terminate.

#### `GetTrialInfo()`

Get extra information about an existing trial.

Metadata:

-   `trial-id`: (_zero or more_) Identifier(s) of the trial(s) we are requesting information about. If no trial id is provided, the request is for information about all active trials.

#### `WatchTrials()`

Stream state changes from trials.

Metadata: None

#### `Version()`

Request version data.

Metadata: None

### `TrialStartRequest`

Request message for the `StartTrial` procedure.

```protobuf
message TrialStartRequest {
  oneof start_data {
    SerializedMessage config = 1;
    TrialParams params = 4;
  }
  string user_id = 2;
  string trial_id_requested = 3;
}
```

-   config: The trial config data. This data can be used by the pre-trial hooks to determine the config for the rest of the components.
-   params: The fully defined parameters for the new trial. When this is given to start the trial, the default parameters are ignored, and the pre-trial hooks will not be called.
-   user_id: The ID of the user that is starting the trial.
-   user_id: The ID of the user that is starting the trial.
-   trial_id_requested: The trial identifier requested for the new trial. It must be unique. If not empty, the Orchestrator will try to use this trial_id, otherwise, a UUID will be created.

### `TrialStartReply`

Reply message for the `StartTrial` procedure.

```protobuf
message TrialStartReply {
  string trial_id = 1;
}
```

-   trial_id: ID of the newly started trial. Empty if the requested trial ID could not be used.

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

-   get_latest_observation: If true, request the latest environment observation available for the trial (in addition to standard information).

### `TrialInfoReply`

Reply message for the `GetTrialInfo` procedure.

```protobuf
message TrialInfoReply {
  repeated TrialInfo trial = 1;
}
```

-   trial: List of information about the trials. Contains only the requested trial info if a trial ID was provided when the call was made (as metadata to the procedure). Otherwise contains information about all active trials.

### `TrialInfo`

Message containing information about a trial.

```protobuf
message TrialInfo {
  string trial_id = 1;
  string env_name = 2;
  TrialState state = 3;
  uint64 tick_id = 4;
  fixed64 trial_duration = 5;
  ObservationSet latest_observation = 6;
  repeated TrialActor actors_in_trial = 7;
}
```

-   trial_id: The Identifier of the trial.
-   env_name: The name of the environment running the trial.
-   state: The state of the trial.
-   tick_id: The current tick of the trial.
-   trial_duration: The duration of the trial so far, in nanoseconds. If the trial has ended, this is the duration from start to end of the trial. This is meant as an indicator; resolution may not be a nanosecond, and precision is not guaranteed.
-   latest_observation: The latest environment observations for all actors. This will be provided only if requested in the `TrialInfoRequest`.
-   actors_in_trial: The list of active actors in the trial.

### `TrialListRequest`

Request message for the `WatchTrials` procedure.

```protobuf
message TrialListRequest {
  repeated TrialState filter = 1;
}
```

-   filter: The list of states that are requested. If a trial is not in a state found in this list, it will not be reported. If the list is empty, all states will be reported.

### `TrialListEntry`

Stream reply message for the `WatchTrials` procedure.

```protobuf
message TrialListEntry {
  string trial_id = 1;
  TrialState state = 2;
}

```

-   trial_id: The Identifier of the trial.
-   state: The state of the trial.

## Actor API

There are two kinds of actors: Service and Client. They each have their own separate service (respectively `ServiceActorSP` and `ClientActorSP`). But the messages are identical and work almost the same way (except for the initial phase).

### Service Actor API

This API is defined in `agent.proto`. It is implemented by the service actor application using the gRPC server API, and the Orchestrator connects to the service actor application using the gRPC client API.

This API is used by service actors that will be participating in new trials. They are connected at the start of a trial in which they participate.
Multiple simultaneous service actors can be served from a single service application instance (i.e. same endpoint).
An actor endpoint, for the Orchestrator to connect to, is defined in the [trial parameters](./cogment-yaml.md#trial-params).

#### Service `ServiceActorSP`

```protobuf
service ServiceActorSP {
  rpc RunTrial(stream ActorRunTrialInput) returns (stream ActorRunTrialOutput) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

### Client Actor API

This API is defined in `orchestrator.proto`. It is implemented by the Orchestrator using the gRPC server API, and client applications are expected to connect to the Orchestrator using the gRPC client API.

This API is used by client actors participating in existing (initializing) trials. The trial expecting client actors will wait for all actors to be connected before starting the trial.
The actors connecting this way must have an endpoint set to "cogment://client" in the [trial parameters](./cogment-yaml.md#trial-params).

Note the reversal of the input and output messages compared to the service actor `RunTrial` procedure.

#### Service `ClientActorSP`

```protobuf
service ClientActorSP {
  rpc RunTrial(stream ActorRunTrialOutput) returns (stream ActorRunTrialInput) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

### `RunTrial()`

Procedure call to participate in a trial. It is active for the duration of the trial.
Actor actions and data are provided to the Orchestrator in the output message stream, and observations and data are provided by the Orchestrator in the input message stream.

Metadata:

-   `trial-id`: Identifier of the trial the actor is participating in. This is supplied to service actors, but must be supplied by client actors.

### `Version()`

Request version data.

Metadata: None

### `ActorRunTrialInput`

Message received by actors during the streaming `RunTrial` procedure. `data` should contain a message only when `state` is `NORMAL` (or in the case of a hard termination, `details` can be sent with state `END`).
Defined in the `common.proto` file.

```protobuf
message ActorRunTrialInput {
  CommunicationState state = 1;
  oneof data {
    ActorInitialInput init_input = 2;
    Observation observation = 3;
    Reward reward = 4;
    Message message = 5;
    string details = 6;
  }
}
```

-   state: The state of this communication message. Identifies this message as a data or a control message.
-   init_input: The initial communication data at the start of a trial. It should always be the first `NORMAL` state message in the stream. Used to report the details of the trial the actor is participating in.
-   observation: An observation from the environment.
-   reward: Rewards from other participants in the trial.
-   message: A message from other participants in the trial.
-   details: Explanation for special circumstances, for example when receiving a hard termination signal (a state of `END` without `LAST` or `LAST_ACK`).

### `ActorRunTrialOutput`

Message sent by actors during the streaming `RunTrial` procedure. `data` should contain a message only when `state` is `NORMAL`.
Defined in the `common.proto` file.

```protobuf
message ActorRunTrialOutput {
  CommunicationState state = 1;
  oneof data {
    ActorInitialOutput init_output = 2;
    Action action = 3;
    Reward reward = 4;
    Message message = 5;
    string details = 6;
  }
}
```

-   state: The state of this communication message. Identifies this message as a data or a control message.
-   init_output: The initial communication data at the start of a trial. It should always be the first `NORMAL` state message in the stream. Used to initiate or acknowledge connection to a trial.
-   action: An action from the actor.
-   reward: A reward for other participants in the trial.
-   message: A message for other participants in the trial.
-   details: _Reserved_.

### `ActorInitialInput`

The initial communication message at the start of a trial. Used to report the details of the trial the actor is participating in.
For service actors, this message initiates the connection stream for a new trial. The trial ID is provided in the metadata of the `RunTrial` procedure.
For client actors, this message is a reply to a connection request to an existing trial.

```protobuf
message ActorInitialInput {
  string actor_name = 1;
  string actor_class = 2;
  string impl_name = 3;
  string env_name = 4;
  SerializedMessage config = 5;
}
```

-   actor_name: The name of the actor participating in the trial.
-   actor_class: The actor class of the actor participating in the trial.
-   impl_name: (optional) Name of the implementation that should run the actor in this trial. If not provided, an arbitrary implementation will be used.
-   env_name: The name of the environment running the trial the actor is participating in.
-   config: The configuration to start the actor.

### `ActorInitialOutput`

The initial communication message at the start of a trial. Used to initiate or acknowledge connection to a trial.
For service actors, this message is empty and serves to acknowledge that the actor is ready to start the trial.
For client actors, this message serves as a request to connect to an existing trial. The trial ID is provided in the metadata of the `RunTrial` procedure.

```protobuf
message ActorInitialOutput {
  oneof slot_selection {
    string actor_class = 1;
    string actor_name = 2;
  }
}
```

-   actor_name: The name in the trial that the client actor wants to participate as.
-   actor_class: The class in the trial that the client actor wants to participate as. In this case, there may be many options, and the Orchestrator will decide precisely which name the client actor will receive.

## Environment API

This API is defined in `environment.proto`. It is implemented by the environment application using the gRPC server API, and the Orchestrator connects to the environment application using the gRPC client API.

This API is used by environments that will run trials.
There is only one environment per trial.
Multiple simultaneous environments (for different trials) can be served from a single environment application instance (endpoint).
The environment endpoint, for the Orchestrator to connect to, is defined in the [trial parameters](./cogment-yaml.md#trial-params).

### Service `EnvironmentSP`

```protobuf
service EnvironmentSP {
  rpc RunTrial(stream EnvRunTrialInput) returns (stream EnvRunTrialOutput) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `RunTrial()`

Procedure call to participate in a trial. It is active for the duration of the trial.
Actor actions and data are provided by the Orchestrator in the input message stream, and observations and data are provided to the Orchestrator in the output message stream.

Metadata:

-   `trial-id`: Identifier of the trial the environment is participating in.

#### `Version()`

Called to request version data.

Metadata: None

### `EnvrRunTrialInput`

Message received by the environment during the streaming `RunTrial` procedure. `data` should contain a message only when `state` is `NORMAL` (or in the case of a hard termination, `details` can be sent with state `END`).

```protobuf
message EnvRunTrialInput {
  CommunicationState state = 1;
  oneof data {
    EnvInitialInput init_input = 2;
    ActionSet action_set = 3;
    Message message = 4;
    string details = 5;
  }
}
```

-   state: The state of this communication message. Identifies this message as a data or a control message.
-   init_input: The initial communication data at the start of a trial. It should always be the first `NORMAL` state message in the stream. Used to provide the details of the trial the environment will run.
-   action_set: Actions from all actors in the trial.
-   message: A message from other participants in the trial.
-   details: Explanation for special circumstances, for example when receiving a hard termination signal (a state of `END` without `LAST` or `LAST_ACK`).

### `EnvRunTrialOutput`

Message sent by the environment during the streaming `RunTrial` procedure. `data` should contain a message only when `state` is `NORMAL`.

```protobuf
message EnvRunTrialOutput {
  CommunicationState state = 1;
  oneof data {
    EnvInitialOutput init_output = 2;
    ObservationSet observation_set = 3;
    Reward reward = 4;
    Message message = 5;
    string details = 6;
  }
}
```

-   state: The state of this communication message. Identifies this message as a data or a control message.
-   init_output: The initial communication data at the start of a trial. It should always be the first `NORMAL` state message in the stream. Used to acknowledge that the environment is ready to run the trial. Note that the trial will only really start when the environment sends the first set of observations.
-   observation_set: Observations for all actors in the trial.
-   reward: A reward for other participants in the trial.
-   message: A message for other participants in the trial.
-   details: _Reserved_.

### `EnvInitialInput`

The initial communication message at the start of a trial. This message initiates the connection stream for a new trial. The trial ID is provided in the metadata of the `RunTrial` procedure.

```protobuf
message EnvInitialInput {
  string name = 1;
  string impl_name = 2;
  uint64 tick_id = 3;
  repeated TrialActor actors_in_trial = 4;
  SerializedMessage config = 5;
}
```

-   name: The name of the environment participating in the trial.
-   impl_name: (optional) Name of the implementation that should run the environment in this trial. If not provided, an arbitrary implementation will be used.
-   tick_id: Initial tick id requested to start the environment.
-   actors_in_trial: The list of all actors participating in the trial. This list has the same length and order as the list of actors provided in different places in the API, for the same trial.
-   config: The configuration to start the environment.

### `EnvInitialOutput`

The initial communication message at the start of a trial. This message is empty and serves to acknowledge that the environment is ready to run the trial.

```protobuf
message EnvInitialOutput {}
```

## Data/Log API

This API is defined in `datalog.proto`. It is implemented by the data logger application using the gRPC server API, including the out-of-the-box component [`cogment-trial-datastore`](./cli/trial-datastore.md).

The data logger endpoint, for the orchestrator to connect to, is defined in the trial parameters.

### Service `LogExporterSP`

```protobuf
service LogExporterSP {
  rpc RunTrialDatalog(stream LogExporterSampleRequest) returns (LogExporterSampleReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `RunTrialDatalog()`

Called for each trial, at the start of the trial.
The first data received are the parameters.
Data samples are provided in the request stream following the parameters.
The stream is maintained for the duration of the trial.

Metadata:

-   `trial-id`: Identifier of the trial that is the source of the data.
-   `user-id`: Identifier of the user that started the trial.

#### `Version()`

Called to request version data.

Metadata: None

### `LogExporterSampleRequest`

Stream request message for the `RunTrialDatalog` procedure.

```protobuf
message SampleInfo {
  bool out_of_sync = 5;
  uint64 tick_id = 1;
  fixed64 timestamp = 2;
  TrialState state = 3;
  repeated string special_events = 4;
}

message DatalogSample {
  SampleInfo info = 1;

  ObservationSet observations = 2;
  repeated Action actions = 3;
  repeated Reward rewards = 4;
  repeated Message messages = 5;
  repeated uint32 default_actors = 6;
  repeated uint32 unavailable_actors = 7;
}

message LogExporterSampleRequest {
  oneof msg {
    TrialParams trial_params = 1;
    DatalogSample sample = 2;
  }
}
```

-   out_of_sync: If false, this sample is a normal and full sample. If true, it is an out-of-sync sample that is partially filled, and some of the other value may have a slightly different meaning than for a normal sample.
-   tick_id: The tick the data relates to.
-   timestamp: The time the data was received. For a full sample, this is the time the observation set was received by the Orchestrator.
-   state: The state of the trial at the end of the tick. For out-of-sync samples, the state is undefined.
-   special_events: Events not visible from the rest of the data may appear in here. Out-of-sync samples will usually have an explanation of data in the special events list.
-   observations: Observations from the environment. Out-of-sync samples may not have observations.
-   actions: Actions from all actors. This list has the same length and order as the list of actors provided in `trial_params`. This list may be empty for out-of-sync samples.
-   rewards: List of rewards sent to actors.
-   messages: List of user data sent to actors or the environment.
-   default_actors: List of actors (index of actors) that were not available but had a default action. Actors in this list have invalid data in the `actions` list.
-   unavailable_actors: List of actors (index of actors) that were not available and did not have a default action. Actors in this list have invalid data in the `actions` list.
-   trial_params: Trial parameters used for a trial. This is sent on start of a trial, as the first message in the `RunTrialDatalog` stream.
-   sample: A data sample to be logged. It can be an out-of-sync sample which contains only partial data.

### `LogExporterSampleReply`

Reply message for the `RunTrialDatalog` procedure.

```protobuf
message LogExporterSampleReply {}
```

## Hook API

This API is defined in `hooks.proto`. It is implemented by the pre-trial hook application using the gRPC server API, and the orchestrator connects to the application.

The pre-trial hook endpoint, for the orchestrator to connect to, are defined on the command line of the Orchestrator (or in environment variables).

### Service `TrialHooksSP`

```protobuf
service TrialHooksSP {
  rpc OnPreTrial(PreTrialParams) returns (PreTrialParams) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `OnPreTrial()`

Called before a trial is started to set or modify the parameters for the trial.

Metadata:

-   `trial-id`: Identifier of the new trial that will be started.
-   `user-id`: Identifier of the user that started the trial.

#### `Version()`

Called to request version data.

Metadata: None

## Directory API

This API is defined in `directory.proto`. It is implemented by the Directory application using the gRPC server API.

### Service `DirectorySP`

```protobuf
service DirectorySP {
  rpc Register(stream RegisterRequest) returns (stream RegisterReply) {}
  rpc Deregister(stream DeregisterRequest) returns (stream DeregisterReply) {}
  rpc Inquire(InquireRequest) returns (stream InquireReply) {}
  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `Register()`

Called to register (add) services to the directory.

Metadata:

-   `authentication_token`: (Optional) Token of the services being registered. This will be registered with the services and must match when inquiring or deregistering a service.

#### `Deregister()`

Called to deregister (remove) previously registered services to the directory.

Metadata:

-   `authentication_token`: (Optional) Token to authenticate services. This must match the token of the registered services.

#### `Inquire()`

Called to inquire (search) the directory for registered services.

Metadata:

-   `authentication_token`: (Optional) Token to identify the services. This must match the token of the inquired services.

#### `Version()`

Called to request version data.

Metadata: None

### `ServiceType`

Type of service registered. This serves to know how to test for health.

```protobuf
enum ServiceType {
  UNKNOWN_SERVICE = 0;
  TRIAL_LIFE_CYCLE_SERVICE = 1;
  CLIENT_ACTOR_CONNECTION_SERVICE = 2;
  ACTOR_SERVICE = 3;
  ENVIRONMENT_SERVICE = 4;
  PRE_HOOK_SERVICE = 5;
  DATALOG_SERVICE = 6;
  DATASTORE_SERVICE = 7;
  MODEL_REGISTRY_SERVICE = 8;
  OTHER_SERVICE = 100;
}
```

-   UNKNOWN_SERVICE: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
-   TRIAL_LIFE_CYCLE_SERVICE: Cogment service accessed with gRPC service `TrialLifecycleSP`.
-   CLIENT_ACTOR_CONNECTION_SERVICE: Cogment service accessed with gRPC service `ClientActorSP`.
-   ACTOR_SERVICE: Cogment service accessed with gRPC service `ServiceActorSP`.
-   ENVIRONMENT_SERVICE: Cogment service accessed with gRPC service `EnvironmentSP`.
-   PRE_HOOK_SERVICE: Cogment service accessed with gRPC service `TrialHooksSP`.
-   DATALOG_SERVICE: Cogment service accessed with gRPC service `DatalogSP`.
-   DATASTORE_SERVICE: Cogment service accessed with gRPC service `TrialDatastoreSP`.
-   MODEL_REGISTRY_SERVICE: Cogment service accessed with gRPC service `ModelRegistrySP`.
-   OTHER_SERVICE: This is for services not provided by Cogment or that do not have a dedicated service type. The properties registered in the directory should provide the necessary information, but this is left to the users to manage, and no health checking is performed.

### `ServiceDetails`

Message containing registration details of a service.

```protobuf
message ServiceDetails {
  ServiceType type = 1;
  map<string, string> properties = 2;
}
```

-   type: The type of service.
-   properties: Properties associated with the service, in a map (property name : property value).

### `ServiceEndpoint`

Message containing endpoint (connection) details for a service.

```protobuf
message ServiceEndpoint {
  enum Protocol {
    UNKNOWN = 0;
    GRPC = 1;
    GRPC_SSL = 2;
    COGMENT = 3;
  }

  Protocol protocol = 1;
  string host = 2;
  uint32 port = 3;
}
```

-   Protocol: The communication protocol for the service.
    -   UNKNOWN: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
    -   GRPC: The service connection is using gRPC and does not require encryption (SSL).
    -   GRPC_SSL: The service connection is using gRPC and is expecting encryption (SSL).
    -   COGMENT: This is a protocol specific to Cogment. The host will provide more details.
-   host: For gRPC, this is a network accessible hostname or IP address. For Cogment, this can only be `client`, which indicates that the service is not really a service, but a client, and will connect and not be connected to.
-   port: For gRPC, this is the TCP port to connect to. For Cogment, this is not used.

### `RegisterRequest`

Request message for the `Register` procedure.

```protobuf
message RegisterRequest {
  // URL where to connect to the service.
  ServiceEndpoint endpoint = 1;
  ServiceDetails details = 2;
}
```

-   endpoint: The connection endpoint of the service to be registered.
-   details: The service details to be registered for the service.

### `RegisterReply`

Reply message for the `Register` procedure.

```protobuf
message RegisterReply {
  enum Status {
    UNKNOWN = 0;
    OK = 1;
    FAILED = 2;
  }
  Status status = 1;
  string error_msg = 2;
  uint64 service_id = 3;
  string secret = 4;
}
```

-   Status: The result status.
    -   UNKNOWN: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
    -   OK: Registration succeeded and the data is valid.
    -   FAILED: Registration failed, the data is invalid (more details may be available in the error message).
-   status: The status of the corresponding registration request.
-   error_msg: Any extra details about the failure of the registration (if `status` == `FAILED`).
-   service_id: The ID that the service was given when it was registered in the Directory.
-   secret: This is a string that must be provided to deregister the service, and cannot be inquired.

### `DeregisterRequest`

Request message for the `Deregister` procedure.

```protobuf
message DeregisterRequest {
  uint64 service_id = 1;
  string secret = 2;
}
```

-   service_id: The ID of the service.
-   secret: The string that was given when the service was registered.

### `DeregisterReply`

Reply message for the `Deregister` procedure.

```protobuf
message DeregisterReply {
  enum Status {
    UNKNOWN = 0;
    OK = 1;
    FAILED = 2;
  }
  Status status = 1;
  string error_msg = 2;
}
```

-   Status: The result status.
    -   UNKNOWN: Should not be used (it's a requirement of protobuf enums to have a 0 default value).
    -   OK: Deregistration succeeded.
    -   FAILED: Deregistration failed (more details may be available in the error message).
-   status: The status of the corresponding deregistration request.
-   error_msg: Any extra details about the failure to deregister the service (if `status` == `FAILED`).

### `InquireRequest`

Request message for the `Inquire` procedure. Requires either a service ID, or details of services to find.

```protobuf
message InquireRequest {
  oneof inquiry {
    uint64 service_id = 1;
    ServiceDetails details = 2;
  }
}
```

-   service_id: The ID of the service.
-   details: The details of services to find.

### `InquireReply`

Reply message for the `Inquire` procedure.

```protobuf
message FullServiceData {
  ServiceEndpoint endpoint = 1;
  uint64 service_id = 2;
  ServiceDetails details = 3;
}

message InquireReply {
  FullServiceData data = 1;
}
```

-   endpoint: The connection endpoint of the service.
-   service_id: The ID of the service.
-   details: The details of the service.

## Model Registry API

This API is defined in `model_registry.proto`. It is implemented by [`cogment-model-registry`](./cli/model-registry.md).

### Service `ModelRegistrySP`

This gRPC API defines a service able to store versioned model, e.g. neural network architecture, weights and any additional parameters.

```protobuf
service ModelRegistrySP {
  rpc CreateOrUpdateModel(CreateOrUpdateModelRequest) returns (CreateOrUpdateModelReply) {}
  rpc DeleteModel(DeleteModelRequest) returns (DeleteModelReply) {}
  rpc RetrieveModels(RetrieveModelsRequest) returns (RetrieveModelsReply) {}

  rpc CreateVersion(stream CreateVersionRequestChunk) returns (CreateVersionReply) {}
  rpc RetrieveVersionInfos(RetrieveVersionInfosRequest) returns (RetrieveVersionInfosReply) {}
  rpc RetrieveVersionData(RetrieveVersionDataRequest) returns (stream RetrieveVersionDataReplyChunk) {}

  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `CreateOrUpdateModel()`

Create or update a model in the registry having the given unique (within the registry) `model_id`.

-   Metadata: None
-   Request: [`CreateOrUpdateModelRequest`](#createorupdatemodelrequest)
-   Reply: [`CreateOrUpdateModelReply`](#createorupdatemodelreply)

#### `DeleteModel()`

Delete a given model and all its versions from the registry.

-   Metadata: None
-   Request: [`DeleteModelRequest`](#deletemodelrequest)
-   Reply: [`DeleteModelReply`](#deletemodelreply)

#### `RetrieveModels()`

Retrieve all or selected models. This procedure supports paginated requests.

-   Metadata: None
-   Request: [`RetrieveModelsRequest`](#retrievemodelsrequest)
-   Reply: [`RetrieveModelsReply`](#retrievemodelsreply)

#### `CreateVersion()`

Create a new version of a given model. Because of their potential large size, model version data are uploaded as a stream.

-   Metadata: None
-   Request: Stream of [`CreateVersionRequestChunk`](#createversionrequestchunk)
-   Reply: [`CreateVersionReply`](#createversionreply)

#### `RetrieveVersionInfos()`

Retrieve the information for all or selected versions of a given model.

-   Metadata: None
-   Request: [`RetrieveVersionInfosRequest`](#retrieveversioninfosrequest)
-   Reply: [`RetrieveVersionInfosReply`](#retrieveversioninfosreply)

#### `RetrieveVersionData()`

Retrieve the data for a specific version of the model. Because of their potential large size, data are retrieved as a stream.

-   Metadata: None
-   Request: [`RetrieveVersionDataRequest`](#retrieveversiondatarequest)
-   Reply: Stream of [`RetrieveVersionDataReplyChunk`](#retrieveversiondatareplychunk)

### `CreateOrUpdateModelRequest`

Request for [`ModelRegistrySP.CreateOrUpdateModel()`](#createorupdatemodel)

```protobuf
message CreateOrUpdateModelRequest {
  ModelInfo model_info = 1;
}
```

-   `model_info`: Defines the unique model identifier within the registry and the `user_data` to use to create or update the model.

### `CreateOrUpdateModelReply`

Reply for [`ModelRegistrySP.CreateOrUpdateModel()`](#createorupdatemodel)

```protobuf
message CreateOrUpdateModelReply {}
```

### `DeleteModelRequest`

Request for [`ModelRegistrySP.DeleteModel()`](#deletemodel)

```protobuf
message DeleteModelRequest {
  string model_id = 1;
}
```

-   `model_ids`: Identifier of the model to be deleted.

### `DeleteModelReply`

Reply for [`ModelRegistrySP.DeleteModel()`](#deletemodel)

```protobuf
message DeleteModelReply {}
```

### `RetrieveModelsRequest`

Request for [`ModelRegistrySP.RetrieveModel()`](#retrievemodel).

```protobuf
message RetrieveModelsRequest {
  repeated string model_ids = 1;
  uint32 models_count = 3;
  string model_handle = 4;
}
```

-   `model_ids`: List of the identifiers of the desired models, leave empty to retrieve all models.
-   `models_count`: (optional) The desired number of models to be retrieved, leave empty (or set to 0) to retrieve all models matching the request.
-   `model_handle`: (optional) Leave empty for the initial request, use previously provided `RetrieveModelsReply.next_model_handle` on the next calls to retrieve the next models.

### `RetrieveModelsReply`

Reply for [`ModelRegistrySP.RetrieveModel()`](#retrievemodel).

```protobuf
message RetrieveModelsReply {
  repeated ModelInfo model_infos = 1;
  string next_model_handle = 2;
}
```

-   `model_infos`: At most `RetrieveModelsRequest.models_count` models.
-   `next_model_handle`: Opaque handle to be used to retrieve the next models matching the request.

### `CreateVersionRequestChunk`

Part of the request stream for [`ModelRegistrySP.CreateVersion()`](#createversion).

```protobuf
message CreateVersionRequestChunk {
  message Header {
    ModelVersionInfo version_info = 1;
  }
  message Body {
    bytes data_chunk = 1;
  }
  oneof msg {
    Header header = 1;
    Body body = 2;
  }
}
```

The first message in the stream should define `header`:

-   `version_info`: Information regarding the model version to create, `version_number` will be ignored. `data_hash` and `data_size` should be computed from the total final data and will be used by the server to validate it.

The following messages should define `body`:

-   `data_chunk`: A chunk of the version data, all the chunks in the stream will be concatenated.

### `CreateVersionReply`

Reply for [`ModelRegistrySP.CreateVersion()`](#createversion).

```protobuf
message CreateVersionReply {
  ModelVersionInfo version_info = 1;
}
```

-   `version_info`: The information relative to the created model version, in particular the defined `version_number`.

### `RetrieveVersionInfosRequest`

Request for [`ModelRegistrySP.RetrieveVersionInfos()`](#retrieveversioninfos).

```protobuf
message RetrieveVersionInfosRequest {
  string model_id = 1;
  repeated int32 version_numbers = 2;
  uint32 versions_count = 3;
  string version_handle = 4;
}
```

-   `model_id`: Identifier of the model we want to retrieve versions from.
-   `version_numbers`: List of desired version number (or -1 to denote the latest version). Leave empty to retrieve all versions of the given model.
-   `versions_count`: (optional) The desired number of versions to be retrieved, leave empty (or set to 0) to retrieve all the versions matching the request.
-   `version_handle`: (optional) Leave empty for the initial request, use previously provided `RetrieveVersionInfosReply.next_version_handle` on the next calls to retrieve the next versions.

### `RetrieveVersionInfosReply`

Reply for [`ModelRegistrySP.RetrieveVersionInfos()`](#retrieveversioninfos).

```protobuf
message RetrieveVersionInfosReply {
  repeated ModelVersionInfo version_infos = 1;
  string next_version_handle = 2;
}
```

-   `version_infos`: At most `RetrieveVersionInfosRequest.versions_count` versions.
-   `next_version_handle`: Opaque handle to be used to retrieve the next versions matching the request.

### `RetrieveVersionDataRequest`

Request for [`ModelRegistrySP.RetrieveVersionData()`](#retrieveversiondata).

```protobuf
message RetrieveVersionDataRequest {
  string model_id = 1;
  int32 version_number = 2;
}
```

-   `model_id`: Identifier of the model we want to retrieve version from.
-   `version_numbers`: Number of the desired version.

### `RetrieveVersionDataReplyChunk`

Part of the reply stream of [`ModelRegistrySP.RetrieveVersionData()`](#retrieveversiondata).

```protobuf
message RetrieveVersionDataReplyChunk {
  bytes data_chunk = 1;
}
```

-   `data_chunk`: A chunk of the version data. All the chunks in the stream need to be concatenated. The completeness and validity of the received data can be checked using the version's `data_size` and `data_hash` respectively.

### `ModelInfo`

Defines a model identifier and associated user data.

```protobuf
message ModelInfo {
  string model_id = 1;
  map<string, string> user_data = 2;
}
```

-   `model_id`: Unique model identifier.
-   `user_data`: Key/value user data associated with the model.

### `ModelVersionInfo`

Defines a model version and associated user data.

```protobuf
message ModelVersionInfo {
  string model_id = 1;
  uint32 version_number = 2;
  fixed64 creation_timestamp = 3;
  bool archived = 4;
  string data_hash = 5;
  fixed64 data_size = 6;
  map<string, string> user_data = 7;
}
```

-   `model_id`: Unique identifier, within the registry, of this version's model.
-   `version_number`: Unique version number, assigned incrementally at creation by the model registry.
-   `creation_timestamp`: When the model was created as nanosecond Unix epoch time.
-   `archived`: If `true`, this version is archived and should be stored in a long-term storage. If `false`, this version is not archived and can be evicted after a while. Non-archived versions should be used to _broadcast_ an update of the model during training.
-   `data_hash`: SHA 256 hash (encoded in base64 with standard 64 characters with padding) of this version's data, can be used to validate the data and for caching purposes.
-   `data_size`: Size (in bytes) of this version's data.
-   `user_data`: Key/value user data associated with the model, in particular it can be used to provide information required for the deserialization of the data.

#### `Version()`

Called to request version data.

Metadata: None

## Trial Datastore API

This API is defined in `trial_datastore.proto`. It is implemented by [`cogment-trial-datastore`](./cli/trial-datastore.md).

### Service `TrialDatastoreSP`

This gRPC API defines a service to manage and access data generated by trials.

```protobuf
service TrialDatastoreSP {
  rpc RetrieveTrials(RetrieveTrialsRequest) returns (RetrieveTrialsReply) {}
  rpc RetrieveSamples(RetrieveSamplesRequest) returns (stream RetrieveSampleReply) {}

  rpc AddTrial(AddTrialRequest) returns (AddTrialReply) {}
  rpc AddSample(stream AddSampleRequest) returns (AddSamplesReply) {}
  rpc DeleteTrials(DeleteTrialsRequest) returns (DeleteTrialsReply) {}

  rpc Version(VersionRequest) returns (VersionInfo) {}
}
```

#### `RetrieveTrials()`

Retrieve stored trials matching the given request.

-   Metadata: None
-   Request: [`RetrieveTrialsRequest`](#retrievetrialsrequest)
-   Reply: [`RetrieveTrialsRequest`](#retrievetrialsrequest)

#### `RetrieveSamples()`

Retrieve samples from matching trials, trials can be ongoing.

-   Metadata: None
-   Request: [`RetrieveSamplesRequest`](#retrievesamplesrequest)
-   Reply: Stream of [`RetrieveSampleReply`](#retrievesamplereply)

#### `AddTrial()`

Add a trial to the activity logger, as soon as a trial is added, samples can be retrieved using `RetrieveSamples()`.

-   Metadata: None
-   Request: [`AddTrialRequest`](#addtrialrequest)
-   Reply: [`AddTrialReply`](#addtrialreply)

#### `AddSample()`

Add samples to a trial in the activity logger as a stream, as soon as a sample is added it is pushed to the matching ongoing `RetrieveSamples()` requests.

-   Metadata:
    -   `trial-id`: UUID of the trial to add to the activity logger.
-   Request: Stream of [`AddSampleRequest`](#addsamplerequest)
-   Reply: [`AddSamplesReply`](#addsamplesreply)

#### `DeleteTrials()`

Delete the trials matching the given request, on failure no trial is deleted.

-   Metadata: None
-   Request: [`DeleteTrialsRequest`](#deletetrialsrequest)
-   Reply: [`DeleteTrialsReply`](#deletetrialsreply)

### `StoredTrialInfo`

Defines a information about a stored trial

```protobuf
message StoredTrialInfo {
  string trial_id = 1;
  TrialState last_state = 2;
  string user_id = 3;
  uint32 samples_count = 4;
  TrialParams params = 5;
}
```

-   `trial_id`: Unique identifier of the trial.
-   `last_state`: Last known [trial state](#trialstate).
-   `user_id`: The id of the user that has started the trial.
-   `samples_count`: The number samples that are stored for this trial.
-   `params`: [Parameters of the trial](#trialparams).

### `StoredTrialSample`

Represents a sample generated by a trial at a given tick.

```protobuf
message StoredTrialSample {
  string user_id = 1;
  string trial_id = 2;
  uint64 tick_id = 3;
  fixed64 timestamp = 4;
  TrialState state = 5;
  repeated StoredTrialActorSample actor_samples = 6;
  repeated bytes payloads = 7;
}
```

-   `user_id`: The identifier of the user that has started the trial.
-   `trial_id`: Unique identifier of the trial.
-   `tick_id`: Tick of this sample.
-   `timestamp`: Time of the sample.
-   `state`: [Trial state](#trialstate) of the sample.
-   `actor_samples`: [Sample data related to each actor](#storedtrialactorsample).
-   `payloads`: Serialized payload for the actors observations, actions, rewards and messages during this sample.

### `StoredTrialActorSample`

Represents a sample generated by an actor in a trial at a given tick, only makes sense as a part of a [`StoredTrialSample`](#storedtrialsample).

Actors are referenced by their index in the [trial params](#trialparams) `TrialParams.actors` field. Where it make sense, the actor index can be set to -1 to reference the trial's environment.

Payloads (ie observations data, actions data, reward user data and messages payloads) are grouped in the `payloads` field of [`StoredTrialSample`](#storedtrialsample) and referenced by their index in this field.

```protobuf
message StoredTrialActorSample {
  uint32 actor = 1;
  optional uint32 observation = 2;
  optional uint32 action = 3;
  optional float reward = 4;
  repeated StoredTrialActorSampleReward received_rewards = 6;
  repeated StoredTrialActorSampleReward sent_rewards = 7;
  repeated StoredTrialActorSampleMessage received_messages = 8;
  repeated StoredTrialActorSampleMessage sent_messages = 9;
}
```

-   `actor`: The index of the actor.
-   `observation`: Observation received by the actor at the current tick, as an index of the observation payload in the parent [`StoredTrialSample`](#storedtrialsample).
-   `action`: Action performed by the actor at the current tick, as an index of the action payload in the parent [`StoredTrialSample`](#storedtrialsample)
-   `reward`: Aggregated value of the rewards received by the actor for the current tick.
-   `received_rewards`: List of the [rewards](#storedtrialactorsamplereward) received by the actor for the current tick.
-   `sent_rewards`: List of the [rewards](#storedtrialactorsamplereward) sent by the actor for the current tick.
-   `received_messages`: List of the [messages](#storedtrialactorsamplemessage) received by the actor between the current tick and the next.
-   `sent_messages`: List of the [messages](#storedtrialactorsamplemessage) sent by the actor between the current tick and the next.

### `StoredTrialActorSampleReward`

Represents a reward sent or received by an actor, only makes sense as a part of a [`StoredTrialActorSample`](#storedtrialactorsample).

```protobuf
message StoredTrialActorSampleReward {
  int32 sender = 1;
  int32 receiver = 2;
  float reward = 4;
  float confidence = 5;
  optional uint32 user_data = 6;
}
```

-   `sender`: Index of the actor, -1 for the environment, ignored for sent rewards.
-   `receiver`: Index of the actor, -1 for the environment, received for sent rewards.
-   `reward`: The numerical value of the provided reward.
-   `confidence`: The weight of this reward in computing the final (aggregated) reward.
-   `user_data`: User data attached to the reward, as an index of the payload in the parent [`StoredTrialSample`](#storedtrialsample).

### `StoredTrialActorSampleMessage`

Represents a message sent or received by an actor, only makes sense as a part of a [`StoredTrialActorSample`](#storedtrialactorsample).

```protobuf
message StoredTrialActorSampleMessage {
  int32 sender = 1;
  int32 receiver = 2;
  uint32 payload = 3;
}
```

-   `sender`: Index of the actor, -1 for the environment, ignored for sent messages.
-   `receiver`: Index of the actor, -1 for the environment, received for sent messages.
-   `payload`: Payload of the message, as an index of the payload in the parent [`StoredTrialSample`](#storedtrialsample).

### `StoredTrialSampleField`

Enums representing the fields available in a [`StoredTrialSample`](#storedtrialsample). Used to filter desired fields.

```protobuf
enum StoredTrialSampleField {
  STORED_TRIAL_SAMPLE_FIELD_UNKNOWN = 0;
  STORED_TRIAL_SAMPLE_FIELD_OBSERVATION = 1;
  STORED_TRIAL_SAMPLE_FIELD_ACTION = 2;
  STORED_TRIAL_SAMPLE_FIELD_REWARD = 3;
  STORED_TRIAL_SAMPLE_FIELD_RECEIVED_REWARDS = 4;
  STORED_TRIAL_SAMPLE_FIELD_SENT_REWARDS = 5;
  STORED_TRIAL_SAMPLE_FIELD_RECEIVED_MESSAGES = 6;
  STORED_TRIAL_SAMPLE_FIELD_SENT_MESSAGES = 7;
}
```

### `RetrieveTrialsRequest`

Request for [`TrialDatastoreSP.RetrieveTrials()`](#retrievetrials).

```protobuf
message RetrieveTrialsRequest {
  repeated string trial_ids = 1;
  uint32 timeout = 2;
  uint32 trials_count = 3;
  string trial_handle = 4;
}
```

-   `trial_ids`: List of desired trial identifiers, if empty all trials are returned.
-   `timeout`: (optional - in ms) Wait for trials that might be created within this duration.
-   `trials_count`: (optional) The desired number of trials to be retrieved, leave empty (or set to 0) for no limit.
-   `trial_handle`: (optional) Leave empty for the initial request, use previously provided `RetrieveTrialsReply.next_trial_handle` on the next calls to retrieve the next versions.

### `RetrieveTrialsReply`

Reply for [`TrialDatastoreSP.RetrieveTrials()`](#retrievetrials).

```protobuf
message RetrieveTrialsReply {
  repeated StoredTrialInfo trial_infos = 1;
  string next_trial_handle = 2;
}
```

-   `version_infos`: At most `RetrieveVersionInfosRequest.versions_count` versions.
-   `next_version_handle`: Opaque handle to be used to retrieve the next versions matching the request.

### `RetrieveSamplesRequest`

Request for [`TrialDatastoreSP.RetrieveSamples()`](#retrievesamples).

```protobuf
message RetrieveSamplesRequest {
  repeated string trial_ids = 1;
  repeated string actor_names = 2;
  repeated string actor_classes = 3;
  repeated string actor_implementations = 4;
  repeated StoredTrialSampleField selected_sample_fields = 5;
}
```

-   `trial_ids`: List of desired trial ids, if empty no data will be returned.
-   `actor_names`: List of desired actor names, if empty all actor samples will be returned.
-   `actor_classes`: List of desired actor names, if empty all actor samples will be returned.
-   `actor_implementations`: List of desired actor classes, if empty all actor samples will be returned.
-   `selected_sample_fields`: (optional) Which fields of `StoredTrialSample.ActorSample` should be returned, if empty all fields are returned.

### `RetrieveSampleReply`

Part of the reply stream of [`TrialDatastoreSP.RetrieveSamples()`](#retrievesamples).

```protobuf
message RetrieveSampleReply {
  StoredTrialSample trial_sample = 1;
}
```

-   `trial_sample`: One [trial sample](#storedtrialsample) matching the requested `trial_ids` and filtered according to the desired actors and fields.

### `AddTrialRequest`

Request for [`TrialDatastoreSP.AddTrial()`](#addtrial).

```protobuf
message AddTrialRequest {
  string user_id = 1;
  TrialParams trial_params = 2;
}
```

-   `user_id`: The ID of the user that is adding the trial.
-   `trial_params`: [Parameters of the trial](#trialparams).

### `AddTrialReply`

Reply for [`TrialDatastoreSP.AddTrial()`](#addtrial).

```protobuf
message AddTrialReply {}
```

### `AddSampleRequest`

Part of the request stream of [`TrialDatastoreSP.AddSample()`](#addsample).

```protobuf
message AddSampleRequest {
  StoredTrialSample trial_sample = 1;
}
```

-   `trial_sample`: One [trial sample](#storedtrialsample) that should match the parameters of the target trial.

### `AddSamplesReply`

Reply for [`TrialDatastoreSP.AddSample()`](#addsample).

```protobuf
message AddSamplesReply {}
```

### `DeleteTrialsRequest`

Request for [`TrialDatastoreSP.DeleteTrials()`](#deletetrials).

```protobuf
message DeleteTrialsRequest {
  repeated string trial_ids = 1;
}
```

-   `trial_ids`: List of the trial ids to delete, if empty no trial is deleted.

### `DeleteTrialsReply`

Reply for [`TrialDatastoreSP.DeleteTrials()`](#deletetrials).

```protobuf
message DeleteTrialsReply {}
```

### `TrialSamplesFileHeader`

Header for the trial samples file that can be exported using [`cogment client export`](./cli/trial-datastore.md#export-command).

```protobuf
message TrialSamplesFileHeader {
  VersionInfo version_info = 1;
  fixed64 export_timestamp = 2;
  map<string, TrialParams> trial_params = 3;
}
```

-   `version_info`: ([`cogmentAPI.VersionInfo`](#versioninfo)) Version information for the used Cogment CLI.
-   `export_timestamp`: (fixed64) The wall-clock time in nanoseconds since 00:00:00UTC January 1, 1970 (Unix Epoch time) at export.
-   `trial_params`: ([`map<string, cogmentAPI.TrialParams>`](#trialparams)) Parameters of the trials exported in the file referenced by their ID.

#### `Version()`

Called to request version data.

Metadata: None
