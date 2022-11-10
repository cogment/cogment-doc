# Step 2: Implement a first actor and environment

:::note

This part of the tutorial follows [step 1](./1-bootstrap-and-data-structures.md), make sure you've gone through it before starting this one. Alternatively, the completed step 1 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will implement the (very simple) decison logic for the random player as well as the base mechanics for RPS, i.e. the rules of the game, in the environment services.

## Random player agent

In the `rps` folder, the `random_agent` folder contains the python implementation for the eponymous service. You'll find a few files here:

-   `cogment.yaml` and `data.proto` are copied from the `rps` folder and `cog_settings.py` and `data_pb2.py` are generated from them when running `./run.sh build`, don't edit them here.
-   `requirements.txt` is a [pip requirement file](https://pip.pypa.io/en/stable/reference/pip_install/?highlight=requirements#requirements-file-format) defining the dependencies of the service. For the moment it only lists [`cogment`](https://pypi.org/project/cogment/), Cogment's python SDK.
-   `main.py` contains the implementation of the service.

:::note

To get a better understanding of what happens when running `./run.sh build`, you can take a look at `./run.sh` and in particular to the `_py_build` function that is called on all the python modules folder.

You'll see that it does the following:

-   Load the environment variables defined in `.env`,
-   Copy `cogment.yaml` and `data.proto` to the module's folder,
-   Create a python virtualenv and activate it,
-   Install the python dependencies defined in `requirements.txt`,
-   Run the cogment python code generation tool to generate `cog_settings.py` and `data_pb2.py`.

:::

Open `main.py` and take a look at the initial content.

At the bottom you'll find the `main` function, it initializes Cogment's context, registers the `random_agent` actor's implementation, then starts the service itsef on the tcp port defined by the `RANDOM_AGENT_PORT` environment variable and awaits its termination. All the environment variables for this projects are defined in a `.env` file that is loaded by the `./run.sh` script, to change the port this service uses, simply update the `.env` file.

:::tip

Cogment's python sdk leverages Python's [asynchronous features](https://docs.python.org/3/library/asyncio-task.html), you'll need a basic understanding of them.

:::

```python
async def main():
    print(f"Random agent service starting on port {PORT}...")

    context = cogment.Context(cog_settings=cog_settings, user_id="rps")
    context.register_actor(
        impl=random_agent,
        impl_name="random_agent",
        actor_classes=["player",])

    await context.serve_all_registered(cogment.ServedEndpoint(port=PORT), prometheus_port=0)
```

At the beginning of the file, the function `random_agent` is the actor's implementation. This function is called once per actor and per trial and handles the full lifetime of the actor.

-   The actor's **initialization**, before the `async for`. This is where, for example, actor's internal data can be defined before calling `actor_session.start()` to notify that it is ready,
-   Its **event loop**, the content of the `async for`. This is where resides the implementation of the actor's response to various events,
-   Its **termination**, after the `async for`.

The generated implementation is very simple:

-   it handles the three main kind of events: **observations**, **rewards** and **messages**,
-   it does a default **action** whenever required, i.e. in response to an observation.

We will further learn about how to use rewards in [step 3](./3-rewards.md) and observations in [step 4](./4-heuristic-player.md). Messages are out of the scope for this _basics_ tutorial.

Please note the import and usage of `PlayerAction` which is the data structure from `data.proto` defining the actor's action space.

```python
async def random_agent(actor_session):
    actor_session.start()

    async for event in actor_session.all_events():
        if event.observation:
            observation = event.observation
            print(f"'{actor_session.name}' received an observation: '{observation}'")
            if event.type == cogment.EventType.ACTIVE:
                action = PlayerAction()
                actor_session.do_action(action)
        for reward in event.rewards:
            print(f"'{actor_session.name}' received a reward for tick #{reward.tick_id}: {reward.value}")
        for message in event.messages:
            print(f"'{actor_session.name}' received a message from '{message.sender_name}': - '{message.payload}'")
```

Our goal is to implement an actor playing at random. We first need to import the different `Move`, as defined in our data structures. We also need to import `random`, the python package generating random numbers.

```python
from data_pb2 import ROCK, PAPER, SCISSORS

import random

MOVES = [ROCK, PAPER, SCISSORS]
```

Once this is available we can simply update the _taking decision_ part of the actor's implementation to compute a random move whenever it is needed.

```python
if event.observation:
    observation = event.observation
    print(f"'{actor_session.name}' received an observation: '{observation}'")
    if event.type == cogment.EventType.ACTIVE:
        action = PlayerAction(move=random.choice(MOVES))
        actor_session.do_action(action)
```

Modify the `random_agent/main.py` file to include the above additions.

## Implementing the rules of the game

In the `rps` folder, the `environment` folder contains the python implementation for the eponymous service. Similarly to the actor's service, you will find a few files here.

Open `main.py` and take a look at the initial content.

The code is very similar to the `random_agent`'s. In the `main` function, instead of using `register_actor`, `register_environment` is used. The implementation function, called `environment` here, is structured similarly to the actor's one but handles two kinds of events: **actions** (and the last actions of a trial **final_actions**) and **message**. Environments don't perform actions, they produce observations that are sent to the actors participating in the trial.

Please note the import and usage of `Observation` which is the datastructure defined in `data.proto` defining the actors observation space.

```python
async def environment(environment_session):
    print(f"Start trial {environment_session.get_trial_id()}")

    # Start the trial and send an initial observation to all actors
    environment_session.start([("*", Observation())])

    async for event in environment_session.all_events():
        if event.actions:
            actions = event.actions
            print(f"environment received the actions")
            for actor, recv_action in zip(environment_session.get_active_actors(), actions):
                print(f" actor '{actor.actor_name}' did action '{recv_action.action}'")
            observation = Observation()
            if event.type == cogment.EventType.ACTIVE:
                # The trial is active
                environment_session.produce_observations([("*", observation)])
            else:
                # The trial termination has been requested
                environment_session.end([("*", observation)])
        for message in event.messages:
            print(f"environment received a message from '{message.sender_name}': - '{message.payload}'")

    print("environment end")
```

Our goal, in this section, is to implement how the environment computes the observations from the actions done by the actors at a given timestep.

We first import the needed datastructure, define a mapping to be able to print moves and define a dictionary mapping each move to the move that defeats it.

```python
from data_pb2 import PlayerState, ROCK, PAPER, SCISSORS

MOVES_STR = ["👊 rock", "✋ paper", "✌️ scissors"]

DEFEATS = {
    ROCK: PAPER,
    SCISSORS: ROCK,
    PAPER: SCISSORS
}
```

In the **initialization** phase of the environment implementation, i.e. before the `async for`, we create a simple `state` data structure that is keeping around the number of rounds played and won by each of the two players.

We then compute the initial observation for each of the two players. One instance of `PlayerState` per player is created, each is used as the `me` and `them` state of each player's observation.

```python
state = {
    "rounds_count": 0,
    "p1": {
        "score": 0
    },
    "p2": {
        "score": 0
    },
}
print(f"Start trial {environment_session.get_trial_id()}")
[p1, p2] = environment_session.get_active_actors()
p1_state = PlayerState(won_last=False, last_move=None)
p2_state = PlayerState(won_last=False, last_move=None)
environment_session.start([
    (p1.actor_name, Observation(me=p1_state, them=p2_state)),
    (p2.actor_name, Observation(me=p2_state, them=p1_state)),
])
```

In the **event loop** we implement how the environment produces observations based on the actor's actions.

We start by retrieving each player's action and computing who won the round. Then, we update the internal `state`. Finally, we produce up-to-date observations for the players.

```python
if event.actions:
    [p1_action, p2_action] = [recv_action.action for recv_action in event.actions]
    print(f"{p1.actor_name} played {MOVES_STR[p1_action.move]}")
    print(f"{p2.actor_name} played {MOVES_STR[p2_action.move]}")

    # Compute who wins, if the two players had the same move, nobody wins
    p1_state = PlayerState(
        won_last=p1_action.move == DEFEATS[p2_action.move],
        last_move=p1_action.move
    )
    p2_state = PlayerState(
        won_last=p2_action.move == DEFEATS[p1_action.move],
        last_move=p2_action.move
    )
    state["rounds_count"] += 1
    if p1_state.won_last:
        state["p1"]["score"] += 1
        print(f"{p1.actor_name} wins!")
    elif p2_state.won_last:
        state["p2"]["score"] += 1
        print(f"{p2.actor_name} wins!")
    else:
        print(f"draw.")

    # Generate and send observations
    observations = [
        (p1.actor_name, Observation(me=p1_state, them=p2_state)),
        (p2.actor_name, Observation(me=p2_state, them=p1_state)),
    ]
    if event.type == cogment.EventType.ACTIVE:
        # The trial is active
        environment_session.produce_observations(observations)
    else:
        # The trial termination has been requested
        environment_session.end(observations)
```

Finally, in the **termination** phase, we print some stats about the trial itself.

```python
print(f"Trial {environment_session.get_trial_id()} ended:")
print(f"\t * {state['rounds_count']} rounds played")
print(f"\t * {p1.actor_name} won {state['p1']['score']} rounds")
print(f"\t * {p2.actor_name} won {state['p2']['score']} rounds")
print(f"\t * {state['rounds_count'] - state['p1']['score'] - state['p2']['score']} draws")
```

Modify the `environment/main.py` file to include the above additions. Please note that this code makes assumptions on the number of actors and their classes. Production code should handle non-standard cases in a better way.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. Given the nature of the game and the fully random nature of the plays you should have around 1/3 of player 1 wins, 1/3 of player 2's and 1/3 of draws.

This concludes the step 2 of the tutorial: you implemented your first actor and your first environment.

Let’s move on to learning more about rewards in [step 3](./3-rewards.md).
