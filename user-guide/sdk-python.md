# Cogment High-Level API guide (Python)

## Prerequisites

This document assumes the reader is familiar with the [Cogment Fundamentals][2].

The High-level cogment API expects users to use [protocol buffers](https://developers.google.com/protocol-buffers/) to declare a project's data structures. The intricacies of protobufs are beyond the scope of this document.  Basic knowledge of the technology and its usage is assumed.

Basic familiarity with [Docker](https://www.docker.com/) is also a prerequisite.

## The cogment.yaml file

An [actor class][4] is primarily defined by its [observation space][5] and [action space][6] and both MUST be configured in the `cogment.yaml` file.

The shape of these spaces is declared by using a protocol buffer message type. [Observations][7] and [actions][8] will simply be instances of the matching type.

For example, in the following, `driver` and `pedestrian` share a common view of the environment, but have different actions available to them.

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

[^1]
You can find the full list of options configurable within the yaml file [here]().

### Compiling the cogment.yaml

In order to use the `cogment.yaml` file within python scripts, it needs to be interpreted into a python module. This is done by a tool called the “cogment cli”.

We recommend using the `cogment/cli` docker image to run it, as it has all the required dependencies correctly setup already.

```text
$ docker run -v $(pwd):/data --rm cogment/cli --file /data/cogment.yaml --python_dir=/data
```

This will create a `cog_settings.py` module in the current directory. The `/data` path is the path within the container at which the current local directory is mounted.

The cogment cli will also compile the imported `.proto` files in python modules living in the same location. There is no need to invoke `protoc` yourself.

## Environment

[Environments][10] are implemented by a Python class that inherits from the `cogment.Environment` class.

This class will be instantiated once for each [trial][11] that is run on the project, and needs to implement two methods: `start()` and `update()`.

The `start()` method will be called at the start of the trial, and an instance of the [environment][12]’s configuration type (if applicable) will be passed to it.  `start()` must return the initial [observation][13] to be sent to the [actors][14].

The `update()` method will be invoked repeatedly as the trial progresses, and the [action][15] of each [actor][16] participating in the [trial][17] will be passed to it. `update()` must return the new [observations][18].

`on_message()` notifies the environment that a message has been received from either an actor or the environment.

In the common case where all actors within a trial share the same observation, a bare-minimum environment service would look like this:

```python
# env.py
import cog_settings
from city_pb2 import Observation

from cogment import Environment, GrpcServer


class CityEnv(Environment):
    def start(self, config):
        return Observation()

    def update(self, actions):
        return Observation()

    def on_message(self, sender, msg):
        pass

if __name__ == "__name__":
    server = GrpcServer(CityEnv, cog_settings, 9002)
    server.serve()
```

(TODO: add explanation of multi-observation API)

### Interpreting Actions

The [actions][19] argument passed to the environment’s `update()` has one attribute for each [actor class][20] of the project, named accordingly. Each of these is itself a list of deserialized protobuf messages (one per [actor][21] of the actor class the attribute refers to).

The type of the objects in the list will be the one that was set as the `action:space` of that [actor class][22].

```python
def update(self, actions):
    action_a = actions.pedestrian[0]
    action_b = actions.pedestrian[1]

    car_action = actions.driver[0]
    ...
```

N.B. You should not assume that an [environment][23] will be updated in the same thread that created it, nor that all updates will happen within the same thread. Similarly, the SDK does not perform synchronization across environment instances; therefore environments sharing data amongst themselves need to expect a possible high level of contention.

## Agent

[Agents][24] look a lot like [environment][25], inheriting from `cogment.Agent`. They are also instantiated and served on demand, though multiple instances of the same [agent][26] python class could be created for each [trial][27] if the `cogment.yaml` specifies so.

The three methods the [agent][28] should implement are `decide()`, `reward()` and `on_message()`.

`decide()` chooses which [action][29] should be taken when faced with a given [observation][30].

`reward()` notifies the [agent][31] that a judgment has been made on its past performance. The agent is free to do what it wants with that information.

`on_message()` notifies the [agent][51] that a message has been received from either an actor or the environment.

Finally, the agent must announce to the SDK which [actor class][32] of the project it is implementing. This is done by setting the `actor_class` class property to the correct reference from the project's `cog_settings` module.

A typical [agent][33] would look like this:

```python
# agent.py
import cog_settings
from city_pb2 import Action

from cogment import Agent, GrpcServer


class Pedestrian(Agent):
    actor_class = cog_settings.actor_classes.pedestrian

    def decide(self, observation):
        return PedestrianAction()

    def reward(self, reward):
        pass

    def on_message(self, sender, msg):
        pass

if __name__ == "__main__":
    server = GrpcServer(MyAgent, cog_settings, 9001)
    server.serve()
```

## Frontend

Unlike the [agent][34] and [environment][35] APIs, where the code gets invoked on demand by the Cogment framework, the [frontend][36] code sends requests to the [orchestrator][37].

```python
# client.py
import cog_settings

from city_pb2 import DriverAction
from cogment.client import Connection

# Create a connection to the Orchestrator serving this project
conn = Connection(cog_settings, "127.0.0.1:9000")

# Initiate a trial
trial = conn.start_trial(cog_settings.actor_classes.player)

# Perform actions, and get observations
observation = trial.do_action(DriverAction())
observation = trial.do_action(DriverAction())
observation = trial.do_action(DriverAction())
observation = trial.do_action(DriverAction())

# cleanup
trial.end()
```

## Feedback

### Creating

Feedbacks can be generated from all three components (Environment, Agent or [frontend][38]) using the `trial` object:

In the [agent][39] and [environment][40], the trial object can be found as the `trial` property of the instance itself, whereas in the [frontend][41], the object returned by `start_trial()` serves that purpose.

```python
# In agent/environment
class Pedestrian(Agent):
    def foo(self):
      human_driver = self.trial.actors.driver[1]
      human_driver.add_feedback(
          time=0,
          value=-1,
          confidence=1
      )

# In client
trial = conn.start_trial(cog_settings.actor_classes.driver)
...
ai = trial.actors.pedestrian[0]
ai.add_feedback(time=0, value=-1, confidence=1)
```

### Consuming

All the [feedbacks][42] that are sent and destined to each specific [actor][43] for a given point in time are combined together in a single [reward][44] by the framework.

This reward will be stored in the offline dataset, but the [agent][45] has the option to learn from it directly, live, as the [trial][46] is running.

```python
# In agent
class Pedestrian(Agent):
    def reward(self, reward):
        print(f'receiving reward: {reward}')
```

## Messages

### Creating

Messages can be created and sent to any of all three components (Environment, Agent or frontend Client using the `trial` object:

In the [agent][39] and [environment][40], the trial object can be found as the `trial` property of the instance itself, whereas in the frontend client, the object returned by `start_trial()` serves that purpose.

```python
# In agent/environment
class Pedestrian(Agent):
    def foo(self):
      human_driver = self.trial.actors.driver[1]
      human_driver.send_message(user_date=any_protobuf_type)

# In client
trial = conn.start_trial(cog_settings.actor_classes.driver)
...
ai = trial.actors.pedestrian[0]
ai.send_message(user_date=any_protobuf_type)
```

Messages can also be multi-cast to a set of the three components using the following:

```python
# In agent/environment
class Pedestrian(Agent):
    def foo(self):
      human_driver = self.trial.actors.driver[1]
      human_driver.multi_cast(user_date=any_protobuf_type, send_list=[0,1,3,-1])

# In client
trial = conn.start_trial(cog_settings.actor_classes.driver)
...
ai = trial.actors.pedestrian[0]
ai.multi_cast(user_date=any_protobuf_type, send_list=[0,1,3,-1])
```

where the send_list contains the actor and environment (-1) class id.

### Consuming

All the [messages][52] that are sent and destined for each specific actor or environment will be received by the target actor or environment.

This message will be stored in the offline dataset, but the actor or environment can use the message directly, live, as the [trial][46] is running.

```python
# In agent
class Pedestrian(Agent):
    def on_message(self, sender, msg):
        if msg:
            print(f'Message {msg} received from {sender}:')

# In environment
class Env(Environment):
    def on_message(self, sender, msg):
        if msg:
            print(f'Message {msg} received from {sender}:')

# In client as callback
def handle_messages(sender, msg):
    if msg:
        print(f'Message {msg} received from {sender}:')
...
observation = trial.do_action(action, on_message = handle_messages)
```

## Delta Encoding

By default, [observations][47] are sent whole from the [environment][48] to the [actors][49]. However, it's fairly common to only have a small portion of an [observation][50] to change from one update to the next.

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

[^1]: This shows only the relevant part of the full cogment.yaml

[2]: /fundamentals
[4]: ../glossary.md#actor-class
[5]: ../glossary.md#observation-space
[6]: ../glossary.md#action-space
[7]: ../glossary.md#observation
[8]: ../glossary.md#action
[10]: ../glossary.md#environment
[11]: ../glossary.md#trial
[12]: ../glossary.md#environment
[13]: ../glossary.md#observation
[14]: ../glossary.md#actor
[15]: ../glossary.md#action
[16]: ../glossary.md#actor
[17]: ../glossary.md#trial
[18]: ../glossary.md#observation
[19]: ../glossary.md#action
[20]: ../glossary.md#actor-class
[21]: ../glossary.md#actor
[22]: ../glossary.md#actor-class
[23]: ../glossary.md#environment
[24]: ../glossary.md#agent
[25]: ../glossary.md#environment
[26]: ../glossary.md#agent
[27]: ../glossary.md#trial
[28]: ../glossary.md#agent
[29]: ../glossary.md#action
[30]: ../glossary.md#observation
[31]: ../glossary.md#agent
[32]: ../glossary.md#actor-class
[33]: ../glossary.md#agent
[34]: ../glossary.md#agent
[35]: ../glossary.md#environment
[36]: ../glossary.md#frontend
[37]: ../glossary.md#orchestrator
[38]: ../glossary.md#frontend
[39]: ../glossary.md#agent
[40]: ../glossary.md#environment
[41]: ../glossary.md#frontend
[42]: ../glossary.md#feedback
[43]: ../glossary.md#actor
[44]: ../glossary.md#reward
[45]: ../glossary.md#agent
[46]: ../glossary.md#trial
[47]: ../glossary.md#observation
[48]: ../glossary.md#environment
[49]: ../glossary.md#actor
[50]: ../glossary.md#observation
[51]: ../glossary.md#agent
[52]: ../glossary.md#messages
