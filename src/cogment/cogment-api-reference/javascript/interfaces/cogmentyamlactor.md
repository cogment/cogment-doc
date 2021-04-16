Static configuration of an actor participating in a trial.

## Properties

### actor\_class

• **actor\_class**: *string*

The [`CogmentYamlActorClass`](cogmentyamlactorclass.md) this actor is an instance of (must match
[`CogmentYamlActorClass.name`](cogmentyamlactorclass.md#name)).

Defined in: [cogment/types/CogmentYaml.ts:107](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L107)

___

### endpoint

• **endpoint**: *string*

gRPC endpoint of this actor. The special value of `client` is used for connecting actors (vs. served actors).

Defined in: [cogment/types/CogmentYaml.ts:111](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L111)

___

### implementation

• **implementation**: *string*

Which implementation of this actor class to use. Actors may have multiple implementations. The special value of
`client` is used for connecting actors (vs. served actors).

Defined in: [cogment/types/CogmentYaml.ts:116](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L116)

___

### name

• **name**: *string*

A unique name for this actor instance. This identifier is used for communication between actors using message
passing.

Defined in: [cogment/types/CogmentYaml.ts:121](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L121)
