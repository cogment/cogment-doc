---
title: Launch
sidebar_position: 5
---

# Launch

Launch is a utility command meant to faciliate locally launching and shutting down an entire cogment project at once.

When launch is used, a set of processes will be launched, as described by a yaml file. Once any of these processes terminates, all other ones will be terminated as well.

## Command line

Launch is a command that takes a single parameter: a yaml file describing the processes to launch.

```bash
$ cogment launch ./launch.yaml
```

## launch.yaml

The launch yaml file consists of a single top-level object called `scripts`.

Each property of `scripts` represents one of the processes to run. It will be done by running the contents of the `commands` property in sequence

```yaml
scripts:
    process_a:
        commands:
            - ["python", "env/main.py"]

    process_b:
        commands:
            - ["cogment", "service", "orchestrator"]
```

## Environment Variables

You can specify environment variables to set using the `environment` property of scripts:

E.g.

```yaml
scripts:
    orchestrator:
        environment:
            COGMENT_ORCHESTRATOR_ACTOR_PORT: 9000
        commands:
            - ["cogment", "services", "orchestrator"]
```

## Variable substitution

You can use to environment variables using `{{.VAR_NAME}}` anywhere whitin the grammar. Variables set using `environment` will be also available within `commands`.

E.g.

```yaml
scripts:
    say_hi:
        commands:
            - ["echo", "Hello, {{.USER}}"]
```

N.B. Technically, it uses [go text templates](https://pkg.go.dev/text/template), where the root object is a dictionnary of the available environment variables.

## Working directory

By default, the current working directory is set to the folder containing the launch script. You can override that behavior with the `dir` property:

E.g.

```yaml
scripts:
    dir: environment
    commands:
        - ["python", "main.py"]
```
