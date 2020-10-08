# Cogment.yaml

At the heart of every cogment project is a `cogment.yaml` file. This file is used by the cogment cli tool to configure the language specific SDK, as well as the orchestrator to initialize the runtime environment.

## Import Section

The import section is used to specify external data structures, and optionally code, that is referenced in other parts of the cogment.yaml.

Currently, almost all cogment projects will need at least one `proto` import, and python and/or javascript imports will be needed if you make use of delta encodings.

```yaml
import:
  proto:
    - filename.proto
  python:
    - module_name
  javascript:
    - filename.js
```

**N.B.**
When using message types imported from a `.proto` file, types need to be referred through their *package* namespace, not the filename containing them.

## Environment Section

This section section defines properties related to the environment and its service application.

It has the following properties:

- url [**required**]: The url at which the orchestrator will look for the environment service
- config [**optional**]: The proto message type used to configure the environment.

```yaml
environment:
  url: url.example.com
  config: namespace.DataType
```

## Datalog Section

This **optional** section configures how the orchestrator will keep records of the trials it manages:

If present, it has the following properties:

- type [**required**]: currently, must be `raw`
- file [**required**]: The path at which to store the datalog
- fields [**optional**]:
  - exclude [**optional**]: List of fields to exclude from the datalog.

```yaml
datalog:
  type: raw
  file: /app/datalog.bin
  fields:
    exclude:
      - pkg.message.fieldname
```

## Actors Section

Arguably the most important section of the `cogment.yaml` file, the actors section describes the actors that are present in the project's trials.

The actors section itself is an object of which each property refers to a distinc actor class.

Each actor class should define both an observation and action space as protocol buffer message types, as well as a list of instances. The sum of the count of an actor class' instances will be the total number of actors of the class within each trial.

Actor classes may also optionally define a delta encoding for observations.

```yaml
actors:
  actor_class_a:
    observation:
      space: pkg.msg_type

    action:
      space: pkh.msg_type

    instances:
      - type: agent
        url: agent:9000
        count: 1

  actor_class_b:
    observation:
      space: pkg.msg_type
      delta: pkg.msg_type_2
      delta_apply_fn:
        python: module.fn
        javascript: module.fn
    action:
      space: pkh.msg_type

    instances:
      - type: human
        count: 1
      - type: agent
        url: agent_2:9000
        count: 3
```
