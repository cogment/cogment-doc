---
title: Installation
sidebar_position: 2
---

# How to Download and Install Cogment

## Pre-Requisites

Please install:

1. [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)
2. [protoc](https://github.com/protocolbuffers/protobuf)

## Install the latest Cogment CLI

### Installation script (compatible with linux and macOS for `x86_64` architectures)

To install the latest version of the Cogment CLI for virtually any Linux distribution, macOS and WSL2 on windows, run the the following command:

```console
curl --silent -L https://raw.githubusercontent.com/cogment/cogment-cli/main/install.sh | sudo bash
```

To install a specific version (here v1.0.0) run the following command:

```console
curl --silent -L https://raw.githubusercontent.com/cogment/cogment-cli/main/install.sh | sudo bash -s -- --version v1.0.0
```

Uninstall is as simple as running:

```console
sudo rm $(which cogment)
```

### Manual installation (compatible with linux, macOS and windows for `x86_64` architectures)

For windows user (and also if you prefer to do a manual install) you can go through those instructions.

1. Download the desired version from [here](https://github.com/cogment/cogment-cli/releases/) from your platform.
2. Copy it as `cogment` in a location that already belongs to your `PATH` (e.g. `/usr/local/bin`) or that you'll [add to your `PATH`](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them) and make sure it is executable (e.g. using `chmod +x /usr/local/bin/cogment`).

### Unsupported platform

If your platform is not supported, especially if you are using an `arm64` architecture, add an [issue](https://github.com/cogment/cogment-cli/issues) listing your platform details and do not hesitate to [contact us](../support/community-channels.md).

### Check that Cogment CLI is accessible.

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
$ cogment run copy
$ cogment run build
$ cogment run start
```

The first `cogment` command will run a simple copy that copies the cogment.yaml, and every referenced proto file, to each build directory. This is so they are made available to docker's build system in each respective build context

The second will build docker images for the services of this Cogment app. If everything runs fine it means the `docker` and `docker-compose` installations are functional.

Finally, the third command will start the Cogment app. In another terminal you can connect to it and play a few games of _RPS_ against a simple AI agent.

```console
$ cogment run client
```

Congratulations, you have a working installation of Cogment! We recommend you head to the [Cogment tutorial](../cogment/tutorial/index.md) to learn how to implement this _RPS_ app from scratch.
