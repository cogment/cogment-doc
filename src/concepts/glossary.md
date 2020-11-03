# Glossary

Terminology is a very important part of understanding new concepts and learning how to use new technology. The words we use throughout our documentation may cause problems if one is not familiar with how we use those words; this is a glossary of terms for newcomers and seasoned developers alike. Some familiar terms may have additional caveats specifically added to their definition in the context of the Cogment Framework (generally for clarity).

[A][1]—B—C—D—[E][2]—[F][3]—G—[H][4]—I—J—K—L—[M][5]—N—[O][6]—[P][7]—Q—[R][8]—S—[T][9]—[U][10]—V—W—X—Y—Z

## A

### Actor

An actor is somebody or something who/which interacts with the environment by executing certain actions, taking observations, and receiving rewards (positive or negative) for this. An Actor can be an [Agent][11] (of any level of complexity and any type of flexibility, from bots to ML agents), or a human user.

### Actor Class

Each [Actor][12] always belongs to a single Actor Class. An Actor Class is primarily defined by its associated [Action Space][13], as a property of an [environment][14]. For example, pilot and passenger could be two different Actor Classes.

### Action

1. An Action is an interaction an [Actor][15] performs on the environment. Actions are picked from the [Action Space][16] of the [Actor Class][17] the Actor belongs to. For example, turning right.
2. A single element of an Action Space.

### Action Space

The set of actions an Actor can pick an Action from. There is one Action Space per [Actor Class][18].

### Agent

An agent is a non-human [Actor][19]. It can be based on any sort of decision-making underlying system, able to learn or not.

## E

### Environment

1. The environment is the set of rules defining how a trial evolves over time for any given use case. For example, to train a pilot [agent][20], a flight simulation would be the environment. [Actors][21] can interact with the environment itself, or with each other through the environment, within the boundaries of the environment ruleset (i.e. how an environment can change, from environmental rulesets or the actions of Actors in the environment).
2. A stateful instance of an environment.

### Environment State

An environment state is the specific set of conditions in which the environment is at a specific time (for example, when it is first instantiated). These conditions can be observable or not, and our [Framework][22] does not concern itself with the ones that are not.

## F

### Feedback

A feedback is a measure of an [Actor’s][23] performance within the environment. The feedback can be produced by the environment, and/or a different Actor. Feedbacks are sent to the [Orchestrator][24], which collates them into [rewards][25].

### Framework

These two elements combined are what we call the framework:

- [Orchestrator][26]
- SDKs

### Frontend

The interface, usually an app, that humans use to interact with the rest of the system; the software that turns humans into [Actors][27].

## H

### Human / Artificial Intelligence Interaction Loop Training

We call Human / AI interaction loop training the fundamental paradigm our [Framework][28] was build for: a continuous loop between humans and agents where they learn from each other. It’s a way to train [agents][29] in an environment where direct human interactions, whether between humans, between humans and the environment, or between humans and agents, provide live data to the agents (first part of the loop), _**as well as**_ a way for agents to interact with humans, either directly or through the environment (second part of the loop).

## M

### Message

Messages can be sent from any actor or the environment to any actor or the environment.  The message can be any protobuf message.  This creates channels between any set of actors and the environment.  These channels can be used for applications where communication between actors and the environment need to be outside of the standard observation and action spaces.

### Message space

A Message space defines all possible data in a [message][52] an [Actor][36] can receive from other Actors or the [environment][37].

### Model

A model is a representation, usually a mathematical one in our context, of a concept, structure, system, or an aspect of the real world. It is usually a simplified and abstracted representation.

## O

### Observation

An observation is the subset of the [environment state][30] that an [Actor][31] based its choice of [Action][32] on.

### Observation delta

An observation delta is the difference between two [observations][33]. Usually, we encode deltas from the past to the future.

### Observation transition

An observation transition is an observation delta between two consecutive [observations][34].

### Observation space

An Observation space is the set of all possible [observations][35] an [Actor][36] can make of an [environment][37].

### Orchestrator

The Orchestrator is the central piece of our framework; it’s an executable that handles several things:

- It circulates data flows between [Actors][38] (Humans and Agents) and [Environments][39].
- It dumps datasets in the chosen storage location.
- It compresses & encrypts data.
- It collates various [reward][40] sources (usually [environment][41] or actors) into a single reward for an Actor.
- It instantiates the [trials][42].

## P

### Plugin/extension

A plugin or extension adds functionality to our core framework.  
We provide plugins that handle special features such as Deployment, Dataset storage destinations, Analytics, that one may or may not choose to use alongside the core framework, depending on their specific needs.

### Protobuf/Protocol Buffer

A binary data format for serialized communication defined from a YAML config file ([protocol buffers](https://developers.google.com/protocol-buffers/)).

## R

### Reward

A reward is a single measure of an [Actor’s][43] performance. It is produced from at least one [feedback][44]. The reward is sent from the [Orchestrator][45] to the Actor.

### Reward function

A reward function describes how an [agent][46] "ought" to behave; what behaviours lead to [Rewards][47]. Note that in our case, Reward functions can be used to reward any [Actor][48], regardless of it being human or not.

### Reinforcement Learning (RL)

RL is a specific method to train [agents][49], using [reward functions][50].

## T

### Trial

A trial is a single run of a use case, with a beginning and end, populated with a single instance of the use case’s environment and its actors.

## U

### Use case

The problem one wants to solve.

[1]: #a
[2]: #e
[3]: #f
[4]: #h
[5]: #m
[6]: #o
[7]: #p
[8]: #r
[9]: #t
[10]: #u
[11]: #agent
[12]: #actor
[13]: #action-space
[14]: #environment
[15]: #actor
[16]: #action-space
[17]: #action-class
[18]: #actor-class
[19]: #actor
[20]: #agent
[21]: #actor
[22]: #framework
[23]: #actor
[24]: #orchestrator
[25]: #reward
[26]: #orchestrator
[27]: #actor
[28]: #framework
[29]: #agent
[30]: #environment-state
[31]: #actor
[32]: #action
[33]: #observation
[34]: #observation
[35]: #observation
[36]: #actor
[37]: #environment
[38]: #actor
[39]: #environment
[40]: #reward
[41]: #environment
[42]: #trial
[43]: #actor
[44]: #feedback
[45]: #orchestrator
[46]: #agent
[47]: #reward
[48]: #actor
[49]: #agent
[50]: #reward-function
[52]: #message
