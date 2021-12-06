# Step 1: Create a new Trial

## Install Cogment

To follow this tutorial you'll need a working installation of **Cogment**. If you haven't done so already, follow our [installation instructions](../../introduction/installation.md).

## Bootstrap the app

The Cogment command line interface (CLI) includes a simple tool to generate the base files and folder structures for a Cogment app. The first thing we'll do is use it to create an app with 2 AIs able to play games of RPS.

Using Cogment's terminology, we will create 2 actors sharing a single implementation picking a random move for each round. We will develop a **service actor** implementation which is well suited for AIs rather than a **client actor** implementation, which would be required for an interactive actor; for exemple, an actor controlled by a Human player. In the [step 5](../5-human-player) we will create such implementation.

Run the following to bootstrap the app in a `rps` directory:

```console
$ cogment init rps

Enter how many actor classes should be created: 1
[class 1] Enter the name of the class: player
[class #1 'player'] Enter the number of service implementations that should be created (empty for 1): 1
[class #1 'player' > service impl. #1] Enter the name of the implementation: random_agent
[class #1 'player' > service impl. #1 'random_agent'] Enter the number of actor instances using this implementation (empty for 1): 2
[class #1 'player'] Should a client implementation be created (Y or N, empty for Y): N
Should a web-client be created (Y or N, empty for Y): N

$ cd rps
```

To summarize, for this 2 players game, we created:

-   1 actor class, `player`, because RPS is a symmetric game, both players have the same role within the game,
-   1 actor implementation for this class, `random_agent`, because at the moment we only want to implement one way of playing,
-   2 actor instances, because the game has 2 players.

> ℹ️ For the remainder of this tutorial, unless otherwise mentioned, it is assumed that all operations are run in the `rps` directory.

## Building and running the app

We can now check that everything works as expected.

First, we will need to run the build phase. The docker files rely on cogment.yaml, and data.proto to be in the respective build directories, the shortcut for copying these files to the build directories is `cogment run sync`

```console
$ cogment run sync
$ cogment run build
```

Run the following to start all the services of the Cogment app as docker containers: the `orchestrator`, the `environment` and our `random_agent`.

```console
$ cogment run start
```

In another terminal, run the following to start a client for this Cogment app, this will connect to the running services to start a trial, let it run for a few seconds and then terminate it.

```console
$ cogment run client
Executing docker-compose run --rm client in .
Creating rps_client_run ... done
Client up and running.
Trial 'b8251a1a-fad0-43b9-a1cc-00dcbebbfaa7' starts
Trial 'b8251a1a-fad0-43b9-a1cc-00dcbebbfaa7' terminating
```

This should also generate some logs in the first terminal where the app services are running. You can now terminate the services using `ctrl+C`.

At this point we have generated a working but empty Cogment app and we checked that it could build and run. We are now ready to start the actual implementation!

## Define our data structures

Cogment uses [Protocol Buffers](https://developers.google.com/protocol-buffers/){target=\_blank} to define data structures. The initial definitions are located in the `data.proto` and look like that.

```proto
syntax = "proto3";

package rps;

message EnvConfig {
}

message TrialConfig {
	EnvConfig env_config = 1;
}

message Observation {}
message PlayerAction {}
```

Note that a file named `cogment.yaml` was also created in the `rps` directory by the boostrap process.
This file is the main configuration for your Cogment app. In it, you will see a reference to:

```yaml
import:
    proto:
        - data.proto
```

`EnvConfig` and `TrialConfig` will be discussed in the coming steps. For now we'll focus on defining the **Action Space and Observation Space** for our RPS app.

### Action Space

Let's start by filling up `PlayerAction` which defines what each player can do at each step of the game. In the case of RPS, players chose one move among the three alternatives giving their name to the game: _"Rock"_, _"Paper"_ or _"Scissors"_.

To do that we will use an `enum` called `Move`,

```proto
enum Move {
  ROCK = 0;
  PAPER = 1;
  SCISSORS = 2;
}
```

and use that type in `PlayerAction`.

```proto
message PlayerAction {
  Move move = 1;
}
```

Modify the `data.proto` file to include the above additions.

### Observation Space

The `Observation` structure defines what the actors perceive from the environment. It is an input they use to choose which action to take.

In the context of RPS, the environment is limited to the two players and what they played. We represent this information in a data structure called `PlayerState` using two properties.

```proto
message PlayerState {
  Move last_move = 1; // Last move played
  bool won_last = 2;  // Did the player win the last round
}
```

The `Observation` structure itself defines the observed players from the point of view of each player.

```proto
message Observation {
  PlayerState me = 1;
  PlayerState them = 2;
}
```

Edit the `data.proto` file to include the above additions. This file is used during the code generation phase to make the defined data structures available to the different services.

To check that everything is working [build and run](#building-and-running-the-app) the application. Nothing should be different at this stage.

This concludes the step 1 of the tutorial: you have bootstrapped a Cogment project, implemented the data structures defining the action and observation spaces, started your app and ran a trial.

Let’s move on to actually implementing our services in [step 2](./2-random-player.md).
