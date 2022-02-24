# Python SDK

The Python SDK is designed to run concurently and asynchronously using the Python `asyncio` library. As such, it should be run in an `asyncio.Task`.

E.g.

```python
asyncio.run(MyMainFunction())
```

## Installation

The simplest way to install the python SDK is to just install it using pip: `pip install cogment`.

And to install the generator (for `cog_settings.py`) it is done similarly with pip: `pip install cogment[generate]`. Note that the generator is not installed by default when installing the Cogment SDK, it must be explcitly installed.

The basic requirement is Python 3.7.

## General usage

### Trial Specifications

The specifications of a trial type are contained in a [spec file][1] and the imported files defined in the spec. This file is typically named `cogment.yaml`.

For example, an [actor class][4] is defined by its required [observation space][5] and [action space][6].

These "spaces" are defined by using protobuf message types (from the imported files). [Observations][7] and [actions][8] will simply be instances of the appropriate type.

Messages and feedback user data don't have a set type, they can be any type of protobuf message as long as the receiver can manage that type (i.e. the object received is an instance of `google.protobuf.Any` and the contained type should be checked against known types before handling). The type is determined by the provided message from the originator.

### Trial Parameters

The trial [parameters][2] either come from the default parameters provided to the Orchestrator on startup, or they are dynamically generated/updated by the pre-trial hooks (which are provided to the Orchestrator on startup). Or both, since any default parameters are initially provided to the first pre-trial hook.

The parameters are mostly indepedent of the spec file (cogment.yaml), except that the active actors listed in the parameters must have their actor class match an actor class defined in the spec file.

Below, when we refer to the trial parameters, we mean the final parameters after any pre-trial hooks.

Note that environment config and actor config can only be provided by pre-trial hooks.

### Compiling the spec file into cog_settings.py

In order to use the specifications within python scripts, the spec file needs to be compiled into python modules. This is done by the Python SDK generator (see [#installation]).

The generator is used this way:

```bash
$ python3 -m cogment.generate --spec cogment.yaml --output ./cog_settings.py
```

This will create a `cog_settings.py` module in the current directory (`--output ./`). The generator will also compile the imported `*.proto` files into python modules that will be saved in the same location as the specified output file (`cog_settings.py`) and they will be named according to their proto names (`*_pb2.py`).

The `cog_settings.py` Python module is required by all API entry points.

### Top-level import

The main module of the Cogment SDK is `cogment`. But all cogment scripts need to start with a `cogment.Context`, which also requires the generated module `cog_settings` (project specific definitions created from the spec file).

If one needs to create a `cogment.LogParams` from scratch, the `cog_settings` module is also required.

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
-   `actor_name`: _str_ - Name of the actor joining the trial. If `None`, `actor_class` will be used to find the actor to join. The name must match an active actor in the trial as found in the trial parameters in the sections `trial_params:actors:name` with `trial_params:actors:endpoint` set to "cogment://client".
-   `actor_class`: _str_ - The class of actor to join the trial. If `None`, `actor_name` will be used to find the actor to join. The class must match an active actor in the trial as found in the trial parameters in the sections `trial_params:actors:actor_class` with `trial_params:actors:endpoint` set to "cogment://client".

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
-   `actor_classes`: _list[str]_ - The actor class name(s) that can be run by the given callback function. The possible names are specified in the spec file under section `actor_classes:name`. If the list is empty, this implementation can run any actor class.

Return: None

### `register_pre_trial_hook(self, impl)`

Method to register an asynchronous callback function that will be called before a trial is started. Only one such function can be registered. But there may be multiple hook services for an Orchestrator. They are provided to the Orchestrator at startup. All hooks registered with the Orchestrator will be called in a pipeline fashion before each new trial.

Parameters:

-   `impl`: _async func(PrehookSession instance)_ - Callback function to be registered. The `PrehookSession` instance member data should be changed as needed for the new trial before returning from this function.

Return: None

### `register_datalog(self, impl)`

Method to register an asynchronous callback function that will be called for each trial to serve log requests. Only one such function can be registered. This service is addressed in the trial parameters in the `datalog` section.

Parameters:

-   `impl`: _async func(DatalogSession instance)_ - Callback function to be registered

Return: None

## class Controller

Class containing data and methods to control and manage trials.

### `async start_trial(self, trial_config=None, trial_id_requested=None)`

Method to start a new trial. The parameters of the trial will be set by the pre-trial hooks (registered in `cogment.Context`), and the hooks will receive the provided trial config.

Parameters:

-   `trial_config`: _protobuf class instance_ - Configuration for the trial. The type is specified in the spec file under the section `trial:config_type`. Can be `None` if no configuration is provided. This is provided to the first pre-trial hook.
-   `trial_id_requested`: _str_ - The trial identifier requested for the new trial. It must be unique among all active trials and a limited set of the latest ended trials (this list of trials can be retrieved with `get_trial_info` or `watch_trial`). If provided, the Orchestrator will try to use this trial_id, otherwise, a UUID will be created.

Return: _str_ - The newly started trial ID. An empty string if the trial was not started due to a non-unique ID.

### `terminate_trial(self, trial_ids, hard=False)`

Method to request the end of a trial.

Parameters:

-   `trial_ids`: _list[str]_ - The trial ID(s) to request to terminate. There must be at least one ID.
-   `hard`: _bool_ - If `True`, the termination will be forced and not wait for any action or observation. If `False`, the trial will wait for the next tick, to end gracefully (i.e. wait for the next full set of actions and response observations).

Return: None

### `async get_trial_info(self, trial_ids)`

Method to get information about a trial.

Parameters:

-   `trial_ids`: _list[str]_ - The trial ID(s) from which to request information. If no ID is provided, returns information about all trials. Note that ended trials may only appear for a short time in this list after they have ended.

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

### `async get_remote_versions(self)`

Method to get the versions from the remote Orchestrator.

Parameters: None

Return: _dict_ - The key of the dictionary is the name of the component (_str_), and the value is the version (_str_).

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

Method to notify the Orchestrator that all data for the trial, from this session, has been sent. This can be called only when the session is ending. When starting the session (see `EnvironmentSession` and `ActorSession`), if the `auto_done_sending` parameter is True, this method should not be called, and if the parameter is False, it MUST be called to end the trial properly.

Parameters: None

Return: None

### `add_reward(self, value, confidence, to, tick_id=-1, user_data=None)`

Method to send a reward to one or more actors.

Parameters:

-   `value`: _float_ - Value of the reward. This will be aggregated with other rewards for the same target actor.
-   `confidence`: _float_ - Weight of this reward value in determining the final aggregated reward. Should be > 0.
-   `to`: _list[str]_ - Target(s) of reward. A list value could be the name of an actor in the trial. Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in the spec file).
-   `tick_id`: _int_ - The tick id (time step) for which the reward should be applied. If "-1", then the reward applies to the current time step.
-   `user_data`: _protobuf class instance_ - Extra user data to be sent with the reward. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received (packed in a `google.protobuf.Any`).

Return: None

## class EnvironmentSession(Session)

Abstract class based on `Session`, containing session data and methods necessary to run an environment for a trial. An instance of this class is passed as an argument to the environment callback function registered with `cogment.Context.register_environment`.

`impl_name`: _str_ - Name of the implementation running this environment.

`config`: _protobuf class instance_ - User configuration received for this environment instance. Can be `None` if no configuration was provided. The type of the protobuf class is specified in the spec file in the section `environment:config_type`.

`name`: _str_ - Name of the environment this instance represents.

### `start(self, observations = None, auto_done_sending=True)`

Method to report that the environment is starting to run the trial. The method should be called before any other method in the session.

Parameters:

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The initial observations from which the environment is starting the trial. This is the same as the parameter for `self.produce_observations`. If not provided, then the first observation sent with `produce_observation` will be used to initiate the trial (note that no actions will be received until the first observation is sent).

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after `end` is called. If False, the user MUST call `sending_done` (after `end`) to end the trial properly.

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

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The observations to send to actors. The string in the tuple is the name of the destination actor (or "\*" for all actors). The name of the actors can be found in trial parameters under `trial_params:actors:name`. The protobuf class is the Observation Space for that actor, found in the spec file in the corresponding section `actor_classes:observation:space`.

Return: None

### `end(self, final_observations)`

Method to report the end of the environment. This will effectively end the trial. Message events can still arrive after this call.

Parameters:

-   `final_observations`: _list[tuple(str, protobuf class instance)]_ - The final observations to send to the actors. This is the same as the parameter for `self.produce_observations`.

Return: None

### `get_active_actors(self)`

Method to get the list of active actors in the trial.

Parameters: None

Return: _list[ActorInfo instance]_ - List of active actors and classes involved in this trial.

### `send_message(self, payload, to)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _protobuf class instance_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving environment to manage the class received (packed in a `google.protobuf.Any`).
-   `to`: _list[str]_ - Targets of feedback. Each value could be the name of an actor in the trial. Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.

Return: None

## class ActorSession(Session)

Abstract class based on `Session`, containing session/trial data and methods necessary to run an actor for a trial. An instance of this class is passed as argument to the actor callback function registered with `cogment.Context.register_actor`.

`class_name`: _str_ - Name of the class of actor this instance represents. Specified in the spec file as `actor_classes:name`.

`impl_name`: _str_ - Name of the implementation of the actor represented by this instance.

`config`: _protobuf class instance_ - User configuration received for this actor instance. Can be `None` is no configuration was provided. The type of the protobuf class is specified in the spec file in the section `actor_classes:config_type`.

`name`: _str_ - Name of the actor this instance represents.

`env_name`: _str_ - Name of the environment running the trial this actor is participating in (used to send messages to the environment).

### `start(self, auto_done_sending=True)`

Method to start the actor. This method should be called before any other method in the session.

Parameters:

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after receiving the last observation. If False, the user MUST call `sending_done` to end the trial properly.

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

-   `action`: _protobuf class instance_ - An instance of the action space class specified in the corresponding section `actor_classes:action:space` of the spec file. If `None`, then no action space is sent (empty content) and the environment will receive a default initialized action space of the appropriate type.

Return: None

### `send_message(self, payload, to)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _protobuf class instance_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received (packed in a `google.protobuf.Any`).
-   `to`: _list[str]_ - Targets of feedback. Each value could be the name of an actor in the trial, or the name of the environment (from `self.env_name`). Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.

Return: None

## class PrehookSession

Abstract class containing trial configuration data to define the specifics of a trial. An instance of this class is passed as argument to the pre-trial hook callback function registered with `cogment.Context.register_pre_trial_hook`. The first pre-trial hook to be called will receive the default parameters set in the Orchestrator, the following hooks will receive the parameters set by the preceding hooks.

`trial_config`: _protobuf class instance_ - Configuration for the new trial. The type is specified in the spec file under the section `trial:config_type`. The first pre-trial hook receives the config that came from the `Controller.start_trial()` function. If `None`, no config will be sent to the next pre-trial hook.

`trial_max_steps`: _int_ - The maximum number of time steps (ticks) that the trial will run before terminating. If 0 (or `None`), the trial will not be auto terminated (the environment and a Controller can still terminate the trial).

`trial_max_inactivity`: _int_ - The number of seconds of inactivity after which a trial will be terminated. If 0 (or `None`), the trial will not be terminated because of inactivity.

`datalog_endpoint`: _str_ - The URL to connect to the data logger. The protocol must be "grpc". E.g. "grpc://mydb:9000". If `None`, no datalog service will be connected.

`datalog_exclude`: _list[str]_ - List of fields to exclude from the data to send for logging.

`environment_config`: _protobuf class instance_ - Configuration for the environment in the new trial. This configuration will be sent to the environment on start. The type is specified in the spec file under the section `environment:config_type`. If `None`, no config will be sent to the environment.

`environment_endpoint`: _str_ - The URL to connect to the environment. The protocol must be "grpc". E.g. "grpc://myenv:9000"

`environment_name`: _str_ - The name of the environment.

`environment_implementation`: _str_ - The name of the implementation to run the environment.

`actors`: _list[dict]_ - Each item (dictionary) of the list represents an actor. Each actor dictionary contains these key-value pairs:

-   `"name"`: _str_ - Name of the actor
-   `"actor_class"`: _str_ - The actor class for the actor. This is specific to a type of trial and must match values in the spec file under section `actor_classes:name`.
-   `"endpoint"`: _str_ - The URL to connect to the actor. If, instead of a gRPC URL, the value is "cogment://client", then this actor will connect in (rather than be connected to), and the actor will need to provide the gRPC URL to connect to the orchestrator.
-   `"implementation"`: _str_ - The name of the implementation to run this actor
-   `"config"`: _protobuf class instance_ - The configuration data for the actor. The type is specified in the spec file under the section `actor_classes:config_type` for the corresponding actor. If `None`, no config will be sent to the actor.

### `get_trial_id(self)`

Method to retrieve the ID of the trial.

Parameters: None

Return: _str_ - ID of the trial.

### `get_user_id(self)`

Method to retrieve the identifier of the user that started the trial.

Parameters: None

Return: _str_ - Identifier of the user that started the trial.

### `validate(self)`

Method to validate that the data is valid. This is a superficial check; even if the data validates successfully, there can still be problems with the data. This method should be called if changes have been made to the data members of the class. Exceptions are raised on error.

Parameters: None

Return: None

## class DatalogSession

Abstract class containing session data and methods necessary to manage the logging of trial run data. An instance of this class is passed as an argument to the datalog callback function registered with `cogment.Context.register_datalog`.

`trial_id`: _str_ - UUID of the trial managed by this instance.

`user_id`: _str_ - Identifier of the user that started the trial.

`trial_params`: _cogment.LogParam instance_ - Parameters of the trial.

### `start(self)`

Method to start receiving samples.

Parameters: None

Return: None

### `get_all_samples(self)`

Generator method to iterate over all samples as they are received (waiting for each in turn).

Parameters: None

Return: _generator(cogment.LogSample instance)_ - A generator for the samples received.

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

`env_name`: _str_ - The name of the environment running the trial.

`tick_id`: _int_ - The time step that the information relates to. Only provided from a call to `get_trial_info`.

`duration`: _int_ - The time (in nanoseconds) that the trial has run. Only provided from a call to `get_trial_info`.

## class ActorInfo

Class enclosing the details of an actor.

`actor_name`: _str_ - The name of the actor.

`actor_class_name`: _str_ - The name of the actor's class (as defined in the spec file).

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

`observation`: _protobuf class instance_ - Observation received from the environment. The class of the observation is defined as observation space for the actor class. This is specified in section `actor_classes:observation:space` in the spec file for the appropriate/receiving actor class.

## class RecvAction

Class containing the details of an action from an actor.

`tick_id`: _int_ - The time step that the action relates to.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970).

`actor_index`: _int_ - Index of the actor in the list of all trial actors (returned by `Session.get_active_actors`).

`action`: _protobuf class instance_ - Action from the actor which has index `actor_index` in the trial. The class of the action is defined as action space for the specific actor in the section `actor_classes:action:space` in the spec file.

## class RecvMessage

Class containing a message.

`tick_id`: _int_ - The time step that the message relates to.

`receiver_name`: _str_ - Name of the receiver for the message (the name of an actor, or wildcard string).

`sender_name`: _str_ - Name of the sender of the message (the name of an actor, or the environment).

`payload`: _google.protobuf.Any instance_ - Data for a received message. The class enclosed in `google.protobuf.Any` is of the type set by the sender; It is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class RecvReward

Class containing the details of a received reward.

`tick_id`: _int_ - The tick id (time step) for which the reward should be applied.

`receiver_name`: _str_ - Name of the receiver for the reward (the name of an actor, or wildcard string).

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

`sender_name`: _str_ - Name of the sender of this reward (the name of an actor, or the environment).

`user_data`: _google.protobuf.Any instance_ - Data for a user-specific reward format. Can be `None` if no specific data was provided. The class enclosed in `google.protobuf.Any` is of the type set by the sender; it is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class cogment.LogParams

Class containing the paramaters of the trial.

`max_steps`: _int_ - The maximum number of steps/ticks that the trial should run. After this number of steps/ticks, an end request will be sent to the environment.

`max_inactivity`: _int_ - The maximum amount of time (in seconds) that the trial should be without activity before it is forcefully terminated. "Activity" is defined as a message received by the Orchestrator from a user component.

`nb_actors`: _int_ - The number of actors participating in the trial.

`datalog`: _dict_ - The datalog related parameters. The dictionary contains these key-value pairs:

-   `"endpoint"`: _str_ - The URL to connect to the datalog service.
-   `"exclude"`: _list(str)_ - Fields to exclude from the samples sent to the datalog service.

`environment`: _dict_ - The environment related parameters. The dictionary contains these key-value pairs:

-   `"name"`: _str_ - Name of the environment
-   `"endpoint"`: _str_ - The URL to connect to the environment.
-   `"implementation"`: _str_ - The name of the implementation to run the environment

### `__init__(self, cog_settings)`

Parameter:

-   `cog_settings`: _module_ - Settings module associated with trials that will be run ([cog_settings](#cog_settings.py) namespace).

### `get_serialization_type(self)`

Return the type of serial data produced by `serialize` and accepted by `deserialize`. The type represents an ID dependent on [TrialParams](../cogment-low-level-api-guide/grpc.md#trialparams) defined in the low level gRPC API.

Parameters: None

Return: _int_ - The type of the serialization string data. This is the type of string that is returned by `serialize`, and the only type accepted by `deserialize`; it is undefined behavior to try to deserialize the wrong type of data. This value is strictly larger than 1.

### `serialize(self)`

Return a binary string equivalent of the parameters.

Parameters: None

Return: _str_ - Serialized parameters.

### `deserialize(self, raw_string)`

Takes a serialized parameter string and sets the LogParams instance.

Parameter:

-   `raw_string`: _str_ - Binary string representing a serialized LogParam of the same type.

### `get_trial_config(self)`

Returns the trial config.

Parameters: None

Return: _protobuf class instance_ - Configuration for the trial. The type is specified in the spec file under the section `trial:config_type`.

### `get_environment_config(self)`

Returns the environment config.

Parameters: None

Return: _protobuf class instance_ - Configuration for the environment. The type is specified in the spec file under the section `environment:config_type`.

### `get_actor_index(self, actor_name)`

Returns the index of the given actor, or None if the actor is not in the trial.

Parameters:

-   `actor_name`: _str_ - Name of the actor to look for in the trial parameters.

Return: _int_ - Index of actor if found. `None` if not found. This index is constant in the trial and relates to the complete list of actors provided by cogment (e.g. `Controller.get_actors()`).

### `get_actor_name(self, actor_index)`

Returns the name of an actor in the trial.

Parameters:

-   `actor_index`: _int_ - Index of the actor to retrieve. This number is constant in the trial and relates to the complete list of actors provided by cogment (e.g. `Controller.get_actors()`). The value must be between 0 and `self.nb_actors` (exclusively).

Return: _str_ - Name of the actor in the trial parameters.

### `get_actor(self, actor_index)`

Returns information about a particular actor in the trial.

Parameters:

-   `actor_index`: _int_ - Index of the actor to retrieve. This number is constant in the trial and relates to the complete list of actors provided by cogment (e.g. `Controller.get_actors()`). The value must be between 0 and `self.nb_actors` (exclusively).

Return: _dict_ - Dictionary containing the details of the actor parameters. The dictionary contains these key-value pairs:

-   `"name"`: _str_ - Name of the actor.
-   `"actor_class"`: _str_ - The actor class for the actor. This is specific to a type of trial and must match values in the spec file under section `actor_classes:name`.
-   `"endpoint"`: _str_ - The URL to connect to the service actor, or "cogment://client" for client actors that will connect in.
-   `"implementation"`: _str_ - The name of the implementation to run the actor.
-   `"config"`: _protobuf class instance_ - The configuration data for the actor. The type is specified in the spec file under the section `actor_classes:config_type` for the specific actor class of the actor.

## class cogment.LogSample

Class containing a datalog sample.
A sample starts and ends with the arrival of new observations from the environment. The last sample will end after all components have acknowledged the end of the trial (the state of that sample will then be `TrialState.ENDED`).

Note that some of the data may not be available (`None`) if it was excluded from the sample (see datalog parameters `LogParams.datalog["exclude"]`).

`tick_id`: _int_ - The time step that the sample data relates to.

`state`: _cogment.TrialState_ - The state of the trial at the end of the sample period.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970) at the beginning of the sample period.

`events`: _str_ - Description of special events that happened during the timeframe of the sample.

### `__init__(self, params)`

Parameter:

-   `params`: _LogParams instance_ - The parameters of the trial.

### `get_serialization_type(self)`

Returns the type of serial data produced by `serialize` and accepted by `deserialize`. The type represents an ID dependent on [DatalogSample](../cogment-low-level-api-guide/grpc.md#logexportersamplerequest) defined in the low level gRPC API.

Parameters: None

Return: _int_ - The type of the serialization string data. This is the type of string that is returned by `serialize`, and the only type accepted by `deserialize`; it is undefined behavior to try to deserialize the wrong type of data. This value is strictly larger than 1.

### `serialize(self)`

Returns a binary string equivalent of the sample.

Parameters: None

Return: _str_ - Serialized sample.

### `deserialize(self, raw_string)`

Takes a serialized sample string and sets the LogSample instance.

Parameter:

-   `raw_string`: _str_ - Binary string representing a serialized LogSample of the same type.

### `all_actor_names(self)`

Generator method to iterate over all actors in the trial. This information can also be retrieved from the parameters of the trial.

Parameters: None

Return: _generator(str)_ - A generator for the names of the actors in the trial.

### `get_action(self, actor)`

Retrieves the action from the actor in the sample.

Parameters:

-   `actor`: _str_ or _int_ - The name or index of the actor for which to retrieve the action. The number, index and name of actors can be retrieved from the parameters of the trial.

Return: _RecvAction instance_ - The action of the actor in the sample.

### `get_observation(self, actor)`

Retrieve the observation destined for the actor in the sample.

Parameters:

-   `actor`: _str_ or _int_ - The name or index of the actor for which to retrieve the observation. The number, index and name of actors can be retrieved from the parameters of the trial.

Return: _RecvObservation instance_ - The observation of the actor in the sample.

### `all_rewards(self)`

Generator method to iterate over all the rewards in the sample.

Parameters: None

Return: _generator(RecvReward instance)_ - A generator for the rewards in the sample.

### `all_messages(self)`

Generator method to iterate over all the messages in the sample.

Parameters: None

Return: _generator(RecvMessage instance)_ - A generator for the messages in the sample.

[1]: ./cogment-yaml.md
[2]: ./parameters.md
[4]: ../../concepts/glossary.md#actor-class
[5]: ../../concepts/glossary.md#observation-space
[6]: ../../concepts/glossary.md#action-space
[7]: ../../concepts/glossary.md#observation
[8]: ../../concepts/glossary.md#action
