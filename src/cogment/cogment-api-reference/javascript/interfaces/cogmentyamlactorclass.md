Static configuration for an actor class.

## Properties

### action

• **action**: *object*

Action space static configuration.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`space` | *string* | Full protobuf message type representing the action space of this actor.   |

Defined in: [cogment/types/CogmentYaml.ts:25](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L25)

___

### config\_type

• `Optional` **config\_type**: *string*

Full protobuf message type representing the configuration of this actor.

Defined in: [cogment/types/CogmentYaml.ts:34](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L34)

___

### name

• **name**: *string*

Unique identifier for this actor. This identifier corresponds to [TrialActor.actorClass](trialactor.md#actorclass) and is used to
register actor implementations with [CogmentService.registerActor](../classes/cogmentservice.md#registeractor).

Defined in: [cogment/types/CogmentYaml.ts:39](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L39)

___

### observation

• **observation**: *object*

Observation space static configuration.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`space` | *string* | Full protobuf message type representing the observation space of this actor.   |

Defined in: [cogment/types/CogmentYaml.ts:43](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L43)
