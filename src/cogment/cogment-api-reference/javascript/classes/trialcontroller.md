Controller for interacting with trials in the Cogment framework. Each instance is bound to
[`CogSettings`](../interfaces/cogsettings.md),
[`TrialActor's`](../interfaces/trialactor.md) [`ActorImplementation's`](../modules.md#actorimplementation) and gRPC connections to
the Cogment framework.

## Methods

### getActiveActors

▸ **getActiveActors**(): [*TrialActor*](../interfaces/trialactor.md)[]

A list of [`TrialActor's`](../interfaces/trialactor.md) associated to this trial.

**Returns:** [*TrialActor*](../interfaces/trialactor.md)[]

- The trial actors for this trial.

Defined in: [cogment/TrialController.ts:101](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L101)

___

### getTriaId

▸ **getTriaId**(): *string*

The id of any started or joined trial.

**Returns:** *string*

- The trial id

Defined in: [cogment/TrialController.ts:109](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L109)

___

### getTrialInfo

▸ **getTrialInfo**(`trialId`: *string*): *Promise*<TrialInfoReply\>

Get trial information for a given trial.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trialId` | *string* | Id of the trial to retrieve info for.    |

**Returns:** *Promise*<TrialInfoReply\>

Defined in: [cogment/TrialController.ts:120](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L120)

___

### isTrialOver

▸ **isTrialOver**(`trialId`: *string*): *Promise*<boolean\>

Check if a given trial is completed.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trialId` | *string* | the id of the trial to check.    |

**Returns:** *Promise*<boolean\>

Defined in: [cogment/TrialController.ts:141](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L141)

___

### joinTrial

▸ **joinTrial**(`trialId`: *string*, `trialActor?`: [*TrialActor*](../interfaces/trialactor.md)): *Promise*<[*JoinTrialReturnType*](../modules.md#jointrialreturntype)\>

Join a trial given a trial id.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trialId` | *string* | The trialId of the trial to join.   |
`trialActor?` | [*TrialActor*](../interfaces/trialactor.md) | The TrialActor configuration to join as.    |

**Returns:** *Promise*<[*JoinTrialReturnType*](../modules.md#jointrialreturntype)\>

Defined in: [cogment/TrialController.ts:151](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L151)

___

### startTrial

▸ **startTrial**(`actorClass`: *string*, `trialConfig?`: *Message*): *Promise*<AsObject\>

Start a new trial.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`actorClass` | *string* | The name of an actor_class corresponding to [`cogment.yaml`](../interfaces/cogmentyaml.md)   |
`trialConfig?` | *Message* | A TrialConfig protobuf that will be passed to any pre-hooks configured in   [`cogment.yaml`](../interfaces/cogmentyaml.md#pre_hooks)   |

**Returns:** *Promise*<AsObject\>

- A trial start response

Defined in: [cogment/TrialController.ts:204](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L204)

___

### terminateTrial

▸ **terminateTrial**(`trialId`: *string*): *Promise*<void\>

Terminate a trial.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trialId` | *string* | Id of the trial to terminate.    |

**Returns:** *Promise*<void\>

Defined in: [cogment/TrialController.ts:238](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L238)

___

### version

▸ **version**(): *Promise*<[*VersionReturnType*](../modules.md#versionreturntype)\>

Request the version from the Cogment framework.

**Returns:** *Promise*<[*VersionReturnType*](../modules.md#versionreturntype)\>

Defined in: [cogment/TrialController.ts:258](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L258)

___

### watchTrials

▸ **watchTrials**(`filter?`: (*0* \| *2* \| *1* \| *3* \| *4* \| *5*)[]): *AsyncGenerator*<TrialListEntry, void, void\>

Watch cogment for trial changes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`filter?` | (*0* \| *2* \| *1* \| *3* \| *4* \| *5*)[] | An enum of TrialState's to watch trial changes of.    |

**Returns:** *AsyncGenerator*<TrialListEntry, void, void\>

Defined in: [cogment/TrialController.ts:277](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L277)
