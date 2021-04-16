A library for interacting with the [cogment.ai](https://cogment.ai) framework.

## Table of contents

### Enumerations

- [EventType](enums/eventtype.md)

### Classes

- [ActorSession](classes/actorsession.md)
- [CogmentService](classes/cogmentservice.md)
- [TrialController](classes/trialcontroller.md)

### Interfaces

- [CogSettings](interfaces/cogsettings.md)
- [CogSettingsActorClass](interfaces/cogsettingsactorclass.md)
- [CogmentYaml](interfaces/cogmentyaml.md)
- [CogmentYamlActor](interfaces/cogmentyamlactor.md)
- [CogmentYamlActorClass](interfaces/cogmentyamlactorclass.md)
- [CogmentYamlDatalog](interfaces/cogmentyamldatalog.md)
- [CogmentYamlTrialParameters](interfaces/cogmentyamltrialparameters.md)
- [CreateServiceOptions](interfaces/createserviceoptions.md)
- [Event](interfaces/event.md)
- [Reward](interfaces/reward.md)
- [SendMessageOptions](interfaces/sendmessageoptions.md)
- [TrialActor](interfaces/trialactor.md)

## Type aliases

### ActorImplementation

Ƭ **ActorImplementation**<ActionT, ObservationT, RewardT\>: (`session`: [*ActorSession*](classes/actorsession.md)<ActionT, ObservationT, RewardT\>) => *Promise*<void\>

A function that implements the participation of this actor class in a trial.

**`param`** An [`ActorSession`](classes/actorsession.md) instance the actor controls to interact with a trial.

#### Type parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ActionT` | Message | The action space type for this actor class   |
`ObservationT` | Message | The observation space type for this actor class   |
`RewardT` | Message | The reward type for this actor class    |

#### Type declaration:

▸ (`session`: [*ActorSession*](classes/actorsession.md)<ActionT, ObservationT, RewardT\>): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`session` | [*ActorSession*](classes/actorsession.md)<ActionT, ObservationT, RewardT\> |

**Returns:** *Promise*<void\>

Defined in: [cogment/CogmentService.ts:44](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/CogmentService.ts#L44)

___

### JoinTrialArguments

Ƭ **JoinTrialArguments**: *object*

Arguments to joinTrial

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`actorClass`? | *string* | The class of the actor; this must correspond with a [CogmentYaml.actor_classes](interfaces/cogmentyaml.md#actor_classes).   |
`actorName`? | *string* | Unique identifier for this actor connecting to the trial. Used for message passing.   |
`trialId` | *string* | The id of the trial to join.   |

Defined in: [cogment/TrialController.ts:381](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L381)

___

### JoinTrialReturnType

Ƭ **JoinTrialReturnType**: TrialJoinReply.AsObject & { `config`: *any*  }

Defined in: [cogment/TrialController.ts:375](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L375)

___

### SendMessageReturnType

Ƭ **SendMessageReturnType**: TrialMessageReply.AsObject

Defined in: [cogment/TrialController.ts:372](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L372)

___

### StartTrialReturnType

Ƭ **StartTrialReturnType**: TrialStartReply.AsObject

Defined in: [cogment/TrialController.ts:373](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L373)

___

### VersionReturnType

Ƭ **VersionReturnType**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`version` | VersionInfo.AsObject[*versionsList*] |

Defined in: [cogment/TrialController.ts:376](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/TrialController.ts#L376)

## Functions

### createService

▸ **createService**(`__namedParameters`: { `cogSettings`: [*CogSettings*](interfaces/cogsettings.md) ; `grpcURL`: *string* ; `streamingTransportFactory?`: grpc.TransportFactory ; `unaryTransportFactory?`: grpc.TransportFactory  }): [*CogmentService*](classes/cogmentservice.md)

Creates a new [`CogmentService`](classes/cogmentservice.md) from a generated [`CogSettings`](interfaces/cogsettings.md).
Optionally accepts transports used by gRPC clients.

**`example`** Instantiating the `cogment` API.
```typescript
import {createService} from 'cogment';
import cogSettings from 'CogSettings';

const cogment = createService(cogSettings);
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`__namedParameters` | *object* | - |
`__namedParameters.cogSettings` | [*CogSettings*](interfaces/cogsettings.md) | Settings loaded from a generated [`CogSettings`](interfaces/cogsettings.md) file.   |
`__namedParameters.grpcURL` | *string* | HTTP(S) url of grpc-web reverse proxy to orchestrator. Defaults to   `//${window.location.hostname}:8080`   |
`__namedParameters.streamingTransportFactory?` | grpc.TransportFactory | A `grpc.TransportFactory` used to instantiate streaming connections to the   backend. Defaults to `grpc.WebsocketTransport()`.    |
`__namedParameters.unaryTransportFactory?` | grpc.TransportFactory | A `grpc.TransportFactory` used to make unary (non-streaming) requests to the   backend. Defaults to `grpc.CrossBrowserHttpTransport({withCredentials: false})`.   |

**Returns:** [*CogmentService*](classes/cogmentservice.md)

Defined in: [cogment/Cogment.ts:61](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/Cogment.ts#L61)
