# Orchestrator

The Orchestrator is the heart of Cogment. It is the back end of Cogment. It is a Linux based single executable configured through command line and some environment variables.

## Command line

The Orchestrator is simply called this way

```bash
$ orchestrator --lifecycle_port=9001 --actor_port=9001 --params=params.yaml --pre_trial_hooks=grpc://config:9001
```

All configuration is possible through the command line. The various command line options are described here:

- `help`: The list of command line parameters with short description. Also shows the envrionment variables recognized.
  
- `lifecycle_port`: The TCP port where to serve the trial lifecycle gRPC service (TrialLifecycleSP). This is where the Controller connects to. Default: 9000.
  
- `actor_port`: The TCP port where to serve the client actor gRPC service (ClientActorSP). This is where client actors (as opposed to service actors) connect to. Default: 9000

- `params`: The name of the YAML file containing the default parameters for new trials. Some of The parameters must match their corresponding values in the `cogment.yaml` file and may therefore lock an Orchestrator instance to specific types of trials. If pre-trial hooks are defined, these parameters are sent to the first hook.

- `pre_trial_hooks`: gRPC endpoint definitions for pre-trial hooks, separated by commas. A gRPC endpoint is a URL that starts with "grpc://". Hooks are called before a new trial starts. They are called in order, in a pipeline fashion to set the parameters for new trials. The first hook will receive the default parameters, the last hook result will be used as the parameters for the new trial.

- `prometheus_port`: The TCP port where to serve Prometheus metrics.

- `version`: Output the version of the Orchestrator to stdout.

- `status_file`: File containing simple status for the Orchestrator. This is useful when running the Orchestrator inside containers or synchronizing with external components. The file is open and stays open while the Orchestrator runs. The file will contain one to three letters: I, R, T. "I" indicates that the Orchestrator is initializing. When the Orchestrator starts, the file only contains this letter. "R" indicates that the Orchestrator is ready. This letter is added to the file (thus the file will normally contain "IR" at this point). "T" indicates that the Orchestrator has terminated (crashes will not set this file to "T"). Thus after a normal end, the file will contain "IRT".

- `private_key`: File name containg a PEM encoded private key for encrypted communication.

- `root_cert`: File name containing a PEM encoded trusted root certificate.

- `trust_chain`: File name containing a PEM encoded trust chain.

- `log_level`: Set to define the minimum level for logging.  Possible values are: `off`, `error`, `warning`, `info`, `debug`, `trace`. Note however that all trace and most debug level logs will only output if running the debug compiled version of the Orchestrator. Default: `info`.

- `log_file`: Base file name for daily log output. The name will be suffixed with the date and a new file will be made every day. If not provided the logs go to stdout.

## Environment variables

Environment variables correspond to one of the command line parameters.  But if both are provided, the command line takes precedence.

- `COGMENT_LIFECYCLE_PORT`: This is the same as the `lifecycle_port` command line parameter.

- `COGMENT_ACTOR_PORT`: This is the same as the `actor_port` command line parameter.

- `COGMENT_PROMETHEUS_PORT`: This is the same as the `prometheus_port` command line parameter.

- `COGMENT_PRE_TRIAL_HOOKS`: This is the same as the `pre_trial_hooks` command line parameter.
