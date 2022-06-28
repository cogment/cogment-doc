---
sidebar_position: 2
---

# Trial Parameters

The trial parameters are a set of parameters that define the details of a trial.
They may be generated from the default parameters provided to the Orchestrator, and updated by the pre-trial hooks.
Or they can be provided whole to the trial start call, in which case the default parameters are ignored and the pre-trial hooks are not used.

In the parameters, are optional config messages for the trial, environment and actors.
The trial config is only used by the pre-trial hooks, whereas the other configs are sent to their respective destination at the start of the trial.
The config protobuf messages are defined in the spec file.

The pre-trial hooks exist to allow dynamic parameter setting at the start of a trial, with the use of the trial config.
Another way to set the parameters dynamically is by providing them to the start trial call.
The parameters of the trial start call take priority over all others, and thus when provided, the default parameters will be ignored and the pre-trial hooks will not be called.

## Parameter file

The parameter file serves to initialize the Orchestrator default parameters.
It is able to set all parameters except for the configs.

The file uses the YAML configuration language. It consists of one top level YAML section called [trial_params](#trial-params).
Any other top level section will be ignored.

Parameters:

-   `max_steps`: The maximum number of time steps (ticks) that the trial will run before terminating. If 0, the trial will not be auto terminated (the environment and a Controller can still terminate the trial). If not provided, a default of 0 will be used.
-   `max_inactivity`: The number of seconds of inactivity after which a trial will be terminated. If 0, the trial will not be terminated because of inactivity. If not provided, a default of 30 seconds will be used.
-   `datalog`: List of properties related to the data logger. If this section is not present, data logging is disabled.
    -   `endpoint`: Endpoint of the datalogger
    -   `exclude_fields`: List of fields to exclude from the data to send for logging
-   `environment`: List of properties for the environment
    -   `name`: The name of the environment (defaults to "env" if not provided)
    -   `endpoint`: Endpoint of the environment
    -   `implementation`: The name of the implementation to be used for this instance of the environment. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime
-   `actors`: List of actor properties. The number of actors may not be suited for all trials.
    -   `name`: The name of this actor (i.e. name of the specific instance of the actor class)
    -   `actor_class`: The name of the actor class. This is specific to a type of trial and must match values in the corresponding spec file.
    -   `endpoint`: Endpoint of the actor.
    -   `implementation`: The name of the implementation to be used for this actor instance. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime.
    -   `initial_connection_timeout`: Maximum amount of time (in seconds) to wait for an actor to connect to a new trial, after which it is considered unavailable for the trial duration.  If the wait is too long, the trial may become stale and be removed. The trial may wait longer than the requested timeout. Default is 0.0 (no timeout; indefinite wait).
    -   `response_timeout`: Maximum amount of time (in seconds) to wait for an actor to respond with an action after an observation is sent, after which it is considered unavailable.  If the wait is too long, the trial may become stale and be removed. The trial may wait longer than the requested timeout. Default is 0.0 (no timeout; indefinite wait).
    -   `optional`: `True` if the actor is optional. An optional actor is not necessary for a trial to continue. If an actor is required (i.e optional = `False`), the trial will be terminated if the actor is not available. Default is `False`.

E.g.:

```yaml
trial_params:
    max_steps: 1000
    max_inactivity: 5 # seconds

    datalog:
        endpoint: grpc://logserver:9000
        exclude_fields: [messages, actions]

    environment:
        name: Arena
        endpoint: grpc://env:9000
        implementation: simple

    actors:
        - name: Alice
          actor_class: BigPlayer
          endpoint: cogment://discover
          implementation:
        - name: Bob
          actor_class: BigPlayer
          endpoint: grpc://bp2:9000
          implementation: Test
          initial_connection_timeout: 10.0
        - name: Carol
          actor_class: SmallPlayer
          endpoint: grpc://sp:9000
          implementation: DQN_Hotel3
          initial_connection_timeout: 5.0
          optional: True
        - name: Dave
          actor_class: SmallPlayer
          endpoint: cogment://discover/service?id=8390256
          implementation: DNN_Karma3.1.17
          initial_connection_timeout: 3.0
          optional: True
        - name: Olivia
          actor_class: Referee
          endpoint: cogment://client
          implementation: Standard
          response_timeout: 30.0
```

## Parameters and pre-trial hooks

If no parameters were given to the trial start call, the default parameters and pre-trial hooks are used.
And if no pre-trial hooks are defined, the default parameters will be used directly to start the trial.

Pre-trial hooks are gRPC services that may be called to set up the parameters for a new trial. Multiple hooks can be defined and they will all be called in order, in a pipeline fashion (i.e. the output of one becomes the input of the next). The first hook service to be called will receive the default parameters (augmented by the trial config that may be given to the trial start call). The output of the last hook is used as final parameters to start the new trial. The response of the last hook will be waited on before the trial starts.

The hooks will be called to update or generate all the parameter data (presented here) in addition to the configurations for the environment and the actors (if needed).

Pre-trial hooks are defined on the command line (or an environment variable) when starting the Orchestrator.

## Cogment endpoints

Cogment endpoints are basic URLs (`scheme://host/path?query`) that can have one of two schemes: `grpc` or `cogment`.
The path and query are optional, but a valid endpoint must have a scheme and a host.

The context is used to determine what API service will be used to connect to the endpoint; e.g. if this is the endpoint for an environment, then the `EnvironmentSP` gRPC API will be used.

### `grpc` scheme

The `grpc` scheme is used to access a network resource using one of the Cogment gRPC API.
This is also called a gRPC endpoint.
The rest of the URL is a standard HTTP address (with port) and points to the gRPC server waiting for connection. E.g.:

```
grpc://10.0.123.5:9000
grpc://SomeServer:9011
grpc://second.actors.base.com:9050
```

### `cogment` scheme

The `cogment` scheme is specific to Cogment and has two possible hosts: `client` or `discover`.

#### `client` host

The `client` host is used in the very specific case of an _actor_ being "client actor".
Only actors can use this URL.
In this case, the actor with such an endpoint (i.e. `cogment://client`) will connect as a client, the Orchestrator being the server.
The client will connect to the actor port of the [Orchestrator][../cogment/orchestrator.md].

#### `discover` host

The `discover` host is to indicate that a directory needs to be inquired.
This is also called a discovery endpoint.

The directory returns an actual endpoint where to reach the service; either a gRPC endpoint (e.g. `grpc://10.5.134.2:9000`), or for an actor, it can also be a client host URL (`cogment://client`).
The result cannot be another discovery endpoint.

The endpoint for the directory is provided to the Orchestrator as a command line option, and is a gRPC endpoint.

With a **context discovery endpoint** there is no path in the URL, and some of the details of the service will be obtained from the context of the endpoint (i.e. where the endpoint was provided and for what).
E.g. for an actor endpoint, the context path is "actor" and the context query adds "actor_class" and "implementation" properties.

E.g.:

```
cogment://discover
cogment://discover?tag=blue
cogment://discover?tag=red&zone=1
```

for an actor, these would be equivalent to:

```
cogment://discover/actor?actor_class=xxx&implementation=xxx
cogment://discover/actor?actor_class=xxx&implementation=xxx&?tag=blue
cogment://discover/actor?actor_class=xxx&implementation=xxx&?tag=red&zone=1
```

For each type of endpoint, the context provides the path and these properties (if available):

-   actor: `actor_class`, `implementation`
-   environment: `implementation`
-   datalog: **nothing**
-   pre-trial hook: **nothing**

A **full discovery endpoint** (i.e. with a path) will provide all the necessary information to the directory and **the context of the endpoint will be ignored**. In other words, no property will be implicitly added to the query sent to the directory, the user is fully responsible to match the URL (and query) to the need.

##### Discovery path

There are two categories of path for discovery endpoints, one for generic service types and the other for specific service types.

The generic path `service` is used to find services of any type.
In this case, the query is `id=XXX` where XXX is a 64 bit unsigned integer representing the unique ID of a service registered in the directory, e.g.:

```
cogment://discover/service?id=67834892
cogment://discover/service?id=42
```

The specific paths are used to find a specific type of service:

-   `actor`: To find an actor service
-   `environment`: To find an environment service
-   `datalog`: To find a data logger service
-   `prehook`: To find a pre-trial hook service
-   `lifecycle`: To find a service offering trial life scycle management
-   `actservice`: To find a service offering client actor connection

The `prehook`, `lifecycle` and `actservice` paths are not for use in the parameters.
The `prehook` path is for use by the Orchestrator on the command line.
`lifecyle` and `actservice` are for use by services themselves, usually to find an Orchestrator to connect to.

##### Discovery query

Following the path in the discovery endpoint, is the optional query; properties to find a suitable service.
All the properties provided in the query must match.
Which properties are acceptable depends on the directory (and how the services are registered in the directory).

The query in the discovery endpoint must follow these guidelines:

-   Entries are separated by the ampersand (&)
-   Property name and associated value are separated by an equal sign (=)
-   Property names and values must be composed of only these characters: A-Z, a-z, 0-9, underscore (\_), dash (-)
-   Property names starting with a double underscore (**) are reserved. E.g `**authentication-token`

E.g.:

```
cogment://discover/actor?implementation=d3qn
cogment://discover/environment?implementation=fqdn3&type=fast-2x&ping=low
cogment://discover/datalog?name=high&color=green_blue
```

##### Reserved query properties

Some property names are reserved for use by other services than the directory.
These names cannot be used as properties to inquire from (or register in) the directory.
They are used for special purposes that differ for each name.

-   `__authentication-token`: This query property is used to provide authentication to the directory for an inquiry. The value (and need) depends on the directory implementation and/or how the registration of the service is made in the directory.
