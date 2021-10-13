# Python SDK

The Python SDK is designed to run concurently and asynchronously using the Python `asyncio` library. As such, it should be run in an `asyncio.Task`.

## Installation

The simplest way to install the python SDK is to just install it using pip:
`pip install cogment`

The basic requirement is Python 3.7.

## General usage

### cogment.yaml

The [cogment.yaml][1] file (including imported files) defines the high level API.

For example, an [actor class][4] is defined by its required [observation space][5] and [action space][6].

These "spaces" are defined by using protobuf message types (from the imported files). [Observations][7] and [actions][8] will simply be instances of the appropriate type.

Messages and feedback user data don't have a set type, they can be any type as long as the receiver can manage that type (i.e. the object received is an instance of `google.protobuf.Any` and the contained type should be checked against known types before handling). The type is determined by the provided message from the originator.

The `trial_params` section represents default values that can be dynamically changed for each trial with pre-trial hooks. Therefore, below, when this section of the `cogment.yaml` file is refered, we mean the final parameters after any pre-trial hooks.

#### Compiling the cogment.yaml

In order to use the configuration found in the `cogment.yaml` file within python scripts, it needs to be compiled into python modules. This is done by a tool called the “cogment cli” (Command Line Interface).

The cogment cli requires `protoc` (the Protobuf compiler).

As a convenience, the `cogment/cli` docker image can be used to run it, as it has all the required dependencies correctly setup already:

```text
$ docker run -v $(pwd):/data --rm cogment/cli --file /data/cogment.yaml --python_dir=/data
```

This will create a `cog_settings.py` module in the `--python-dir` directory. The cogment cli will also compile the imported `*.proto` files in python modules living in the same location (e.g. `data_pb2.py` in this case). There is no need to invoke `protoc` yourself for the imported files.

### cog_settings.py

All API entrypoints require a cogment configuration object. This configuration object can be determined
from the content of a project's `cogment.yaml`. As such, it should be generated using the `cogment` tool.

```bash
# From the directory containing cogment.yaml
$ cogment generate --python_dir=path/to/project
```

This will generate both a `cog_settings.py` file, as well as any required compiled protocol buffer files.

### Top-level import

Whether a script implements an actor or environment, it should import both the `cogment` module (generic python SDK for Cogment) and the `cog_settings` module (project specific definitions created from `cogment.yaml`).

```python
import cog_settings
import cogment
```

## class cogment.Context

Class to setup and run all the different aspects of trials.

### `__init__(self, user_id, cog_settings, prometheus_registry=prometheus_client.core.REGISTRY)`

Parameters:

-   `user_id`: _str_ - Identifier for the user of this context.
-   `cog_settings`: _module_ - Settings module associated with trials that will be run ([cog_settings](#cog_settings.py) namespace).
-   `prometheus_registry`: _prometheus_client.core.CollectorRegistry instance_ - Prometheus registry that'll be used by the Cogment metrics in this context. Can be set to `None` to completely deactivate them. The default value is Prometheus' default global registry.

### `async serve_all_registered(self, served_endpoint, prometheus_port = 8000)`

Method to start and run the communication server for the registered components (environment, actor, prehook, datalog). This coroutine will end when all activity has stopped.

Parameters:

-   `served_endpoint`: _ServedEndpoint instance_ - Details of the connection for the served components.
-   `prometheus_port`: _int_ - TCP/IP port number for Prometheus. Can be set to None to deactivate the Prometheus metrics server.

Return: None

### `get_controller(self, endpoint)`

Method to get a controller instance to manage trials (start, stop, inquire, etc).

Parameters:

-   `endpoint`: _Endpoint instance_ - Details of the connection to the Orchestrator.

Return: _Controller instance_ - An instance of the Controller class used to manage trials.

### `async join_trial(self, trial_id, endpoint, impl_name=None, actor_name=None, actor_class=None)`

Method for an actor to asynchronously join an existing trial. This task will normally end after the user implementation has exited.

Parameters:

-   `trial_id`: _str_ - The UUID of the trial to join.
-   `endpoint`: _Endpoint instance_ - Details of the connection to the Orchestrator.
-   `impl_name`: _str_ - **deprecated**
-   `actor_name`: _str_ - Name of the actor joining the trial. If `None`, `actor_class` will be used to find the actor to join. The name must match an actor as defined in `cogment.yaml` in the sections `trial_params:actors:name` with `trial_params:actors:endpoint` set to "client".
-   `actor_class`: _str_ - The class of actor to join the trial. If `None`, `actor_name` will be used to find the actor to join.  The class must match an actor as defined in `cogment.yaml` in the sections `trial_params:actors:actor_class` with `trial_params:actors:endpoint` set to "client".

Return: None

### `register_environment(self, impl, impl_name = "default")`

Method to register the asynchronous callback function that will run an environment for a trial.

Parameters:

-   `impl`: _async function(EnvironmentSession instance)_ - Callback function to be registered.
-   `impl_name`: _str_ - Name for the environment being run by the given callback function.

Return: None

### `register_actor(self, impl, impl_name, actor_classes=[])`

Method to register the asynchronous callback function that will run an actor for a trial.

Parameters:

-   `impl`: _async func(ActorSession instance)_ - Callback function to be registered.
-   `impl_name`: _str_ - Name for the actor implementation being run by the given callback function.
-   `actor_classes`: _list[str]_ - The actor class name(s) that can be run by the given callback function. The possible names are specified in file `cogment.yaml` under section `actor_classes:name`. If the list is empty, this implementation can run any actor class.

Return: None

### `register_pre_trial_hook(self, impl)`

Method to register an asynchronous callback function that will be called before a trial is started.

Parameters:

-   `impl`: _async func(PrehookSession instance)_ - Callback function to be registered. The `PrehookSession` instance member data should be changed as needed for the new trial before returning from this function.

Return: None

### `register_datalog(self, impl)`

Method to register an asynchronous callback function that will be called for each log request (for any trial). Only one such function can be registered.

Parameters:

-   `impl`: _async func(DatalogSession instance)_ - Callback function to be registered

Return: None

## class Controller

Class containing data and methods to control and manage trials.

### `async start_trial(self, trial_config=None)`

Method to start a new trial. The parameters of the trial will be set by the pre-trial hooks (registered in `cogment.Context`), and the hooks will receive the provided trial config.

Parameters:

-   `trial_config`: _protobuf class instance_ - Configuration for the trial. The type is specified in file `cogment.yaml` under the section `trial:config_type`. Can be `None` if no configuration is provided.

Return: _str_ - The newly started trial ID.

### `terminate_trial(self, trial_id, hard=False)`

Method to request the end of a trial.

Parameters:

-   `trial_id`: _str_ - The trial ID the request is to terminate.
-   `hard`: _bool_ - If `True`, the termination will be forced and not wait for any action or observation.  If `False`, the trial will wait for the next tick, to end gracefully (i.e. wait for the next full set of actions and response observations).

Return: None

### `async get_trial_info(self, trial_id)`

Method to get information about a trial.

Parameters:

-   `trial_id`: _str_ - The trial ID from which to request information. If `None`, returns information about all trials. Note that ended trials may only appear for a short time in this list after they have ended.

Return: _list[TrialInfo instance]_ - List of trial information, one per trial. Can be empty if no trial matches.

### `async watch_trials(self, trial_state_filters=[])`

Generator method to iterate, in real-time, through all trial states matching the filters. When called, it will first iterate over the current states matching the filters, for all trials. Afterwards, it will iterate in real-time over the matching states as they change.

Parameters:

-   `trial_state_filters`: _list[cogment.TrialState]_ - List of enum values from `cogment.TrialState` for which we are interested in receiving state changes.

Return: _generator(TrialInfo instance)_ - A generator for the state changes that arrive. The `TrialInfo` received here only contains the trial ID and the state.

### `async get_actors(self, trial_id)`

Method to get the list of configured actors in a trial.

Parameters:

-   `trial_id`: _str_ - The trial ID from which to request the list of actors.

Return: _list[ActorInfo instance]_ - List of actors configured in this trial.

## class Session

Abstract class that manages aspects of a trial. Contains data and methods common to all sessions .

### `get_trial_id(self)`

Method to get the UUID of the trial managed by this session.

Parameters: None

Return: _str_ - UUID of the trial.

### `get_tick_id(self)`

Method to get the current tick id of the trial (i.e. time step).

Parameters: None

Return: _int_ - The current tick id.

### `is_trial_over(self)`

Method to inquire if the current trial has ended.

Parameters: None

Return: _bool_ - True if the trial has ended, false otherwise.

### `sending_done(self)`

Method to notify the Orchestrator that all data for the trial, from this session, has been sent. This can be called only when the session is ending.  When starting the session, if the `auto_done_sending` parameter is True, this method should not be called, and if the parameter is False, it MUST be called to end the trial properly.

Parameters: None

Return: None

### `get_active_actors(self)`

Method to get the list of active actors in the trial. This may be expensive to retrieve and thus should be stored if the list is not expected to change throughout the trial.

Parameters: None

Return: _list[ActorInfo instance]_ - List of active actors and classes involved in this trial.

### `add_reward(self, value, confidence, to, tick_id=-1, user_data=None)`

Method to send a reward to one or more actors.

Parameters:

-   `value`: _float_ - Value of the reward. This will be aggregated with other rewards for the same target actor.
-   `confidence`: _float_ - Weight of this reward value in determining the final aggregated reward.
-   `to`: _list[str]_ - Target(s) of reward. A list value could be the name of an actor in the trial. Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in `cogment.yaml`).
-   `tick_id`: _int_ - The tick id (time step) for which the reward should be applied. If "-1", then the reward applies to the current time step.
-   `user_data`: _protobuf class instance_ - Extra user data to be sent with the reward. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received (packed in a `google.protobuf.Any`).

Return: None

### `send_message(self, payload, to, to_environment=False)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _protobuf class instance_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving actor or environment to manage the class received (packed in a `google.protobuf.Any`).
-   `to`: _list[str]_ - Targets of feedback. A list value could be the name of an actor in the trial. Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in `cogment.yaml`).
-   `to_environment`: _bool_ - If True, the message is also sent to the environment, otherwise the message is only sent to the specified actors.

Return: None

## class EnvironmentSession(Session)

Abstract class based on `Session`, containing session data and methods necessary to run an environment for a trial. An instance of this class is passed as an argument to the environment callback function registered with `cogment.Context.register_environment`.

`impl_name`: _str_ - Name of the implementation running this environment.

`config`: _protobuf class instance_ - User configuration received for this environment instance. Can be `None` if no configuration was provided. The type of the protobuf class is specified in `cogment.yaml` in the section `environment:config_type`.

### `start(self, observations, auto_done_sending=True)`

Method to report that the environment is starting to run the trial. The method should be called before any other method in the session.

Parameters:

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The initial observations from which the environment is starting the trial. This is the same as the parameter for `self.produce_observations`.

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after `end` is called.  If False, the user MUST call `sending_done` (after `end`) to end the trial properly.
Return: None

### `async event_loop(self)`

Generator method to iterate over all events (actions, messages) as they are received. This will block and wait for an event.
When this generator exits, the callback function (registered with `register_environment`) should return to end the trial cleanly.
The generator will exit for various reasons indicating the termination of the trial, a loss of communication with the orchestrator, or if the generator is sent "False" (in which case the callback function does not necessarily need to exit).

Parameters: None

Return: _generator(RecvEvent instance)_ - A generator for the events that arrive. The `RecvEvent` instances received from this generator will only contain actions or messages; no observations nor rewards. When receiving actions in the event, the `self.produce_observation` method is normally used to "reply" (or `self.end` to end the trial).

### `produce_observations(self, observations)`

Method to send observations to actors. If called after receiving an event of type `EventType.ENDING`, the observation will be consired the final observation (equivalent to calling `end()`).

Parameters:

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The observations to send to actors. The string in the tuple is the name of the destination actor (or "\*" for all actors). The name of the actors can be found in `cogment.yaml` under `trial_params:actors:name`. The protobuf class is the Observation Space for that actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

Return: None

### `end(self, final_observations)`

Method to report the end of the environment. This will effectively end the trial. Message events can still arrive after this call.

Parameters:

-   `final_observations`: _list[tuple(str, protobuf class instance)]_ - The final observations to send to the actors. This is the same as the parameter for `self.produce_observations`.

Return: None

## class ActorSession(Session)

Abstract class based on `Session`, containing session/trial data and methods necessary to run an actor for a trial. An instance of this class is passed as argument to the actor callback function registered with `cogment.Context.register_actor`.

`class_name`: _str_ - Name of the class of actor this instance represents. Specified in `cogment.yaml` as `actor_classes:name`.

`impl_name`: _str_ - Name of the implementation of the actor represented by this instance.

`config`: _protobuf class instance_ - User configuration received for this actor instance. Can be `None` is no configuration was provided. The type of the protobuf class is specified in `cogment.yaml` in the section `actor_classes:config_type`.

`name`: _str_ - Name of the actor this instance represents.

### `start(self, auto_done_sending=True)`

Method to start the actor. This method should be called before any other method in the session.

Parameters:

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after receiving the last observation.  If False, the user MUST call `sending_done` to end the trial properly.

Return: None

### `async event_loop(self)`

Generator method to iterate over all events (observations, rewards, messages) as they are received. This will block and wait for an event.
When this generator exits, the callback function (registered with `register_actor`) should return to end the trial cleanly.
The generator will exit for various reasons indicating the end of the trial, a loss of communication with the orchestrator, or if the generator is sent "False".

Parameters: None

Return: _generator(RecvEvent instance)_ - A generator for the events that arrive. The `RecvEvent` instances received from this generator will not contain actions. When receiving an observation in the event, the `self.do_action` method is normally used to "reply" (if the event type is `EventType.ACTIVE`).

### `do_action(self, action)`

Method to send actions to the environment.

Parameters:

-   `action`: _protobuf class instance_ - An instance of the action space class specified in the corresponding section `actor_classes:action:space` of the `cogment.yaml` file. If `None`, then no action space is sent (empty content) and the environment will receive a default initialized action space of the appropriate type.

Return: None

## class PrehookSession

Abstract class containing trial configuration data to define the specifics of a trial. An instance of this class is passed as argument to the prehook callback function registered with `cogment.Context.register_pre_trial_hook`, and is part of the `DatalogSession`.

`trial_config`: _protobuf class instance_ - Configuration for the new trial. The type is specified in the file `cogment.yaml` under the section `trial:config_type`.

`trial_max_steps`: _int_ - The maximum number of time steps (ticks) that the trial will run before terminating.

`trial_max_inactivity`: _int_ - The number of seconds of inactivity after which a trial will be terminated. If 0, the trial will not be terminated because of inactivity.

`environment_config`: _protobuf class instance_ - Configuration for the environment in the new trial. This configuration will be sent to the environment on start. The type is specified in the file `cogment.yaml` under the section `environment:config_type`.

`environment_endpoint`: _str_ - The URL to connect to the environment. The protocol must be "grpc". E.g. "grpc://myenv:9000"

`environment_implementation`: _str_ - The name of the implementation to run the environment.

`actors`: _list[dict]_ - Each item (dictionary) of the list represents an actor. Each actor dictionary contains these key-value pairs:

-   `"name"`: _str_ - Name of the actor
-   `"actor_class"`: _str_ - The actor class for the actor
-   `"endpoint"`: _str_ - The URL to connect to the actor. If, instead of a URL, the value is "client", then this actor will connect in (rather than be connected to), and the actor will need to provide the URL to connect to the orchestrator.
-   `"implementation"`: _str_ - The name of the implementation to run this actor
-   `"config"`: _protobuf class instance_ - The configuration data for the actor.

### `get_trial_id(self)`

Method to retrieve the UUID of the trial.

Parameters: None

Return: _str_ - UUID of the trial.

### `validate(self)`

Method to validate that the data is valid. This is a superficial check; even if the data validates successfully, there can still be problems with the data. This method should be called if changes have been made to the data members of the class. Exceptions are raised on error.

Parameters: None

Return: None

## cogment.api.common_pb2.TrialParams

[TrialParams](../cogment-low-level-api-guide/grpc.md#trialparams) is defined in the low level grpc api.

## cogment.api.datalog_pb2.DatalogSample

[DatalogSample](../cogment-low-level-api-guide/grpc.md#logexportersamplerequest) is defined in the low level grpc api.

## class DatalogSession

Abstract class containing session data and methods necessary to manage the logging of trial run data. An instance of this class is passed as an argument to the datalog callback function registered with `cogment.Context.register_datalog`.

`trial_id`: _str_ - UUID of the trial managed by this instance.

`user_id`: _str_ - Identifier of the user that started the trial.

`trial_params`: _dictionary_ - Parameters of the trial. This parameter has been **deprecated**.

`raw_trial_params`: _[cogment.api.common_pb2.TrialParams](#cogmentapicommon_pb2trialparams)_ - Parameters of the trial.

### `start(self)`

Method to start receiving samples.

Parameters: None

Return: None

### `get_all_samples(self)`

Generator method to iterate over all samples as they are received (waiting for each in turn).

Parameters: None

Return: _generator([cogment.api.datalog_pb2.DatalogSample](#cogmentapidatalogdatalogsample))_ - A generator for the samples received.

## class cogment.Endpoint

Class enclosing the details for connecting to an Orchestrator.

`url`: _str_ - The URL where to connect to the Orchestrator.

`private_key`: _str_ - To use TLS for the connection, this must be set to the PEM-encoded private key.

`root_certificates`: _str_ - If using TLS for the connection (i.e. the `private_key` is not `None`), this can be set to the PEM-encoded root certificates. If not set and using TLS for the connection, the root certificates will be fetched from the system default location.

`certificate_chain`: _str_ - If using TLS for the connection, this can be set to the PEM-encoded certificate chain.

### `__init__(self, url)`

Parameters:

-   `url`: _str_ - The URL where to connect to the Orchestrator.

## class cogment.ServedEndpoint

Class enclosing the details for connection from an Orchestrator.

`port`: _str_ - The TCP/IP port where the service will be awaiting the Orchestrator connection.

`private_key_certificate_chain_pairs`: _list[tupple(str, str)]_ - To use TLS for incoming connections, this must be set to a list of tuples of the form (PEM-encoded private key, PEM-encoded certificate chain).

`root_certificates`: _str_ - If using TLS for the connection (i.e. `private_key_certificate_chain_pairs` is not `None`), this should be set to PEM-encoded Orchestrator root certificates that the server will use to verify Orchestrator authentication.

### `__init__(self, port)`

Parameters:

-   `port`: _int_ - The TCP/IP port where the service will be awaiting the Orchestrator connection.

## class cogment.TrialState(enum.Enum)

Enum representing the various states of trials.

-   UNKNOWN: Should not be used.
-   INITIALIZING: The trial is in the process of starting.
-   PENDING: The trial is waiting for its final parameters, before running.
-   RUNNING: The trial is running.
-   TERMINATING: The trial is in the process of terminating (either a request to terminate has been received or the last observation has been received).
-   ENDED: The trial has ended. Only a set number of ended trials will be kept (configured in the Orchestrator).

## class TrialInfo

Class enclosing the details of a trial.

`trial_id`: _str_ - The trial ID to which the details pertain.

`state`: _cogment.TrialState_ - The current state of the trial.

`tick_id`: _int_ - The time step that the information relates to. Only provided from a call to `get_trial_info`.

`duration`: _int_ - The time (in nanoseconds) that the trial has run. Only provided from a call to `get_trial_info`.

## class ActorInfo

Class enclosing the details of an actor.

`actor_name`: _str_ - The name of the actor.

`actor_class_name`: _str_ - The name of the actor's class (as defined in `cogment.yaml`).

## class RecvEvent

Class representing a received event (for environments and actors). It can contain any combination of data according to the receiver needs, or even be empty, but it will always have a type.

`type`: _Enum EventType_ - Type of event the enclosed data represents.

`observation`: _RecvObservation instance_ - Observation data. This can only be received by actors. `None` if not present.

`actions`: _list[RecvAction instance]_ - Action data from actors. This can only be received by the environment. The list is empty if not present.

`rewards`: _list[RecvReward instance]_ - Reward values and data. This can only be received by actors. The list is empty if not present.

`messages`: \*list[RecvMessage instance] - Message data. The list is empty if not present.

### class cogment.EventType(enum.Enum)

Enum representing the type of an event.

-   `EventType.NONE`: Empty event. This kind of event should never be received.

-   `EventType.ACTIVE`: Normal event from an active trial. Most events will be of this type.

-   `EventType.ENDING`: Events from a trial in the process of ending. For the environment, this means that these events contain the last actions from the actors, and the trial is awaiting a final observation. For the actors, this means that the trial is ending and no action can/need to be sent in response. Note that because of network timing, there may be `ACTIVE` events (e.g. rewards or messages) arriving after some `ENDING` events, but the trial is ending regardless.

-   `EventType.FINAL`: Final event for the trial. This does not contain data. The event loop will exit after this event is delivered. This event can be ignored if nothing needs to be done before exiting the loop.

## class RecvObservation

Class containing the details of an observation for an actor.

`tick_id`: _int_ - The time step that the observation relates to.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970).

`observation`: _protobuf class instance_ - Observation received from the environment. The class of the observation is defined as observation space for the actor class. This is specified in section `actor_classes:observation:space` in `cogment.yaml` for the appropriate/receiving actor class.

`snapshot`: **DEPRECATED**

## class RecvAction

Class containing the details of an action from an actor.

`tick_id`: _int_ - The time step that the action relates to.

`actor_index`: _int_ - Index of the actor in the list of all trial actors (returned by `Session.get_active_actors`).

`action`: _protobuf class instance_ - Action from the actor which has index `actor_index` in the trial. The class of the action is defined as action space for the specific actor in the section `actor_classes:action:space` in `cogment.yaml` .

## class RecvMessage

Class containing a message.

`tick_id`: _int_ - The time step that the message relates to.

`sender_name`: _str_ - Name of the sender of the message (the name of an actor, or "env" if the environment sent the message).

`payload`: _google.protobuf.Any instance_ - Data for a received message. The class enclosed in `google.protobuf.Any` is of the type set by the sender; It is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class RecvReward

Class containing the details of a received reward.

`tick_id`: _int_ - The tick id (time step) for which the reward should be applied.

`value`: _float_ - Value of the reward (aggregated from the sources)

### `get_nb_sources(self)`

Return the number of source rewards this reward is based upon.

Parameters: None

Return: _int_ - Number of sources.

### `all_sources(self)`

Generator method to iterate over all sources making up this reward.

Parameters: None

Return: _generator(RecvRewardSource instance)_ - A generator for the sources in the reward (simple rewards that make up this final/aggregate reward).

## class RecvRewardSource

Class containing the details of a received single source reward.

`value`: _float_ - Value of the reward from the sender.

`confidence`: _float_ - Confidence level of this reward value.

`sender_name`: _str_ - Name of the sender of this reward (the name of an actor, or "env" if the environment sent the reward).

`user_data`: _google.protobuf.Any instance_ - Data for a user-specific reward format. Can be `None` if no specific data was provided. The class enclosed in `google.protobuf.Any` is of the type set by the sender; it is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

[1]: ./cogment-yaml.md
[4]: ../../concepts/glossary.md#actor-class
[5]: ../../concepts/glossary.md#observation-space
[6]: ../../concepts/glossary.md#action-space
[7]: ../../concepts/glossary.md#observation
[8]: ../../concepts/glossary.md#action
