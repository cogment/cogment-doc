# Cogment Fundamentals Guide

## Introduction

Welcome to the Cogment Fundamentals guide. It contains information that is pertinent to both the [high-level SDK]() and the [low-level API]().

## Core Concepts

### Trials

A deployed Cogment project is tasked with running [trials][3]. Each trial is populated with its own [actors][4] that observe and interact with the trial's [environment][5].

As a [trial][6] runs, a few things happen:

- [Actors][7] choose and take [actions][8] based on their [observation][9] of the [environment][10].
- The environment updates itself based on the actions taken by the actors and generates updated observations.
- Multiple [Feedbacks][11] for the actors are generated either by the environment or other actors.
- Actors asynchronously receive [reward][12] information based on received feedbacks.
- The actors or the environment can send [messages][32] to actors or the environment.
- A datalog of the observation/action/reward/messages is produced and stored.

A [trial][22] begins at the request of a [frontend][23] application and finishes when either the frontend application requests the end, when a predefined amount of time has elapsed (either in real time, or number of updates), or if the trial does not see any activity for an extended period of time.

### Actors and actor classes

Each [actor][13] within a [trial][14] is defined primarily by what information it receives from the environment (its [observation space][15]), what actions it can perform (its [action space][16]), and what messages it can receive [Message space].

Two cogment actors that share the same observation space and action space are said to belong to the same [actor class][17].

An actor is controlled either by an [agent][18], or by a human. Whichever the case, the same process of generating [actions][19] based on [observations][20] remains the same, and they are treated as the same by the [environment][21].

## The cogment.yaml

At the heart of every Cogment project is a [yaml][24] file typically called `cogment.yaml`. Its primary role is to define the [actor classes][25] present within the project, including their nature and number participating in each [trial][26].

## Services

A deployed Cogment project consists of a cluster of service applications. These are composed of service applications provided by the cogment framework itself (depicted below in blue) and those implemented by the project (depicted below in orange) either by employing the [cogment SDK](/user-guide/sdk-python) or by directly implementing the [underlying protocol](/user-guide/low-level/).

![Screenshot](/img/network_simple.png)

### Environment service

The environment service is responsible for creating and updating environments for each trial. It must provide three functions:

**Start**: Create the initial observation set for a trial.

**Update**: Create an updated observation set given the actions of all actors within the trial.

**On_Message**: Be notified about a message sent from either an actor or the environment.

**End**: Cleanup any internal state related to a trial.

### Agent Service(s)

**Start**: Announce that an agent is requested for a trial.

**Decide**: Given an observation, choose an action.

**Reward**: Be notified about reward information associated with a previous decision.

N.B. Currently, live rewards are only sent for the previous time step. Retroactively updated rewards will still find their way into the datalog.

**On_Message**: Be notified about a message sent from either an actor or the environment.

**End**: Cleanup any internal state related to a trial

### Orchestrator

The Orchestrator is the glue that binds everything together. From the perspective of a framework user, it can be considered as the live interpreter of the `cogment.yaml` configuration file. It is the service that client applications will connect to in order to start and run trials.

### Envoy

The Orchestrator is not capable of handling traffic from web browsers by itself. So client applications using the Javascript API in the browser must connect to a translation proxy. That's where [envoy](https://envoyproxy.io) comes in. With a simple boilerplate configuration, it automatically translates the web-based protocol into the native version.

If a cogment project does not support web-based client applications, then the envoy proxy can be ommited from any deployment.

[3]: ./glossary.md#trial
[4]: ./glossary.md#actor
[5]: ./glossary.md#environment
[6]: ./glossary.md#triak
[7]: ./glossary.md#actor
[8]: ./glossary.md#action
[9]: ./glossary.md#observations
[10]: ./glossary.md#environment
[11]: ./glossary.md#feedback
[12]: ./glossary.md#reward
[13]: ./glossary.md#actor
[14]: ./glossary.md#trial
[15]: ./glossary.md#observation-space
[16]: ./glossary.md#action-space
[17]: ./glossary.md#actor-class
[18]: ./glossary.md#agent
[19]: ./glossary.md#action
[20]: ./glossary.md#observation
[21]: ./glossary.md#environment
[22]: ./glossary.md#trial
[23]: ./glossary.md#frontend
[24]: https://yaml.org/
[25]: ./glossary.md#actor-class
[26]: ./glossary.md#trial
[27]: ./glossary.md#actor-class
[28]: ./glossary.md#agent
[31]: ./glossary.md#observation
[32]: ./glossary.md#message
[32]: ./glossary.md#message-space
