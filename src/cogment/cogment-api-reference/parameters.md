# Trial Parameters

The trial parameters are a set of parameters that define the details of a trial. They are generated from the pre-trial hooks and/or from the default parameters provided to the Orchestrator.

## Parameter file

The parameter file serves to initialize the Orchestrator default parameters. It is able to set all parameters for trials except the config protobuf messages defined in `cogment.yaml`. The config messages can only be set by the pre-trial hooks, but these config are not relevant for simple projects without pre-trial hooks.

These are the parameters that will be used if no pre-trial hooks are defined. And if hooks are defined, they will be sent to the first hook.

The file uses the YAML configuration language. It consists of one YAML section called [trial_params](#trial-params). Any other section will be ignored.

The section defines the default trial parameters. The final parameters are set by the pre-trial hooks (if any are defined).
These parameters are:

-   `max_steps`: The maximum number of time steps (ticks) that the trial will run before terminating. If 0, the trial will not be auto terminated (the environment and a Controller can still terminate the trial). If not provided, a default of 0 will be used.
-   `max_inactivity`: The number of seconds of inactivity after which a trial will be terminated. If 0, the trial will not be terminated because of inactivity. If not provided, a default of 30 seconds will be used.
-   `datalog`: List of properties related to the data logger. If this section is not present, data logging is disabled.
    -   `endpoint`: The URL where the datalogger gRPC server resides.
    -   `exclude_fields`: List of fields to exclude from the data to send for logging
-   `environment`: List of properties for the environment
    -   `name`: The name of the environment (defaults to "env" if not provided)
    -   `endpoint`: The URL where the environment gRPC server resides
    -   `implementation`: The name of the implementation to be used for this instance of the environment. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime
-   `actors`: List of actor properties. The number of actors may not be suited for all trials.
    -   `name`: The name of this actor (i.e. name of the specific instance of the actor class)
    -   `actor_class`: The name of the actor class. This is specific to a type of trial and must match values in the corresponding `cogment.yaml` config file.
    -   `endpoint`: The URL where the actor gRPC server resides. If this is `client`, the actor will connect as a client (the Orchestrator being the server in this case).
    -   `implementation`: The name of the implementation to be used for this actor instance. This must match an implementation that is defined at the endpoint. If not defined, an arbitraary implementation will be chosen at runtime.

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
        implementation: default

    actors:
        - name: Alice
          actor_class: BigPlayer
          endpoint: grpc://bp1:9000
          implementation:
        - name: Bob
          actor_class: BigPlayer
          endpoint: grpc://bp2:9000
          implementation: Test
        - name: Carol
          actor_class: SmallPlayer
          endpoint: grpc://sp:9000
          implementation: DQN_Hotel3
        - name: Dave
          actor_class: SmallPlayer
          endpoint: grpc://sp:9000
          implementation: DNN_Karma3.1.17
        - name: Olivia
          actor_class: Referee
          endpoint: client
          implementation: Standard
```

## Parameters and pre-trial hooks

Pre-trial hooks are gRPC services that will be called to set up the parameters for a new trial. Multiple hooks can be defined and they will all be called in order, in a pipeline fashion (i.e. the output of one becomes the input of the next). The first hook service to be called will receive the default parameters, in addition with the config given to the `start_trial` function call. The output of the last hook is used to start the new trial. The response of the last hook will be waited on before the trial starts.

The hooks will be called to update or generate all the parameter data (presented here) in addition to the configurations for the environment and the actors (if needed).

Pre-trial hooks are defined on the command line (or an environment variable) when starting the Orchestrator.
