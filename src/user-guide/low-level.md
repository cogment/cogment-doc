# Cogment Low-Level API guide

## Who is this for

- Projects that involve tech stacks for which there is no high-level support yet.
- Developers of the framework itself.
- Curious people.

## Prerequisites

The actual implementation of the Low-Level API uses gRPC.  As this document is not meant to teach how to use the gRPC protocol and/or libraries, it will be assumed that the reader understands these concepts already. (insert tlink to gRPC documentation here)

## Differences from the High-Level API

The high-level API takes a very object-oriented approach to trial management. Starting a trial creates an instance of an environment, as well as instances of agents.

## gRPC services

The low-level API is fully described within the gRPC service definitions found in the `api/cogment` directory of the cogment framework source.

## Agent Service

`api/cogment/agent.proto` describes the service that agent applications have to implement.

- `Start()` is called when a trial starts.
- `End()` is called when a trial ends.
- `Decide()` is called to request an action from the agent.
- `Reward()` is called to inform the agent of received feedback.
- `OnMessage()` is called to inform the agent of received messages.

## Environment Service

`api/cogment/environment.proto` describes the service that agent applications have to implement.

- `Start()` is called when a trial starts.
- `End()` is called when a trial ends.
- `Update()` is called to request an updated set of observations based on fresh actions.
- `OnMessage()` is called to inform the environment of received messages.

### Observation sets

The observations created by the environment are sent back to the orchestrator using a two-stage encoding. 

### Delta encodings

If the environment returns delta observations by setting the `snapshot` flag to `false`, 

## Frontend API

`api/cogment/orchestrator.proto` describes the service the orchestrator exposes that frontend applications use to create and manipulate trials

## Actor IDs

Each actor within a trial is assigned an actor ID. actor IDs are assigned deterministically from their order of instantiation within the `cogment.yaml` file, starting from 0.