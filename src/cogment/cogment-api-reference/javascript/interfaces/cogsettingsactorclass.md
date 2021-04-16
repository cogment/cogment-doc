Generated static configuration of a Cogment actor.

## Properties

### actionSpace

• **actionSpace**: *typeof* Message

Protobuf message type of this actor's action space.

**`see`** {@link CogmentYamlActorClass.action.space}

Defined in: [cogment/types/CogSettings.ts:28](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L28)

___

### config

• `Optional` **config**: *typeof* Message

Protobuf message type of this actor's config type.

**`see`** [CogmentYamlActorClass.config_type](cogmentyamlactorclass.md#config_type)

Defined in: [cogment/types/CogSettings.ts:33](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L33)

___

### name

• **name**: *string*

**`see`** [CogmentYamlActorClass.name](cogmentyamlactorclass.md#name)

Defined in: [cogment/types/CogSettings.ts:37](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L37)

___

### observationDelta

• `Optional` **observationDelta**: *typeof* Message

Protobuf message type of this actor's observation delta.

Defined in: [cogment/types/CogSettings.ts:41](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L41)

___

### observationDeltaApply

• `Optional` **observationDeltaApply**: (`x`: *Message*) => *Message*

Function used to transform observation deltas.

#### Type declaration:

▸ (`x`: *Message*): *Message*

#### Parameters:

Name | Type |
:------ | :------ |
`x` | *Message* |

**Returns:** *Message*

Defined in: [cogment/types/CogSettings.ts:45](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L45)

Defined in: [cogment/types/CogSettings.ts:45](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L45)

___

### observationSpace

• **observationSpace**: *typeof* Message

Protobuf message type of this actor's observation space.

**`see`** {@link CogmentYamlActorClass.observation.space}

Defined in: [cogment/types/CogSettings.ts:50](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogSettings.ts#L50)
