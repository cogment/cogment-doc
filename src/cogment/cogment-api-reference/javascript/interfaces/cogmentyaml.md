Static configuration of various entities participating in a Cogment application. This human-readable file is
transformed by the [`cogment generate`](https://github.com/cogment/cogment-cli) command into a language
specific module.

## Properties

### actor\_classes

• **actor\_classes**: [*CogmentYamlActorClass*](cogmentyamlactorclass.md)[]

Static configuration of actor classes available for participation in a trial.

Defined in: [cogment/types/CogmentYaml.ts:133](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L133)

___

### commands

• **commands**: *Record*<string, string\>

List of arbitrary shell commands available for invocation through
[`cogment run xyz`](https://github.com/cogment/cogment-cli)

Defined in: [cogment/types/CogmentYaml.ts:138](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L138)

___

### datalog

• `Optional` **datalog**: [*CogmentYamlDatalog*](cogmentyamldatalog.md)

Datalog static configuration.

Defined in: [cogment/types/CogmentYaml.ts:142](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L142)

___

### environment

• **environment**: *object*

Environment static configuration.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`config_type` | *string* | Full protobuf message type representing an environment's configuration.   |

Defined in: [cogment/types/CogmentYaml.ts:146](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L146)

___

### import

• **import**: *object*

User generated imports.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`proto` | *string*[] | List of paths to .proto files used by application specific entities.   |

Defined in: [cogment/types/CogmentYaml.ts:155](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L155)

___

### pre\_hooks

• `Optional` **pre\_hooks**: *string*[]

List of gRPC endpoints that are called in order prior to starting a trial. Pre-hooks act as a pipeline for
mutating a trial's configuration before it's start. Pre-hooks may additionally be used for other purposes.

Defined in: [cogment/types/CogmentYaml.ts:165](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L165)

___

### trial

• **trial**: *object*

Trial static configuration.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`config_type` | *string* | Full protobuf message type representing a trial's configuration.   |

Defined in: [cogment/types/CogmentYaml.ts:169](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L169)

___

### trial\_params

• **trial\_params**: [*CogmentYamlTrialParameters*](cogmentyamltrialparameters.md)

Trial specific configuration such as the actor slots available for registration, configuration for entities (eg:
values for an environment's configuration).

Defined in: [cogment/types/CogmentYaml.ts:179](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L179)
