---
title: Client
sidebar_position: 2
---

# Directory Client

The Directory Client is a utility to manually access (through the command line interface) the [Directory service](./directory-server.md). It can be used to register, deregister (remove) and inquire services.

## Common Options

All directory client services have these options in common.

### `directory_endpoint`

The grpc protocol endpoint where to find the Directory.

Can be specified as:

-   a command line option, e.g. `--directory_endpoint`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_ENDPOINT`,
-   its default value is "grpc://localhost:9005" (which is the default when running `cogment services directory` locally).

### `directory_authentication_token`

The authentication token for the service(s) in the Directory.

Can be specified as:

-   a command line option, e.g. `--directory_authentication_token`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_AUTHENTICATION_TOKEN`,
-   empty default value ("").

## Directory Client Register

The registration client is used to register (add) a service to the Directory.

E.g.:

```bash
$ cogment client directory register --directory_endpoint="grpc://dir:9005" --host="act" --port=9030 --type="actor" --properties="__actor_class=reporter,intensity=5,high_profile"

Service ID [7722934920723]  Secret [ZGi6GLe]
```

### Output

    If successful, the output is the service ID of the newly registered service, and its secret string. The secret string is necessary to deregister the service.

### Command line

#### `protocol`

The protocol (URL scheme) for the service endpoint. Can only be `grpc` or `cogment`. Default: `grpc`.

#### `host`

The host for the service endpoint.

#### `port`

The TCP port for the service endpoint.

#### `ssl_required`

A boolean value (`true`/`false`) to indicate if SSL (encryption) is required to access the service. Default: `false`.

#### `type`

The service type. Can be `actor`, `environment`, `prehook`, `datalog`, `lifecycle`, `actservice`, `datastore`, `modelregistry` or `other`.
These are the same keywords used as `paths` in Cogment [discovery endpoints](../../parameters.md#discovery-path).

#### `permanent`

A boolean value (`true`/`false`) to indicate if the service is to stay permanently in the directory (until explicitly deregistered). Permanent services are not checked for health or lifetime limits. Permanent services also get updated instead of being duplicated. Default: `false`.

#### `properties`

The properties to be associated with the service. In the form of "name=value,name=value" where the value is optional.

Also see [special properties](../../parameters.md#discover-host) used by Cogment.

## Directory Client Deregister

The deregistration client is used to deregister (remove/delete) a service from the Directory.

E.g.:

```bash
$ cogment client directory deregister --directory_endpoint="grpc://dir:9005" --service_id=7722934920723 --secret="ZGi6GLe"
```

### Output

    If successful, no output is produced.

### Command line

#### `service_id`

The ID of the service to remove.

#### `secret`

The secret string that was returned when the service was registered.

## Directory Client Inquire

The inquiry client is used to inquire (find) services in the Directory. Note that if services are not found (or the authentication token does not match), an empty list is returned, but there is no "error".

E.g.:

```bash
$ cogment client directory inquire --type="actor" --properties="intensity=5,high_profile"

[11] Services found
Service ID [7722934920723]
        Endpoint [grpc://act:9030] SSL required [false]
        Type [actor]
        [__registration_source] = [Cogment-Command_Line]
        [__version] = [2.8.0]
        [high_profile] = []
        [intensity] = [5]
        [__actor_class] = [reporter]
```

### Output

    If successful, the number of services found and the details of each service is output.

### Command line

#### `service_id`

The ID of the service to find. If this is provided, the `type` and `properties` options cannot be used.

#### `type`

The service type to find. Can be `actor`, `environment`, `prehook`, `datalog`, `lifecycle`, `actservice`, `datastore`, `modelregistry` or `other`.
These are the same keywords used as `paths` in Cogment [discovery endpoints](../../parameters.md#discovery-path).

If this is provided, the `service_id` option cannot be used.

#### `properties`

The properties associated with the service to find. In the form of "name=value,name=value" where the value is optional. All properties must match (in name and value) the properties of the service for a match to occur.

If this is provided, the `service_id` option cannot be used.
