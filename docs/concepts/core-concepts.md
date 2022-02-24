---
title: Core Concepts
sidebar_position: 1
---

# Cogment Core Concepts Guide

Welcome to the Cogment core concepts guide. It contains information that is pertinent to both the [high-level SDK](../cogment/cogment-api-guide.mdx) and the [low-level API](../cogment/cogment-low-level-api-guide/overview.md).

## Core Concepts

Cogment is built around concepts adapted from multi-agent systems (agents, environment), Markov decision processes (action and observation space) and reinforcement learning (trials, rewards).

### Trials

[Trials](./glossary.md#trial) are what a Cogment deployment runs. They enable [Actors](./glossary.md#actors) to interact with their [Environment](./glossary.md#environment). Trials are started by clients connecting to Cogment. A trial can end either by being terminated from a client or end by itself, for example once a specific state of the Environment is reached.

During the trial:

-   The [Environment](./glossary.md#environment) generates [**observations**](./glossary.md#observation) of its internal state and sends them to the [actors](./glossary.md#actor).
-   Given these [observations](./glossary.md#observation), each [actor](./glossary.md#actor) chooses and sends an [**action**](./glossary.md#action).
-   The [Environment](./glossary.md#environment) receives the [actions](./glossary.md#action) and updates its state.
-   [**Rewards**](./glossary.md#reward) can be sent to the [actors](./glossary.md#actor) from either the environment or other actors.
-   [Actors](./glossary.md#actor) receive [**rewards**](./glossary.md#reward).
-   The [actors](./glossary.md#actor) or the [environment](./glossary.md#environment) can send [**messages**](./glossary.md#message) to actors or the environment.
-   A log of the activity during the trial (observations, actions, rewards & messages) is produced and can be stored.

A trial is defined by the participating [Actors](./glossary.md#actor) and the host [Environment](./glossary.md#environment). As a concept, Trials are quite close to Reinforcement Learning's **Episodes**, i.e. all the states that come between an initial state and a terminal state. However, because Cogment can be used outside of an RL context, we prefer using the more generic term of Trial.

### Actors

[Actors](./glossary.md#actor) within a trial instantiate [actor classes](./glossary.md#actor-class) defined by the nature of the information they receive from the [environment](./glossary.md#environment), their [observation space](./glossary.md#observation-space), and what actions they can perform, their [action space](./glossary.md#action-space).

In Cogment, the observation and action space are defined as typed data structures. In particular, Cogment uses [protobuf](./glossary.md#protocol-buffer) as a format to specify these data structures. This typing defines both an interface contract between the [Actors](./glossary.md#actor) and the [Environment](./glossary.md#environment) and helps convey semantic information, thus facilitating the independent design and development of both.

An [Actor](./glossary.md#actor) might be controlled either by a software [Agent](./glossary.md#agent), or by a Human. Whichever the case, the process of generating [actions](./glossary.md#action) based on [observations](./glossary.md#observation) remains the same, and the [Environment](./glossary.md#environment) treats them the same.

Some actors connect to the trial (we call them "client" actors) and others will wait for the trial to connect to them (we call these "service" actors).

### Environment

The [Environment](./glossary.md#environment) is the context within which the [Trial](./glossary.md#trial) takes place. The Environment receives the [actions](./glossary.md#actions) done by the actors, usually updates an internal state, and generates an [observation](./glossary.md#observation) for each [Actor](./glossary.md#actor).

The Environment is the main integration point between Cogment and an external system, either a **simulation** or a **real world system**.

## The specifications file

At the heart of every Cogment project is a [YAML](https://yaml.org) file typically called `cogment.yaml`. Its primary role is to define the [actor classes](./glossary.md#actor-class) present within the project, including their [action](./glossary.md#action-space) & [observation spaces](./glossary.md#observation-space).

## Architecture

Running trials with Cogment usually involves the deployment of a cluster of services and clients. These components are either provided by the Cogment framework, depicted below in blue, or implemented for a particular project, depicted below in orange.

![Cogment Architecture - Simple](./cogment_architecture_simple.png)

User implemented components use one of the [Cogment SDKs](../cogment/cogment-api-guide.mdx) or directly implement the [underlying protocol](../cogment/cogment-low-level-api-guide/overview.md). Components communicate using [gRPC](https://grpc.io), clients can also communicate in a web-friendly way using [gRPC-Web](https://grpc.io/docs/platforms/web/) and [grpcwebproxy](https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy).

### Orchestrator

The Orchestrator is the glue that binds everything together. It is responsible for running the [trials](./glossary.md#trial) and contacting other services as needed to ensure their execution.

The key aspect of Cogment's orchestrator is its capacity to handle a number of network connections in parallel while keeping its responsiveness.

### Controller

The Controller is a key part of using Cogment, it initiates communication with the Orchestrator to control the execution of [trials](./glossary.md#trial). It is responsible for starting [Trials](./glossary.md#trial), retrieving and watching their state (including the end of the trial), or requesting trial termination.

### Environment

The Environment implementation is accessed by the [Orchestrator](./glossary.md#orchestrator) to run the [Environment](./glossary.md#environment) during [Trials](./glossary.md#trial).

Using one of [Cogment's SDKs](../cogment/cogment-api-guide.mdx), the Environment can be implemented as a function integrating a _"state of the world"_ with the [Trial](./glossary.md#trial). This function performs the following tasks during the Trial:

-   Generate [Observations](./glossary.md#observation) from the current _state of the world_, for example retrieving the visible objects from a 3D simulation.
-   Apply the [Actions](./glossary.md#action), thus updating the _state of the world_, for example changing the velocity of a moving vehicle in a race simulation.
-   Evaluate the performance of [Actors](./glossary.md#actor) and send them [Rewards](./glossary.md#reward), for example by checking if a vehicle crossed the finish line in a race simulation.
-   Send and receive direct messages.

### Actors

Actors can be implemented in two different ways, either as a service or as a client. **Service Actor** implementations are accessed by the [Orchestrator](./glossary.md#orchestrator) during [Trials](./glossary.md#trial), while **Client Actor** implementations join a Trial by initiating the communication with the Orchestrator. Client Actors implementations can _reach_ a Cogment deployment through [NAT traversal](https://en.wikipedia.org/wiki/NAT_traversal). This makes them particularly well-suited to implement human-driven Actors, in web-browsers for example.

Using one of [Cogment's SDKs](../cogment/cogment-api-guide.mdx) Actors can be implemented as functions handling the integration between a decision-making Actor ([software agent](./glossary.md#agent) or Human) and the [Trial](./glossary.md#trial). This function performs the following tasks during the Trial:

-   Receive [Observations](./glossary.md#observation) and do [Actions](./glossary.md#action) in response, for example vectorizing the retrieved observation, feeding it to a neural network and converting its output to an Action.
-   Receive [Rewards](./glossary.md#reward), for example using them to update a neural network.
-   Send and receive direct messages.

Please note that rewards can also be retrieved after the fact using an [activity logger](#additional-optional-services).

### Additional components

On top of the core components described above, a Cogment deployment can include these additional ones:

-   [**CLI**](../cogment-components/cli.md) is the command line tool used to bootstrap and build Cogment projects.
-   **Datalog** services can be used to listen to the activity during a trial (actions, observations, rewards, messages) in order to, for example, store these data for the offline training of AI agents. [**Trial Datastore**](../cogment-components/trial-datastore.md) is an out-of-the-box implementation of this.
-   [**Model Registry**](../cogment-components/model-registry.md) handles the storage and dispatch of AI models trained with Cogment and used by the actors.
-   **Pre-Trial Hooks** can be used to dynamically setup Trials from a given configuration, for example changing the number of Actors or pointing to other Environment or Actor implementations.
-   [**Metrics & Dasboard**](../cogment-components/dashboard.md) provides a solution to monitor and visualize various metrics from the services.

## Components availability summary

The following table summarizes how each component can either be implemented or used out of the box.

| Component       | Out-of-the-box                     | Python SDK                                         | Javascript SDK                                  | gRPC API                                                 |
| --------------- | ---------------------------------- | -------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| Orchestrator    | ✅ [`cogment-orchestrator`][13]    |                                                    |                                                 | ✅ implement [Control API][4] & [Client Actor API][2]    |
| Controller      |                                    | ✅ [get controller][10]                            | ✅ [get controller][18]                         | ✅ use [Control API][4]                                  |
| Environment     |                                    | ✅ [register environment impl][9] & [serve][8]     |                                                 | ✅ implement [Environment API][3]                        |
| Actor (Service) |                                    | ✅ [register actor impl][7] & [serve][8]           |                                                 | ✅ implement [Service Actor API][1]                      |
| Actor (Client)  |                                    | ✅ [register actor impl][7] & join trial           | ✅ [register actor impl][19] & [join trial][20] | ✅ use [Client Actor API][2]                             |
| CLI             | ✅ [`cogment-cli`][15]             |                                                    |                                                 |                                                          |
| Trial Datastore | ✅ [`cogment-trial-datastore`][16] | ✅ [register datalog impl][11] & [serve][8]        |                                                 | ✅ implement [Datalog API][5] & Trial Datastore API (🚧) |
| Model Registry  | ✅ [`cogment-model-registry`][17]  |                                                    |                                                 | ✅ implement Model Registry API (🚧)                     |
| Pre Trial Hook  |                                    | ✅ [register pre trial hook impl][11] & [serve][8] |                                                 | ✅ implement [Pre Trial Hook API][6]                     |
| Metrics         | ✅ [`cogment-metrics`][15]         |                                                    |                                                 |                                                          |
| Dashboard       | ✅ [`cogment-dashboard`][15]       |                                                    |                                                 |                                                          |

[1]: ../cogment/cogment-low-level-api-guide/grpc.md#service-actor-api
[2]: ../cogment/cogment-low-level-api-guide/grpc.md#client-actor-api
[3]: ../cogment/cogment-low-level-api-guide/grpc.md#environment-api
[4]: ../cogment/cogment-low-level-api-guide/grpc.md#control-api
[5]: ../cogment/cogment-low-level-api-guide/grpc.md#datalog-api
[6]: ../cogment/cogment-low-level-api-guide/grpc.md#hook-api
[7]: ../cogment/cogment-api-reference/python.md#register_actorself-impl-impl_name-actor_classes
[8]: ../cogment/cogment-api-reference/python.md#async-serve_all_registeredself-served_endpoint-prometheus_port-8000
[9]: ../cogment/cogment-api-reference/python.md#register_environmentself-impl-impl_name-default
[10]: ../cogment/cogment-api-reference/python.md#get_controllerself-endpoint
[11]: ../cogment/cogment-api-reference/python.md#register_datalogself-impl
[12]: ../cogment/cogment-api-reference/python.md#register_pre_trial_hookself-impl
[13]: ../cogment-components/orchestrator.md
[14]: ../cogment-components/cli.md
[15]: ../cogment-components/dashboard.md
[16]: ../cogment-components/trial-datastore.md
[17]: ../cogment-components/model-registry.md
[18]: ../cogment/cogment-api-reference/javascript.md/#getcontrollerendpoint
[19]: ../cogment/cogment-api-reference/javascript.md#registeractorimpl-actorname-actorclass
[20]: ../cogment/cogment-api-reference/javascript.md#async-jointrialtrialid-endpoint-actorname
