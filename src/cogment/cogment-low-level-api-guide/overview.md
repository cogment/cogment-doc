# Cogment Low-Level API guide

## Who is this for

- Projects that involve tech stacks for which there is no high-level support yet.
- Developers of the framework itself.
- Curious people.

## Prerequisites

The actual implementation of the Low-Level API uses gRPC. As this document is not meant to teach how to use the [gRPC](https://grpc.io){target=\_blank} protocol and/or libraries, it will be assumed that the reader understands these concepts already.

## Differences from the High-Level API

The high-level API takes a very object-oriented approach to trial management. Starting a trial creates an instance of an environment, as well as instances of agents.

## gRPC services

The low-level API is fully described within the gRPC service definitions found in the `api/cogment` directory of the cogment framework source.

### Agent Service

`api/cogment/agent.proto` describes the service that agent applications have to implement.

- `Start()` is called when a trial starts.
- `End()` is called when a trial ends.
- `Update()` is called to request an action from the agent, given an observation.
- `Reward()` is called to inform the agent of received feedback.
- `Message()` is called to inform the agent of received messages.

### Environment Service

`api/cogment/environment.proto` describes the service that environment applications have to implement.

- `Start()` is called when a trial starts.
- `End()` is called when a trial ends.
- `Update()` is called to request an updated set of observations based on fresh actions.
- `Message()` is called to inform the environment of received messages.

### Frontend API

`api/cogment/orchestrator.proto` describes the service the orchestrator exposes that frontend applications use to create and manipulate trials.

- `StartTrial()` to request the start of a new trial.
- `TerminateTrial()` to request the end of the trial.
- `SendMessage()` to send a message to an agent or the environment
- `TrialInfo()` to request additional information about an existing trial.

### Data Log Exporter API

`api/cogment/data.proto` describes the services provided to save all trial data (for archival, replay or offline analysis).

- `Log()` to log a data sample (i.e. normally all data from a single tick/timestep)

### Hooks API

`api/cogment/hooks.proto` describes the hook services provided to allow per trial configuration changes at runtime.

- `PreTrial()` is called before a trial starts.

## Common Data

Most of the common data is found in `api/cogment/common.proto`, but other "common" data could be found in other proto files.

### Observation

The observation class contains the observation data for an actor (`ObservationData`). The type is generic (`bytes`) to accomodate the different observation classes defined for each actor (after serialization), and the snapshot and delta observations (which are defined in the `cogment.yaml` file).

The `snapshot` boolean, if set to True, indicates that the observation is a snapshot (i.e. full), and if False, indicates that the data is a delta encoding of the observation (i.e. changes only).

### ObservationSet

The observationSet class is used by the environment to send multiple observations (i.e. one per actors) to the orchestrator. The list of observations matches one-for-one with the list of actors.

### Actor IDs

Each actor within a trial is assigned an actor ID. Actor IDs are assigned deterministically from their order of instantiation within the `cogment.yaml` file, starting from 0.
