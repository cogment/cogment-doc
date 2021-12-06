# Spec File

The spec file (typically named `cogment.yaml`) is central to every Cogment project. This file is used to define the specifics of a type of trials.  It also contains data used by the Cogment CLI tool. The Cogment CLI takes this file as its main input to, among other things, configure the language specific SDKs.

The top level sections in the file are:

-   [import](#import): Used to import other proto files into the definition of the project
-   [commands](#commands): Defines commands that can be run by the Cogment CLI
-   [trial](#trial): Define trial speficic properties
-   [environment](#environment): Define environment specific properties
-   [actor_classes](#actor-classes): Define actor specific properties (for each actor class)

In this document, "section" refers to YAML mappings.

## Import

The import section is used to specify external data structures, and optionally code, that is referenced in other parts of the file. The referenced files must be in the same folder as the spec file. The import sections are:

-   `proto`: List of protobuf definition files. Message types defined in these files are used to communicate between the various components

All Cogment projects will need at least one `proto` import to define the data structures exchanged between the various components.

E.g.:

```yaml
import:
    proto:
        - filename1.proto
        - filename2.proto
```

> ⚠️ **N.B.** When using message types imported from a `.proto` file, types need to be referred through their _package_ namespace, not the filename containing them.

## Commands

This section is optional and defines commands that can then be executed using the Cogment CLI `run` command. The commands will be executed by a sub-shell and thus can be any shell command. The commands can also recursively call Cogment, either built-in CLI commands, or other commands defined here. But care should be taken not to create infinite recursive calls.

E.g.:

```yaml
commands:
    sync: cogment sync client environment
    start: docker-compose up orchestrator agent env
    play: cogment run start && docker-compose run launcher
```

To run one of these commands, the Cogment CLI command `run` must be used, e.g.: `cogment run start`. And as such there is no problem differentiating between `cogment run sync` and `cogment sync` (the latter is the builtin CLI command, and the former is the command defined in the `cogment.yaml` file).

The cogment command section exists so that commands can be executed in a platform independant manner.

## Trial

This section defines properties related to the trial and trial management. It has the properties:

-   `config_type`: (optional) The protobuf message type (data structure) that will be passed on to the pre-trial hooks.

E.g.:

```yaml
trial:
    config_type: namespace.DataType
```

## Environment

This section defines properties related to the environment. It has the properties:

-   `config_type`: (optional) The protobuf message type used to configure the environment

```yaml
environment:
    config_type: namespace.DataType
```

## Actor Classes

Arguably the most important section of the spec file, the actor classes section describes the actor types that can be present in the project's trials.

The content of this section is a list of actor classes, each containing the necessary properties to define an actor class. These properties are:

-   `name`: The name by which this actor class is known
-   `action`: Mapping of properties- `space`: The protobuf message type that represents all the possible actions that this actor class can perform (its action space)
-   `observation`: Mapping of properties
    -   `space`: The protobuf message type that represents a snapshot of the data that this actor class has access to (its observation space)
-   `config_type`: (optional) Defines the protobuf message type used to configure this actor class

Each actor class should define both an observation and action space as protobuf message types.

```yaml
actor_classes:
    - name: BigPlayer
      action:
          space: namespace.PlayerAction
      observation:
          space: namespace.PlayerObservation
      config_type: namespace.PlayerConfig

    - name: SmallPlayer
      action:
          space: namespace.PlayerAction
      observation:
          space: namespace.PlayerObservation
      config_type: namespace.PlayerConfig

    - name: Referee
      action:
          space: namespace.RefereeAction
      observation:
          space: namespace.RefereeObservation
      config_type: namespace.RefereeConfig
```
