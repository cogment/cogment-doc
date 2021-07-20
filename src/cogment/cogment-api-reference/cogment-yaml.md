# Cogment.yaml

At the heart of every Cogment project is a `cogment.yaml` file (default name). This file is used by the Cogment CLI tool to configure the language specific SDK. It is also used by the orchestrator to initialize the runtime environment.

The top level sections in the file are:

-   [import](#import): Used to import other files into the defintion of the project
-   [commands](#commands): Defines commands that can be run by the Cogment CLI
-   [trial](#trial): Define trial speficic properties
-   [environment](#environment): Define environment specific properties
-   [actor_classes](#actor-classes): Define actor specific properties (for each actor class)
-   [trial_params](#trial-params): Defines the default parameters to run a trial
-   [datalog](#datalog): Defines the data logging specific properties

In this document, "section" refers to YAML mappings.

## Import

The import section is used to specify external data structures, and optionally code, that is referenced in other parts of the file. The referenced files must be in the same folder as the `cogment.yaml` file. The import sections are:

-   `proto`: List of protobuf definition files. Message types defined in these files are used to communicate between the various components
-   `python`: (optional) List of Python modules
-   `javascript`: (optional) List of Javascript files

All Cogment projects will need at least one `proto` import to define the data structures exchanged between the various components. Python and/or javascript imports will be needed if you make use of delta encodings.

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

> ⚠️ **N.B.** When using message types imported from a `.proto` file, types need to be referred through their _package_ namespace, not the filename containing them.

## Commands

This section is optional and defines commands that can then be executed using the Cogment CLI `run` command. The commands will be executed by a sub-shell and thus can be any shell command. The commands can also recursively call Cogment, either built-in CLI commands, or other commands defined here. But care should be taken not to create infinite recursive calls.

E.g.:

```yaml
commands:
    generate: cogment generate --python_dir=.
    start: docker-compose up orchestrator agent env
    play: cogment run start && docker-compose run launcher
```

To run one of these commands, the Cogment CLI command `run` must be used, e.g.: `cogment run start`. And as such there is no problem differentiating between `cogment run generate` and `cogment generate` (the latter is the builtin CLI command, and the former is the command defined in the `cogment.yaml` file).

## Trial

This section defines properties related to the trial and trial management. It has the properties:

-   `config_type`: (optional) The protobuf message type (data structure) that will be passed on to the pre-trial hooks.
-   `pre_hooks`: (optional) List of endpoints for pre-trial hook processing services. The services will all be called, and their responses waited upon before the trial starts. The services are called by order of listing. The first service to be called will receive the default parameters (set in the `trial_params` section of `cogment.yaml`) and can change them. Each subsequent service will receive the parameters updated by the previous service, and can change them further. If no service is defined, the default parameters are used directly.

E.g.:

```yaml
trial:
    config_type: namespace.DataType
    pre_hooks:
        - grpc://actorconfigserver:9000
        - grpc://envconfigserver:9000
        - grpc://logconfigserver:9000
```

## Environment

This section defines properties related to the environment. It has the properties:

-   `config_type`: (optional) The protobuf message type used to configure the environment

```yaml
environment:
    config_type: namespace.DataType
```

## Actor Classes

Arguably the most important section of the `cogment.yaml` file, the actor classes section describes the actor types that can be present in the project's trials.

The content of this section is a list of actor classes, each containing the necessary properties to define an actor class. These properties are:

-   `id`: The name by which this actor class is known
-   `action`: Mapping of properties- `space`: The protobuf message type that represents all the possible actions that this actor class can perform (its action space)
-   `observation`: Mapping of properties
    -   `space`: The protobuf message type that represents a snapshot of the data that this actor class has access to (its observation space)
    -   `delta`: (optional) The protobuf message type that represents the difference between two observation spaces (snapshots)
    -   `delta_apply_fn`: (optional) Mapping for a function to combine an observation space and a delta, into a new observation space: _fn(observation, delta) -> observation_. Only one of the following can be defined
        -   `python`: The function defined in python
        -   `javascript`: The function defined in Javascript
-   `config_type`: (optional) Defines the protobuf message type used to configure this actor class

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

This section defines the different parameters that can be adjusted by pre-trial hooks for each trial. It also defines the default values for these parameters. These parameters are:

-   `max_steps`: The maximum number of time steps (ticks) that the trial will run before terminating.
-   `max_inactivity`: The number of seconds of inactivity after which a trial will be terminated. If 0, the trial will not be terminated because of inactivity.
-   `trial`: Mapping of properties
    -   `config`: Definition of properties to match the definition of `config_type` for the trial. I.e. the yaml definition needs to match the definition of the protobuf class declared as `config_type`.
-   `environment`: Mapping of properties
    -   `endpoint`: The URL where the environment gRPC server resides
    -   `implementation`: The name of the implementation to be used for this instance of the environment. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime
    -   `config`: Definition of properties to match the definition of `config_type` for the environment. I.e. the yaml definition needs to match the definition of the protobuf class declared as `config_type`.
-   `actors`: List of actor properties
    -   `name`: The name of this actor (i.e. name of the specific instance of the actor class)
    -   `actor_class`: The name of the actor class. The actor class must be defined in the `actor_classes` section above
    -   `endpoint`: The URL where the actor gRPC server resides. If this is `client`, the actor will connect as a client (the orchestrator being the server in this case).
    -   `implementation`: The name of the implementation to be used for this actor instance. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime.
    -   `config`: Definition of properties to match the definition of `config_type` for this actor class. I.e. the yaml definition needs to match the definition of the protobuf class declared as `config_type`.

E.g.:

```yaml
trial_params:
    max_steps: 1000
    max_inactivity: 5

    trial:
        config:

    environment:
        endpoint: grpc://env:9000
        implementation: default
        config:

    actors:
        - name: Alice
          actor_class: BigPlayer
          endpoint: grpc://bp1:9000
          implementation:
          config:
        - name: Bob
          actor_class: BigPlayer
          endpoint: grpc://bp2:9000
          implementation: Test
          config:
        - name: Carol
          actor_class: SmallPlayer
          endpoint: grpc://sp:9000
          implementation: DQN_Hotel3
          config:
        - name: Dave
          actor_class: SmallPlayer
          endpoint: grpc://sp:9000
          implementation: DNN_Karma3.1.17
          config:
        - name: Olivia
          actor_class: Referee
          endpoint: client
          implementation: Standard
          config:
```

## Datalog

This section defines the properties related to the logging of the data. It has the properties:

-   `fields`: (optional) Mapping of properties
    -   `exclude`: List of fields to exclude from the data to send for logging
-   `type`: The type of data to send for logging. Can be `grpc` or `none`.
-   `url`: URL where to send the data to be logged

```yaml
datalog:
    fields:
        exclude: [time, msg, status]
    type: grpc
    url: logserver:9000
```
