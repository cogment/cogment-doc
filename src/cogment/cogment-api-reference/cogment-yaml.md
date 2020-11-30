# Cogment.yaml

At the heart of every cogment project is a `cogment.yaml` file. This file is used by the cogment cli tool to configure the language specific SDK, as well as the orchestrator to initialize the runtime environment. {TO_REVIEW}

The top level sections in the file are:

- [import](#Import): Used to import other files into the defintion of the project
- [commands](#Commands): Defines commands that can be run by the Cogment CLI
- [trial](#Trial): Define trial speficic properties
- [environment](#Environment): Define environment specific properties
- [actor_classes](#Actor-Classes): Define actor specific properties (for each actor class)
- [trial_params](#Trial-Params): Defines the default parameters to run a trial

## Import

The import section is used to specify external data structures, and optionally code, that is referenced in other parts of the `cogment.yaml` file.  The references files must be in the same folder as the `cogment.yaml` file.  The import sections are:

- `proto`: List of protobuf definition files.  Message types defined in these files are used to communicate between the various components
- `python`: List of Python modules
- `javascript`: List of Javascript files

All cogment projects will need at least one `proto` import to define the data structures exchanged between the various components.  Python and/or javascript imports will be needed if you make use of delta encodings.

E.g.:

```yaml
import:
  proto:
    - filename1.proto
    - filename2.proto
  python:
    - module_name
  javascript:
    - filename.js
```

**N.B.**
When using message types imported from a `.proto` file, types need to be referred through their *package* namespace, not the filename containing them.

## Commands

This section is optional and defines a dictionary of commands that can then be executed using the Cogment CLI `run` command.  The commands will be executed by a sub-shell and thus can be any shell command.  The commands can also recursively call Cogment, either builtin CLI or other commands defined here.  But care should be taken not to create infinite recursive calls.

E.g.:

```yaml
commands:
  generate: cogment generate --python_dir=.
  start: docker-compose up orchestrator agent env
  play: cogment run start && docker-compose run launcher
```

To run one of these commands, the Cogment CLI command `run` must be used, e.g.: `cogment run start`.  And as such there is no problem differentiating between `cogment run generate` and `cogment generate` (the latter is the builtin CLI command, and the former is the command defined in the `cogment.yaml` file).

## Trial

This section defines properties related to the trial and trial management.  It has the properties:

- `config_type`: The protobuf message type (data structure) that will be passed on to the pre-trial hooks
- `pre_hooks`: List of functions that will be called before the start of a trial.  These functions receive the default parameters and can change them for the upcoming trial {TO_REVIEW}

E.g.:

```yaml
trial:
  config_type: namespace.DataType
  pre_hooks:
    - namespace.Function1
    - namespace.Function2
```

## Environment

This section defines properties related to the environment. It has the properties:

- `config_type`: The protobuf message type used to configure the environment

```yaml
environment:
  config_type: namespace.DataType
```

## Actor Classes

Arguably the most important section of the `cogment.yaml` file, the actor classes section describes the actor types that can be present in the project's trials.

The content of this section is a list of actor classes, each containing the necessary properties to define an actor class.  These properties are:

- `id`: The name by which this actor class is known
- `action`: Dictionary of properties
  - `space`: The protobuf message type that represents all the possible actions that this actor class can perform (its action space)
- `observation`: Dictionary of properties
  - `space`: The protobuf message type that represents a snapshot of the data that this actor class has access to (its observation space)
  - `delta`: The protobuf message type that represents the difference between two observation spaces (snapshots)
  - `delta_apply_fn`: Dictionary of exclusive options for a function to combine an observation space and a delta, into a new observation space {TO_REVIEW}
    - `python`: The function defined in python
    - `javascript`: The function defined in Javascript
- `config_type`: Defines the protobuf message type used to configure this actor class

Each actor class should define both an observation and action space as protobuf message types.

```yaml
actor_classes:
  - id: BigPlayer
    action:
      space: namespace.PlayerAction
    observation:
      space: namespace.PlayerObservation
      delta: namespace.PlayerDeltaObservation
      delta_apply_fn:
        python: module_name.PlayerDeltaProcessingFn
    config_type: namespace.PlayerConfig

  - id: SmallPlayer
    action:
      space: namespace.PlayerAction
    observation:
      space: namespace.PlayerObservation
      delta: namespace.PlayerDeltaObservation
      delta_apply_fn:
        python: module_name.PlayerDeltaProcessingFn
    config_type: namespace.PlayerConfig

  - id: Referee
    action:
      space: namespace.RefereeAction
    observation:
      space: namespace.RefereeObservation
      delta: namespace.RefereeDeltaObservation
      delta_apply_fn:
        python: module_name.RefereeDeltaProcessingFn
    config_type: namespace.RefereeConfig
```

## Trial Params

This section defines the different parameters that can be adjusted by pre-trial hooks for each trial.  It also defines the default values for these parameters.  These parameters are:

- `environment`: Dictionary of properties
  - `endpoint`: The URL where the environment gRPC server resides
  - `config`: Dictionary of properties to match the definition of config_type for the environment {TO_REVIEW}
- `actors`: Dictionary of properties
  - `actor_class`: The name (id) of the class this instance of an actor belongs.  The actor class must be defined in the `actor_classes` section above
  - `endpoint`: The URL where the actor gRPC server resides.  If this is `client`, the actor will connect as a client (the orchestrator being the server in this case).
  - `config`: Dictionary of properties to match the definition of config_type for this actor class {TO_REVIEW}

E.g.:

```yaml
trial_params:
  environment:
    endpoint: grpc://env:9000
    config:

  actors:
    - actor_class: BigPlayer
      endpoint: grpc://bp1:9000
      config:
    - actor_class: BigPlayer
      endpoint: grpc://bp2:9000
      config:
    - actor_class: SmallPlayer
      endpoint: grpc://sp:9000
      config:
    - actor_class: SmallPlayer
      endpoint: grpc://sp:9000
      config:
    - actor_class: Referee
      endpoint: client
      config:
```
