---
title: Web Proxy
sidebar_position: 5
---

# Web Proxy

:::caution
This module is still in active development and should be considered a preview version.
:::

The Cogment Web Proxy is designed to facilitate the use of Cogment with web-based components. It implements a JSON HTTP API that can be easily used from a web application.

Current features include the following.

-   Using the web proxy as a [Controller](../../guide/core-concepts.md#controller):
    -   list ongoing trials,
    -   start trial.
-   Using the web proxy as an [Actor](../../guide/core-concepts.md#actors):
    -   Join a trial,
    -   Leave a trial,
    -   Receive observations and rewards, send actions and rewards.

Cogment Web Proxy aims at superceding the use of the grpc-web API that can be exposed by the [orchestrator](./orchestrator.md).

## Command line

The Web Proxy is simply called this way

```bash
$ cogment services web_proxy --web_port=8080 --spec_file=./cogment.yaml
```

## Configuration

The Web Proxy configuration can be specified either through the command line or environment variables.

### `web_port`

The TCP port where to serve the [Web Proxy HTTP API](#http-api).

Can be specified as:

-   a command line option, e.g. `--web_port=80`,
-   an environment variable, e.g. `COGMENT_WEB_PROXY_WEB_PORT=8°`,
-   its default value is `8080`.

### `orchestrator_endpoint`

Cogment endpoint of the orchestrator service. It can be a [gRPC](../parameters.md#grpc-scheme) or [discovery](../parameters.md#discover-host) endpoint,in which case it'll rely on the [directory](#directory_endpoint) configuration.

This endpoint is used to access the [gRPC Control API](../grpc.md#control-api).

Can be specified as:

-   a command line option, e.g. `--orchestrator_endpoint=grpc://foo:9005`,
-   an environment variable, e.g. `COGMENT_ORCHESTRATOR_ENDPOINT=grpc://foo:9005`,
-   its default value is `cogment://discover`.

### `port`

The TCP port where to serve the [The Service Actor API](../grpc.md#service-actor-api).

If set to 0, then the system will automatically choose a free port.
This is normally used in combination with a [Directory](#directory_endpoint).

Can be specified as:

-   a command line option, e.g. `--port=12000`,
-   an environment variable, e.g. `COGMENT_WEB_PROXY_PORT=12000`,
-   its default value is `9002`.

### `spec_file`

Path to the [spec file](../cogment-yaml.md) specifiying the trial that the proxy will interact with. In particular it is used for JSON serialization of the echanged actions, observations, configurations, ...

Can be specified as:

-   a command line option, e.g. `--spec_file=./path/to/cogment.yaml`,
-   an environment variable, e.g. `COGMENT_SPEC_FILE=./path/to/cogment.yaml`,
-   its default value is `./cogment.yaml`

### `implementation`

This defines the name of the actor implementation managed by the proxy.

Can be specified as:

-   a command line option, e.g. `--implementation=my_implementation`,
-   an environment variable, e.g. `COGMENT_WEB_PROXY_IMPLEMENTATION=my_implementation`,
-   its default value is `web`.

### `secret`

The secret used to sign the generated actor trial tokens.

:::info
This value should be changed for any application in production
:::

Can be specified as:

-   a command line option, e.g. `--secret=rosebud`,
-   an environment variable, e.g. `COGMENT_WEB_PROXY_SECRET=rosebud`,
-   its default value is `web_proxy_secret`.

### `log_level`

Set to define the minimum level for logging. Possible values are: `off`, `error`, `warning`, `info`, `debug`, `trace`. Note however that all trace and most debug level logs will only output if running the debug compiled version of the Orchestrator.

Can be specified as:

-   a command line option, e.g. `--log_level=debug`,
-   an environment variable, e.g. `COGMENT_LOG_LEVEL=5`,
-   default value is info.

### `log_file`

Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided the logs go to stdout.

Can be specified as:

-   a command line option, e.g. `--log_file=./path/to/cogment.log`,
-   an environment variable, e.g. `COGMENT_LOG_FILE=./path/to/cogment.log`,
-   default value is info.

### `directory_endpoint`

Cogment endpoint of the directory service. It must be a [gRPC endpoint](../parameters.md#grpc-scheme). The directory will be used to register the web proxy actor service for discovery by other services and to access the orchestrator. If not provided, the web proxy will not auto register, in which case manual registration to the directory must be done, or an explicit address must be provided to access the web proxy.

Can be specified as:

-   a command line option, e.g. `--directory_endpoint=grpc://foo:9005`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_ENDPOINT=grpc://foo:9005`,
-   it has no default value.

### `directory_authentication_token`

Authentication token for services registered in the Directory. It is recorded in the Directory when registering a service. And a matching token must be provided to inquire for the service. An empty token is the same as no token.

Can be specified as:

-   a command line option, e.g. `--directory_authentication_token=GH670ploT`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_AUTHENTICATION_TOKEN=GH670ploT`,
-   it has no default value.

### `directory_registration_host`

This is the host that will be registered to the Directory for the web proxy service. If not provided, the web proxy will determine its own IP address and use that as the registration host.

In some circumstances, the IP address determined by Cogment may be wrong (e.g. multiple interfaces, load balancing, firewall), thus a host (hostname or IP address) must be explicitly provided.

Can be specified as:

-   a command line option, e.g. `--directory_registration_host=foo.bar`,
-   an environment variable, e.g. `COGMENT_MODEL_REGISTRY_DIRECTORY_REGISTRATION_HOST=foo.bar`,
-   it has no default value (i.e. self determined IP address is used).

### `directory_registration_properties`

These are the properties that will be registered to the Directory for the web proxy service. When inquiring the Directory, the properties inquired must match the properties registered. This is a string representing multiple properties in the form "name=value,name=value,name=value" where the values are optional.

Can be specified as:

-   a command line option, e.g. `--directory_registration_properties="Sim=20,hpp,mem=HIGH"`,
-   an environment variable, e.g. `COGMENT_MODEL_REGISTRY_DIRECTORY_REGISTRATION_PROPERTIES="Sim=20,hpp,mem=HIGH"`,
-   it has no default value.

## HTTP API

### Controller

#### List trials

```http
GET /controller/trials
```

List all active trials.

:construction:

#### Start a trial

```http
POST /controller/trials
```

Start a trial from given trial parameters.

:::info
It is forbidden to pass [gRPC endpoint](../parameters.md#grpc-scheme) as part of the trial parameters here
:::

:construction:

### Actor

#### Join a trial

```http
POST /actor/:actor_name/:trial_id:
```

Join trial `trial_id` as actor `actor_name`, retrieve the initial observation and the actor trial token

:construction:

#### Leave a trial

```http
DELETE /actor/:actor_name/:trial_id:
```

Explicitly close the trial connection.

Requires matching actor trial token passed in the `Cogment-Actor-Trial-Token` header

:construction:

#### Act

```http
POST/GET /actor/:actor_name/:trial_id/:tick_id:
```

Post the action (and potential sent rewards) for a tick (empty action on GET), retrieve the next observation (and potential received rewards).

Requires matching actor trial token passed in the `Cogment-Actor-Trial-Token` header
