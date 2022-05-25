---
title: Orchestrator
sidebar_position: 2
---

# Orchestrator

The Orchestrator is the heart of Cogment. It ties all services together to execute trials.

## Command line

The Orchestrator is simply called this way

```bash
$ cogment services orchestrator --lifecycle_port=9001 --actor_port=9001 --pre_trial_hooks=grpc://config:9001
```

## Configuration

The orchestrator configuration can be specified either through the command line or environment variables.

### `lifecycle_port`

The TCP port where to serve the [trial lifecycle gRPC service](../reference/cogment-low-level-api-guide/grpc.md#service-triallifecyclesp). This is where the [Controller](../guide/development-guide.mdx#controller) connects to. It can be the same as the `actor_port`.

Can be specified as:

-   a command line option, e.g. `--lifecycle_port=12000`,
-   an environment variable, e.g. `COGMENT_LIFECYCLE_PORT=12000`,
-   its default value is 9000.

### `actor_port`

The TCP port where to serve the [client actor gRPC service](../reference/cogment-low-level-api-guide/grpc.md#service-clientactorsp). This is where [Client Actors](../guide/development-guide.mdx#service-actor-client-actor) (as opposed to service actors) connect to. It can be the same as the `lifecycle_port`.

Can be specified as:

-   a command line option, e.g. `--actor_port=12000`,
-   an environment variable, e.g. `COGMENT_ACTOR_PORT=12000`,
-   its default value is 9000.

### `actor_web_port`

The TCP port used to serve the [client actor gRPC service](../reference/cogment-low-level-api-guide/grpc.md#service-clientactorsp) for consumption over websocket. This is required for [Client Actors](../guide/development-guide.mdx#service-actor-client-actor) running in a web browser.

Can be specified as:

-   a command line option, e.g. `--actor_web_port=8080`,
-   an environment variable, e.g. `COGMENT_WEB_PROXY_PORT=12000`,
-   its default value is 0, which means the http port is disabled.

### `params`

The name of the YAML file containing the [default parameters for new trials](../reference/parameters.md). Some of the parameters must match their corresponding values in the spec file (typically `cogment.yaml`) and may therefore lock an Orchestrator instance to specific types of trials. If pre-trial hooks are defined, these parameters are sent to the first hook before a trial starts.

Can be specified as:

-   a command line option, e.g. `--params=./path/to/params.yaml`,
-   an environment variable, e.g. `COGMENT_DEFAULT_PARAMS_FILE=./path/to/params.yaml`,
-   it has no default value.

### `directory_services`

Cogment endpoint of the directory service (only one directory is accepted at the moment). It must be a [gRPC endpoint](../reference/parameters.md#grpc-scheme). The directory service is used to inquire about the location of services before a new trial starts.

Can be specified as:

-   a command line option, e.g. `--directory_services=grpc://foo:9000`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_SERVICES=grpc://foo:9000`,
-   it has no default value.

### `pre_trial_hooks`

[Cogment endpoint](../reference/parameters.md#cogment-endpoints) definitions for [pre-trial hooks](../guide/development-guide.mdx#pre-trial-hook). Hooks are called before a new trial starts. They are called in order, in a pipeline fashion, to set the parameters for new trials. The first hook will receive the default parameters, the last hook result will be used as the parameters for the new trial.

Can be specified as:

-   a command line option with different endpoints separated by commas, e.g. `--pre_trial_hooks=grpc://foo:9000,grpc://bar:9000`, and/or with the option passed multiple times, e.g. `--pre_trial_hooks=grpc://foo:9000 --pre_trial_hooks=grpc://bar:9000`,
-   an environment variable with different endpoints separated by spaces, e.g. `COGMENT_PRE_TRIAL_HOOKS="grpc://foo:9000 grpc://bar:9000"`,
-   it has no default value.

### `prometheus_port`

The TCP port where to serve Prometheus metrics. Must be different than `lifecycle_port` and `actor_port`. If not specified, the Prometheus server is disabled.

Can be specified as:

-   a command line option, e.g. `--prometheus_port=8000`,
-   an environment variable, e.g. `COGMENT_ORCHESTRATOR_PROMETHEUS_PORT=8000`,
-   its default value is 0, which means the prometheus server is disabled.

### `status_file`

File containing simple status for the Orchestrator. This is useful when running the Orchestrator inside containers or synchronizing with external components. The file is open and stays open while the Orchestrator runs. The file will contain one to three letters: I, R, T. "I" indicates that the Orchestrator is initializing. When the Orchestrator starts, the file only contains this letter. "R" indicates that the Orchestrator is ready. This letter is added to the file (thus the file will normally contain "IR" at this point). "T" indicates that the Orchestrator has terminated (crashes will not set this file to "T"). Thus after a normal end, the file will contain "IRT".

Can be specified as:

-   a command line option, e.g. `--status_file=./path/to/status`,
-   an environment variable, e.g. `COGMENT_STATUS_FILE=./path/to/status`,
-   it has no default value.

### `private_key`

File name containg a PEM encoded private key for encrypted communication.

Can be specified as:

-   a command line option, e.g. `--private_key=./path/to/key.pem`,
-   an environment variable, e.g. `COGMENT_PRIVATE_KEY_FILE=./path/to/key.pem`,
-   it has no default value.

### `root_cert`

File name containing a PEM encoded trusted root certificate.

Can be specified as:

-   a command line option, e.g. `--root_cert=./path/to/cert.pem`,
-   an environment variable, e.g. `COGMENT_ROOT_CERT_FILE=./path/to/cert.pem`,
-   it has no default value.

### `trust_chain`

File name containing a PEM encoded trust chain.

Can be specified as:

-   a command line option, e.g. `--trust_chain=./path/to/chain.pem`,
-   an environment variable, e.g. `COGMENT_TRUST_CHAIN_FILE=./path/to/chain.pem`,
-   it has no default value.

### `gc_frequency`

Number of (started) trials between trial garbage collection. The Orchestrator periodically deletes ended and stale trials; this parameter controls how often this cleanup happens. The garbage collection may happen on the start of any trial.

Can be specified as:

-   a command line option, e.g. `--gc_frequency=5`,
-   an environment variable, e.g. `COGMENT_GC_FREQUENCY=5`,
-   default value is 10.

### `log_level`

Set to define the minimum level for logging. Possible values are: `off`, `error`, `warning`, `info`, `debug`, `trace`. Note however that all trace and most debug level logs will only output if running the debug compiled version of the Orchestrator.

Can be specified as:

-   a command line option, e.g. `--log_level=debug`,
-   an environment variable, e.g. `COGMENT_LOG_LEVEL=debug`,
-   default value is info.

### `log_file`

Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided the logs go to stdout.

Can be specified as:

-   a command line option, e.g. `--log_file=./path/to/cogment.log`,
-   an environment variable, e.g. `COGMENT_LOG_FILE=./path/to/cogment.log`,
-   default value is info.
