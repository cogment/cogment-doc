# Cogment High-Level API guide (Python)

## Prerequisites

This document assumes the reader is familiar with the [Cogment Fundamentals](../concepts/core-concepts.md).

The High-level Cogment API expects users to use [protocol buffers](https://developers.google.com/protocol-buffers/){target=\_blank} to declare a project's data structures. The intricacies of protobufs are beyond the scope of this document. Basic knowledge of the technology and its usage is assumed.

## The cogment.yaml file

An [actor class](../concepts/glossary.md#actor-class) is primarily defined by its [observation space](../concepts/glossary#observation-space) and [action space](../concepts/glossary#action-space).

The data structures describing these spaces are declared by using a protocol buffer message type. [Observations](../concepts/glossary.md#observation) and [actions](../concepts/glossary.md#action) will simply be instances of the matching type.

For example, in the following, `driver` and `pedestrian` share a common view of the environment, hence use the same observation space, but have different actions available to them.

```yaml
import:
  proto:
    - city.proto

actors:
  driver:
    observation:
      space: city.Observation

    action:
      space: city.DriverAction

  pedestrian:
    observation:
      space: city.Observation

    action:
      space: city.PedestrianAction
```

> ⚠️ This shows only the relevant part of the full `cogment.yaml`, you can find the full list of configurable options [in the reference page](./cogment-api-reference/cogment-yaml.md).

### Compiling the cogment.yaml

In order to use the `cogment.yaml` file within python scripts, it needs to be interpreted into a python module. This is done by the **cogment cli** (Command Line Interface) that can be installed following [those directions](../introduction/installation.md#install-the-latest-cogment-cli).

```console
$ cogment run --file /path/to/cogment.yaml --python_dir=./
```

This will create a `cog_settings.py` module in the current directory.

The cogment cli will also compile the imported [`.proto`](../concepts/glossary.md#protocol-buffer) files in python modules living in the same location.

## Environment

[Environments](../concepts/glossary.md#environment) are implemented by a Python function that uses a [`cogment.EnvironmentSession`](./cogment-api-reference/python.md#class-environmentsessionsession) instance.

This function will be called once for each [trial][../concepts/glossary.md#trial)]. This function usually consists of three sections.

- The environment's **initialization**, where its internal state can be initialized and processes started. It ends with the sending of the initial observations to the actors participating in the trial.
- Its **event loop**, where the environment iterates through the events occurring during the trial and produces [observations](../concepts/glossary.md#observation) as well as receives [messages](../concepts/glossary.md#message). In this loop the environment can end the trial on its own or the end can be requested by a [controller](#controller).
- Its **termination**, where cleanup occurs.

In the common case where all actors within a trial share the same observation, a bare-minimum environment service would look like this:

```python
async def environment(environment_session):
    # -- Initialization --

    # Retrieve the actors participating in the trial
    actors = environment_session.get_active_actors()

    # Start the trial and send a default observation to all actors
    environment_session.start([("*", Observation())])

    # -- Event loop --
    async for event in environment_session.event_loop():
        if event.actions:
            # `event.actions` is a list of the actions done by the actors (with a 1-1 matching)
            actions = event.actions
            if event.type == cogment.EventType.ACTIVE:
              # The trial is active, produce an observation in response to the actions
              environment_session.produce_observations([("*", Observation())])
              # Alternatively the environment can decide to **end** the trial with the following
              # environment_session.end([("*", Observation())])
            else:
              # The trial termination has been requested by an external controller
              # Produce a final observation
              environment_session.end([("*", Observation())])

        for message in event.messages:
            # `event.messages` is a list of all the messages received by the environment (it can be empty)

            # Handle each message here.

    # -- Termination --
```

This environment implementation needs to be registered and served so that the [orchestrator](../concepts/glossary.md#orchestrator) can reach it. This can be done through a [`Context`](./cogment-api-reference/python.md#class-cogmentcontext) instance.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="my_user_id")

context.register_environment(impl=environment)

await context.serve_all_registered(port=9000)
```

### Sending observations

The environment session has 3 different methods able to send observations: `start`, `produce_observations` and `end`. Each of those methods takes a list of 2-tuples destination / observation.

As demonstrated above, sending the same observation to all actors is done using `"*"` as the destination.

```python
environment_session.produce_observations([("*", Observation(...))])
```

It is also possible to send different observations to different actors. This can be useful to send observations of the _world_ from the point of view of the actor or to send partial observations.

```python
environment_session.produce_observations([
  ("my_first_actor_name", Observation(...)),
  ("my_second_actor_name", Observation(...))
])
```

Please note that the environment should always send observations such as each actor in the trial receives one.

## Actor

[Actors](../concepts/glossary.md#actor) implementations look a lot like the [environment's](#environment). They take a [`cogment.ActorSession`](./cogment-api-reference/python.md#class-actorsessionsession) instance and have the same three sections: **initialization**, **event loop** and **termination**.

The event loops in Actors' implementations handle three basic types of events:

- `observation` produced by the environment and that should lead to an action being done.
- `rewards` sent by other actors or the environment, we'll talk about them in more details [below](#reward).
- `messages` sent by other actors or the environment, we'll talk about them in more details [below](#messages).

A typical actor implementation would look like this:

```python
async def driver_actor(actor_session):
    # -- Initialization --

    # Notify that the actor is ready for the trial to start.
    actor_session.start()

    async for event in actor_session.event_loop():
        if event.observation:
            # `event.observation` is an instance of the Observation produced by the environment
            observation = event.observation
            if event.type == cogment.EventType.ACTIVE:
              # The trial is active, it is expecting the agent to do an action
              actor_session.do_action(DriverAction(...))

        for reward in event.rewards:
            # `event.rewards` is a list of all the rewards received by the actor (it can be empty)

            # Handle each reward here.

        for message in event.messages:
            # `event.messages` is a list of all the messages received by the actor (it can be empty)

            # Handle each message here.
```

### Service actor / Client actor

A Cogment app can use two types of actors, they are identical in terms of implementation but differ in how they interact with the app's [Orchestrator](../concepts/glossary.md#orchestrator).

**Service actors** are accessible in the same way the environment is, through a [`Context`](./cogment-api-reference/python.md#class-cogmentcontext) instance.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="rps")
context.register_actor(
    impl=actor,
    impl_name="driver_actor",
    actor_classes=["driver"])


await context.serve_all_registered(port=9000)
```

Please note that this is also through this registrating that the implementation is associated with one or more [actor classes](../concepts/glossary.md#actor-class) it implements.

**Client actors**, contrary to Service actors, are not served to the [orchestrator](../concepts/glossary.md#orchestrator). They connect as clients of the orchestrator and join a [trial](../concepts/glossary.md#trial) that has started.

```python
context = cogment.Context(cog_settings=cog_settings, user_id="rps")
context.register_actor(
    impl=actor,
    impl_name="driver_actor",
    actor_classes=["driver"])

await context.join_trial(
  trial_id=trial_id,
  endpoint="orchestrator:9000",
  impl_name="human")
```

Please note, that a trial including one or more client actors will wait for all of them to join before any actor can start processing events.

Due to the different network requirements, client actors are a good fit when implementing a [frontend](../concepts/glossary.md#frontend) for human actors. In addition to the [python](./cogment-api-reference/python.md) SDK demonstrated above, client actors can be implemented in [javascript](./cogment-api-reference/javascript/modules.md) using the corresponding SDK.

## Controller

[Trials](../concepts/glossary.md#trial) are started by clients of the [Orchestrator](../concepts/glossary.md#orchestrator) using a Controller. Instances of a controller are built from the [`Context`](./cogment-api-reference/python.md#class-cogmentcontext) instance and connect to an Orchestrator endpoint.

```python
controller = context.get_controller(
  endpoint=cogment.Endpoint("orchestrator:9000")
)
```

The controller can then be used to create trials and request their termination.

```python
trial_id = await controller.start_trial(trial_config=TrialConfig())

# ...

await controller.terminate_trial(trial_id)
```

The controller can also be used to subscribe to events occuring in the trials run by the Orchestrator it connects to. For example, this can be used to wait for a trial's end:

```python
async for trial_info in controller.watch_trials(trial_state_filters=[cogment.TrialState.ENDED]):
    # The trial having id {trial_info.trial_id} ended.
```

The full documentation for the controller can be found [here](./cogment-api-reference/python.md#class-controller).

## Rewards

### Creating

[Rewards](../concepts/glossary.md#reward) are sent to [actors](../concepts/glossary.md#actor) from another actor or the [environment](../concepts/glossary.md#environment). The `session` instance passed to their implementation can be used for this purpose.

```python
session.add_reward(
  value=-1,
  confidence=1,
  tick_id=-1,
  to=['an_actor_name'])
```

Rewards consist of an arbitrary numerical **value** describing how the reward "sender" _believes_ the actor performed. It is _weighted_ by a value between 0 and 1 qualifying the **confidence** of the "sender" in its reward, from a very low confidence just above 0 to a very high confidence approaching 1. The confidence value is used to collate all the rewards sent to an actor at the same time. Optionally, a reward can be provided with arbitrary user data.

Each reward applies to a list of recipients (either all the actors, all the actors of a given class or a specific actor) at a specific point in time, during the trial, defined as a [**tick**](../concepts/glossary.md#tick).

The full documentation for `session.add_reward` can be found [here](./cogment-api-reference/python.md#add_rewardself-value-confidence-to-tick_id-1-user_datanone).

### Consuming

All the [rewards](../concepts/glossary.md#reward) that are sent and destined to each specific [actor](../concepts/glossary.md#actor) for a given point in time are collated together by the framework.

The [actor](../concepts/glossary.md#actor) can take into account the reward directly as the [trial](../concepts/glossary.md#trial) is running by consuming the `"reward"` event in their event loop.

```python
async for event in actor_session.event_loop():
    # [...]
    for reward in event.rewards:
        # `reward.tick_id` is the id of the tick this reward concerns.
        tick_id = reward.tick_id
        # `reward.value` is the aggregated value of the reward.
        value = reward.value
        for (src_value, src_confidence, sender, user_data) in reward.all_sources():
            # Iterate over individual source rewards.
```

## Messages

### Creating

[Messages](../concepts/glossary.md#message) can be created and sent between [actors](../concepts/glossary.md#actor) or the [environment](../concepts/glossary.md#environment) within a trial using their `session` instance.

```python
session.send_message
  user_data=MyProtobufDataStructure(...), # any protobuf data structure can be used here.
  to=['pedestrian:*'], # send the message to all the actors of the "pedestrian" class
  to_environment=False)
```

Messages consist of an arbitrary payload, their `user_data`, defined as an instance of any protobuf data structure.

A message can be sent to one, many or all actors in a trial and / or to the environment.

The full documentation for `session.send_message` can be found [here](./cogment-api-reference/python.md#send_messageself-user_data-to-to_environmentfalse).

### Consuming

All the [messages](../concepts/glossary.md#message) that are sent and intended for each specific actor or environment will be received by the target actor or environment.

Actors or the environment can use the message directly, live, as the [trial](../concepts/glossary.md#message) is running by consuming message event in their event loop.

```python
async for event in actor_session.event_loop():
    # [...]
    for message in event.messages:
        # `message.sender_name` is the name of the actor who sent a message
        sender_name = message.sender_name
        # `message.payload` is the content of the message, it needs to be unpacked
        payload = message.payload
```

## Delta Encoding

By default, [observations](../concepts/glossary.md#observation) are sent in their entirety from the [environment](../concepts/glossary.md#environment) to the [actors](../concepts/glossary.md#actors). However, it's fairly common to only have a small portion of an [observation](../concepts/glossary.md#observation) to change from one update to the next.

Cogment allows you to specify a separate data structure to encode partial observation updates. However, if you do so, you must provide
a method that can apply the deltas to previous observations.

```python
# delta.py
def apply_delta(previous_observation, delta):
    # Return the updated observation, more often
    # than not, this should be the previous
    # observation that was modified in-place.
    previous_observation.car_position = delta.new_car_pos
    return previous_observation
```

```yaml
# cogment.yaml
import:
  proto:
    - city.proto
  python:
    - delta

actors:
  my_class:
    observation:
      space: city.Observation
      delta: city.ObservationDelta
      delta_apply_fn:
        python: delta.apply_delta
```
