# Step 7: Add a player trained with Reinforcement Learning using DQN

:::note

This part of the tutorial follows [step 5](./5-human-player.md) and [step 6](./6-web-client.md), make sure you've gone through either one of those before starting this one. Alternatively the completed step 5 can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will go over yet another actor implementation and this implementation will be learning from its experience. We will implement an RPS player using Reinforcement Learning (RL) and more precisely a [Deep Q Network](https://arxiv.org/pdf/1312.5602.pdf), one of the foundational algorithms of modern RL.

While we will explain some aspects of RL and DQN along the way, we won't go into all the details. Interested readers can refer to ["Reinforcement Learning: An Introduction" by Richard S. Sutton and Andrew G. Barto](http://incompleteideas.net/book/the-book-2nd.html) or to the original Deep Q Network article linked above.

## Creating an actor service

Back in [step 4](./4-heuristic-player.md), we created a new implementation of the `player` actor class in the same service as the previous one. It was a sound choice for this implementation because it was small and didn't require additional dependencies. In some cases it makes more sense to create a fully separated service for a new actor implementation. This is what we will do here.

Start by copy/pasting the `random_agent` folder and name the copy `dqn_agent`. Let's then clean up `dqn_agent/main.py` to keep only a single actor implentation and name it `dqn_agent`. You should end up with something like the following.

```python
import cog_settings
from data_pb2 import PlayerAction

import cogment

import asyncio
import random

PORT = os.getenv('DQN_AGENT_PORT')

async def dqn_agent(actor_session):
    # ...

async def main():
    print(f"Deep Q Learning agent service starting on port {PORT}...")

    context = cogment.Context(cog_settings=cog_settings, user_id="rps")
    context.register_actor(
        impl=dqn_agent,
        impl_name="dqn_agent",
        actor_classes=[
            "player",
        ],
    )

    await context.serve_all_registered(cogment.ServedEndpoint(port=PORT), prometheus_port=0)


if __name__ == "__main__":
    asyncio.run(main())
```

Since we have created a new service we need to update the `run.sh` script and the `.env` file for everything to work properly.

Let's add the following environment variables to the `.env` file:

```console
DQN_AGENT_HOST=localhost
DQN_AGENT_PORT=9003
```

In the `./run.sh` script we will add two new commands to build and start the dqn agent service.

```bash
function dqn_agent_build() {
  _py_build dqn_agent
}

function dqn_agent_start() {
  _py_start dqn_agent
}
```

Finally in this file, we will add the dqn agent build to the `build` command and the dqn agent start to the `services_start` command.

```bash
function build() {
  _run_sequence client_build environment_build random_agent_build dqn_agent_build
}

function services_start() {
  _run_parallel orchestrator_start environment_start random_agent_start dqn_agent_start
}
```

## Playing against the heuristic player

We will train our new player against the [heuristic player](./4-heuristic-player.md) we previously developed. We first need to update the trial config in `client/main.py`: `player_1` will be our new actor implementation while `player_2` will be the heuristic implementation. We also need to update `client/main.py` to run a bunch of trials sequentially as one game won't be enough to learn anything.

We need to define the grpc endpoint for this new service

```python
DQN_AGENT_ENDPOINT = f"grpc://{os.getenv('DQN_AGENT_HOST')}:{os.getenv('DQN_AGENT_PORT')}"
```

Then let's update the `actor_1_params`

```python
actor_1_params = cogment.ActorParameters(
    cog_settings,
    name="player_1",
    class_name="player",
    endpoint=DQN_AGENT_ENDPOINT,
    implementation="dqn_agent"
)
```

Then let's adapt the trial running code to run 1000 trials.

```python
# Listening for ended trials
async def await_trial(trial_id):
    async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):
        if trial_info.trial_id == trial_id:
            break

# Start a trial campaign
for i in range(1000):
    # Defining the trial id on the client side
    trial_id=f"rps-training#{i}-{datetime.datetime.now().isoformat()}"

    await_trial_task = asyncio.create_task(await_trial(trial_id))

    # Start a new trial using the trial params we just created
    trial_id = await controller.start_trial(trial_id_requested=trial_id, trial_params=trial_params)
    print(f"Trial '{trial_id}' ongoing")

    # Wait for the trial to end
    await await_trial_task
```

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. It should take a few minutes to run as it goes through the trial campaign.

## Implementing the Deep Q Network

We have set everything up, we can now focus on implementing our DQN agent.

A Deep Q Network is a neural network taking an observation as input, and outputing the Q value for each of the actions in the action space. The Q Value is an estimation of the expected value of all the rewards if a given action is taken. The DQN agent action policy is therefore to take the action having the largest predicted Q Value. Let's start by implementing this part and we will then deal with training this model.

In the rest of this tutorial we will use [Tensorflow and its Keras API](https://www.tensorflow.org) for the model itself, as well as [numpy](https://numpy.org) for datastructures. Let's add Tensorflow (it will install numpy too) to `dqn_agent/requirements.txt` and import both at the top of `dqn_agent/main.py`.

```
tensorflow~=2.3
```

```python
import numpy as np
import tensorflow as tf
```

Let's get into the meat of the matter by implementing a function to create our model. We are using [Keras functional API](https://www.tensorflow.org/guide/keras/functional) to create the following layers:

1. Two scalar inputs, the last moves of the player and the opponent.
2. Each input is [one-hot encoded](https://en.wikipedia.org/wiki/One-hot#Machine_learning_and_statistics) to avoid assuming an unwanted ordering and quantitative relationship between the moves.
3. The two encoded inputs are concatenated to a single vector.
4. A dense non-linear hidden layer is added.
5. The output layer estimates the Q value for each move.

Everything then gets wrapped up and returned.

This function is then used to create a global `_model` that we will use in the actor implementation.

```python
MOVES = [ROCK, PAPER, SCISSORS]
NO_LAST_MOVE = len(MOVES)
LAST_MOVES = [ROCK, PAPER, SCISSORS, NO_LAST_MOVE] # The first round of the game has no information on last move
actions_count = len(MOVES)

def create_model():
    # 1. Input layers
    in_me_last_move = tf.keras.Input(name="obs_me_last_move", shape=(1))
    in_them_last_move = tf.keras.Input(name="obs_them_last_move", shape=(1))
    # 2. One hot encoding of the layers
    one_hot_move = tf.keras.layers.experimental.preprocessing.CategoryEncoding(
        name="one_hot_move",
        num_tokens=len(LAST_MOVES),
        output_mode="binary"
    )
    one_hot_me_last_move = one_hot_move(in_me_last_move)
    one_hot_them_last_move = one_hot_move(in_them_last_move)
    # 3. Concatenating the two inputs
    concat_ins = tf.keras.layers.concatenate(
        [one_hot_me_last_move, one_hot_them_last_move]
    )
    # 4. Dense hidden layer
    hidden_layer = tf.keras.layers.Dense(24, activation="relu")(concat_ins)
    # 5. Output
    outs = tf.keras.layers.Dense(actions_count, activation="linear")(hidden_layer)
    return tf.keras.Model(
        inputs=[in_me_last_move, in_them_last_move], outputs=outs, name="rps_dqn_policy"
    )

_model = create_model()
```

The other piece of the puzzle is implementing a small function that will convert our observations into inputs for the model we just created. As most of the encoding is handled by the model itself, it's fairly straightforward.

```python
def model_ins_from_observations(observations):
    return {
        "obs_me_last_move": np.array([
            [o.observation.me.last_move if o.observation.me.HasField("last_move") else NO_LAST_MOVE]
            for o in observations
        ]),
        "obs_them_last_move": np.array([
            [o.observation.them.last_move if o.observation.them.HasField("last_move") else NO_LAST_MOVE]
            for o in observations
        ]),
    }
```

Finally we can make it work together by replacing the random choice of action by the use of the model. At the moment the model will just use the random initialization weights so don't expect much!

Here is how the event loop in the `dqn_agent` function will need to be updated:

1. Use `model_ins_from_observations` to compute the model inputs,
2. Use the model in inference mode to compute the q value of each of the possible actions,
3. Finally, do the action having the largest q value.

```python
if event.observation:
  model_ins = model_ins_from_observations([event.observation])
  if event.type == cogment.EventType.ACTIVE:
    model_outs = _model(model_ins, training=False)
    action = tf.math.argmax(model_outs[0]).numpy()
    actor_session.do_action(PlayerAction(move=action))
```

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. It should take a few minutes to run as it goes through the trial campaign.

> In this example we define `_model` (and other variables in the following sections) as global mutable variables. It works in our case because the dqn agents are neither distributed nor multithreaded.

## Random exploration

With the previous code, you might have noticed that the agent will play exactly the same action given the same set of observations, this is because the weights of the model are fixed. However, especially at the beginning of the training process we want the agent to _experience_ a variety of situations. We address this issue by introducing a decaying exploration rate _epsilon_.

First we will define the parameters for this epsilon value as global variables: its minimum value, its maximum and initial value and its decay per tick. We also define as a global variable the current value of epsilon. You can add the following after the imports in `dqn_agent/main.py`.

```python
epsilon_min = 0.05
epsilon_max = 1.0
epsilon_decay_per_tick = (
  epsilon_max - epsilon_min
) / 1000.0  # Linearly reach the lowest exploration rate after 1000 ticks

_epsilon = epsilon_max
```

We then create a simple function we can use everytime an action needs to be taken to retrieve and update `_epsilon`.

```python
def get_and_update_epsilon():
  global _epsilon
  current_epsilon = _epsilon
  _epsilon -= epsilon_decay_per_tick
  _epsilon = max(_epsilon, epsilon_min)
  return current_epsilon
```

This function can then be used to occasionally do random actions, to facilitate the exploration. To do that, we need to slightly modify how the actions are computed and submitted.

```python
if event.type == cogment.EventType.ACTIVE:
  if np.random.rand(1)[0] < get_and_update_epsilon():
    # Take random action
    action = np.random.choice(actions_count)
  else:
    model_outs = _model(model_ins, training=False)
    action = tf.math.argmax(model_outs[0]).numpy()
  actor_session.do_action(PlayerAction(move=action))
```

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. Nothing should appear different at this stage.

## Replay buffer

In our journey to train a model, the next stage is to build an experience replay buffer to collect actions/observations/rewards triples over the course of the trials. Once done, it'll be usable to train the model using this data.

We will start by creating the datastructure. We are using a column-oriented structure relying on [numpy arrays](https://numpy.org/doc/stable/reference/generated/numpy.array.html) as they interoperate easily with tensorflow and support the needed manipulation primitives. Each row is a **sample** corresponding to one tick: the received observation and reward, the selected action as well as the next tick's received observation.

```python
def create_replay_buffer():
  return {
    "obs_me_last_move": np.array([]),
    "obs_them_last_move": np.array([]),
    "action": np.array([]),
    "reward": np.array([]),
    "next_obs_me_last_move": np.array([]),
    "next_obs_them_last_move": np.array([]),
  }

_rb = create_replay_buffer()
```

During each trial the agent will collect its data points in a _trial_ replay buffer then append it to the global one. To achieve that we will first create the function in charge of the appending then collect data during the trial and call the "append" function.

The following function will take a _trial_ replay buffer and append it to the global `_rb`. To avoid memory overflow the replay buffer size is capped.

```python
_collected_samples_count = 0
max_replay_buffer_size = 100000

def append_trial_replay_buffer(trial_rb):
  global _rb
  global _collected_samples_count

  trial_rb_size = len(trial_rb["obs_me_last_move"])

  for key in _rb.keys():
    # Append the trial data to the current vector
    _rb[key] = np.append(_rb[key], trial_rb[key])
    # Enforce the size limit by discarding older data
    if len(_rb[key]) > max_replay_buffer_size:
        _rb[key] = _rb[key][-max_replay_buffer_size:]

  _collected_samples_count += trial_rb_size
  rb_size = len(_rb["obs_me_last_move"])

  # Sanity check, all vectors in the replay buffer should have the same size
  for key in _rb.keys():
    assert rb_size == len(_rb[key])

  print(
    f"{trial_rb_size} new samples stored after a trial, now having {rb_size} samples over a total of {_collected_samples_count} collected samples."
  )
```

The `dqn_agent` function can then be updated to collect received observations, rewards and sent actions. By default every action gets a _zero_ reward. When a reward for a specific tick is received, its value gets updated.

```python
async def dqn_agent(actor_session):
  actor_session.start()

  trial_rb = create_replay_buffer()

  async for event in actor_session.event_loop():
    if event.observation:
      model_ins = model_ins_from_observations([event.observation])
      if event.type == cogment.EventType.ACTIVE:
        # [...]
        trial_rb["obs_me_last_move"] = np.append(
            trial_rb["obs_me_last_move"], model_ins["obs_me_last_move"]
        )
        trial_rb["obs_them_last_move"] = np.append(
            trial_rb["obs_them_last_move"], model_ins["obs_them_last_move"]
        )
        trial_rb["action"] = np.append(trial_rb["action"], [action])
        trial_rb["reward"] = np.append(trial_rb["reward"], [0.0])
      else:
        trial_rb["obs_me_last_move"] = np.append(
            trial_rb["obs_me_last_move"], model_ins["obs_me_last_move"]
        )
        trial_rb["obs_them_last_move"] = np.append(
            trial_rb["obs_them_last_move"], model_ins["obs_them_last_move"]
        )
    for reward in event.rewards:
      trial_rb["reward"][reward.tick_id] = reward.value

  # Shifting the observations to get the next observations
  trial_rb["next_obs_me_last_move"] = trial_rb["obs_me_last_move"][1:]
  trial_rb["next_obs_them_last_move"] = trial_rb["obs_them_last_move"][1:]
  # Dropping the last row, as it only contains the last observations
  trial_rb["obs_me_last_move"] = trial_rb["obs_me_last_move"][:-1]
  trial_rb["obs_them_last_move"] = trial_rb["obs_them_last_move"][:-1]
  append_trial_replay_buffer(trial_rb)
```

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. The behavior should be the same but the log should confirm that data gets accumulated.

## Training!

Here we are, all the pieces are in place, we can implement the training proper. The function is a standard implementation of DQN and is decomposed in 4 steps:

1. Select a random batch of samples from the replay buffer
2. Compute the target Q value for each sample from the received reward and the next observation using a previous version of the model.
3. (Re)compute the estimated Q value of each sample from the selected action and observation using the current version of the model.
4. Perform an optimization step of the model parameters trying to reduce the loss between the samples estimated and target q values.

```python
batch_size = 50  # Size of batch taken from replay buffer
gamma = 0.99  # Discount factor for future rewards
optimizer = tf.keras.optimizers.Adam(learning_rate=0.00025, clipnorm=1.0)
loss_function = tf.keras.losses.Huber()
target_model_update_interval = 1000

_target_model = create_model()

def train():
    global _model
    global _target_model

    rb_size = len(_rb["obs_me_last_move"])

    if rb_size >= batch_size:
        # Printing progress by looking at the wins ratio of the last trials
        last_trials_wins_count = np.count_nonzero(_rb['reward'][-batch_size:] == 1.0)
        last_trials_losses_count = np.count_nonzero(_rb['reward'][-batch_size:] == -1.0)
        print(f"last_trials_wins_ratio={last_trials_wins_count /(last_trials_wins_count + last_trials_losses_count)}")

        # Step 1 - Randomly select a batch
        batch_indices = np.random.choice(range(rb_size), size=batch_size)
        batch_rb = create_replay_buffer()
        for key in batch_rb.keys():
            batch_rb[key] = np.take(_rb[key], batch_indices)

        # Step 2 - Compute target q values
        ## Predict the expected reward for the next observation of each sample
        ## Use the target model for stability
        target_actions_q_values = _target_model(
            {
                "obs_me_last_move": batch_rb["next_obs_me_last_move"],
                "obs_them_last_move": batch_rb["next_obs_them_last_move"],
            }
        )

        ## target Q value = reward + discount factor * expected future reward
        target_q_values = batch_rb["reward"] + gamma * tf.reduce_max(
            target_actions_q_values, axis=1
        )

        # Step 3 - Compute estimated q values
        ## Create masks of the taken actions to later select relevant q values
        selected_actions_masks = tf.one_hot(batch_rb["action"], actions_count)

        with tf.GradientTape() as tape:
            ## Recompute q values for all the actions at each sample
            estimated_actions_q_values = _model(
                {
                    "obs_me_last_move": batch_rb["obs_me_last_move"],
                    "obs_them_last_move": batch_rb["obs_them_last_move"],
                }
            )

            ## Apply the masks to get the Q value for taken actions
            estimated_q_values = tf.reduce_sum(
                tf.multiply(estimated_actions_q_values, selected_actions_masks), axis=1
            )

            ## Compute loss between the target Q values and the estimated Q values
            loss = loss_function(target_q_values, estimated_q_values)
            print(f"loss={loss.numpy()}")

            ## Backpropagation!
            grads = tape.gradient(loss, _model.trainable_variables)
            optimizer.apply_gradients(zip(grads, _model.trainable_variables))

        # Update the target model
        if _collected_samples_count % target_model_update_interval == 0:
            _target_model.set_weights(_model.get_weights())
```

This function then needs to be called at the end of each trial after the call to `append_trial_replay_buffer`.

You can now [build and run](./1-bootstrap-and-data-structures.md#building-and-running-the-app) the application. The dqn agent will start to learn and quickly prevail against the heuristic implementation. You can monitor the progress in the logs, the wins ratio should be close to 1 after ~500 trials.

This concludes the step 7 of the tutorial: you implemented your first trained actor implementation!
