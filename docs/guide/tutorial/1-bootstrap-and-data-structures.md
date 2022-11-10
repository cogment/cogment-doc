# Step 1: Create a new Trial

## Prerequisites

To follow this tutorial you'll need a working installation of **Cogment**. If you haven't done so already, follow our [installation instructions](../../reference/cli/index.md).

Additionaly, you'll need:

-   [python](https://www.python.org/) 3.7 or later,
-   [virtualenv](https://virtualenv.pypa.io/en/latest/).

## Bootstrap

The easiest way to get started with the project structure is to retrieve the result of step 1 from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps) from the `1-bootstrap-and-data-structures` folder in a new local `rps` folder.

If you followed the installation test instructions, you probably already downloaded or cloned the sources for the tutorial from <https://github.com/cogment/cogment-tutorial-rps>. If not, now is the time to do so.

You can then get a clean starting point using

```console
mkdir rps
cd rps
cp -r /path/to/cogment-tutorial-rps/1-bootstrap-and-data-structures/. .
```

This will get you started for an app with 2 AIs able to play games of Rock-Paper-Scissor (RPS).

In Cogment's terminology, we have created 2 actors sharing a single implementation picking a random move for each round. We will develop a **service actor** implementation which is well suited for AIs, rather than a **client actor** implementation which would be better for an interactive actor; for exemple, an actor controlled by a Human player. In [step 5](./5-human-player.md), we will create such implementation.

:::note

For the remainder of this tutorial, unless otherwise mentioned, it is assumed that all operations are run in the `rps` folder.

:::

## Building and running the app

We can now check that everything works as expected.

First, we will need to run the build phase. This script will actually copy the `cogment.yaml` and all referenced proto files to the modules directories, create virtualenvs and install the python dependencies.

```console
./run.sh build
```

3 python modules are defined in their own folders in this first step:

-   `environment` is a service where we will implement the dynamics of the game itself,
-   `random_agent` is a service where we will implement a first "AI" agent picking moves at random,
-   `client` is a simple script that launches Cogment trials, in this case RPS games.

Run the following to start all the services of the Cogment app as well as the Cogment orchestrator: the `orchestrator`, the `environment` and our `random_agent`.

```console
./run.sh services_start
```

In another terminal, run the following to start a client for this Cogment app. This will connect to the running services to start a trial, let it run for a few seconds, and then terminate it.

```console
$ ./run.sh client_start
Client starting...
Trial 'c2663cd4-f93f-4156-90fd-1ee002b18c1f' started
Trial 'c2663cd4-f93f-4156-90fd-1ee002b18c1f' terminated
```

This should also generate some logs in the first terminal where the app services are running. You can now terminate the services using `ctrl+C`.

At this point we have a working but empty Cogment app. Before starting to implement the environment and the agent, let's take a look at the trial specifications that are also defined in what you fetched.

## Trial specs

The trial specs are defined in the file named `cogment.yaml` and its imported [Protocol Buffers](https://developers.google.com/protocol-buffers/) (protobuf) files, here `data.proto`. Trial specs define what protobuf messages the actor and environments participating in the trial will use and expect.

Let's first take a look at the `cogment.yaml` file.

The first `import` section defines the location of the prototobuf files that are used.

```yaml
import:
    proto:
        - data.proto
```

In our case `data.proto` already defines several protobuf message types in the `rps` package. They are referred to in the following sections of the file.

The following sections relate to the configuration for the environment and the trial, they will be discussed in the coming steps.

```yaml
environment:
    config_type: rps.EnvironmentConfig

trial:
    config_type: rps.TrialConfig
```

For now we'll focus on the last section, the actor classes and their **Action Space and Observation Space**.

```yaml
actor_classes:
    - name: player
      action:
          space: rps.PlayerAction
      observation:
          space: rps.Observation
```

### Action Space

Let's start by opening the `data.proto` file to look at `PlayerAction` which defines what each player can do at each step of the game. In the case of RPS, players choose one move among the three alternatives giving their name to the game: _"Rock"_, _"Paper"_ or _"Scissors"_.

To do that we use an `enum` called `Move`.

```proto
enum Move {
  ROCK = 0;
  PAPER = 1;
  SCISSORS = 2;
}
```

This type is used in `PlayerAction`.

```proto
message PlayerAction {
  Move move = 1;
}
```

### Observation Space

The `Observation` message type defines what the actors perceive from the environment. It is an input they use to choose which action to take.

In the context of RPS, the environment is limited to the two players and what they played. We represent this information in a data structure called `PlayerState` using two properties.

```proto
message PlayerState {
  optional Move last_move = 1; // Last move played
  bool won_last = 2;  // Did the player win the last round
}
```

Note that `last_move` is optional because during the first round of the game, the players have not yet played any move.

The `Observation` message type itself defines the observed players from the point of view of each player.

```proto
message Observation {
  PlayerState me = 1;
  PlayerState them = 2;
}
```

This concludes the step 1 of the tutorial: you have bootstrapped a Cogment project, learned about the trial specs and in particular the action and observation spaces, started your app and ran a trial.

Let’s move on to actually implementing our services in [step 2](./2-random-player.md).
