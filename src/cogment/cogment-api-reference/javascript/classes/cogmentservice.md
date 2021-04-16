Instantiate a new CogmentService that is bound to [`CogSettings`](../interfaces/cogsettings.md) and gRPC clients. This class
tracks registered actors and is used for creating [`TrialController's`](trialcontroller.md)

## Methods

### createTrialController

▸ **createTrialController**(): [*TrialController*](trialcontroller.md)

Return a TrialController configured with registered TrialActor's, CogSettings and gRPC clients.

**Returns:** [*TrialController*](trialcontroller.md)

Defined in: [cogment/CogmentService.ts:84](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/CogmentService.ts#L84)

___

### registerActor

▸ **registerActor**<ActionT, ObservationT, RewardT\>(`actorConfig`: [*TrialActor*](../interfaces/trialactor.md), `actorImpl`: [*ActorImplementation*](../modules.md#actorimplementation)<ActionT, ObservationT, RewardT\>): *void*

Register a new actor that will participate in the trial. The actor must be defined in cogment.yaml

#### Type parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ActionT` | *Message*<ActionT\> | the action space type for this actor class   |
`ObservationT` | *Message*<ObservationT\> | the observation space type for this actor class   |
`RewardT` | *Message*<RewardT\> | the reward type for this actor class    |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`actorConfig` | [*TrialActor*](../interfaces/trialactor.md) | Configuration matching a [`CogmentYamlActor.name`](../interfaces/cogmentyamlactor.md#name)   |
`actorImpl` | [*ActorImplementation*](../modules.md#actorimplementation)<ActionT, ObservationT, RewardT\> | The function implementation for this actor   |

**Returns:** *void*

Defined in: [cogment/CogmentService.ts:103](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/CogmentService.ts#L103)
