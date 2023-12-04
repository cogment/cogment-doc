---
sidebar_position: 6
---

# Javascript SDK

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--js--sdk-%235217b8?style=for-the-badge&logo=github)](https://github.com/cogment/cogment-js-sdk) [![Latest release](https://img.shields.io/npm/v/@cogment/cogment-js-sdk?style=for-the-badge)](https://www.npmjs.com/package/@cogment/cogment-js-sdk)

## Installation

The simplest way to install the Javascript SDK is to just install it using npm:
`npm install @cogment/cogment-js-sdk`

## General usage

### The spec file

The specifications of a trial type are contained in a [spec file](./cogment-yaml.md) and the imported files defined in the spec. This file is typically named `cogment.yaml`.

For example, an [actor](../guide/core-concepts.md#actors) class is defined by its required observation space and action space.

These "spaces" are defined by using protobuf message types (from the imported files). [Observations and actions](../guide/core-concepts.md#observations--actions) will simply be instances of the appropriate type.

Messages and feedback user data don't have a set type, they can be any type as long as the receiver can manage that type. The type is determined by the provided message from the originator.

They will mostly arrive as an instance of `cogment.MessageBase` and have fields according to their definition in your proto files.

### Trial Parameters

The trial [parameters](./parameters.md) can come from the default parameters provided to the Orchestrator on startup, or from the pre-trial hooks (themselves provided to the Orchestrator on startup).

The parameters are mostly indepedent of the spec file (cogment.yaml), except that the active actors listed in the parameters must have their actor class match an actor class defined in the spec file.

Below, when we refer to the trial parameters, we mean the final parameters after any pre-trial hooks.

#### Compiling the spec file

In order to use the specification found in the spec file within Javascript scripts, it needs to be compiled into Javascript modules. This is done by a tool called "cogment-js-sdk-generate".

### CogSettings.js

All API entry points require a cogment specification object. This specification object can be determined
from the content of a project's spec file. As such, it should be generated using the `cogment-js-sdk-generate` tool

```
npx cogment-js-sdk-generate config.yaml
```

This will generate both a `CogSettings.js` file, as well as any required compiled protocol buffer files.

### Imports

Whether a script implements an actor or environment, it should import both the `cogment` module (generic Javascript SDK for Cogment) and the `cogSettings` module (project specific definitions created from the spec file).

```Javascript
import { cogSettings } from './CogSettings';
import * as cogment from '@cogment/cogment-js-sdk'
```

## class cogment.Context

Class to setup and run all the different aspects of trials.

### `constructor(userId, cogSettings)`

Parameters:

-   `userId`: _string_ - Identifier for the user of this context.
-   `cogSettings`: _cogment.CogSettings_ - Settings module associated with trials that will be run ([cogSettings](#cog_settings.py) namespace).

### `getController(endpoint)`

Method to get a controller instance to manage trials (start, stop, inquire, etc).

Parameters:

-   `endpoint`: _string_ - URL of the connection to the Orchestrator.

Return: _Controller_ - An instance of the Controller class used to manage trials.

### `async joinTrial(trialId, endpoint, actorName)`

Method for an actor to asynchronously join an existing trial. This task will normally end after the user implementation has exited.

Parameters:

-   `trialId`: _string_ - The UUID of the trial to join.
-   `endpoint`: _string_ - URL of the connection to the Orchestrator.
-   `actorName`: _string_ - Name of the actor joining the trial.

Return: void

### `registerActor(impl, actorName, actorClass)`

Method to register the asynchronous callback function that will run an actor for a trial.

Parameters:

-   `impl`: _async function(ActorSession instance)_ - Callback function to be registered.
-   `actorName`: _string_ - Name for the actor implementation being run by the given callback function.
-   `actorClass`: _string_ - The actor class name that can be run by the given callback function. The possible names are specified in spec file under section `actorClasses:name`. If the list is empty, this implementation can run any actor class.

Return: void

## class Controller

Class containing data and methods to control and manage trials.

### `async startTrial(trialConfig = undefined, trialIdRequested = undefined)`

Method to start a new trial. The parameters of the trial will be set by the pre-trial hooks (registered in `cogment.Context`), and the hooks will receive the provided trial config.

Parameters:

-   `trialConfig`: _cogment.MessageBase_ - Configuration for the trial. The type is specified in the spec file under the section `trial:config_type`. Can be `undefined` if no configuration is provided. This is provided to the first pre-trial hook.
-   `trialIdRequested`: _string_ - The trial identifier requested for the new trial. It must be unique among all active trials and a limited set of the latest ended trials (this list of trials can be retrieved with `getTrialInfo` or `watchTrial`). If provided, the Orchestrator will try to use this trialId, otherwise, a UUID will be created.

Return: _string_ - The newly started trial ID.

### `terminateTrial(trialIds, hard = false)`

Method to request the end of a trial.

Parameters:

-   `trialIds`: _string[]_ - The trial ID(s) to request to terminate. There must be at least one ID.
-   `hard`: _boolean_ - If `true`, the termination will be forced and not wait for any action or observation. If `false`, the trial will wait for the next tick, to end gracefully (i.e. wait for the next full set of actions and response observations).

Return: void

### `async getTrialInfo(trialIds)`

Method to get information about a trial.

Parameters:

-   `trialIds`: _string[]_ - The trial ID(s) from which to request information. If no ID is provided, returns information about all trials. Note that ended trials may only appear for a short time in this list after they have ended.

Return: _TrialInfo[]_ - List of trial information, one per trial. Can be empty if no trial matches.

### `async watchTrials(trialStateFilters=[])`

Generator method to iterate, in real-time, through all trial states matching the filters. When called, it will first iterate over the current states matching the filters, for all trials. Afterwards, it will iterate in real-time over the matching states as they change.

Parameters:

-   `trialStateFilters`: _cogment.TrialState[]_ - List of enum values from `cogment.TrialState` for which we are interested in receiving state changes.

Return: _generator(TrialInfo instance)_ - A generator for the state changes that arrive. The `TrialInfo` received here only contains the trial ID and the state.

### `async getActors(trialId)`

Method to get the list of configured actors in a trial.

Parameters:

-   `trialId`: _string_ - The trial ID from which to request the list of actors.

Return: ActorInfo[] - List of actors configured in this trial.

### `async getRemoteVersions()`

Method to get the versions from the remote Orchestrator.

Parameters: None

Return: _{[key: string]: string}_ - The key of the object is the name of the component (_string_), and the value is the version (_string_).

## class Session

Abstract class that manages aspects of a trial. Contains data and methods common to all sessions .

### `getTrialId()`

Method to get the UUID of the trial managed by this session.

Parameters: None

Return: _string_ - UUID of the trial.

### `getTickId()`

Method to get the current tick id of the trial (i.e. time step).

Parameters: None

Return: _number_ - The current tick id.

### `isTrialOver()`

Method to inquire if the current trial has ended.

Parameters: None

Return: _boolean_ - True if the trial has ended, false otherwise.

### `sendingDone()`

Method to notify the Orchestrator that all data for the trial, from this session, has been sent. This can be called only when the session is ending. When starting the session (see `ActorSession`), if the `autoDoneSending` parameter is True, this method should not be called, and if the parameter is False, it MUST be called to end the trial properly.

Parameters: None

Return: void

## class ActorSession extends Session

### `start(autoDoneSending=True)`

Method to start the actor. This method should be called before any other method in the session.

Parameters:

-   `autoDoneSending`: _boolean_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after receiving the last observation. If False, the user MUST call `sendingDone` to end the trial properly.

Return: void

### `async *eventLoop()`

Generator method to iterate over all events (observations, rewards, messages) as they are received. This will block and wait for an event.
When this generator exits, the callback function (registered with `registerActor`) should return to end the trial cleanly.
The generator will exit for various reasons indicating the end of the trial, a loss of communication with the orchestrator, or if the generator is sent "False".

Parameters: None

Return: _AsyncGenerator<RecvEvent\>_ - A generator for the events that arrive. The `RecvEvent` instances received from this generator will not contain actions. When receiving an observation in the event, the `this.doAction` method is normally used to "reply" (if the event type is `EventType.ACTIVE`).

### `doAction(action)`

Method to send actions to the environment.

Parameters:

-   `action`: _ActionT_ - An instance of the action space class specified in the corresponding section `actorClasses:action:space` of the spec file. If `undefined`, then no action space is sent (empty content) and the environment will receive a default initialized action space of the appropriate type.

Return: void

### `sendMessage(payload, to)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _cogment.MessageBase_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received.
-   `to`: _string[]_ - Targets of feedback. Each value could be the name of an actor in the trial, or the name of the environment (from `this.envName`). Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actorClass.*`" for all actors of a specific class (the `actorClass` must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.

Return: void

## enum cogment.TrialState

Enum representing the various states of trials.

-   UNKNOWN: Should not be used.
-   INITIALIZING: The trial is in the process of starting.
-   PENDING: The trial is waiting for its final parameters, before running.
-   RUNNING: The trial is running.
-   TERMINATING: The trial is in the process of terminating (either a request to terminate has been received or the last observation has been received).
-   ENDED: The trial has ended. Only a set number of ended trials will be kept (configured in the Orchestrator).

For further information on trial lifetime, check the [dedicated section](../guide/development-guide.mdx#trial-lifetime).

## class TrialInfo

Class enclosing the details of a trial.

`trialId`: _string_ - The trial ID to which the details pertain.

`state`: _cogment.TrialState_ - The current state of the trial.

`envName`: _string_ - The name of the environment running the trial.

`tickId`: _number_ - The time step that the information relates to. Only provided from a call to `getTrialInfo`.

`duration`: _number_ - The time (in nanoseconds) that the trial has run. Only provided from a call to `getTrialInfo`.

## class RecvEvent

Class representing a received event (for environments and actors). It can contain any combination of data according to the receiver needs, or even be empty, but it will always have a type.

`type`: _EventType_ - Type of event the enclosed data represents.

`observation`: _ObservationT_ - Observation data. This can only be received by actors. `undefined` if not present.

`actions`: _ActionT_ - Action data from actors. This can only be received by the environment. The list is empty if not present.

`rewards`: _Reward[]_ - Reward values and data. This can only be received by actors. The list is empty if not present.

`messages`: _MessageBase[]_ - Message data. The list is empty if not present.

### enum cogment.EventType

Enum representing the type of an event.

-   `EventType.NONE`: Empty event. This kind of event should never be received.

-   `EventType.ACTIVE`: Normal event from an active trial. Most events will be of this type.

-   `EventType.ENDING`: Events from a trial in the process of ending. For the environment, this means that these events contain the last actions from the actors, and the trial is awaiting a final observation. For the actors, this means that the trial is ending and no action can/need to be sent in response. Note that because of network timing, there may be `ACTIVE` events (e.g. rewards or messages) arriving after some `ENDING` events, but the trial is ending regardless.

-   `EventType.FINAL`: Final event for the trial. This does not contain data. The event loop will exit after this event is delivered. This event can be ignored if nothing needs to be done before exiting the loop.

For further information on trial lifetime, check the [dedicated section](../guide/development-guide.mdx#trial-lifetime).

## type ObservationT

Type containing the details of an actor's observation. This will be different depending on what the ActionSpace defined in your spec file contains

## type ActionT

Type containing the details of an action from an actor. This will be different depending on what the ActionSpace defined in your spec file contains

## class MessageBase

Base Class of all messages, this will contain different fields depending on what fields are in the specific message you are receiving (defined in proto files)

## type Reward

type containing the details of a received reward.

`tickId`: _number_ - The tick id (time step) for which the reward should be applied.

`receiverName`: _string_ - Name of the receiver for the reward (the name of an actor, or wildcard string).

`value`: _float_ - Value of the reward (aggregated from the sources)

`sources`: _IRewardSource[]_ - List of sources that gave this reward

## interface IRewardSource

`senderName`: _string_ - Name of the reward sender;

`value`: _number_ - Value of the reward;

`confidence`: _number_ - Confidence of this reward;

`userData`: _google.protobuf.IAny_ - Extra data;
