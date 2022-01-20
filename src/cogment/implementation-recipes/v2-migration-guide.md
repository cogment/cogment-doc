# Migrate from Cogment v1 to v2

<!-- prettier-ignore -->
!!! note
    This document is written as a guide to migrate from Cogment v1 to v2, a full list of the changes is also available [there](../cogment-api-reference/cogment-v2-changes.md).

## Updating components

The following components needs to be updated to work with Cogment v2:

1.  Update the CLI to the latest version and check that the version is correct

    ```console
    curl --silent -L https://raw.githubusercontent.com/cogment/cogment-cli/main/install.sh | sudo bash
    ```

    ```console
    cogment version
    ```

2.  Update the docker images to the versions compatible with the 2.0 API. These should be updated in `Dockerfile`, `*.dockerfile` or `docker-compose.yml` files in your project. The minimal version to use API 2.0 are:

    -   `cogment/orchestrator:v2.0.0`
    -   `cogment/trial-datastore:v0.2.0` (prereleased component)
    -   `cogment/model-registry:v0.4.0` (prereleased component)

3.  Update the version of the python SDK to `cogment[generate]>=2.0.2` (learn more about generate [here](#new-code-generation-workflow)) in your `requirements.txt` files or equivalent.

4.  Update the version of the javascript SDK to `@cogment/cogment-js-sdk^2` in your `package.json` files or equivalent.

## `cogment.yaml` split in a spec file and a parameters file

The `cogment.yaml` file has seen a lot of changes, the most important one is that we now differ between the **spec file** which specifies the types of trial for a cogment project, including actor classes and their action/observation spaces, and the **parameters file** which specifies default parameters for trials. The spec file is used in the code generation process of each SDKs and is no longer used by the orchestrator. The parameters file is used by the orchestrator, if you use pre-trial hooks to configure the started trials it might not be necessary.

We now recommand that two different files, respectively named `cogment.yaml` and `params.yaml` be used, however you can still use one file containing both content.

<!-- prettier-ignore -->
!!! note "Recommended update"
    Move the `trial_params` section of the existing `cogment.yaml` file to a dedicated `params.yaml` file.

    Further changes are required to both sections, as described below.

<!-- prettier-ignore -->
!!! warning "Required update"
    If the `--config=cogment.yaml` was provided to the orchestrator, remove it.

    To provide a parameters file to the orchestrator use the `--params=params.yaml` command line option.

Further details can be found in the [spec file documentation](../cogment-api-reference/cogment-yaml.md).

## pre-trial hooks definition moved to an orchestrator configuration

pre-trial hooks are no longer defined in the `cogment.yaml` file, but instead are now given to the orchestrator as a command line option or through an environment variable.

<!-- prettier-ignore -->
!!! warning "Required update"
    Remove the `trial:pre-hooks` section from the spec file. Instead specify the hook addresses as gRPC URLs, e.g. `grpc://1.1.1.1:9000`, using the orchestrator cli option `--pre_trial_hooks`, separating potential multiple hooks with comas.

Further details can be found in the [orchestrator documentation](../../cogment-components/orchestrator/orchestrator.md).



## Datalog definition now part of each trial's parameters

The datalog definition is no longer a project-wide configuration but can be specified for each trial in its parameters.

<!-- prettier-ignore -->
!!! warning "Required update"
    Remove the `datalog` section from the spec file.

    Datalog can be defined in the parameters file with the following format:

    ```yaml
    trial_params:
        datalog:
            - endpoint: grpc://logger:9000
    ```
    It can also be defined when configuring the trial in the pre-trial hook.

## Datalog API has changed, and now has a python wrapper

-   Instead of returning raw protobuf messages, Python wrapper objects are returned, so access to the raw messages is not available anymore
-   The `DatalogSession` attribute `raw_trial_params` is not available anymore.
-   The `DatalogSession` attribute `trial_params` returns a `cogment.LogParams` object instead of a protobuf message.
-   The `DatalogSession.get_all_samples()` now generates `cogment.LogSample` objects instead of a protobuf message.
-   If there is a need to deserialize v1 data (e.g. from an old database), v1 versions of the sample protobuf messages (`cogment.api.datalog_pb2.TrialParams_v1` and `cogment.api.datalog_pb2.DatalogSample_v1`) are provided in the API for convenience.

For more information, please see the following sections of the Python SDK Documentation

-   [LogSample](../cogment-api-reference/python.md#class-cogment.LogSample)
-   [DatalogSession](../cogment-api-reference/python.md#class-DatalogSession)


## Default trial parameters no longer support definition user configuration for trials, environments and actors

The `config` sections that were used to define default user configuration of trials, environments and actors are no longer supported. If necessary, these must be provided when starting the trial, for the trial config, and in pre-trial hooks, for the environment and actors config. Defaults can also be defined in the implementation code itself.

<!-- prettier-ignore -->
!!! warning "Required update"
    Remove the `config` sections (for trial, environment and actor) from the params file.

    For simple projects, provide a default configuration in the implementation code directly, for more complex one use a pre-trial hook.

## Prefer using full URL for endpoints

<!-- prettier-ignore -->
!!! note "Recommended update"
    Use full gRPC URLs, starting with `grpc://`, when defining endpoints in the params file on in the SDKs.

Additionaly, to prepare for further features, we are introducing a `cogment` URL scheme. At the moment only the special _client_ endpoint is concerned.

<!-- prettier-ignore -->
!!! note "Recommended update"
    If actors are clients, replace the endpoint value from `client` to `cogment://client`

## Support for "delta" observations discontinued

Framework support for "delta" observations has been discontinued. The same result can be obtained user-side in the environment and actor implementations.

<!-- prettier-ignore -->
!!! warning "Required update"
    Remove the following section from the spec file:

    -   `import::python`
    -   `import::javascript`
    -   `actor_classes::observation::delta`
    -   `actor_classes::observation::delta_apply_fn`

    In the python SDK, [`RecvObservation`](../cogment-api-reference/python.md#class-recvobservation) `delta` attribute no longer exists.

    You can support delta observations in your code, for example you could change the definition of your observation message to support both full observation or delta observation.

    ```protobuf
    message Observation {
        oneof observation_or_delta {
            ObservationMessage obs = 1;
            DeltaObservation delta = 2;
        }
    }
    ```

    As before the environment side can decide to send full or delta observations. On the consumer side, actor or datalog, you'll need to keep the previous observation around to apply the delta to it.

<!-- prettier-ignore -->
!!! note "Recommended update"
    Instead of using [`RecvObservation`](../cogment-api-reference/python.md#class-recvobservation) `snapshot` attribute, use `observation` instead.

## New code generation workflow

The code generation step is no longer perfomed by the CLI but by dedicated tools provided with the SDKs. `cogment copy` is provided by the CLI as a cross platform way to copy the required files, i.e. the spec, protobuf and params files, from the root of the project to services source directories. As a result of these `cogment sync` and `cogment generate` are no longer available.

<!-- prettier-ignore -->
!!! warning "Required update"
    Replace any usage of `cogment sync` with `cogment copy`. This new commands needs to know explicitly what files to copy

    ```console
    cogment copy data.proto cogment.yaml params.yaml environment_dir actor_dir
    ```

<!-- prettier-ignore -->
!!! warning "Required update"
    For services using the python SDK:

    - Make sure you install the SDK and the `generate` tool using `pip install cogment[generate]`.
    - Generate the necessary files with `python3 -m cogment.generate --spec cogment.yaml`.

<!-- prettier-ignore -->
!!! warning "Required update"
    For services using the javascript SDK

    - Generate the necessary files with `npx cogment-js-sdk-generate cogment.yaml`.

## Orchestrator environment variables namespaced

<!-- prettier-ignore -->
!!! warning "Required update"
    Change the name of environment variables:

    -   From `TRIAL_LIFECYCLE_PORT` to `COGMENT_LIFECYCLE_PORT`
    -   From `TRIAL_ACTOR_PORT` to `COGMENT_ACTOR_PORT`
    -   From `PROMETHEUS_PORT` to `COGMENT_ORCHESTRATOR_PROMETHEUS_PORT`

## Trials' environments can be named

Just like the actors, the environment in a trial can now be named, this name defaults to "env". The environment name is used to address it, in particular to send messages. Environments and actors names belong to the same "namespace" and must be unique.

<!-- prettier-ignore -->
!!! note "Recommended update"
    Instead of using the `to_environment` arguments of [`ActorSession.send_message()`](../cogment-api-reference/python.md#send_messageself-payload-to), use `to` and specify the environment's name.

## Python SDK

<!-- prettier-ignore -->
!!! warning "Required update"
    `Controller.terminate_trial()` and `Controller.get_trial_infol()` no longer supports providing a single trial identifier as a string.

    Their usage need to change from

    ```python
    # Using named argument
    my_controller.terminate_trial(trial_id="my_trial_id")
    # Using positional argument
    my_controller.get_trial_infol("my_trial_id")
    ```

    to

    ```python
    my_controller.terminate_trial(trial_ids=["my_trial_id"])
    my_controller.get_trial_infol(["my_trial_id"])
    ```

<!-- prettier-ignore -->
!!! warning "Required update"
    In actor implementaion, remove all usage of `get_active_actors()`. This method has been restricted to the environment only.

    If actors need the full list of actors, there are a few possibilities:
        -   Create a controller in the actor implementation and use the `Controller.get_actors()` method.
        -   Receive the actor list in the config from the pre-trial hooks; the pre-trial hooks have implicit knowledge of all actors (at least the last hook).
        -   Add the information in the actors observation space.
        -   Send the information in a message.

<!-- prettier-ignore -->
!!! warning "Required update"
    Remove all usage of `EnvironmentSession.send_message()` using the `to_environment` argument.

Further details can be found in the [python SDK documentation](../cogment-api-reference/python.md).

## Javascript SDK

There has been a complete rework of the JS SDK we therefore recommend you to take a look at the dedicated [javascript SDK documentation](../cogment-api-reference/javascript.md). In more details:

-   You can keep your actor function, as well as any logic dealing with the observation object, as its shape has remained the same,
-   If you are using the `useActions` React hook, there is a new version of that hook, which can be retrieved by running `cogment init` with an updated version of the [Cogment CLI](../../cogment-components/cli/cli.md), and choosing `yes` when prompted if you want a web client.

## Troubleshooting

Here we list a few error you are likely to see if something was not upgraded properly to Cogment 2.0:

-   ```
    AttributeError: module "cogment" has no attribute "delta_encoding"
    ```

    -   This would be logged while trying to run a Python script and may happen if you use `cogment generate` instead of the [new generation workflow](#new-code-generation-workflow).
    -   This is caused by the discontinuation of [`delta` encoding](#support-for-delta-observations-discontinued) for observations.

-   ```
    Failure: [Problem rebuilding trial params [INVALID_ARGUMENT:(environment.config) some_message: Cannot find field.]]
    ```
    -   When starting the Orchestrator with --config or --params.
    -   This may happen when using an older version of the default parameters in a params or spec file.
    -   It will happen when the default parameters contain an unknown field; In this particular case, the field config (i.e.from environment.config) is "unknown" because it is not accepted anymore in the Cogment 2.0 default parameters.
