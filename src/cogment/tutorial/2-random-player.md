## Step 2: Implement a first actor and environment

> This part of the tutorial follows [step 1](./1-bootstrap-and-data-structures.md), make sure you've gone through it before starting this one. Alternatively the completed step 1 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

In this step of the tutorial, we will implement the (very simple) decison logic for the random player as well as the base mechanics for RPS, i.e. the rules of the game, in the environment services.

### Random player agent

In the `rps` directory, the `random_agent` directory contains the python implementation for the eponymous service. You'll find two files here:

- `requirements.txt` is a [pip requirement file](https://pip.pypa.io/en/stable/reference/pip_install/?highlight=requirements#requirements-file-format) defining the dependencies of the service. For the moment it only lists [`cogment`](https://pypi.org/project/cogment/), Cogment's python SDK.
- `main.py` contains the implementation of the service.

Open `main.py` and take a look at the generated content.

At the bottom you'll find the `main` function, it initializes Cogment's context, registers the `random_agent` actor's implementation, then starts the service itsef on tcp port 9000 and await for its termination.

> Cogment's python sdk leverages Python's [asynchronous features](https://docs.python.org/3/library/asyncio-task.html), you'll need a basic understanding of them.

```python
async def main():
  print("Random-Agent actor service up and running.")

  context = cogment.Context(cog_settings=cog_settings, user_id="rps")
  context.register_actor(
      impl=random_agent,
      impl_name="random_agent",
      actor_classes=["player",])

  await context.serve_all_registered(port=9000)
```

At the beggining of the file the function `random_agent` is the actor's implementation. This function is called once per actor and per trial and handles the full lifetime of the actor.

- The actor's **initialization**, before the `async for`. This is where, for example, actor's internal data can be defined before calling `actor_session.start()` to notify that it is ready,
- Its **update loop**, the content of the `async for`. This is where resides the implementation of the actor's response to various events,
- Its **termination**, after the `async for`.

The generated implementation is very simple:

- it handles the three main kind of events: **observations**, **rewards** and **messages**,
- it does a default **action** whenever required, i.e. in response to an observation.

We will further learn about how to use observations in [step 4](./4-heuristic-player.md) and rewards in [step 3](./3-rewards.md). Messages are out of the scope for this _basics_ tutorial.

Please note the import and usage of `PlayerAction` which is the data structure from `data.proto` defining the actor's action space.

```python
async def random_agent(actor_session):
    actor_session.start()

    async for event in actor_session.event_loop():
        if "observation" in event:
            observation = event["observation"]
            print(f"'{actor_session.name}' received an observation: '{observation}'")
            action = PlayerAction()
            actor_session.do_action(action)
        if "reward" in event:
            reward = event["reward"]
            print(f"'{actor_session.name}' received a reward for tick #{reward.tick_id}: {reward.value}/{reward.confidence}")
        if "message" in event:
            (sender, message) = event["message"]
            print(f"'{actor_session.name}' received a message from '{sender}': - '{message}'")
        if "final_data" in event:
            final_data = event["final_data"]
            for observation in final_data.observations:
                print(f"'{actor_session.name}' received a final observation: '{observation}'")
            for reward in final_data.rewards:
                print(f"'{actor_session.name}' received a final reward for tick #{reward.tick_id}: {reward.value}/{reward.confidence}")
            for message in final_data.messages:
                (sender, message) = message
                print(f"'{actor_session.name}' received a final message from '{sender}': - '{message}'")
```

Our goal is to implement an actor playing at random. We first need to import the different `Move`, as defined in our data structures. We also need to import `random`, the python package generating random numbers.

```python
from data_pb2 import ROCK, PAPER, SCISSORS

import random

MOVES = [ROCK, PAPER, SCISSORS]
```

Once this is available we can simply update the _taking decision_ part of the actor's implementation to compute a random move whenever it is needed.

```python
if "observation" in event:
  observation = event["observation"]
  print(f"'{actor_session.name}' received an observation: '{observation}'")
  action = PlayerAction(move=random.choice(MOVES))
  actor_session.do_action(action)
```

Modify the `random_agent/main.py` file to include the above additions.

## Implementing the rules of the game

In the `rps` directory, the `environment` directory contains the python implementation for the eponymous service. Similarly to the actor's service, you will find two files here, `requirements.txt` and `main.py`.

Open `main.py` and take a look at the generated content.

The code is very similar to the `random_agent`'s. In the `main` function, instead of using `register_actor`, `register_environment` is used. The implementation function, called `environment` here, is structured similarly to the actor's one but handles two kinds of events: **actions** (and the last actions of a trial **final_actions**) and **message**. Environments don't perform actions, they produce observations that are sent to the actors participating in the trial.

Please note the import and usage of `Observation` which is the datastructure defined in `data.proto` defining the actors observation space.

```python
async def environment(environment_session):
    print("environment starting")
    # Create the initial observaton
    observation = Observation()

    # Start the trial and send that observation to all actors
    environment_session.start([("*", observation)])

    async for event in environment_session.event_loop():
        if "actions" in event:
            actions = event["actions"]
            print(f"environment received actions")
            for actor, action in zip(environment_session.get_active_actors(), actions):
                print(f" actor '{actor.actor_name}' did action '{action}'")

            observation = Observation()
            environment_session.produce_observations([("*", observation)])
        if "message" in event:
            (sender, message) = event["message"]
            print(f"environment received a message from '{sender}': - '{message}'")
        if "final_actions" in event:
            actions = event["final_actions"]
            print(f"environment received final actions")
            for actor, action in zip(environment_session.get_active_actors(), actions):
                print(f" actor '{actor.actor_name}' did action '{action}'")

            observation = Observation()
            environment_session.end([("*", observation)])

    print("environment end")
```

Our goal, in this section, is to implement how the environment computes the observations from the actions done by the actors at a given timestep.

We first import the needed datastructure and define a dictionnary mapping each move to the move that defeats it.

```python
from data_pb2 import PlayerState, ROCK, PAPER, SCISSORS

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
        "won_rounds_count": 0
    },
    "p2": {
        "won_rounds_count": 0
    },
}
print("environment starting")
[p1, p2] = environment_session.get_active_actors()
p1_state = PlayerState(won_last=False, last_move=None)
p2_state = PlayerState(won_last=False, last_move=None)
environment_session.start([
    (p1.actor_name, Observation(me=p1_state, them=p2_state)),
    (p2.actor_name, Observation(me=p2_state, them=p1_state)),
])
```

In the **update loop** we implement how the environment produces observations based on the actor's actions.

We start by retrieving each player's action and computing who won the round. Then, we update the internal `state`. Finally, we produce up-to-date observations for the players.

```python
if "actions" in event or "final_actions" in event:
  is_final = "final_actions" in event
  [p1_action, p2_action] = event["actions"] if "actions" in event else event["final_actions"]
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
      state["p1"]["won_rounds_count"] += 1
      print(f"{p1.actor_name} wins!")
  elif p2_state.won_last:
      state["p2"]["won_rounds_count"] += 1
      print(f"{p2.actor_name} wins!")
  else:
      print(f"draw.")

  # Generate and send observations
  observations = [
      (p1.actor_name, Observation(me=p1_state, them=p2_state)),
      (p2.actor_name, Observation(me=p2_state, them=p1_state)),
  ]
  if is_final:
      environment_session.end(observations)
  else:
      environment_session.produce_observations(observations)
```

Finally, in the **termination** phase, we print some stats about the trial itself.

```python
print("environment end")
print(f"\t * {state['rounds_count']} rounds played")
print(f"\t * {p1.actor_name} won {state['p1']['won_rounds_count']} rounds")
print(f"\t * {p1.actor_name} won {state['p2']['won_rounds_count']} rounds")
print(f"\t * {state['rounds_count'] - state['p1']['won_rounds_count'] - state['p2']['won_rounds_count']} draws")
```

Modify the `environment/main.py` file to include the above additions. Please note that this code makes assumptions on the number of actors and their classes. Production code should handle non-standard cases in a better way. We also _merged_ how the implementation deals with `actions` and `final_actions`, you can remove the part of the update loop only dealing with `final_actions`.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. Given the nature of the game and the fully random nature of the plays you should have around 1/3 of player 1 wins, 1/3 of player 2's and 1/3 of draws.

This concludes the step 2 of the tutorial: you implemented your first actor and your first environment.

Let’s move on to learning more about rewards in [step 3](./3-rewards.md).
