# How to Download and Install Cogment

## Pre-Requisites

Please install:

1. [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)

2. [protoc](https://github.com/protocolbuffers/protobuf)

## Get the latest Cogment CLI

The latest `cogment` CLI is available [here](https://github.com/cogment/cogment-cli/releases/) as an executable binary.

Choose the appropriate file for your system, rename the file to "cogment", and make sure to put it in a folder that is in your 'PATH' environmental variable.

You can then list all the commands by typing:

```console
$ cogment help
```

or for help on each individual command:

```console
$ cogment help <command>
```

### Alternative install method, using Cogment CLI in a docker image

`cogment` CLI can be used as a docker image available [here](https://hub.docker.com/r/cogment/cli). You can retrieve the latest release locally by running:

```console
$ docker pull cogment/cli
```

Then the easier way to use it is to create an alias named `cogment`:

```console
$ alias cogment="docker run --rm -v$(pwd):/cogment -v/var/run/docker.sock:/var/run/docker.sock cogment/cli"
```

Add this to your `.bashrc` or `.zshrc` for `cogment` to be defined in all your sessions. This [article](https://shapeshed.com/unix-alias/) can help you if you're not familiar with aliases.

You are now ready to start using Cogment! We recommend our
[cogment tutorial](../cogment/tutorial/intro.md) as the next step.
