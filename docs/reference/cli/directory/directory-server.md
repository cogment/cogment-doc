---
title: Server
sidebar_position: 1
---

# Directory Server

The Directory is an implementation of the [directory gRPC service](../../grpc.md#directory-api). It is the service to find other services. Typically, every other Cogment service only needs to know the address of the Directory to access anything in Cogment.

A regular health check is done on non-permanent network services to make sure they remain available (i.e. network reachable).
If a service fails the health check, it is automatically removed from the Directory.

The Directory works in tandem with the Cogment [endpoints](../../parameters.md#cogment-endpoints), in particular the ones with a [discover](../../parameters.md#discover-host) host (referred as **discovery endpoints**).

A [Directory Client](./directory-client.md) is also part of the Cogment CLI to access the Directory from the command line.

## Command line

The Directory is a Cogment CLI service:

```bash
$ cogment services directory --port=9005
```

## Options

### `port`

The TCP port where to serve the [directory gRPC service](../../grpc.md#directory-api). This is where the users of the Directory connect to.

Can be specified as:

-   a command line option, e.g. `--port`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_PORT`,
-   default value is 9005.

### `grpc_reflection`

Whether or not to enable [gRPC reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) on the served directory endpoint.

Can be specified as:

-   a command line option, e.g. `--grpc_reflection`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_GRPC_REFLECTION=1`,
-   by default, it is disabled.

### `log_level`

Set to define the minimum level for logging. Possible values are: `off`, `error`, `warning`, `info`, `debug`, `trace`.

Can be specified as:

-   a command line option, e.g. `--log_level=debug`,
-   an environment variable, e.g. `COGMENT_LOG_LEVEL=info`,
-   default value is info.

### `log_file`

Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided, the logs go to stdout.

Can be specified as:

-   a command line option, e.g. `--log_file=./path/to/cogment.log`,
-   an environment variable, e.g. `COGMENT_LOG_FILE=./path/to/cogment.log`,
-   default value is info.

### `registration_lag`

The maximum number of seconds to wait before responding with no result (either due to a service not registered, or that has failed a health check).
This can be used when components may start at slightly different time, and some components may inquire about a component that did not have time to register yet.
It may also help when services sometimes go temporarily offline.

Can be specified as:

-   a command line option, e.g. `--registration_lag`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_REGISTRATION_LAG`,
-   default value is 0.

:::note
[Unserviceable](#load-balancing) services are not considered for this lag.
I.e. the directory will not wait for a service to become "serviceable".
:::

### `persistence_file`

The file name where persistence data will be read from on start-up and stored afterward.
The file will be created if it does not already exist.
If set to an empty string, persistence will be disabled.

Can be specified as:

-   a command line option, e.g. `--persistence_file`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_PERSISTENCE_FILE`,
-   default value is ".cogment-directory-data".

### `load_balancing`

Whether or not to enable [load balancing](#load-balancing) when services are inquired.

Can be specified as:

-   a command line option, e.g. `--load_balancing`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_LOAD_BALANCING=1`,
-   by default, it is disabled.

### `check_on_inquire`

Whether or not to enable [health checking](#health-checking) when a service is matched by an inquiry (in addition to being checked periodically).
This can prevent unavailable services from being returned (before the periodic health check has time to run).
It can also allow load balancing to use more recent/dynamic values.
But it can significantly slow down directory inquiries, especially when there are failures.

Can be specified as:

-   a command line option, e.g. `--check_on_inquire`,
-   an environment variable, e.g. `COGMENT_DIRECTORY_CHECK_ON_INQUIRE=1`,
-   by default, it is disabled.

## Operation

At its most basic, the Directory contains services searchable by type and property, and returns endpoints where to reach the matched services.

Every registered service has a unique ID (it is unique among currently registered services). When registering a service, the ID of the new service is provided with a "secret" key (a string).
This "secret" (in combination with the ID) is required to deregister the service.
If a new service matches an existing one (i.e. an inquiry would match them), it is considered a duplicate.
Duplicates are acceptable for non-permanent services.
For permanent services (both the old and new services must be permanent), duplicates are not allowed; instead, an update of the old service is performed (i.e. the ID and secret are kept the same).

Every service is also associated with an authentication token.
This token is provided by users when registering a new service, and it must be provided to inquire or deregister that service.
For example, any inquiry can only find services that have the same authentication token as the one provided to the inquiry.
Similarly for deregistering: a service cannot be deregistered without the appropriate authentication token.
In closed environments, the authentication token can be left empty to facilitate directory management.

### Health Checking

Each entry is normally checked for connectivity on a regular basis (every 60 seconds), but can also be checked when an entry matches an inquiries (see [check_on_inquire](#check_on_inquire)).

The type of the entry determines the extent of the health check.
For Cogment services, the `Status` procedure will be called and a response expected.
For non-Cogment services, a simple tcp connection will be attempted, and if successful, the service will be considered healthy.

Before being removed from the directory, a service must fail the health check multiple times.
But after the first failure, the service will not be reported on inquiries.

When services are recovered from a persistence file, they will immediately be subjected to a health check.

### Load Balancing

By default load balancing is disabled, and thus when inquiring, the services returned are in increasing order of age (since registration).
So the first is always the most recently registered service.

:::note
Permanent services do not change their registration timestamp when updated.
:::

When load balancing is enabled, and an inquiry is made, the order of services returned is different:

1. For each service that match the inquiry, an extended health check is made. This means that the `Status` gRPC procedure is called to inquire the "overall_load" (see below).
2. Services with a load of 255 are considered unserviceable and removed from the list of potential candidates.
3. The service with the lowest load is found. That service, and services with a load close to that one, are retained.
4. The retained services are shuffled randomly, and returned as a reply to the inquiry.

:::note
Non-Cogment services (with no `Status` gRPC procedure) are always considered fully available (with a load of 0).
And thus will always be returned, but in random order, when load balancing is enabled.
:::

The `Status` gRPC procedure's "overall_load" status is expected to be a string representation of an integer from 0 to 255 (8 bit unsigned integer).
If an error occurs in the conversion from string to integer, a load of 0 is assumed.
A normal value is between 0 and 100, representing the load on the machine where the service is running.
A value of 0 means that there is no load, and a value of 100 means that the machine is very loaded (and may not be able to do processing in a timely manner).
The exact meaning of the value is dependent on the service reporting.
A value of 255 indicates that the machine is not fit to run any services.

### Data

The Directory maintains the following data for each service:

-   service ID: This is a numerical (64 bits unsigned integer) value generated by the Directory and assigned to the service on registration. It is unique to that service as long as it is in the Directory. Although very unlikely, it is possible for this ID to be re-used after the service is deregistered.
-   endpoint: It consists of four distinct information:
    -   protocol: The protocol (URL scheme) for the endpoint (`grpc` or `cogment`). The `cogment` protocol is not considered a "network" protocol and thus will not be checked for health (network connectivity).
    -   host: The host for the endpoint (e.g. somewhere.com). For the `grpc` protocol this represents a TCP/IP network resource; it can be a network hostname or an IP address. For the `cogment` protocol it must be a registered name (see [cogment endpoints](../../parameters.md#cogment-endpoints)) and typically does not represent a network resource.
    -   port: The TCP port where the registered service is providing its services. This is required for `grpc` protocol hosts.
    -   ssl requirement: Whether the service requires an encrypted SSL connection.
-   type: The type of service. This also determines how health checks are performed on the service (i.e. which gRPC service should be used to check the health of the service).
    -   client actor connection: Provides [client actor](../../grpc.md#service-clientactorsp) gRPC API service
    -   trial lifecycle management: Provides [lifecycle](../../grpc.md#service-triallifecyclesp) gRPC API service
    -   actor: Provides [actor](../../grpc.md#service-actor-api) gRPC API service
    -   environment: Provides [environment](../../grpc.md#service-environmentsp) gRPC API service
    -   pre-hook: Provides [pre-hook](../../grpc.md#service-trialhookssp) gRPC API service
    -   datalog: Provides [datalog](../../grpc.md#service-logexportersp) gRPC API service
    -   datastore: Provides [datastore](../../grpc.md#service-trialdatastoresp) gRPC API service
    -   model registry: Provides [model registry](../../grpc.md#service-modelregistrysp) gRPC API service
    -   other: This type of service does not provide a gRPC API service or it is not a type of service known to Cogment. Only the ability to perform a tcp connection will be tested for health checking.
-   permanent: This determines if the service should be kept in the directory regardless of health (network connectivity). It also prevents duplication of the service in the directory (i.e. if a duplicate is registered, the service will just be updated with the new information, and keep the same ID and secret).
-   properties: This is a free form mapping of name and value strings. But Cogment may require properties of specific names for its operation, in particular for endpoint [discovery](../../parameters.md#cogment-endpoints). These special property names are prefixed with a double underscore (\_\_), e.g. `__implementation`. Also, for proper use in Cogment, property names and values should be restricted to a limited character set (see [](../../parameters.md#discovery-query)).
-   secret: This is a secret string that is generated by the Directory on registering a new service. It must be provided to deregister a service. There is no way to recover this value, so it must be recorded after registration.
-   authentication token: A string to authenticate users of the registered service. It is provided by the user for registration of a new service, and the same token must be provided to access (deregister or inquire) that service.
