# Orchestrator

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--orchestrator-%23ffb400?style=flat-square&logo=github)](https://github.com/cogment/cogment-orchestrator) [![Latest Release](https://img.shields.io/docker/v/cogment/orchestrator?label=docker%20release&sort=semver&style=flat-square)](https://hub.docker.com/r/cogment/orchestrator)

Cogment Orchestrator is an **out-of-the-box** component. It is the central entity in the framework that ties all the services together. From the perspective of a Cogment user, it can be considered as the live interpreter of the [`cogment.yaml` configuration file](../../cogment/cogment-api-guide.md#the-cogmentyaml-file). It is the service that client applications will connect to in order to start and run trials.

## Usage

<!-- prettier-ignore -->
!!! note
    After initializing your project using [`cogment init`](../../cogment/tutorial/1-bootstrap-and-data-structures.md), you should already have everything setup for a standard usage. For a fully manual setup refer to the dedicated [section](#setup).

The Orchestrator is central to any Cogment usage, please refer to the [**API guide**](../../cogment/cogment-api-guide.md) to learn how to interact with it using the high level APIs provided by the Cogment SDKs.

### Low level gRPC API

The Orchestrator implements two gRPC endpoints that are specified as part of the Cogment API:

-   [The Control API `TrialLifeCycle`](../../cogment/cogment-low-level-api-guide/grpc.md#control-api) that defines how to manage trial execution.
-   [The Client Actor API `ClientActor`](../../cogment/cogment-low-level-api-guide/grpc.md#client-actor-api) that enables [client actors](../../cogment/cogment-api-guide.md#service-actor-client-actor) to join trials.

## Setup

<!-- prettier-ignore -->
!!! warning
    🚧 under construction
