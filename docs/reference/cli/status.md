---
sidebar_position: 6
---

# Status

Status is a utility command to request the status of Cogment services. It can also inquire the directory to find services to request status.

`cogment status [options] [statuses...]`

## Common

### `directory_endpoint`

Cogment endpoint of the directory service. It must be a [gRPC endpoint](../parameters.md#grpc-scheme). The directory will be used to discover the services from which to request status.

Can be specified as:

-   a command line option, e.g. `--directory_endpoint=grpc://foo:9005`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_ENDPOINT=grpc://foo:9005`,
-   its default value is "grpc://localhost:9005" (which is the default when running `cogment services directory` locally).

### `directory_authentication_token`

Authentication token for services registered in the Directory. An empty token is the same as no token. Only services with the matching authentication token will be found in the directory.

Can be specified as:

-   a command line option, e.g. `--directory_authentication_token=GH670ploT`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_AUTHENTICATION_TOKEN=GH670ploT`,
-   it has no default value.

### `verbose`

Controls how much of the service information (received from the directory) is printed. The default only prints the directory ID of the service. To increase the amount of information, more "v" can be added, up to `-vvvv` to print all service information (similar to the [Cogment Directory Client](./directory/directory-client.md) "inquire" command).

Can be specified as:

-   a command line option, e.g. `--verbose`, `-v`, `-vv`, `-vvv`, `-vvvv`
-   it has no default value (i.e. minimal verbosity)

### `endpoint`

Cogment endpoint to the service from which to request statuses.

If this is a [discovery endpoint](../parameters.md#discover-host) then a [directory](#directory_endpoint) must be provided.
If it is a [grpc endpoint](../parameters.md#grpc-scheme) and a [type](#type) option is provided, the service must match the type provided or the status request will fail.

Can be specified as:

-   a command line option, e.g. `--endpoint=grpc://172.2.17.23:45367`,
-   its default value is "cogment://discover" (which will inquire the directory for all healthy services).

### `type`

The type of service from which to request statuses.
This is relevant only if the [endpoint](#endpoint) is a grpc endpoint (because directory entries include the type data).
If this type is not provided, all types will be tried to determine if one works (if there are multiple services at the endpoint, only one will be reported).

Possible values are: `actor`, `environment`, `prehook`, `datalog`, `lifecycle`, `actservice`, `datastore`, `modelregistry` or `other`.
These are the same keywords used as `paths` in Cogment [discovery endpoints](../parameters.md#discovery-path).

Can be specified as:

-   a command line option, e.g. `--type=actor`,
-   it has no default value.

### Statuses

The names of the statuses to request.

If none is provided, a request will still be made for no statuses; This can serve as a health/communication test.

The star (`*`) status can be used to request all "standard" statuses (note that at the command line, the star may need to be enclosed in quotation marks to prevent it from being interpreted by the command shell).
What defines a "standard" status depends on the service, it often excludes debug statuses and statuses that require extra computation.
Non-standard statuses must be requested explicitly by name.

E.g.:

```console
$ cogment status '*'
$ cogment status overall_load nb_sessions
$ cogment status nb_samples_processed '*'
```
