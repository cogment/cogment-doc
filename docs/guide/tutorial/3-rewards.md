# Step 3: Rewards

:::note

This part of the tutorial follows [step 2](./2-random-player.md), make sure you've gone through it before starting this one. Alternatively the completed step 2 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will start thinking about rewards. Rewards are a way to evaluate how an actor performs at a task. They can be used to evaluate or compare different implementations of an actor, or, especially in the context of Reinforcement Learning, train a model. In Cogment, both the environment and other actors can evaluate an actor. Here, we will focus on sending rewards from the environment.

The first thing we'll do for this step is to add the concept of multi-round games to our RPS implementation. We'll learn to configure the environment along the way. Then, we will adapt the environment implementation to send a reward to the actor winning a game.

## Adding the concept of a game

Up until now, our implementation of RPS focused on rounds. However, RPS is usually played in games won by the player reaching a target score, i.e. a number of won rounds.

Before sending rewards we need to adapt our implementation so that each trial is a game with a configurable target score.

The generated data structure `EnvironmentConfig`, referenced within `cogment.yaml` in `environment.config_type`, defines the configuration of the environment. Let's add a `target_game_score` numerical property to it.

```proto
message EnvironmentConfig {
  int32 target_score = 1;
}
```

Modify the `data.proto` file with this update.

The environment implementation can now be updated to know about games.

During the **initialization** phase of the `environment` function, we can retrieve the value from the environment's configuration. We also defined a default value in case nothing is specified.

```python
# Default target score
target_score = 3
if environment_session.config is not None and environment_session.config.target_score >= 0:
    target_score = environment_session.config.target_score
```

In the **event loop** we need to handle the end of the game, instead of waiting for the client to terminate the trial, the environment will now end it whenever the target score is reached.

Once the observation is computed we can decide what to do

```python
# Generate and send observations
observations = [
    (p1.actor_name, Observation(me=p1_state, them=p2_state)),
    (p2.actor_name, Observation(me=p2_state, them=p1_state)),
]

# Handle end of game
if state["p1"]["score"] >= target_score:
    # p1 won
    environment_session.end(observations)
elif state["p2"]["score"] >= target_score:
    # p2 won
    environment_session.end(observations)
else:
    # target score is not reached
    environment_session.produce_observations(observations)
```

Modify the `environment/main.py` file with these updates.

In this simple implementation, the concept of game is local to the environment. It has no impact on the observation and action spaces, and thus no impact on the actor implementation. This means an actor wouldn't _know_ that the round it currently plays is the tie breaker in a game or its very first round. As a result the actor will play every round the same way.

## Configuring the environment on the client side

In the previous steps, we triggered the trials by running `./run.sh client_start`. The more curious among you will have understood that this launches a client of the Cogment app, implemented in `client/main.py`. In this step, we will make changes to this file, this is therefore a good time to take a look at it.

In the `rps` folder, the `client` folder contains the python implementation for the cogment client for this app. Take a look a the `main.py` file.

After the imports, the first section defines the endpoints of the different services used by the App.

```python
ORCHESTRATOR_ENDPOINT = f"grpc://{os.getenv('ORCHESTRATOR_HOST')}:{os.getenv('ORCHESTRATOR_PORT')}"
ENVIRONMENT_ENDPOINT = f"grpc://{os.getenv('ENVIRONMENT_HOST')}:{os.getenv('ENVIRONMENT_PORT')}"
RANDOM_AGENT_ENDPOINT = f"grpc://{os.getenv('RANDOM_AGENT_HOST')}:{os.getenv('RANDOM_AGENT_PORT')}"
```

Notice the use of the environment variables defined in the `.env` file.

The other part of the file is the `main` function.

The first section creates a controller instance to be able to handle the lifecycle of the trials for the App's orchestrator's instance.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="rps")

# Create a controller
controller = context.get_controller(endpoint=cogment.Endpoint(ORCHESTRATOR_ENDPOINT))
```

The bulk of the main function is defining the parameters for the trial: how many actors will be involved, their respective classes, which implementation and endpoint to use and their configuration, it also defines the same information for the environment.

```python
# Define parameters for 2 actors using the same `random_agent` implementation
actor_1_params = cogment.ActorParameters(
    cog_settings,
    name="player_1",
    class_name="player",
    endpoint=RANDOM_AGENT_ENDPOINT,
    implementation="random_agent"
)
actor_2_params = cogment.ActorParameters(
    cog_settings,
    name="player_2",
    class_name="player",
    endpoint=RANDOM_AGENT_ENDPOINT,
    implementation="random_agent"
)

# Assemble everything in the trial parameters
trial_params=cogment.TrialParameters(
    cog_settings,
    environment_name="env",
    environment_endpoint=ENVIRONMENT_ENDPOINT,
    environment_config=EnvironmentConfig(),
    actors=[
        actor_1_params,
        actor_2_params,
    ]
)
```

To learn more about the parameters, check the [`cogment.TrialParameters`](../../reference/python.md#class-cogmenttrialparameters) class reference.

Finally the last section starts the trial, waits 10 seconds and then terminates it.

```python
# Start a new trial using the trial params we just created
trial_id = await controller.start_trial(trial_params=trial_params)
print(f"Trial '{trial_id}' started")

# Let the trial play for a while
await asyncio.sleep(10)

# Termination the trial
await controller.terminate_trial([trial_id])
print(f"Trial '{trial_id}' terminated")
```

Going back to the task at hand, now that the `EnvironmentConfig` is modified and the environment implementation uses it, we need to update the client to:

1. configure the target score.
2. wait for the environment to end the trial (when the target score is reached), instead of letting the trial run for a few seconds.

The first change we need to make is configuring the target score.

```python
# Configure the environment
environment_config=EnvironmentConfig(
    target_score=5
)

# Assemble everything in the trial parameters
trial_params=cogment.TrialParameters(
    cog_settings,
    environment_name="env",
    environment_endpoint=ENVIRONMENT_ENDPOINT,
    environment_config=environment_config,
    actors=[
        actor_1_params,
        actor_2_params,
    ]
)
```

We then need to slightly adapt how we handle the trial lifecycle to support the trial termination coming from the environment. We will:

-   Have the client define the identifier of the trial to be able to listen for its termination,
-   Start the trial using the requested `trial_id`
-   Use `controller.watch_trials` to wait for the trial to finish.

```python
# Defining the trial id on the client side (Don't forget to add `import datetime` at the top of the file)
trial_id=f"rps-{datetime.datetime.now().isoformat()}"

# Listening for ended trials
async def await_trial():
    async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):
        if trial_info.trial_id == trial_id:
            break
await_trial_task = asyncio.create_task(await_trial())

# Start a new trial using the trial params we just created
trial_id = await controller.start_trial(trial_id_requested=trial_id, trial_params=trial_params)
print(f"Trial '{trial_id}' started")

# Wait for the trial to end
await await_trial_task
print(f"Trial '{trial_id}' ended")
```

:::tip

Because of the asynchronous nature of what's happening here, we need to start listening for the trial to end before starting it.

:::

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application to check that it works as expected.

## Sending rewards to the actors

The environment is now able to:

-   compute when an actor wins a game,
-   communicate this information to it and to the other Cogment app services,
-   send **rewards** when an actor reaches a measurable goal, in our case, when it wins a game.

Please note, that not all actions need to be rewarded.

When a game is won, the environment will add a **positive reward to the winner** (we chose a value of 1) and a **negative reward to the loser** (we chose a value of -1). Cogment also supports the notion of _confidence_, a weight between 0 and 1 that expresses the qualification of the reward sender in its appreciation. In this case we are applying objective rules, so we use a confidence of 1.

In the **event loop**, when the first player wins a game we add the following.

```python
environment_session.add_reward(value=1, confidence=1, to=[p1.actor_name])
environment_session.add_reward(value=-1, confidence=1, to=[p2.actor_name])
```

When the second player wins a game we add the following.

```python
environment_session.add_reward(value=-1, confidence=1, to=[p1.actor_name])
environment_session.add_reward(value=1, confidence=1, to=[p2.actor_name])
```

Modify the `environment/main.py` file to include the above additions.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application to check that it works as expected. In particular you should see logs relative to the reception of rewards on the actor side.

This concludes the step 3 of the tutorial: you've learned about environment configuration, about how to let the environment control the termination of the trial and you implemented reward sending.

Let’s move on to implementing an RPS player that actually considers what was played before deciding on its next move in [step 4](./4-heuristic-player.md).
