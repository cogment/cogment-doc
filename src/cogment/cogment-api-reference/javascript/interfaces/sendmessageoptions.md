## Properties

### from

• **from**: *string*

The unique identifier for the connected actor generating the message.

Defined in: [cogment/ActorSession.ts:310](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L310)

___

### payload

• **payload**: *Any*

The payload data, encoded as an Any protobuf message.

Defined in: [cogment/ActorSession.ts:314](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L314)

___

### to

• **to**: *string*

The unique identifier for the messages destination. Can be another actors name, or the special value `env` to send
a message to the environment.

Defined in: [cogment/ActorSession.ts:319](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L319)

___

### trialId

• **trialId**: *string*

The id of the trial to send the message to.

Defined in: [cogment/ActorSession.ts:323](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/ActorSession.ts#L323)
