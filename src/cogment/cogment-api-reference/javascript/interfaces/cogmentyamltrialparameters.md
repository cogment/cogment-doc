Default static configuration for a trial.

## Properties

### actors

• **actors**: [*CogmentYamlActor*](cogmentyamlactor.md)[]

List of actor slots available for registration during the trial.

Defined in: [cogment/types/CogmentYaml.ts:58](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L58)

___

### environment

• **environment**: *object*

Static environment configuration.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`config`? | *Record*<string, unknown\> | Custom configuration for this trial passed to [`CogmentYaml.pre_hooks`](cogmentyaml.md#pre_hooks) - keys/values must match the environment's config protobuf {@link CogmentYaml.environment.config_type | `CogmentYaml.environment.config_type`}.   |
`endpoint` | *string* | gRPC URI of the environment endpoint.   |

Defined in: [cogment/types/CogmentYaml.ts:62](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L62)

___

### max\_inactivity

• `Optional` **max\_inactivity**: *number*

The maximum number of ticks before the trial is considered inactive and eligible for garbage collection.

Defined in: [cogment/types/CogmentYaml.ts:77](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L77)

___

### max\_steps

• `Optional` **max\_steps**: *number*

The maximum number of ticks the trial should run for.

Defined in: [cogment/types/CogmentYaml.ts:81](https://github.com/cogment/cogment-js-sdk/blob/main/src/cogment/types/CogmentYaml.ts#L81)
