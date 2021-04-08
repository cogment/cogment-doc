# How to Download and Install Cogment

## Pre-Requisites

Please install:

1. [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/)
2. [protoc](https://github.com/protocolbuffers/protobuf)

## Install the latest Cogment CLI

1. `cogment` CLI releases are available [here](https://github.com/cogment/cogment-cli/releases/) as executable binaries.
2. Pick a version, usually the latest one should be the right pick.
3. At the end of the release notes, click on "Assets" to choose and download the appropriate version for your system.
4. Rename the file to "cogment", and add it to your [`PATH` environmental variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them). 

You can follow more specific instructions for your OS in the following.

### Linux

The following downloads version `COGMENT_CLI_VERSION` of the cli to `/usr/local/bin`, a location already belonging to your `PATH` in most linux distributions and make sure it is executable.

Simply replace `COGMENT_CLI_VERSION` with the version you want to download, e.g. `v1.0.1`.

```console
$ curl -L https://github.com/cogment/cogment-cli/releases/download/COGMENT_CLI_VERSION/cogment-linux-amd64 -o /usr/local/bin/cogment && chmod +x /usr/local/bin/cogment
```

### macOS

> At the moment Cogment will only work on x86 _intel_ macs

The following downloads version `COGMENT_CLI_VERSION` of the cli to `/usr/local/bin`, a location already belonging to your `PATH` in macOS and make sure it is executable.

Simply replace `COGMENT_CLI_VERSION` with the version you want to download, e.g. `v1.0.1`.

```console
$ curl -L https://github.com/cogment/cogment-cli/releases/download/COGMENT_CLI_VERSION/cogment-macOS-amd64 -o /usr/local/bin/cogment && chmod +x /usr/local/bin/cogment
```

### Windows

1. Download the windows version of the cogment CLI as described above.
2. Rename the downloaded file `cogment-windows-amd64.exe` to `cogment.exe`.
2. Copy it to an easy to find location, e.g. `c:\\cogment`.
3. Add the `c:\\cogment` folder to your [`PATH` environmental variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them).

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
