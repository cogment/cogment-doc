# Cogment Low-Level API guide

## Who is this for

-   Projects that involve tech stacks for which there is no high-level support yet.
-   Developers of the framework itself.
-   Curious people.

## Prerequisites

The actual implementation of the Low-Level API uses gRPC. As this document is not meant to teach how to use the [gRPC](https://grpc.io) protocol and/or libraries, it will be assumed that the reader understands these concepts already.

## Differences from the High-Level API

The high-level API takes a very object-oriented approach to trial management. Starting a trial creates an instance of an environment, as well as instances of agents.

## gRPC services

The low-level API is fully described within the gRPC service definitions found in the `api/cogment` directory of the cogment framework source.

### Actor Services

`api/cogment/agent.proto` describes the service that service actor applications have to implement. And `api/cogment/orchestrator.proto` describes the service that client actor applications have to implement.

-   `RunTrial()` is called to run a trial with the actor.

### Environment Service

`api/cogment/environment.proto` describes the service that environment applications have to implement.

-   `RunTrial()` is called to run a trial.

### Controller API

`api/cogment/orchestrator.proto` describes the service the orchestrator exposes that frontend applications use to create and manipulate trials. It is usually refered to as the Controller functionality because in the SDK you get a controller object that exposes these functionalities.

-   `StartTrial()` to request the start of a new trial.
-   `TerminateTrial()` to request the end of the trial.
-   `GetTrialInfo()` to get inforamtion from one or more trials.
-   `WatchTrials()` to get streaming information about the state of all trials.

### Data Log Exporter API

`api/cogment/data.proto` describes the services provided to save all trial data (for archival, replay or offline analysis).

-   `OnLogSample()` to log all data samples and parameters from a trial. A sample is normally all the data from a single time step.

### Hooks API

`api/cogment/hooks.proto` describes the hook services provided to allow per trial configuration changes at runtime.

-   `OnPreTrial()` is called before a trial starts.

## Common Data

Most of the common data is found in `api/cogment/common.proto`, but other "common" data could be found in other proto files.

### Observation

The observation class contains the observation data for an actor. The type is generic (`bytes`) to accomodate the different observation classes defined for each actor (after serialization).

### ObservationSet

The observationSet class is used by the environment to send multiple observations (i.e. one per actors) to the orchestrator. The list of observations matches one-for-one with the list of actors.
