---
sidebar_position: 5
---

# Launch

Launch is a utility command meant to facilitate locally launching and shutting down an entire cogment project at once.

When launch is used, a set of processes will be launched to run in parallel, as described by a yaml file. Once any of these processes terminates, all other ones will be terminated as well.

## Command line

Launch is a command that takes a single parameter: a yaml file describing the processes to launch.

```bash
$ cogment launch ./launch.yaml
```

## launch.yaml

The launch yaml file consists of a single top-level object called `scripts`.

Each node under `scripts` represents one of the processes to run. The processes can be given any name, which will serve to identify outputs related to that process.

Each process will run the contents of the `commands` list in sequence (i.e. the next command will run when the previous terminates). Each command runs in an independent environment (e.g. environment variables set by one command will not be seen by the others).

E.g.:

```yaml
scripts:
    process_a:
        commands:
            - ["retrieve_db.sh"]
            - ["python", "env/main.py"]

    process_b:
        commands:
            - ["cogment", "service", "orchestrator"]
```

## Environment Variables

You can set environment variables using the `environment` node of the process. These will be part of the environment of all commands of the process.

E.g:

```yaml
scripts:
    orchestrator:
        environment:
            COGMENT_ORCHESTRATOR_ACTOR_PORT: 9000
            COGMENT_LIFECYCLE_PORT: 9000
        commands:
            - ["cogment", "services", "orchestrator"]
```

## Variable substitution

You can substitute environment variables using `{{.ENV_VAR}}` anywhere within the grammar of the `commands` list. Environment variables set in the `environment` node will also be available for substitution.

E.g.:

```yaml
scripts:
    say_hi:
        environment:
            QUESTION: "How are you?"
        commands:
            - ["echo", "Hello, {{.USER}}. {{.QUESTION}}"]
```

## Working folder

By default, the current working folder is set to the folder containing the launch script. You can override that behavior with the `dir` node for each process.

E.g.:

```yaml
scripts:
    actor_alpha:
        dir: ./actors/alpha
        commands:
            - ["python", "main.py"]
```
