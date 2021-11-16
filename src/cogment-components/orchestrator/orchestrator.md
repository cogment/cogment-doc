# Orchestrator

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--orchestrator-%23ffb400?style=flat-square&logo=github)](https://github.com/cogment/cogment-orchestrator) [![Latest Release](https://img.shields.io/docker/v/cogment/orchestrator?label=docker%20release&sort=semver&style=flat-square)](https://hub.docker.com/r/cogment/orchestrator)

Cogment Orchestrator is an **out-of-the-box** component. It is the central entity in the framework that ties all the services together. From the perspective of a Cogment user, it can be considered as the live interpreter of the [`cogment.yaml` configuration file](../../cogment/cogment-api-guide.md#the-cogmentyaml-file). It is the service that client applications will connect to in order to start and run trials.

## Usage

<!-- prettier-ignore -->
!!! note
    After initializing your project using [`cogment init`](../../cogment/tutorial/1-bootstrap-and-data-structures.md), you should already have everything setup for a standard usage. For a fully manual setup refer to the dedicated [section](#setup).

The Orchestrator is central to any Cogment usage, please refer to the [**API guide**](../../cogment/cogment-api-guide.md) to learn how to interact with it using the high level APIs provided by the Cogment SDKs.

## Options

Typically, the orchestrator would be configured via `Dockerfile`. For example:

```
FROM cogment/orchestrator:v1.0.3

# Set environment variables
ENV TRIAL_LIFECYCLE_PORT=9000
ENV TRIAL_ACTOR_PORT=9001

# The orchestrator itself is the entrypoint.
# You can set command line options via the CMD
CMD ["--config=/some/path/cogment.yaml", "--loglevel=debug"]
```

#### Config

Path to the cogment.yaml file, relative to the current working directory.

-   Default: 'cogment.yaml`
-   Command line: `--config=#`

### Logging

#### Log Level

The port to listen for trial lifecycle messages on

-   Values: `off`, `error`, `warning`, `info`, `debug`, `trace`
-   Default: `info`
-   Command line: `--log_level=#`

#### Daily Logger

Base file for daily log output

-   Default: N/A
-   Command line: `--log_file=#`

### Ports

#### Prometheus Port

The port to broadcast prometheus metrics on

-   Default: N/A
-   Environment Variable: `PROMETHEUS_PORT`
-   Command line: `--prometheus_port=#`

#### Actor Port

The port for the `cogment.ActorEndpoint` service

-   Default: `9000`
-   Environment Variable: `TRIAL_ACTOR_PORT`
-   Command line: `--lifecycle_port=#`

#### lifecycle port

The port for the `cogment.TrialLifecycle` service

-   Default: `9000`
-   Environment Variable: `TRIAL_LIFECYCLE_PORT`
-   Command line: `--lifecycle_port=#`

### SSL

#### Private Key

File containing PEM encoded private key.

-   Default: N/A
-   Command line: `--private_key=#`

#### Root Cert

File containing a PEM encoded trusted root certificate.

-   Default: N/A
-   Command line: `--root_cert=#`

#### Trust Chain

File containing a PEM encoded trust chain.

-   Default: N/A
-   Command line: `--trust_chain=#`

### Low level gRPC API

The Orchestrator implements two gRPC endpoints that are specified as part of the Cogment API:

-   [The Control API `TrialLifeCycle`](../../cogment/cogment-low-level-api-guide/grpc.md#control-api) that defines how to manage trial execution.
-   [The Client Actor API `ClientActor`](../../cogment/cogment-low-level-api-guide/grpc.md#client-actor-api) that enables [client actors](../../cogment/cogment-api-guide.md#service-actor-client-actor) to join trials.

## Setup

<!-- prettier-ignore -->
!!! warning
    🚧 under construction
