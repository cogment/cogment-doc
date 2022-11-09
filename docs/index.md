---
title: Overview
description: An introduction to Cogment
sidebar_position: 1
---

# The Cogment Platform

## What is Cogment?

[Cogment](https://cogment.ai) is the first open source platform designed to address the challenges of continuously training humans and AI together. It is developed by [AI Redefined](https://ai-r.com), to enable AI practitioners to build, train and operate AI agents in simulated or real environments shared with humans.

### When to use Cogment?

Cogment borrows a lot of its formalism from [Reinforcement Learning (RL)](https://en.wikipedia.org/wiki/Reinforcement_learning), in particular [Markov Decision Processes (MDPs)](https://en.wikipedia.org/wiki/Markov_decision_process), and to [Multi-Agent Systems (MAS)](https://en.wikipedia.org/wiki/Multi-agent_system). This makes Cogment particularly well suited to implement Reinforcement Learning and Multi-Agent Reinforcement Learning (MARL) agents and training processes.

Cogment is designed to enable Humans and AIs to operate in shared environments, as such it is very adapted to any kind of Human-In-the-Loop Learning (HILL) process such as Imitation Learning (IL) / Behavior Cloning (BC), RL from human feedback or even Active Learning.

More generally, Cogment is designed to allow the training of complex agent architectures on **sequential decision-making tasks** in complex environments and supports Humans in the loop. It is especially well suited to address multi-agent contexts, regardless of their learning mechanisms (or, for that matter, whether they are of the learning kind or not). Cogment also relies on the Actor's abstraction, meaning that human users and learning or non-learning agents alike are treated in the same way from a high level point of view, rendering them interchangeable.

As such, Cogment is suited for, among others, these contexts:

-   Easily bootstrapping a given system by using human users, or heuristic agents, or both, then transitioning seamlessly to ML implementations
-   Architecture multiple ML approaches to contribute to a single role, either by balancing them through specific rulesets, or specific performance metrics, or any other criteria
-   Comparing different agent types/implementations without requiring any change in the implementation of the environment

### When not to use Cogment

Cogment can be used in many other contexts it wasn't specifically designed for. However, for several types and scales of ML-powered projects, it may not be the most fitting approach for:

-   Perception tasks trained on offline datasets
-   Simple projects focused around one learning agent
-   Projects deployed only locally with no plans of larger scale distributed deployment

### Components

The Cogment platform consists of multiple components:

-   The main [**Cogment CLI**](./reference/cli/index.md) includes the main components in a cross platform easily distributable package,
    -   The [**Orchestrator**](./reference/cli/orchestrator.md), the _heart_ of a Cogment app, is in charge of running the components,
    -   The [**Directory**](./reference/cli/directory/directory-server.md) is the "directory" where Cogment services are registered and can be found by clients and other services.
    -   The [**Trial Datastore**](./reference/cli/trial-datastore/trial-datastore-server.md), which stores and make available data generated while running Cogment,
    -   The [**Model Registry**](./reference/cli/model-registry.md), which versions and stores trained AI models to be used by Cogment agents,
-   The **SDKs** are used to build your Cogment app services and clients, SDKs are available in [Python](./reference/python.md) and [Javascript](./reference/javascript.md).

## First steps

Before diving right in, we recommend taking the time to read the [Core concepts](./guide/core-concepts.md) section which details the terminology we use for several critical concepts of Cogment. You can then proceed to read on how to [install](./reference/cli/index.md) the platform.

To get your hands dirty, proceed to the [tutorial](./guide/tutorial/index.md) for an introduction to all things Cogment.

## Citations

If you use **Cogment** in your research, please cite the [white paper](https://arxiv.org/abs/2106.11345) as follows:

```bibtex
@misc{air2021cogment,
    title={Cogment: Open Source Framework For Distributed Multi-actor Training, Deployment & Operations},
    author={AI Redefined and Sai Krishna Gottipati and Sagar Kurandwad and Clodéric Mars and Gregory Szriftgiser and François Chabot},
    year={2021},
    eprint={2106.11345},
    archivePrefix={arXiv},
    primaryClass={cs.AI}
}
```
