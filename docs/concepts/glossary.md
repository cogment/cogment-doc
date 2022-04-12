# Glossary

Terminology is a very important part of understanding new concepts and learning how to use new technology. The words we use throughout our documentation may cause problems if one is not familiar with how we use those words; this is a glossary of terms for newcomers and seasoned developers alike. Some familiar terms may have additional caveats specifically added to their definition in the context of the Cogment Framework (generally for clarity).

[A](#a)—B—C—D—[E](#e)—[F](#f)—G—[H](#h)—I—J—K—L—[M](#m)—N—[O](#o)—[P](#p)—Q—[R](#8)—S—[T](#t)—[U](#u)—V—W—X—Y

## A

### Actor

An actor is somebody or something who/which interacts with the environment by executing certain actions, taking observations in, and receiving rewards (positive or negative) for this interaction. An Actor can be an [Agent](#agent) (of any level of complexity and any type of flexibility, from bots to ML agents), or a human user.

### Actor Class

Each [Actor](#actor) always belongs to a single Actor Class. An Actor Class is primarily defined by its associated [Action Space](#action-space), as a property of an [environment](#environment). For example, pilot and passenger could be two different Actor Classes.

### Action

1. An Action is an interaction an [Actor](#actor) performs on the environment. Actions are picked from the [Action Space](#action-space),
2. A single element of an Action Space.

### Agent

We usually call agent any non-human [Actor](#actor). Agents can use any sort of decision-making underlying system, able to learn or not.

## C

### Configurations

The configurations (or "configs") are defined, set and referenced by users for user components and do not affect the rest of Cogment. They refer to the protobuf messages defined in the trial specifications in the `config` sections. A "trial config" may be given at the start of a new trial. Ultimately, the configurations and parameters for a trial are managed by the pre-trial hooks.

## E

### Environment

1. The environment is the set of rules defining how a trial evolves over time for any given use case. For example, to train a pilot [agent](#agent), a flight simulation would be the environment. [Actors](#actor) can interact with the environment itself, or with each other through the environment, within the boundaries of the environment ruleset (i.e. how an environment can change, from environmental rulesets or the actions of Actors in the environment).
2. A stateful instance of an environment.

### Environment State

An environment state is the specific set of conditions in which the environment is at a specific time (for example, when it is first instantiated). These conditions can be observable or not, and our [Framework](#framework) does not concern itself with the ones that are not.

## F

### Framework

These two elements combined are what we call the framework:

-   [Orchestrator](#orchestrator)
-   SDKs

### Frontend

The interface, usually an app, that humans use to interact with the rest of the system; the software that turns humans into [Actors](#actor).

## H

### Human - Artificial Intelligence Interaction Loop Training

We call Human - AI interaction loop training the fundamental paradigm our [Framework](#framework) was build for: a continuous loop between humans and agents where they learn from each other. It’s a way to train [agents](#agent) in an environment where direct human interactions, whether between humans, between humans and the environment, or between humans and agents, provide live data to the agents (first part of the loop), _**as well as**_ a way for agents to interact with humans, either directly or through the environment (second part of the loop).

## M

### Message

Messages can be sent from any actor or the environment to any [actor](#actor) or the [environment](#environment). The message can be any protobuf class. This creates channels between any set of [actors](#actor) and the [environment](#environment). These channels can be used for applications where communication between actors and the environment need to be outside of the standard observation and action spaces.

### Model

A model is a representation, usually a mathematical one in our context, of a concept, structure, system, or an aspect of the real world. It is usually a simplified and abstracted representation.

## O

### Observation

An observation is the subset of the [environment state](#environment-state) that an [Actor](#actor) based its choice of [Action](#action) (or lack thereof) on.

### Observation transition

An observation transition is an observation delta between two consecutive [observations](#observation).

### Observation space

An Observation space is the set of all possible [observations](#observation) an [Actor](#actor) can make of an [environment](#environment).

### Orchestrator

The Orchestrator is the central piece of our [framework](#framework); it’s part of the main [Cogment executable](../cogment/orchestrator.md) and handles several things:

-   It circulates data flows between [Actors](#actor) and [Environments](#environment).
-   It dumps datasets in the chosen storage location.
-   It compresses & encrypts data.
-   It collates various [reward](#reward) sources (usually [environment](#environment) or [actors](#actor)) into a single reward for an Actor.
-   It instantiates the [trials](#trial).

## P

### Parameters

The parameters (or "params") define everything that is specific to a trial, and control aspects of Cogment for that trial. Default parameters can be given at the start of the Orchestrator. Ultimately, the configurations and parameters for a trial are managed by the pre-trial hooks.

### Plugin/extension

A plugin or extension adds functionality to our core [framework](#framework).
We provide plugins that handle special features such as Deployment, Dataset storage destinations, Analytics, that one may or may not choose to use alongside the core framework, depending on their specific needs.

### Protocol Buffer

A binary data format for serialized communication, `.proto` files are used to specify the available data structures. You can learn more at <https://developers.google.com/protocol-buffers/>.

## R

### Reward

1. A sent reward is a measure of an [Actor’s](#actor) performance within the environment at a given [tick](#tick). The reward can be sent by the environment, and/or a different Actor. They are sent to the [Orchestrator](#orchestrator), which collates them before they are received by the target actor.

2. A received reward is a single measure of an [Actor’s](#actor) performance. It is produced when at least one reward is sent to the actor at a given [tick](#tick).

### Reward function

A reward function describes how an [agent](#agent) "ought" to behave; what behaviours lead to [Rewards](#reward). Note that in our case, Reward functions can be used to reward any [Actor](#actor), regardless of it being human or not.

### Reinforcement Learning (RL)

RL is a specific method to train [agents](#agent), using [reward functions](#reward-function).

## S

## Specifications

The specifications (or “specs”) are the operational aspects of a type of trial (typically found in a file named "cogment.yaml"). The file is fed to the Cogment CLI to generate helpful SDK modules (e.g. "cog_settings.py" and various "xxx_pb2.py" for the Python SDK). These modules are required by the Cogment SDKs. The Orchestrator is independent of the specifications, but some of the trial parameters may be dependent on these specifications (e.g. class name of actors).

## T

### Tick

A tick is a discrete timestep between two [states of the environment](#environment-state). In our [Framework](#framework), ticks within a trial are numbered.

### Trial

A trial is a single run of a [use case](#use-case), with a beginning and end, populated with a single instance of the use case’s [environment](#environment) and its [actors](#actor).

## U

### Use case

The problem one wants to solve.
