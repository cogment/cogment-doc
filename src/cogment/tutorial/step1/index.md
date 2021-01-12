# Step 1 : Create a new Trial

Pre-requisites: Please see our [installation instructions][7]!

## Bootstrap the project

Run the following to create a bootstrap project:

```text
$ cogment init rps

  Master client actor name: human
  Number of agent actor types: 1
  Agent actor type 1 name: agent
  Number of agent 'agent' instances: 1
  registering data.proto
  rps
  Warning: protoc-gen-mypy not found, IDE autocomplete support will be limited.

$ cd rps
```

For Rock-Paper-Scissors (i.e. RPS), there are 2 types of [Actors][1], one named "human" and one named "agent".

You now have all the needed elements of a (blank) cogment project. Now, let's implement the logic. Have a look at the `data.proto` file contents of the rps directory. You should see the following -

```yaml
syntax = "proto3";

package rps;

message EnvConfig {
}

message TrialConfig {
EnvConfig env_config = 1;
}

message Observation {}

message HumanAction {}

message AgentAction {}
```

## Define our data structures

Cogment uses [Protocol Buffers][2] to define and serialize messages, and [GRPC][3] for communication across services.

`data.proto`

```yaml
syntax = "proto3";

package rps;

message EnvConfig {
}

message TrialConfig {
EnvConfig env_config = 1;
}

enum Decision {
NONE = 0;
ROCK = 1;
PAPER = 2;
SCISSOR = 3;
}

message Observation {
int32 p1_score = 1;
int32 p2_score = 2;
}

message HumanAction {
Decision decision = 1;
}

message AgentAction {
Decision decision = 1;
}
```

In RPS, the [Action Space][4] of our [Actor Classes][5] is a discrete choice between three alternatives (“Rock”, “Paper”, “Scissors” - with the addition of a “None” decision which will be used when we initialize the game). We will use an enum, called **Decision** to represent those alternatives and have a field of that enum type within the action space.

The **Observation** is a point-in-time snapshot of the state of the environment. In the present RPS case, it’s the score of each player.

The **HumanAction** is the action taken by an Actor of the player class **Human** (or Client/User) and the **AgentAction** is the action taken by an Actor of the player class **Agent**.

In the `rps` directory, modify the `data.proto` file to include the above additions.

Note that a file named `cogment.yaml` was also created in the `rps` directory by the boostrap process.
This file is the main configuration for your cogment project. In it, you will see a reference to:

```yaml
import:
  proto:
    - data.proto
```

This tells cogment to include that file when generating all necessary python code.
Running the following cogment command in the `rps` directory, will generate the pythong code:

```text
$ cogment generate --python_dir=.
```

Note --- for the remainder of this tutorial, unless mentioned, it is assumed that all operations are run in the rps directory.

## The Environment

A default environment is provided by the bootstrap project code. It inherits from the `cogment::Environment` class
and defines 3 methods: `start, update, end`)

Start the Env service

```text
$ docker-compose up env
Creating network "rps_default" with the default driver
Creating rps_env_1 ... done
Attaching to rps_env_1
env_1           | Versions for Env:
env_1           |   cogment_sdk: 0.3.0-alpha5
env_1           |   grpc: 1.30.0
env_1           |   env: 1.0.0
env_1           | Environment service started
env_1           | cogment.Environment service listening on port 9000
```

and test it in another terminal

```text
 $ docker-compose run grpc-cli call env:9000 Version ""
connecting to env:9000
versions {
  name: "cogment_sdk"
  version: "0.3.0-alpha5"
}
versions {
  name: "grpc"
  version: "1.30.0"
}
versions {
  name: "env"
  version: "1.0.0"
}

Rpc succeeded with OK status
```

The Environment is up and running.

## The Agent

The bootstrap project provides as many agent files as were defined in the init process we did in the [Bootstrap the project section][6] above: two actors were defined (`human` and `agent`), with one of the actors being an agent that we called `agent`. Therefore, an `Agent` directory was created in the `Agents` directory which contains the _main.py_ agent file.

An agent must implement 3 methods: `decide, reward, end`

VERSIONS is a special variable used to display different versions by calling the **Version** procedure.
The framework takes care of adding versions of the sdk and grpc.

Start the agent service (the agent will be build and you'll see the following) -

```text
$ docker-compose up agent
Creating rps_agent_1 ... done
Attaching to rps_agent_1
agent_1         | Versions for Agent:
agent_1         |   cogment_sdk: 0.3.0-alpha5
agent_1         |   grpc: 1.30.0
agent_1         |   agent: 1.0.0
agent_1         | Agent Service started
agent_1         | cogment.Agent service listening on port 9000
```

In another terminal, test it as follows -

```text
$ docker-compose run grpc-cli call agent:9000 Version ""
connecting to agent:9000
versions {
  name: "cogment_sdk"
  version: "0.3.0-alpha5"
}
versions {
  name: "grpc"
  version: "1.30.0"
}
versions {
  name: "agent"
  version: "1.0.0"
}

Rpc succeeded with OK status
```

As you've probably noticed, both the environment and agent are running on port 9000. There is no conflict thanks to the under-the-hood use of docker and docker-compose.

## Start the trial service

This service is implemented by running a component called the **orchestrator**, which is the entry point for the system and the interface between the client and the backend. This component is provided as a docker image and is automatically added by the bootstrap process.

The orchestrator needs to know where the Environment and the Agent are running. Cogment uses a distributed infrastructure where components can live on different servers. This is an important concern for Human / AI Interaction training, since one may have a human user base spread out in many different locations.

```text
$ docker-compose up orchestrator
rps_agent_1 is up-to-date
rps_env_1 is up-to-date
Starting rps_orchestrator_1 ... done                                                                                    Attaching to rps_orchestrator_1
orchestrator_1  | [2020-07-27 18:20:36.807] [info] AoM Orchestrator v. 0.3.0-alpha6
orchestrator_1  | [2020-07-27 18:20:36.808] [info] importing protobuf: data.proto
orchestrator_1  | [2020-07-27 18:20:36.809] [info] Adding actor class human
orchestrator_1  | [2020-07-27 18:20:36.809] [info] clearing 0 delta fields
orchestrator_1  | [2020-07-27 18:20:36.809] [info] Adding actor class agent
orchestrator_1  | [2020-07-27 18:20:36.809] [info] clearing 0 delta fields
orchestrator_1  | [2020-07-27 18:20:36.810] [info] default trial params: environment {
orchestrator_1  |   endpoint: "grpc://env:9000"
orchestrator_1  | }
orchestrator_1  | actors {
orchestrator_1  |   actor_class: "human"
orchestrator_1  |   endpoint: "human"
orchestrator_1  | }
orchestrator_1  | actors {
orchestrator_1  |   actor_class: "agent"
orchestrator_1  |   endpoint: "grpc://agent:9000"
orchestrator_1  | }
orchestrator_1  |
orchestrator_1  | [2020-07-27 18:20:36.810] [info] Server listening for trials on 0.0.0.0:9000
```

In a new terminal, call the orchestrator in order to start a new Trial

```text
$ docker-compose run grpc-cli call orchestrator:9000 Start ""
connecting to orchestrator:9000
trial_id: "89675b21-870b-4607-9a6c-88244edef0fd"
observation {
  timestamp: 1595873987332926976
  data {
    snapshot: true
  }
}
actor_counts: 1
```

This concludes Step 1 of the Tutorial: you have bootstrapped a Cogment project, defined your protobufs, started the environment and agent services, and launched a trial through a debug command.

The above sends a start trial command and receives a succeeded response with a trial_id, which you will see on the terminal window listening for trials:

```text
orchestrator_1  | [2020-07-27 18:22:29.882] [info] creating trial: 215cd3e5-d12e-466d-93c9-4d3fcd60ecea
orchestrator_1  | [2020-07-27 18:22:29.882] [info] opening stub for N7cogment11EnvironmentE at env:9000
orchestrator_1  | [2020-07-27 18:22:29.882] [info] opening channel to env:9000
orchestrator_1  | [2020-07-27 18:22:29.883] [info] opening stub for N7cogment5AgentE at agent:9000
orchestrator_1  | [2020-07-27 18:22:29.883] [info] opening channel to agent:9000
orchestrator_1  | [2020-07-27 18:22:29.890] [info] trial 215cd3e5-d12e-466d-93c9-4d3fcd60ecea successfully initialized
```

This concludes Step 1 of the Tutorial: you have bootstrapped a Cogment project, defined your protobufs, started the environment and agent services, and launched a trial through a debug command.

Let’s move on to actually implementing our components.

[1]: ../../../concepts/glossary.md#actor
[2]: https://developers.google.com/protocol-buffers/
[3]: https://grpc.io/
[4]: ../../../concepts/glossary.md#action-space
[5]: ../../../concepts/glossary.md#actor-class
[6]: #bootstrap-the-project
[7]: ../../../introduction/installation.md
