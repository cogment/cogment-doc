---
sidebar_position: 9
---

# Cogment 2.0

:::tip
This document describes the full list of the changes for Cogment 2.O. A migration guide is available [here](../guide/implementation-recipes/v2-migration-guide.md).
:::

Cogment 2.0 is a massive internal change to Cogment, starting with the underlying gRPC API that has seen a major refactoring. But there is a minimal amount of changes that affect the use of cogment. The changes that affect users are in three categories: breaking changes, deprecated behavior and new functionalities.

## Breaking changes

These are changes that, if the related features were used, will prevent Cogment v1 projects from working with Cogment v2. They represent the minimum changes necessary to upgrade to v2.

### Cogment.yaml

-   Delta types of observations (and all related settings) are not supported anymore. This means that in cogment.yaml, these sections are now ignored:
    -   `import::python`
    -   `import::javascript`
    -   `actor_classes::observation::delta`
    -   `actor_classes::observation::delta_apply_fn`
-   `config` (for trial, environment and actor) are not accepted in the parameters section anymore.

### Python SDK

-   The `Session.get_active_actors()` method has been restricted to the environment only. This means that actors cannot call this method anymore (it will raise an exception). If actors need the full list of actors, there are a few possibilities:
    -   Create a controller in the actor implementation and use the `Controller.get_actors()` method.
    -   Receive the actor list in the config from the pre-trial hooks; the pre-trial hooks have implicit knowledge of all actors (at least the last hook).
    -   Add the information in the actors observation space.
    -   Send the information in a message.
-   The `EnvironmentSession.send_message()` method will not accept a `to_environment` parameter anymore (since it does not make sense anyway).
-   The `Controller.terminate_trial()` method parameter `trial_id` has been renamed `trial_ids`.
-   The `Controller.get_trial_info()` method parameter `trial_id` has been renamed `trial_ids`.

### Javascript SDK

Except for the following, everything has been subject to breaking changes:

-   The shape of the observation object has remained the same
-   You can keep the actor function that you have in your v1 project

Please refer to the new [Javascript API Reference](./javascript.md)

### Datalog sample

Since the Datalog samples, unlike everything else in the SDK, used the raw API protobuf, it has implicitly changed. But in v2, there is now a wrapper for it, which replaces direct access to the protobuf content.

If people still have serialized v1 data stored (e.g. in a database), v1 versions of the sample protobuf messages (`DatalogSample_v1`) are provided in the API for convenience, so users can deserialize the data into v1 samples and extract the information.

For more info, visit the [gRPC api](./grpc.md#LogExporterSampleRequest) documentation

### Orchestrator

-   The environment variables read by the Orchestrator on start have changed names to help prevent clashes.
    -   `TRIAL_LIFECYCLE_PORT` becomes `COGMENT_LIFECYCLE_PORT`
    -   `TRIAL_ACTOR_PORT` becomes `COGMENT_ACTOR_PORT`
    -   `PROMETHEUS_PORT` becomes `COGMENT_ORCHESTRATOR_PROMETHEUS_PORT`
-   The Orchestrator does not search for the file named `cogment.yaml` as the default spec file anymore. The spec file name must be explicit on the command line using `--config=cogment.yaml`.
-   For further information, refer to the [Orchestrator documentation](../reference/cli/orchestrator.md).

## Deprecated Behaviors

These are changes that are optional to upgrade to Cogment v2, but will eventually be phased out and become breaking changes in a future version. If these features are used with Cogment v2, warnings will be issued.

### Cogment.yaml

The spec file is not used by the Orchestrator anymore, and when used by the other components, these sections of the file will be ignored:

-   The `trial_params` section is not needed anymore (since the Orchestrator has its own parameters file)
-   The `datalog` section is deprecated (the details of the datalog have been moved to the Orchestrator parameters file)
-   The `trial:pre-hooks` section is deprecated (these values are now passed to the Orchestrator on the command line)

For more information, visit the [Cogment.yaml documentation](./cogment-yaml.md).

### Orchestrator

Providing a spec file (cogment.yaml) to the Orchestrator is deprecated. The new behavior is as follows:

-   Provide a YAML default parameters file (command line option `--params`) with the top level section `trial_params`.
-   Add the datalog section to the parameters (if desired), without type (for type `none` just omit the datalog section). I.e. Whereas the spec file was defining a single data logger for all trials, the new Orchestrator can have a different data logger for each trial, and thus a datalog section is now found in the trial default parameters. Example of the new parameters datalog section:

```yaml
trial_params:
    datalog:
        - endpoint: grpc://logger:9000
        - exclude_fields: [messages, actions]
```

-   The endpoint for a client actor in the parameters must now be `cogment://client` instead of just `client`. E.g.:

```yaml
trial_params:
    actors:
        - endpoint: cogment://client
```

-   Pre-trial hooks are defined on the command line (or environment variable) as opposed to being found in the spec file.

:::tip
The Cogment Orchestrator and the generate tools ignore the sections of the YAML files that are not relevant to them, therefore the content of the spec and parameters files can be combined in a single file safely.
:::

The Orchestrator needs a parameters file or pre-trial hooks (or both). Thus with pre-trial hooks and no parameters file (or a carefully defined parameters file) the Orchestrator is now independent of any trial specifications (spec file) and can run any type of trial. With a fully defined parameters file and no hooks, the Orchestrator can work as before for simple projects.

### Python SDK

-   The [`ActorSession.send_message()`](./python.md#send_messageself-payload-to) method should not use the `to_environment` parameter anymore. The environment is targeted using its name (defaulted to "env" if not given specifically, or `ActorSession.env_name`).
-   The joining of a trial by a client actor ([`Context.join_trial()`](./python.md#async-join_trialself-trial_id-endpoint-impl_namenone-actor_namenone-actor_classnone)) should now be made by providing an actor name or class (unlike previously where an implementation name was provided). This is to allow the pre-trial hooks to decide on the details of the actor (including implementation) that should be used, the same way as for service actors.
-   In [`RecvObservation`](./python.md#class-recvobservation), the `snapshot` attribute is deprecated. A new attribute `observation` takes its place.
-   The [`Controller.terminate_trial()`](./python.md#terminate_trialself-trial_ids-hardfalse) method parameter `trial_ids` now takes a list of IDs (instead of a single string for one ID).
-   The [`Controller.get_trial_info()`](./python.md#async-get_trial_infoself-trial_ids) method parameter `trial_ids` now takes a list of IDs (instead of a single string for one ID or `None`).
-   The `url` attribute of [`cogment.Endpoint`](./python.md#class-cogmentendpoint) must now be a gRPC type URL (i.e. start with `grpc://`). `Endpoint` is used to join a trial and to get a Controller.

## New Functionalities

These are changes that are additional and transparent to a v1 project.

### Parameters

These are the parameters defined in the new file given to the Orchestrator, and that can be changed by pre-trial hooks.

-   The environment can be given a `name`, similarly to the actors. If not given, it defaults to "env".

### Python SDK

-   When starting a trial ([`Controller.start_trial()`](./python.md#async-start_trialself-trial_confignone-trial_id_requestednone)), a new `trial_id_requested` parameter requests the trial ID to be a specific string instead of an automatic UUID. It is a "request" because the trial will not start if the id conflicts with another active trial; an empty ID string will be returned if the trial is not started.
-   [`Controller.terminate_trial()`](./python.md#terminate_trialself-trial_ids-hardfalse) method has a new parameter `hard`. This parameter forces a hard/immediate termination of the trial. As opposed to a "soft" termination which will wait for the next tick to terminate nicely.
-   The `ActorSession` and `EnvironmentSession` have a new method [`sending_done()`](./python.md#sending_doneself) to indicate that they have finished sending data and will now only be listening until the end of the trial. This is required only if the new `auto_done_sending` parameter of the `start()` method is `False` (It is `True` by default for backward compatibility). This only needs to be manually done (i.e. `auto_done_sending=False`) in special situations.
-   [`PrehookSession.get_user_id()`](./python.md#get_user_idself) new method.
-   [`PrehookSession.environment_name`](./python.md#class-prehooksession) new attribute.
-   [`DatalogSession.user_id`](./python.md#class-datalogsession) new attribute (this info used to be available in the protobuf `DatalogSample`).
-   [`RecvAction.tick_id`](./python.md#class-recvaction) new attribute.
