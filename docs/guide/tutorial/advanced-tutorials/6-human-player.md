# Add a Human Player in the Loop

:::note

This part of the tutorial follows [step 4](../4-decision-making.md), make sure you've gone through it before starting this one. Alternatively the completed step 4 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will go over another actor implementation, this time client-side, to enable Humans to play RPS.

## Client actor implementation

To involve a human player in our trials, we will add a specific actor implementation in the client. While the previous **service actor** implementations are exposing endpoints Cogment's orchestrator connects to in order to run a trial, this **client actor** implementation connects to the orchestrator to join a trial. It changes a lot under the hood and enables interesting network topology because only the client needs to know how to reach the orchestrator, not the other way around. However, as you'll see, in terms of implementation it is very similar.

This actor implementation will be located in the client code in `client/main.py`

We first need to import the data structures needed to send actions.

```python
from data_pb2 import PlayerAction, ROCK, PAPER, SCISSORS

MOVES = [ROCK, PAPER, SCISSORS]
MOVES_STR = ["👊 rock", "✋ paper", "✌️ scissors"]
MOVES_PROMPT = ', '.join([ f"{name} ({idx})" for idx, name in enumerate(MOVES_STR)])
```

In the `main` function we then implement the `human_player` actor implementation, only playing `PAPER` for the moment, register the implementation and join the trial once it is initialized.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="rps")

async def human_player(actor_session):
    round_index = 0

    actor_session.start()

    async for event in actor_session.all_events():
        if event.observation:
            observation = event.observation

            if event.type == cogment.EventType.ACTIVE:
                print(f"\n-- Round #{round_index + 1} --\n")

                next_action = PlayerAction(move=PAPER)
                actor_session.do_action(next_action)

                round_index += 1

context.register_actor(
    impl=human_player,
    impl_name="human",
    actor_classes=["player"])
```

We update the configuration of the first actor to use _special_ endpoint, `"cogment://client"`, which tells the orchestrator to wait for a client to connect to it. We also don't need to specify an implementation name.

```python
actor_1_params = cogment.ActorParameters(
    cog_settings,
    name="player_1",
    class_name="player",
    endpoint="cogment://client"
)
```

Because the client actor will be active during the trial, we no longer need to use `watch_trials` to await trial termination but simply need to await `context.join_trial` completion.

```python
# Defining the trial id on the client side
trial_id=f"rps-{datetime.datetime.now().isoformat()}"

# Start a new trial using the trial params we just created
trial_id = await controller.start_trial(trial_id_requested=trial_id, trial_params=trial_params)
print(f"Trial '{trial_id}' started")

# Let the human actor join the trial
await context.join_trial(trial_id=trial_id, endpoint=cogment.Endpoint(ORCHESTRATOR_ENDPOINT), actor_name="player_1")
print(f"Trial '{trial_id}' ended")
```

Modify the `client/main.py` file with these updates.

You can now [build and run](../1-setup.md#building-and-running-the-app) the application. Everything should work but player 1 shouldn't fare too well as it only ever plays `PAPER`.

## Interactive prompt to let Humans play RPS

Let's add a text user interface to our client in order to finally challenge AIs to a game of RPS.

First we'll want to display what was played in the previous round. We will implement a dedicated function `print_observation`.

```python
def print_observation(observation):
    print(f"🧑 played {MOVES_STR[observation.observation.me.last_move]}")
    print(f"🤖 played {MOVES_STR[observation.observation.them.last_move]}")
    if observation.observation.me.won_last:
        print(f" -> 🧑 wins round #{round_index + 1}")
    elif observation.observation.them.won_last:
        print(f" -> 🤖 wins the round #{round_index + 1}")
    else:
        print(f" -> round #{round_index + 1} is a draw")
```

It needs to be called whenever the actor receives an observation, except for the first time, before the first round is played. Add the following just after the observation is retrieved in the event loop.

```python
if round_index > 0:
  # The only time the observation is not relevant is on the first round of the first game
  print_observation(observation)
```

Last but not least, instead of always picking `PAPER` we will read from the keyboard input what the player wishes to play. Using python's [`input`](https://docs.python.org/3.7/library/functions.html#input) function we can print a prompt and read whatever the user enters before pressing `<ENTER>`.

Note that the following implementation expects a number between 1 and 3 and doesn't handle well any other input.

```python
move = MOVES[int(input(MOVES_PROMPT))]
next_action = PlayerAction(move=move)
```

Modify the `client/main.py` file to include the above additions.

You can now [build and run](../1-setup.md#building-and-running-the-app) the application. You'll be presented with a prompt for choosing your moves and comparing your skills to the simple heuristic AI we implemented earlier.

This concludes the step 5 of the tutorial: you implemented your first client actor and put your first human in the loop! This is also the final step for the basics tutorial.

You can continue by implementing a web client to replace the command line interface we just developed in [step 6](7-web-client.md).
