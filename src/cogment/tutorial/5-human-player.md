# Step 5: Add a human player in the loop

> This part of the tutorial follows [step 4](./4-heuristic-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 4 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps){target=\_blank}.

In this step of the tutorial, we will go over another actor implementation, this time client-side, to enable Humans to play RPS. We will also learn how to let the environment control the termination of the trial.

## The client

In the previous steps, we triggered the trials by running `cogment run client`. The more curious among you will have understood that this launches a client of the Cogment app, implemented in `client/main.py`. In this step, we will make changes to this file, this is therefore a good time to take a look at it.

Open `client/main.py` and take a look at the generated content.

The `main` starts similarly to the others by creating and configuring the main entry point to the SDK, `Context`. Then a `trial_controller` function is created: it enables retrieving the unique id for a trial and controls its lifetime (ending it by default after 10 seconds). Finally, a trial is started on the running `orchestrator`, using `trial_controller` and a default trial configuration.

```python
async def trial_controller(control_session):
  print(f"Trial '{control_session.get_trial_id()}' starts")
  await asyncio.sleep(10)
  print(f"Trial '{control_session.get_trial_id()}' terminating")
  await control_session.terminate_trial()

await context.start_trial(endpoint="orchestrator:9000", impl=trial_controller, trial_config=TrialConfig())
```

## Environment controlled trial

While 10 seconds was plenty of time to get a decent number of AI vs AI games played, a Human player won't be as fast: we need to change how we control the duration and number of played games. To do that, we will switch from controlling the trial lifetime from the client's trial controller, to controlling it from the environment.

Instead of a duration, our trial will last for a given number of games. That way AI vs AI trials will be configurable to last hundreds of games while trials involving Humans can be much shorter.

Let's introduce a new property of the environment configuration, `target_games_count`, in `data.proto`.

```proto
message EnvConfig {
  int32 target_game_score = 1;
  int32 target_games_count = 2;
}
```

We can then set its value for the default trial in `cogment.yaml`.

```yaml
trial_params:
    environment:
        endpoint: grpc://environment:9000
        config:
            target_game_score: 2
            target_games_count: 5
```

Environment implementations can trigger the end of a trial by calling the `end` function on the session instance. In our existing implementation, we will first prepare the observations instead of producing them right away.

```python
observations = [
    (p1.actor_name, Observation(me=p1_state, them=p2_state)),
    (p2.actor_name, Observation(me=p2_state, them=p1_state)),
]
```

And then, at the end of the event loop, either end the trial if the target games count is reached or produce the observations as before.

```python
if state["games_count"]>=environment_session.config.target_games_count:
    environment_session.end(observations=observations)
else:
    environment_session.produce_observations(observations=observations)
```

Edit the `environment/main.py` file to include the above additions.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. It should be much faster than before as the AIs only play 5 games.

## Client actor implementation

We are now ready to involve a human player in our trials. To do that we will add a specific actor implementation in the client. While the previous **service actor** implementations are exposing endpoints Cogment's orchestrator connects to in order to run a trial, this **client actor** implementation connects to the orchestrator to join a trial. It changes a lot under the hood and enables interesting network topology because only the client needs to know how to reach the orchestrator, not the other way around. However, as you'll see, in terms of implementation it is very similar.

This actor implementation will be located in the client code in `client/main.py`

We first need to import the data structures needed to send actions.

```python
from data_pb2 import PlayerAction, ROCK, PAPER, SCISSORS

MOVES = [ROCK, PAPER, SCISSORS]
MOVES_STR = ["???? rock", "??? paper", "?????? scissors"]
MOVES_PROMPT = ', '.join([ f"{name} ({idx})" for idx, name in enumerate(MOVES_STR)])
```

In the `main` function we then implement the `human_player` actor implementation, only playing `PAPER` for the moment, register the implementation and join the trial once it is initialized.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="rps")

async def human_player(actor_session):
    round_index = 0

    actor_session.start()

    async for event in actor_session.event_loop():
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

# Create a controller
controller = context.get_controller(endpoint=cogment.Endpoint("orchestrator:9000"))

# Start a new trial
trial_id = await controller.start_trial(trial_config=TrialConfig())
print(f"Trial '{trial_id}' starting")

# Let the human actor join the trial
await context.join_trial(trial_id=trial_id, endpoint=cogment.Endpoint("orchestrator:9000"), impl_name="human")
print(f"Human actor joining trial '{trial_id}'")

# Wait for the trial to end by itself
async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):
    if trial_info.trial_id == trial_id:
        break

print(f"Trial '{trial_id}' ended")
```

Modify the `client/main.py` file with these updates.

We then need to modify the `cogment.yaml` to let the orchestrator know that `player_1` now uses a client-side implementation. To do so we use a _special_ endpoint, `"client"`, and we don't need to specify an implementation name.

```yaml
actors:
    - name: player_1
      actor_class: player
      endpoint: client
      # implementation: random_agent
      # endpoint: grpc://random-agent:9000
```

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. Everything should work but player 1 shouldn't fare too well as it only ever plays `PAPER`.

## Interactive prompt to let Humans play RPS

Let's add a text user interface to our client in order to finally challenge AIs to a game of RPS.

First we'll want to display what was played in the previous round. We will implement a dedicated function `print_observation`.

```python
def print_observation(round_index, observation):
    print(f"???? played {MOVES_STR[observation.snapshot.me.last_move]}")
    print(f"???? played {MOVES_STR[observation.snapshot.them.last_move]}")
    if observation.snapshot.me.won_last:
        print(f" -> ???? wins round #{round_index + 1}")
    elif observation.snapshot.them.won_last:
        print(f" -> ???? wins the round #{round_index + 1}")
    else:
        print(f" -> round #{round_index + 1} is a draw")
```

It needs to be called whenever the actor receives an observation, except for the first time, before the first round is played. Add the following just after the observation is retrieved in the event loop.

```python
if round_index > 0:
  # The only time the observation is not relevant is on the first round of the first game
  print_observation(round_index, observation)
```

Last but not least, instead of always picking `PAPER` we will read from the keyboard input what the player wishes to play. Using python's [`input`](https://docs.python.org/3.7/library/functions.html#input){target=\_blank} function we can print a prompt and read whatever the user enters before pressing `<ENTER>`.

Note that the following implementation expects a number between 1 and 3 and doesn't handle well any other input.

```python
move = MOVES[int(input(MOVES_PROMPT))]
next_action = PlayerAction(move=move)
```

Modify the `client/main.py` file to include the above additions.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. You'll be presented with a prompt for choosing your moves and comparing your skills to the simple heuristic AI we implemented earlier.

This concludes the step 5 of the tutorial: you implemented your first client actor and put your first human in the loop! This is also the final step for the basics tutorial.

You can continue by implementing a web client to replace the command line interface we just developed in [step 6](./6-web-client.md). You can also learn how to train an actor implementation using Reinforcement Learning in [step 7](./7-dqn-player.md).
