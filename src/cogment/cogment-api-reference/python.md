# Python SDK

## Installation

The simplest way to install the python SDK is to just install it using pip:
`pip install cogment`

The basic requiremetns is Python 3.7.

## General usage

### cogment.yaml

The [cogment.yaml][1] file (including imported files) defines the high level API.

For example, an [actor class][4] is defined by its required [observation space][5] and [action space][6].

These "spaces" are defined by using protobuf message types (from the imported files). [Observations][7] and [actions][8] will simply be instances of the appropriate type.

Messages and feedback user data don't have a set type, they can be any type as long as the receiver can manage that type (i.e. the type of the object received should be checked against known types before handling).  The type is determined by the originator of the message.

The `trial_params` section represents default valuesut can be dynamically changed for each trial with pre-trial hooks.  Therefore, below, when this section of the `cogment.yaml` file is refered, we mean the final parameters after any pre-trial hooks.

#### Compiling the cogment.yaml

In order to use the configuration found in the `cogment.yaml` file within python scripts, it needs to be compiled into python modules. This is done by a tool called the “cogment cli” (Command Line Interface).

The cogment cli requires `protoc` (the Protobuf compiler).

As a convenience, the `cogment/cli` docker image can be used to run it, as it has all the required dependencies correctly setup already:

```text
$ docker run -v $(pwd):/data --rm cogment/cli --file /data/cogment.yaml --python_dir=/data
```

This will create a `cog_settings.py` module in the `--python-dir` directory.  The cogment cli will also compile the imported `*.proto` files in python modules living in the same location (e.g. `data_pb2.py` in this case). There is no need to invoke `protoc` yourself for the imported files.

### cog_settings.py

All API entrypoints require a cogment configuration object. This configuration object can be determined
from the content of a project's `cogment.yaml`. As such, it should be generated using the `cogment` tool.

```bash
# From the directory containing cogment.yaml
$ cogment generate --python_dir=path/to/project
```

This will generate both a `cog_settings.py` file, as well as any required compiled protocol buffer files.

### Top-level import

Wether a script implements an actor or environment, it should import both the `cog_settings` and `cogment` modules.

```python
import cog_settings
import cogment
```

## class cogment.Context

Class to setup and run all the different aspects of trials.

### ```__init__(self, user_id, cog_settings)```

Parameters:

- `user_id`: *str* - Identifier for the user of this context.
- `cog_settings`: *module* - Settings module associated with trials that will be run ([cog_settings](#cog_settings.py) namespace).

### ```async serve_all_registered(self, port, prometheus_port = 8000)```

Method to start and run the communication server for the registered components (environment, actor, prehook, datalog).  Returns only when all activity has stopped (i.e. current coroutine is blocked until the server is stopped).

Parameters:

- `port`: *int* - TCP/IP port number to listen to.
- `prometheus_port`: *int* - TCP/IP port number for Prometheus

Return : None

### ```async start_trial(self, trial_config, endpoint, impl)```

Method to start a new trial.  Returns only when the `impl` returns.

Parameters:

- `trial_config`: *protobuf class instance* - Configuration for the trial.  The type is specified in file `cogment.yaml` under the section `trial:config_type`
- `endpoint`: *str* - URL of the Orchestrator to connect to.
- `impl`: *async function(ControlSessionSession instance)* - Callback function to be registered.

Return: None

### ```async join_trial(self, trial_id, endpoint, impl_name, actor_name=None)```

Method for an actor to asynchronously join an existing trial.  Returns only when the implementation of `impl_name` returns.

Parameters:

- `trial_id`: *str* - The UUID of the trial to join.
- `endpoint`: *str* - URL of the Orchestrator to connect to join the trial.
- `impl_name`: *str* - The implementation name of the actor to join the trial.  The implementation must have previously been registered with the `register_actor` method.
- `actor_namer`: *str* - Name of the actor joining the trial. If `None`, the actor will join as any of the configured (free) actors of the actor class registered for `impl_name`.  Otherwise, the name must match an actor with an actor_class compatible with `impl_name` as defined in `cogment.yaml` in the sections `trial_params:actors:actor_class` and `trial_params:actors:name`.

Return: None

### ```register_environment(self, impl, impl_name = "default")```

Method to register the asynchronous callback function that will run an environment for a trial.

Parameters:

- `impl`: *async function(EnvironmentSession instance)* - Callback function to be registered.
- `impl_name`: *str* - Name for the environment being run by the given callback function.

Return: None

### ```register_actor(self, impl, impl_name, actor_classes=[])```

Method to register the asynchronous callback function that will run an actor for a trial.

Parameters:

- `impl`: *async func(ActorSession instance)* - Callback function to be registered.
- `impl_name`: *str* - Name for the actor implementation being run by the given callback function.
- `actor_classes`: *list[str]* - The actor class name(s) that can be run by the given callback function. The possible names are specified in file `cogment.yaml` as `id` under section `actor_classes`.  If the list is empty, this implementation can run any actor class.

Return: None

### ```register_pre_trial_hook(self, impl)```

Method to register an asynchronous callback function that will be called before a trial is started.

Parameters:

- `impl`: *async func(PrehookSession instance)* - Callback function to be registered

Return: None

### ```register_datalog(self, impl)```

Method to register an asynchronous callback function that will be called for each log request (for any trial).  Only one such function can be registered.

Parameters:

- `impl`: *async func(DatalogSession instance)* - Callback function to be registered

Return: None

## class Session

Abstract class containing data and methods common to all sessions that manage aspects of a trial.

### ```get_trial_id(self)```

Method to get the UUID of the trial managed by this session.

Parameters: None

Return: *str* - UUID of the trial.

### ```get_tick_id(self)```

Method to get the current tick id of the trial (i.e. time step).

Parameters: None

Return: *int* - The current tick id.

### ```is_trial_over(self)```

Method to inquire if the current trial has ended.

Parameters: None

Return: *bool* - True if the trial has ended, false otherwise.

### ```get_active_actors(self)```

Method to get the list of active actors in the trial.

Parameters: None

Return: *list[SimpleNamespace(actor_name: str, actor_class: str)]* - List of active actors and classes involved in this trial.

### ```add_feedback(self, value, confidence, to, tick_id=-1, user_data= None)```

Method to provide feedback that will contribute to actors' reward.

Parameters:

- `value`: *float* - Value of the feedback
- `confidence`: *float* - Weight this feedback has relative to other feedbacks.
- `to`: *list[str]* - Targets of feedback.  A list value could be the name of an actor in the trial.  Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in `cogment.yaml`).
- `tick_id`: *int* - The tick id (time step) for which the feedback should be applied.  If `-1`, the feedback is applied to the current time step.
- `user_data`: *protobuf class instance* - Specific information for the target actor.  The class can be any protobuf class.  It is the responsibility of the receiving actor to manage the type received.

Return: None

### ```send_message(self, user_data, to, to_environment=False)```

Method to send a message to one or more actors/environment.

Parameters:

- `user_data`: *protobuf class instance* - The message to be sent. The class can be any protobuf class.  It is the responsibility of the receiving actor or environment to manage the type received.
- `to`: *list[str]* - Targets of feedback.  A list value could be the name of an actor in the trial.  Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in `cogment.yaml`).
- `to_environment`: *bool* - If True, the message is also sent to the environment, otherwise the message is only sent to the actors specified.

Return: None

## class EnvironmentSession(Session)

Abstract class based on `Session`, containing session data and methods necessary to run an environment for a trial.  An instance of this class is passed as argument to the environment callback function registered with `cogment.Context.register_environment`.

`impl_name`: *str* - Name of the implementation running this environment.

`config`: *protobuf class instance* - User configuration received for this environment instance.  Can be `None` if no configuration was provided.  The type of the protobuf class is specified in `cogment.yaml` in section `environment:config_type`.

### ```start(self, observations)```

Method to report that the environment is starting to run the trial.

Parameters:

- `observations`: *list[tuple(str, protobuf class instance)]* - The initial observations from which the environment is starting the trial.  This is the same as the parameter for `self.produce_observations`.

Return: None

### ```async event_loop(self)```

Generator method to iterate over all events (actions, messages) as they are received.  This will block and wait for an event.

Parameters: None

Return: *generator of dict* - A generator for the events that arrive.  The dictionary may contain any of the following:

- "actions" : *list[action]* - The actions from the actors in the trial. The class of each action is defined as action space for each actor in `cogment.yaml`.  The list is in the same order (and same length) as the list of actors returned by `Session.get_active_actors`.  The `self.produce_observation` method should be used to "reply" when receiving this data.
  
- "final_actions" : *list[action]* - The final set of actions at the end of a trial (i.e. no more actions will be coming after this event).  This is received when a trial termination has been externally requested (e.g. `ControlSession.terminate_trial` method is called).  The actions received are the same as for "actions" above.  The `self.end` method must be called after receiving this event to cleanly end a trial.

- "message" :  *tuple(str, google.protobuf.Any instance)* - Data for a received message. The string in the tuple is the name of the sender.  The class is of the type set by the sender; It is the responsibility of the environment to manage the data received (i.e. determine the type and unpack the data).

### ```produce_observations(self, observations)```

Method to send observations to actors.

Parameters:

- `observations`: *list[tuple(str, protobuf class instance)]* - The observations to send to actors.  The string in the tuple is the name of the destination actor (or "*" for all actors).  The name of the actors can be found in `cogment.yaml` under `trial_params:actors:name`.  The protobuf class is Observation Space for that actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

Return: None

### ```end(self, final_observations)```

Method to report the end of the environment.  This method must be called to finalize a trial properly, either in response to a "final_actions" event received (i.e. a terminate trial request), or because the environment is stopping for other reasons (e.g. end of the simulation).

Parameters:

- `final_observations`: *list[tuple(str, protobuf class instance)]* - The final observations to send to the actors.  This is the same as the parameter for `self.produce_observations`.

Return: None

## class ActorSession(Session)

Abstract class based on `Session`, containing session/trial data and methods necessary to run an actor for a trial.  An instance of this class is passed as argument to the actor callback function registered with `cogment.Context.register_actor`.

`actor_class`: *str* - Name of the class of actor this class represents.  Specified in `cogment.yaml` as `actor_classes:id`.

`impl_name`: *str* - Name of the implementation of the actor represented by this class.

`config`: *protobuf class instance* - User configuration received for this actor instance.  Can be `None` is no configuration was provided.  The type of the protobuf class is specified in `cogment.yaml` in section `actor_classes:config_type`.

`name`: *str* - Name of the actor this classs represents.

### ```start(self)```

Method to start the actor.

Parameters: None

Return: None

### ```async event_loop(self)```

Generator method to iterate over all events (actions, rewards, messages) as they are received.  This will block and wait for an event.

Parameters: None

Return: *generator of dict* - A generator for the events that arrive.  The dictionary may contain any of the following:

- "observation" : *protobuf class instance* - Observation received from the environment.  The class of the observation is defined as observation space for the actor class.  This is specified in section `actor_classes:observation:space` in `cogment.yaml` for the appropriate/receiving actor class.  The `self.do_action` method should be used to "reply" when receiving this data.

- "reward" : *Reward instance* - Reward received.  The reward received is of the type `Reward`.

- "message" :  *tuple(str, google.protobuf.Any instance)* - Data for a received message. The string in the tuple is the name of the sender.  The class is of the type set by the sender; It is the responsibility of the environment to manage the data received (i.e. determine the type and unpack the data).

- "final_data" : *SimpleNamespace(observations, rewards, messages)* - The final set of data at the end of a trial.  `observations` is a list of observations as described above (i.e. a list of protobuf class instances).  `rewards` is a list of rewards as described above.  `messages` is a list of message tuples as described above.  No action can be sent after receiving this data (i.e. do not call `self.do_action`).

### ```do_action(self, action)```

Method to send actions to the environment.

Parameters:

- `action`: *protobuf class instance* - An instance of the action space class specified in the corresponding section `actor_classes:action:space` of the `cogment.yaml` file.

Return: None

## class ControlSession

Abstract class containing trial data and methods necessary to control (and stop) a trial.  An instance of this class is passed as argument to the `cogment.Context.register_launcher` callback function parameter.

### ```get_trial_id(self)```

Method to get the UUID of the trial.

Parameters: None

Return: *str* - UUID of the trial.

### ```get_actors(self)```

Method to get the list of configured actors in the trial.

Parameters: None

Return: *list[SimpleNamespace(actor_name: str, actor_class: str)]* - List of actors and classes configured in this trial.

### ```terminate_trial(self)```

Method to request the end of the trial.

Parameters: None

Return: None

## class PrehookSession

Abstract class containing trial configuration data and methods to define a new trial.  An instance of this class is passed as argument to the prehook callback function registered with `cogment.Context.register_pre_trial_hook`.

The member data of this class should be changed as needed for the new trial.

`trial_config`: *protobuf class instance* - Configuration for the new trial.  The type is specified in file `cogment.yaml` under the section `trial:config_type`.

`trial_max_steps`: *int* - The maximum number of time steps (ticks) that the trial will run before terminating.

`trial_max_inactivity`: *int* - The number of seconds of inactivity after which a trial will be terminated.  If 0, the trial will not be terminated because of inactivity.

`environment_config`: *protobuf class instance* - Configuration for the environment in the new trial.  This configuration will be sent to the environment on start.  The type is specified in file `cogment.yaml` under the section `environment:config_type`.

`environment_endpoint`: *str* - The URL to conenct to the environment.  The protocol must be "grpc".  E.g. "grpc://myenv:9000"

`actors_config`: *list[protobuf class instance]* - The configuration data for all actors of the new trial.  The order is the same as `actors_endpoint` and `actors_class`.

`actors_endpoint`: *list[str]* - The URL to connect to all actors of the new trial.  If instead of a URL, the value is "client", then this actor will connect in (as opposed to be to connected to), at which point the actor will need to provide the URL to connect to.  The order is the same as `actors_config` and `actors_class`.

`actors_class`: *list[str]* - The actor class for all actors of the new trial.  The order is the same as `actors_config` and `actors_endpoint`.

### ```get_trial_id(self)```

Method to retrieve the UUID of the trial.

Parameters: None

Return: *str* - UUID of the trial.

### ```validate(self)```

Method to validate that the data is valid.  This is a superficial check; even if the data validates successfully, there can still be problems with the data.  This method should be called if changes have been made to the data members of the class.  Exceptions are raised on error.

Parameters: None

Return: None

## class DatalogSession

Abstract class containing session data and methods necessary to manage logging of trial run data.  An instance of this class is passed as argument to the datalog callback function registered with `cogment.Context.register_datalog`.

`trial_id`: *str* - UUID of the trial managed by this instance.

`trial_params`: *PrehookSession instance* - Parameters of the the trial.

`on_sample`: *function(class instance)* - If defined, this function will be called when a sample is received.

`on_trial_over`: *function()* - If defined, this function will be called when the trial has ended.

### ```start(self)```

Method to start receiving samples.

Parameters: None

Return: None

### ```get_sample(self)```

Method to wait for a sample from a time step.

Parameters: None

Return: *class instance* - The sample received.

### ```get_all_samples(self)```

Generator method to iterate over all samples as they are received (waiting for each in turn).

Parameters: None

Return: *generator of class instance* - A generator for the samples received.

## class Reward

Class containing the details of a received reward.

`tick_id`: *int* - The tick id (time step) for which the reward should be applied.

`value`: *float* - Value of the reward

`confidence`: *float* - Weight the reward has relative to other rewards.

### ```all_user_data(self)```

Generator method to iterate over all user_data making up this reward.

Parameters: None

Return: *generator(byte strings)* - A generator for the user_data in the reward (from individual feedbacks that make up the reward).  The user_data is a serialization of a protobuf class sent by the originator, and it is the responsibility of the receiving actor to decode it (i.e. to know what class is supposed to be received).

[1]: cogment/cogment-api-reference/cogment-yaml.md
[4]: concepts/glossary.md#actor-class
[5]: concepts/glossary.md#observation-space
[6]: concepts/glossary.md#action-space
[7]: concepts/glossary.md#observation
[8]: concepts/glossary.md#action
