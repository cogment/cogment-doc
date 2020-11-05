# Python SDK

## Installation

The simplest way to install the python SDK is to just install it using pip:
`pip install cogment`

The basic requiremetns is Python 3.7.

## General usage

### The cogment.yaml file

The [cogment.yaml][1] file (including imported files) defines the high level API.

For example, an [actor class][4] is defined by its required [observation space][5] and [action space][6].

These "spaces" are defined by using protobuf message types (from the imported files). [Observations][7] and [actions][8] will simply be instances of the appropriate type.

Messages don't have a set type, they can be any type as long as the receiver can manage that type (i.e. the type of the object received should be checked against known types before handling).  The type is determined by the originator of the message.

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

## cogment.Server

Class to setup and run the communication for a component.

### ```__init__(self, cog_project, port, prometheus_port = 8000)```

Parameters:

- `cog_project`: *module* - Settings module associated with trials that will be run ([cog_settings](#cog_settings.py) namespace).
- `port`: *int* - TCP/IP port number to listen to.
- `prometheus_port`: *int* - TCP/IP port number for Prometheus

### ```run(self)```

Method to start and run the communication server for the registered components (environment, actor, prehook, datalog).

Parameters: None

Return : None

### ```register_environment(self, impl, impl_name = "default")```

Method to register the asynchronous callback function that will run an environment for a trial.

Parameters:

- `impl`: *async function(cogment.environment.EnvironmentSession instance, cogment.trial.Trial instance)* - Callback function to be registered
- `impl_name`: *str* - Name for the environment being run by the given callback function.

Return: None

### ```register_actor(self, impl, impl_name, actor_class)```

Method to register the asynchronous callback function that will run an actor for a trial.

Parameters:

- `impl`: *async func(cogment.actor.ActorSession instance, cogment.trial.Trial instance)* - Callback function to be registered
- `impl_name`: *str* - Name for the actor being run by the given callback function.
- `actor_class`: *str* - The actor class name run by the given callback function. The possible names are specified in file `cogment.yaml` as `id` under section `actor_classes`.  E.g. "driver"

Return: None

### ```register_prehook(self, impl)```

Method to register an asynchronous callback function that will be called before a trial is started.

Parameters:

- `impl`: *async func(SimpleNamespace instance)* - Callback function to be registered

Return: None

### ```register_datalog(self, impl)```

Method to register an asynchronous callback function that will be called for each log request (for any trial).  Only one such function can be registered.

Parameters:

- `impl`: *async func(samples, trial_params, trial_id)* - Callback function to be registered

Return: None

## cogment.Trial

Class representing a trial.

`id`: *str* - Trial UUID.

`over`: *bool* - True if the trial has ended, false otherwise.

`actors`: *list[cogment.Actor]* - List of active actors involved in this trial.

`tick_id`: *int* - The current tick id (time step).

### ```get_receivers(self, pattern, env=False)```

Method to retrieve a set of receivers for messages or feedback.

Parameters:

- `pattern`:: *list[ID]* - The ID can be the index (*int*) of the actor in the `Trial.actors` list.  The ID can also be the name (*str*) of the actor or "env" (for the environment).  The ID can also represent a set of actors or environment by name (*str*); A set of names can be represented with the wildcard character (`*`), and takes the form of "`*`" for all actors/environment, or "`XXX.*`" where `XXX` is the class ID of actors.
- `env`: *bool* - If True, try to match the environment (as well as actors) to the pattern.  If False, only actors will be matched.  Note that the environment has a hard coded name of "env".

Return: *list[class instances]* - Returns the actors (`cogment.actor.Actor`) that match the pattern, and possibly the environment that match the pattern (`cogment.environment.Environment`).

### ```add_feedback(self, to, value, confidence```

Method to provide feedback that will contribute to the actors' reward.

Parameters:

- `to`: - *list[actor ID]* - The destination.  Same as the `pattern` parameter of the `get_receivers()` method, but only actors (no environment)
- `value`: *float* - Value of the feedback
- `confidence`: *float* - Weight this feedback has relative to other feedbacks.

Return: None

### ```send_message(self, to, user_data)```

Method to send a message to one or more actors/environment.

Parameters:

- `to`: - *list[ID]* - The destination.  Same as the `pattern` parameter of the `get_receivers()` method, for actors and the environment.
- `user_data`: *protobuf class instance* - The message to be sent. The class can be any protobuf class.  It is the responsibility of the receiving actor or environment to manage the type received.

Return: None

## cogment.environment.EnvironmentSession

Class containing session/trial data and methods necessary to run an environment for a trial.  An instance of this class is passed as argument to the environment callback function registered with `cogment.Server.register_environment`.

`trial`: *Trial instance* - The trial managed by this class.

`end_trial`: *bool* - If True, the end of the trial has been requested, and the environment as ended.

`impl_name`: *str* - Name of the implementation running this environment.

`on_actions`: *function(list[action])* - If defined, this function will be called for every set of action that is received.  The actions received by the function are the classes defined as action spaces for the actors in `cogment.yaml`.  This should not be defined if using `gather_actions()`.

`on_message`: *function(int, protobuf class instance)* - If defined, this function will be called when a new message arrives. The class is of the type sent by the originator.  It is the responsibility of the environment to manage the type received.

`on_trial_over`: *function()* - If defined, this function will be called when the end of the trial has been requested.  At this point `end_trial` is set to `True`.

`latest_actions`: *list[action]* - The latest actions received.  This is also provided as argument to `on_actions()` (if defined).  If `gather_actions()` is used instead, this may transitorilly contain the latest actions received.

`latest_message`: *protobuf class instance* - The lastest message received.  This is also provided as argument to `on_message()` (if defined).

### ```start(self, observations)```

Method to report that the environment is starting to run the trial.

Parameters:

- `observations`: *list[tuple(str, protobuf class instance)]* - The initial observations from which the environment is starting the trial.  The string in the tuple is the name of the destination actor (or "*" for all actors).  The name of the actors can be found in `cogment.yaml` under `trial_params:actors:name`.  The protobuf class is the Observation Space for that actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

Return: None

### ```async gather_actions(self)```

Method to wait for a set of actions from the actors.  This should not be called if `self.on_actions` is defined.

Parameters: None

Return: *list[action]* - The actions are the classes defined as action-spaces for the actors in `cogment.yaml`.

### ```produce_observations(self, observations)```

Method to send observations to actors.

Parameters:

- `observations`: *list[tuple(str, protobuc class instance)]* - The observations to send to actors.  The string in the tuple is the name of the destination actor (or "*" for all actors).  The name of the actors can be found in `cogment.yaml` under `trial_params:actors:name`.  The protobuf class is Observation Space for that actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

Return: None

### ```end(self, final_observations)```

Method to request the end of the trial, and report the end of the environment.

Parameters:

- `final_observations`: *list[tuple(str, protobuf class instance)]* - The final observations to send to the actors.  The string in the tuple is the name of the destination actor (or "*" for all actors).  The name of the actors can be found in `cogment.yaml` under `trial_params:actors:name`.  The protobuf class is the Observation Space for that actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

Return: None

## cogment.actor.ActorSession

Class containing session/trial data and methods necessary to run an actor for a trial.  An instance of this class is passed as argument to the actor callback function registered with `cogment.Server.register_actor`.

`actor_class`: *str* - Name of the class of actor this class represents.  Specified in `cogment.yaml` as `actor_classes:id`.

`impl_name`: *str* - Name of the implementation of the actor represented by this class.

`name`: *str* - Name of the actor this classs represents.

`trial`: *Trial instance* - The trial managed by this class.

`end_trial`: *bool* - If True, the trial has ended.

`on_observation`: *function(protobuf class instance)* - If defined, this function will be called when an observation is received.  The observation received is of the class defined as observation space for the appropriate actor class specified in section `actor_classes:observation:space` in `cogment.yaml` for the appropriate actor class.

`on_reward`: *function(protobuf class instance)* - If defined, this function will be called when a reward is received.  The reward received is of the type `cogment.Reward`.

`on_message`: *function(int, protobuf class instance)* - If defined, this function will be called when a new message arrives. The class is of the type sent by the originator.  It is the responsibility of the actor to manage the type received.

`on_trial_over`: *function()* - If defined, this function will be called when the trial has ended.  At this point `end_trial` is set to `True`.

`latest_observation`: *protobuf class instance* - The latest observation received.  This is also provided as argument to `on_observation()` (if defined).

`latest_reward`: *protobuf class instance* - The latest reward received.  This is also provided as argument to `on_reward()` (if defined).

`latest_message`: *protobuf class instance* - The lastest message received.  This is also provided as argument to `on_message()` (if defined).

### ```start(self)```

Method to start the actor and wait for the first observation.

Parameters: None

Return: - *protobuf class instance* - The first observation available from which to start the actor.  The class is the Observation Space for the actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

### ```start_nowait(self)```

Method to start the actor.

Parameters: None

Return: None

### ```do_action(self, action)```

Method to send actions to the environment and wait for the next observation.

Parameters:

- `action`: *protobuf class instance* - An instance of the action space class specified in corresponding section `actor_classes:action:space` of the `cogment.yaml` file.

Return: - *protobuf class instance* - The first observation available from which to start the actor.  The class is the Observation Space for the actor, found in `cogment.yaml` in the corresponding section `actor_classes:observation:space`.

### ```do_action_nowait(self, action)```

Method to send actions to the environment.

Parameters:

- `action`: *protobuf class instance* - An instance of the action space class specified in corresponding section `actor_classes:action:space` of the `cogment.yaml` file.

Return: None

### ```end(self)```

Method to end the trial.

Parameters: None

Return: None

## cogment.Actor

Class representing an actor within a trial.

### ```add_feedback(self, value, confidence, tick_id=-1, user_data=None)```

Method to provide feedback that will contribute to that actor's reward.

Parameters:

- `value`: *float* - Value of the feedback
- `confidence`: *float* - Weight this feedback has relative to other feedbacks.
- `tick_id`: *int* - Tick id (timestep) for which this feedback refers to. If left at -1, it implicitely refers to the latest point in time, and can be **reliably** expected to be propagated live to the agent.
- `user_data`: *protobuf class instance* - Specific information for the actor.  The class is specified in `cogment.yaml` in the section `actor_classes:feedback:info`.

Return: None

### ```send_message(self, user_data=None)```

Method to send a message to the actor.

Parameters:

- `user_data`: *protobuf class instance* - The message to be sent.  The class can be any protobuf class.  It is the responsibility of the actor to manage the type received.

Return: None

## cogment.client.Connection

Class to create a connection to a cogment orchestrator to start and control trials.

### ```__init__(self, cog_project, endpoint)```

Parameters:

- `cog_project`: *module* - Settings module associated with this trial ([cog_settings](#cog_settings.py) namespace).
- `endpoint`: *str* - URL of the Orchestrator to connect to.

### ```start_trial(self, trial_config, user_id)```

Method to start a new trial.

Parameters:

- `trial_config`: *protobuf class instance* - Configuration for the trial.  The type is specified in file `cogment.yaml` under the section `trial:config_type`

- `user_id`: *str* - Identifier for the user requesting the trial start

Return: *cogment.client.TrialLifeCycle instance* - Class representing the trial that was started.

### ```join_trial(self, trial_id=None, actor_id=-1, actor_class=None, impl=None)```

Method for an actor to join an existing trial.

Parameters:

- `trial_id`: *str* - The UUID of the trial to join.

- `actor_id`: *int* - Id of the actor joining the trial.
  
- `actor_class`: *str* - The actor class for the actor that is joining the trial. The type is specified in file `cogment.yaml` under section `actor_classes:id`

- `impl`: *async function(cogment.environment.ActorSession instance, cogment.trial.Trial instance)* - Callback function.  This function will be be called when the trial has been joined.

Return: None

[1]: cogment/cogment-api-reference/cogment-yaml.md
[4]: concepts/glossary.md#actor-class
[5]: concepts/glossary.md#observation-space
[6]: concepts/glossary.md#action-space
[7]: concepts/glossary.md#observation
[8]: concepts/glossary.md#action
