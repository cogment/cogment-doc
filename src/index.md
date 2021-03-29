[![Cogment Homepage](https://img.shields.io/badge/-Homepage-ffbb00?style=flat)](https://cogment.ai/)
[![Cogment sources @ Github](https://img.shields.io/badge/Github-Cogment%20Sources-lightgrey?style=flat&logo=github)](https://github.com/cogment) [![Join us on the official Cogment discord](https://img.shields.io/discord/739822842450935963?style=flat&color=6f84d4&label=Cogment%27s%20Discord&logo=discord&logoColor=white)](https://discord.gg/55h7fnqdSJ)

# Cogment 1.0 Framework Overview

## What is Cogment?

The Cogment 1.0 framework is a high-efficiency, open source framework designed to enable the training of models in environments where humans and agents interact with the environment and each other continuously. It’s capable of distributed, multi-agent, multi-model training.

### When to use Cogment?

Cogment is designed to allow the training of complex agent architectures in complex environments, with human users in the loop. It is especially well suited to address multi-agent contexts, regardless of their learning mechanisms (or, for that matter, whether they are of the learning kind or not). Cogment also allows for the Actor's abstraction, meaning that human users and learning or non-learning agents alike are treated in the same way from a high level point of view, being interchangeable.

As such, Cogment is suited for, among others, these contexts:

- Easily bootstrapping a given system by using human users, or heuristic agents, or both, then transitioning seamlessly to ML implementations
- Architecture multiple ML approaches to contribute to a single role, either by balancing them through specific rulesets, or specific performance metrics, or any other criteria
- Comparing different agent types/implementations without requiring any change in the implementation of the environment

### When not to use Cogment

Cogment can be used in many other contexts it wasn't specifically designed for. However, for several types and scales of ML-powered projects, it may not be the most fitting approach:

- Simple projects focused around one learning agent
- Projects deployed only locally with no plans of larger scale distributed deployment

### Features

Cogment main features are:

- **Tech Stack Agnosticity.** With the use of protobufs and gRPC, Cogment allows the development of tech-heterogeneous components working together regardless of the tech stacks used to develop them. It is fully compatible with current tools, langages and commonly used techniques.
  &nbsp;

- **Multi-Method.** Cogment doesn't enforce any particular approach to agents implementation. It doesn't favor learning over non-learning agents, nor does it learning techniques over others.
  &nbsp;

- **Multi-Actor.** Cogment was designed to allow multiple agents and multiple human users (all "actors") to exist, train, and work together within the same environment, interacting with one another and their environment.
  &nbsp;

- **Multi-Reward** Multiple Reinforcement Learning (RL) agents can use any number of reward sources in a Cogment project, whether they are from human users, an environment (real or simulated), or other agents. The same is true for the kind or mechanic of those rewards.
- **Humans in the loop.** Interaction with human users is a core feature of the Cogment framework, at any step of a project from the bootstrapping to the deployment and productionalization. There is no enforced limit to the complexity of said interaction.
- **Multi-Experience learning.** Several deployments (instances) of a Cogment project can contribute to the learning of their agents in a parallel way, i.e. each instance contributing to the learning of a single implementation of an agent.
- **Actor hot-swap.** Cogment allows for the swapping in and out of an actor from one implementation of an agent to another, or from a human user to another, or from a human user to a trained or untrained agent, and vice-versa. You can for example use simulated humans for a while before switching in real users, or switch from AI to human control.
- **Custom agent architectures.** Cogment allows the architecturing behind an agent's role to be as complex and specific as needed; hybridation between techniques, in particular, can be used to build individual capabilities and ultimately assemble them into one complex agent.
- **Distributed computing & training.** The physical location of any given component or part of a Cogment's project does not have to be the same, and neither do instances of a deployed Cogment project. Training and use can all happen in a distributed way, running one large algorithm or an array of decentralized agents.
- **Live development.** There is virtually no difference between dev and prod versions of a Cogment project; any Cogment project can be developed in an iterative way, with any part of it being live-developed so iteration cycles between simulated and real environment, for example, can happen as quickly as possible.

### Components

The Cogment framework consists of multiple components:

- The **Orchestrator**, the _heart_ of a Cogment app, is in charge of running the components.
- The **SDKs** are used to build your Cogment app services and clients. The SDKs are currently available in Python and Javascript only.
- A **command like tool** to facilitate the creation of Cogment apps.

## First steps

The easiest way to get started is to use the `cogment` command line tool. Please see our [installation instructions](./introduction/installation.md) for details.

Before diving right in, we recommend taking the time to read the [Core concepts](./concepts/core-concepts.md) section, as well as our [glossary](./concepts/glossary.md), which details the terminology we use for several critical concepts of the Cogment Framework. You can then proceed to read on how to [install](./introduction/installation.md) the framework.

Last but not least, a [tutorial](./cogment/tutorial/introduction.md)
