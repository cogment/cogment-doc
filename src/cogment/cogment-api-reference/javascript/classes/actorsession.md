Controller object passed to each [`ActorImplementation`](../modules.md#actorimplementation) callback.

## Type parameters

Name | Type | Description |
:------ | :------ | :------ |
`ActionT` | Message | The action space type for this actor class   |
`ObservationT` | Message | The observation space type for this actor class   |
`RewardT` | Message | The reward type for this actor class    |

## Methods

### addFeedback

▸ **addFeedback**(`to`: *string*[], `feedback`: [*Reward*](../interfaces/reward.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`to` | *string*[] |
`feedback` | [*Reward*](../interfaces/reward.md) |

**Returns:** *void*

Defined in: [cogment/ActorSession.ts:93](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L93)

___

### eventLoop

▸ **eventLoop**(): *AsyncGenerator*<[*Event*](../interfaces/event.md)<ObservationT, RewardT\>, any, unknown\>

Yields observations, messages and rewards received from the Cogment framework.

**Returns:** *AsyncGenerator*<[*Event*](../interfaces/event.md)<ObservationT, RewardT\>, any, unknown\>

- A generator that yields observations, messages and rewards.

Defined in: [cogment/ActorSession.ts:101](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L101)

___

### getTickId

▸ **getTickId**(): *undefined* \| *number*

Get the trial's current tick id, matching the latest received observation.

**Returns:** *undefined* \| *number*

- The current tick id.

Defined in: [cogment/ActorSession.ts:130](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L130)

___

### isTrialOver

▸ **isTrialOver**(): *boolean*

Check if the trial is over.

**Returns:** *boolean*

Defined in: [cogment/ActorSession.ts:137](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L137)

___

### sendAction

▸ **sendAction**(`userAction`: ActionT): *void*

Send an action to the environment.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`userAction` | ActionT | An action space protobuf for this actor class.    |

**Returns:** *void*

Defined in: [cogment/ActorSession.ts:145](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L145)

___

### sendMessage

▸ **sendMessage**(`__namedParameters`: [*SendMessageOptions*](../interfaces/sendmessageoptions.md)): *Promise*<AsObject\>

Send an asynchronous message to a cogment entity.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*SendMessageOptions*](../interfaces/sendmessageoptions.md) |

**Returns:** *Promise*<AsObject\>

Defined in: [cogment/ActorSession.ts:161](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L161)

___

### start

▸ **start**(): *void*

Start this ActorSession, the eventLoop will begin yielding events received from the Cogment framework.

**Returns:** *void*

Defined in: [cogment/ActorSession.ts:194](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L194)

___

### stop

▸ **stop**(): *void*

End this ActorSession, ending the eventLoop.

**Returns:** *void*

Defined in: [cogment/ActorSession.ts:201](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L201)
