# Step 4: Add a second actor implementation based on a heuristic

> This part of the tutorial follows [step 3](./3-rewards.md), make sure you've gone through it before starting this one. Alternatively the completed step 3 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps){target=\_blank}.

In this step of the tutorial, we will go over another actor implementation and learn about using the received observations before doing an action.

## Creating a second actor implementation

Let's start by creating another implementation of the `player` actor class. Because we expect it to be rather small and not use additional dependencies, this second implementation will _live_ in the same service as the previous one. We will start by copying the `random_agent` implementation.

In `random_agent/main.py` copy/paste the `random_agent` function and name it `heuristic_agent`.

```python
async def heuristic_agent(actor_session):
```

Then, in the same file, register this "new" implementation in the `main` function.

```python
context.register_actor(
  impl=heuristic_agent,
  impl_name="heuristic_agent",
  actor_classes=["player"])
```

When the service starts it will now host the two implementations.

We can now configure one of the `player` in the default trial, defined in `cogment.yaml`, to use the `heuristic_agent` implementation.

```yaml
actors:
  - name: player_1
    actor_class: player
    implementation: random_agent
    endpoint: grpc://random-agent:9000
  - name: player_2
    actor_class: player
    implementation: heuristic_agent
    endpoint: grpc://random-agent:9000
```

Modify the `cogment.yaml` file to include the above addition.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application to check that it still works. Nothing should have changed except one of the player uses the code from the new implementation.

## Implementing a simple heuristic's agent

While the `random_player` ignored the state of the game, picking its move at random, our new implementation will consider the received **observations** to pick its move.

We will implement a subset of the strategies described in [this](https://towardsai.net/p/artificial-intelligence/towards-an-ai-for-rock-paper-scissors-3fb05780271f){target=\_blank} article:

- If I won the last round, do the same thing,
- If my opponent won the last round, play the move that would have won against his,
- If the last round was a draw, play a random move.

We will start by redefining in `random_agent/main.py` the same `DEFEATS` we used by the environment.

```python
DEFEATS = {
  ROCK: PAPER,
  SCISSORS: ROCK,
  PAPER: SCISSORS
}
```

Then, in the event loop, we look at the received observation before taking an action based on this simple strategy.

```python
observation = event.observation
print(f"'{actor_session.name}' received an observation: '{observation}'")
if event.type == cogment.EventType.ACTIVE:
    if observation.snapshot.me.won_last:
        # I won the last round, let's play the same thing
        actor_session.do_action(PlayerAction(move=observation.snapshot.me.last_move))
    elif observation.snapshot.them.won_last:
        # I lost the last round, let's play what would have won
        actor_session.do_action(PlayerAction(move=DEFEATS[observation.snapshot.them.last_move]))
    else:
        # last round was a draw, let's play randomly
        actor_session.do_action(PlayerAction(move=random.choice(MOVES)))
```

Modify the `random_player/main.py` file accordingly.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application to check that it works. Don't expect the heuristic player to beat the random player, the nature of the game actually rewards pure randomness in the playing. You can however implement various strategies and see how they fare against each other.

This concludes the step 4 of the tutorial: you've learned about adding and using different implementations of an actor class and how to access and use the received observations.

Let’s move on to adding a human player in the mix with [step 5](./5-human-player.md).
