# Python SDK

## Installation

The simplest way to install the python SDK is to just install it using pip:
`pip install cogment`

## General usage

### cog_settings.py

All API entrypoints require a cogment configuration object. This configuration object can be determined
from the content of a project's `cogment.yaml`. As such, it should be generated using the `cogment` tool.

```bash
# From the directory containing cogment.yaml
$ cogment generate --python_dir=path/to/project
```

This will generate both a `cog_settings.py` file, as well as any required compiled protocol buffer files.

### Top-level import

Wether a script implements a client, agent or environment, it should import both the `cog_settings` and cogment itself.

```python
import cog_settings
import cogment
```

## Common API

### cogment.Actor

Class representing an actor within a trial.

#### ```add_feedback(self, value, confidence, tick_id=-1, user_data=None)```

Method to provide feedback that will contribute to that actor's reward.

Parameters:

- `value`: *float* - Value of the feedback
- `confidence`: *float* - Weight this feedback has relative to other feedbacks.
- `tick_id`: *int* - Tick id (timestep) for which this feedback refers to. If left at -1, it implicitely refers to the latest point in time, and can be **reliably** expected to be propagated live to the agent.
- `user_data`: unused

Return: None

#### ```send_message(self, user_data=None)```

Method to send a message to an actor or the environment.

Parameters:

- `user_data`: *protobuf class* - The message to be sent.

Return: None

#### ```multi_cast(self, user_data=None, send_list=[])```

Method to send a message to a list of actors and/or the environment.

Parameters:

- `user_data`: *protobuf class* - The message to be sent.
- `send_list`: *list* - List of actor IDs and/or -1 (for the environment)

Return: None

### cogment.Trial

Class representing a trial.

`id`: *str* - Trial UUID.

`settings`: *module* - Settings module associated with this trial ([cog_settings](#cog_settings.py) namespace).

`actor_counts`: *list[int]* - Number of actors for each class of actor.

`actors`: *types.SimpleNamespace instance*

- `all`: *list[cogment.Actor]* - List of all actors present in the trial.


`tick_id`: *int* - The current tick id.

`trial_config`: *protobuf instance* - Configuration for the trial.  The type is specified in file `cogment.yaml` under the section `trial:config_type`

#### ```new_observation_table(self)```

Method to return a new, empty observation table.

Parameters: None

Return: *cog_settings.ObservationTable instance* - Observations for all actors

## Client API

### cogment.client.Connection

Class to create a connection to a cogment orchestrator.

#### ```__init__(self, cog_settings, endpoint)```

Parameters:

- `cog_settings`: *module* - Settings module associated with this trial ([cog_settings](#cog_settings.py) namespace).
- `endpoint`: *str* - URL of the project's Orchestrator.

#### ```start_trial(self, actor_class, trial_cfg=None, plugins=[])```

Method to begin a new trial.

Parameters:

- `actor_class`: *class type* - The actor class the human is registering as. The type is specified in file `cogment.yaml` under section `actors`; the `actor_class` name with `endpoint: human`).  E.g. `cog_settings.actor_classes.observer`
- `trial_cfg`: *protobuf instance* - Configuration for the trial.  The type is specified in file `cogment.yaml` under the section `trial:config_type`
- `plugins`: *list* - List of plugin instances.

Return: *cogment.client.ClientTrial instance* - Trial upon successfull creation.

#### ```join_trial(self, actor_class, trial_id, actor_id)```

Method to join an existing trial.

Parameters:

- `actor_class`: *class type* - The actor class the human is registering as. The type is specified in file `cogment.yaml` under section `actors`; the `actor_class` name with `endpoint: human`).  E.g. `cog_settings.actor_classes.observer`
- `trial_id`: *str* - The UUID of the trial to join.
- `actor_id`: *int* - Id of this actor in trial.

Return: *cogment.client.ClientTrial instance* - Trial upon successfull join.

### cogment.client.ClientTrial(cogment.Trial)

Class representing an active trial from the perspective of a client application.

`connection`: *cogment.client.Connection instance* - Connection to orchestrator.

`observation`: *protobuf instance* - The updated observation for the actor. The type is specified in file `cogment.yaml` under the section `actor_classes:observation:space` for the actor class of the actor.

`actor_id`:*int* - Id of actor.

`actor_class`: *class type* - The actor class used by the actor. The type is specified in file `cogment.yaml` under section `actors`.  And described in section `actor_classes:id`.  E.g. `cog_settings.actor_classes.player`

`latest_reward`: *protobuf instance* - The updated reward received.  `Reward` defined in file `agent.proto`.

`latest_messages`: *protobuf instance* - The updated messages received.  `MessageCollection` defined in file `agent.proto`.

`session_id`: *str* - UUID of the connection session.

#### ```do_action(self, action)```

Method to request the advancement of time for the trial by providing a human (client) action. Any pending feedback is also flushed.

Parameters:

- `action`: *protobuf instance* - The human's action. The type is specified in file `cogment.yaml` under the section `actor_classes:action:space` for the human actor.  Which actor is human is specified in section `actors:actor_class` with `endpoint: human`.

Return: *tuple*

- [0]: Same as member `observation`.
- [1]; Same as member `last_reward`.
- [2]: Same as member `last_messages`.

#### ```end(self)```

Method to request the end of the trial. Any pending feedback is also flushed.

Parameters: None

Return: None

#### ```flush_feedback(self)```

Method to explicitely flush any pending feedback. This should rarely be needed.

Parameters: None

Return: None

#### ```flush_message(self)```

Method to explicitely flush any pending messages. This should rarely be needed.

Parameters: None

Return: None

#### ```begin_actions_stream(self)```

Method to switch the client to streaming mode, using a single connection to transfer all actions and observations.

Parameters: None

Return: None

#### ```set_on_trial_end_event_listener(self, callback)```

Method to register a function to call when the trial is ended (not by calling `end()`).

Parameters:

- `callback`: *function* - A callback function.  With no parameters.  The return value is ignored.

Return: None

## Agent API

### cogment.Agent

*Abstract Class* - Provides necessary basis for a project-specific agent implementation.

`VERSIONS`: *dict[str, str]* - Version information.  To be filled by the derived class.

`actor_class`: *class type* - The actor class implemented by this class. The types are described in file `cogment.yaml` in section `actor_classes:id`.  To be set by the derived class.  E.g. `cog_settings.actor_classes.player`

#### ```__init__(self, trial, actor, config)```

Parameters:

- `trial`: *cogment.Trial instance* - Trial the agent will participate in.
- `actor`: *cogment.Actor instance* - Actor for this agent in the trial.
- `config`: *protobuf instance* - The configuration for the agent (can be None). If any, the type is specified in file `cogment.yaml` in section `actor_classes:config_type`.

#### ```end(self)```

Method to invoke at the end of the trial.

Parameters: None

Return: None

#### ```reward(self, reward)```

*Abstract Method* - Will be invoked when reward information is available.

Parameters:

- `reward`: *protobuf instance* - The reward received.  `Reward` defined in file `agent.proto`.

Return: None

#### ```on_message(self, reward)```

*Abstract Method* - Will be invoked when a message is available.

Parameters:

- `onmessage`: *protobuf instance* - The messages received.  `MessageCollection` defined in file `agent.proto`.

Return: None

#### ```decide(self, observation)```

*Abstract Method* - Will be invoked when a new observation is avalable.

Parameters:

- `observation`: *protobuf instance* - The observation for the time step. The type is specified in file `cogment.yaml` in section `actor_classes:observation:space`.

Return: *protobuf instance* - The action done in response to the given observation. The type is specified in file `cogment.yaml` in section `actor_classes:action:space`.

## Environment API

### cogment.Environemnt

*Abstract Class* - Provides necessary basis for a project-specific environment implementation.

`VERSIONS`: *dict[str, str]* - Version information.  To be filled by the derived class.

#### ```start(self, config)```

*Abstract Method* - Will be invoked at the start of a trial.

Parameters:

- `config`: *protobuf instance* - The configuration for the environment (can be None). If any, the type is specified in file `cogment.yaml` in section `environment:config_type`.

Return: None

#### ```update(self, actions)```

*Abstract Method* - Will be invoked when there are new actions available.

Parameters:

- `actions`: *cog_settings.ActionsTable instance* - Actions from all actors.

Return: *cog_settings.ObservationTable instance* - Updated observation after actions taken into account.

#### ```on_message(self, onmessage)```

*Abstract Method* - Will be invoked when a message is available.

Parameters:

- `onmessage`: *protobuf instance* - The messages received.  `MessageCollection` defined in file `agent.proto`.

Return: None

#### ```end(self)```

This should be invoked to indicate the end of the trial.

Parameters: None

Return: None

## Service API

### cogment.GrpcServer

#### ```__init__(self, service_type, settings, port=DEFAULT_PORT)```

Parameters:

- `service_type`: *class type* - Either a subclass of `cogment.Agent`, `cogment.Environment` or `cogment.TrialHooks`.
- `settings`: *module* - Settings module associated with this trial ([cog_settings](#cog_settings.py) namespace).
- `port`: *int* - The port at which the server runs.

#### ```stop(self)```

Stops the server.

Parameters: None

Return: None

#### ```serve(self)```

Starts the server, and blocks until a signal (e.g. CTRL-C) is received.

Parameters: None

Return: None
