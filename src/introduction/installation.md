# How to Download and Install Cogment

## Pre-Requisites

Please install:

1. [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)

2. [protoc](https://github.com/protocolbuffers/protobuf)

## Install the latest Cogment CLI

The latest `cogment` CLI is available [here](https://github.com/cogment/cogment-cli/releases/) as an executable binary.

Choose the appropriate file for your system, rename the file to "cogment", and make sure to put it in a folder that is in your 'PATH' environmental variable.

With a working installation you can run the following in a terminal:

```console
$ cogment version
```

You can then list all the commands by typing:

```console
$ cogment help
```

or for help on each individual command:

```console
$ cogment help <command>
```

## Test your installation

In order to test that your installation is fully working, run an existing Cogment app, for example one of the steps of the tutorial.

Download or clone the sources for the official Rock-Paper-Scissors (_RPS_) tutorial from <https://github.com/cogment/cogment-tutorial-rps>.

Once it is done, run the following in the directory you retrieved:

```console
$ cd 5-human-player
$ cogment run generate
$ cogment run build
$ cogment run start
```

The first `cogment` command will run the code generation phase for this project. If everything runs fine it means `cogment` and Protobuf's `protoc` are installed correctly.

The second will build docker images for the services of this Cogment app. If everything runs fine it means the `docker` and `docker-compose` installations are functional.

Finally, the third command will start the Cogment app. In another terminal you can connect to it and play a few games of _RPS_ against a simple AI agent.

```console
$ cogment run client
```

Congratulations, you have a working installation of Cogment! We recommend you head to the [Cogment tutorial](../cogment/tutorial/introduction.md) to learn how to implement this _RPS_ app from scratch.
