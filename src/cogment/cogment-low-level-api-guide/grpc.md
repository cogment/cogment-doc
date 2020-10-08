# Cogment gRPC API

The entirety of the low-level cogment API is implemented using [gRPC](https://grpc.github.io/) services. How services are implemented or accessed is highly dependant on the programming language being interfaced, so we will defer to the gRPC documentation for the nuts and bolts of using the API.

The relevant `.proto` files can all be found within the `api/` directory of the cogment repository.

## General notes

### Actor Ids

Actor ids are assigned to actor instances described within the `cogment.yaml` in order of appearance from top to bottom. This mapping is currently **implicit**.

## Common types

### `Observation`

A singular observation.

| name      | type                      | description      |
|-----------|---------------------------|------------------|
| tick_id   | uint64                    | Monotonic Time   |
| timestamp | fixed64                   | Wall-clock time  |
| data      | ObservationData           | Observation data |

### `ObservationData`

The data payload of an observation.

| name      | type                      | description                |
|-----------|---------------------------|----------------------------|
| content   | bytes                     | Raw observation data       |
| snapshot  | bool                      | Full observation vs delta  |

If `snapshot` is set, `content` is expected to contain a serialized message of the type matching the actor's Observation Space.

If `snapshot` is not set, `content` is expected to contain a serialized message of the type matching the actor's Observation Delta .

### `Action`

Data associated with an actor's action.

| name      | type                      | description                |
|-----------|---------------------------|----------------------------|
| content   | bytes                     | Raw action data            |

`content` must be a serialized message of the actor's Action Space.

### `Feedback`

Data associated with a piece of feedback for an actor.

| name      | type                      | description                |
|-----------|---------------------------|----------------------------|
| actor_id  | int32                     | Target actor            |
| tick_id   | int32                     | Time associated with the feedback            |
| value     | float                     | Numerical feedback             |
| confidence| float                     | Feedback weight            |
| content   | bytes                     | Arbitrary additional data            |

If `tick_id` is set to `-1` during feedback `generation`, the orchestrator will automatically assign the latest time to the feedback. Feedbacks with `tick_id` set to `-1` can be **reliably** expected to make their way to live agents. Feedback for past events will be stored in the datalog.

### `Message`

Data associated with a message for an actor or the environment.

| name      | type                      | description                |
|-----------|---------------------------|----------------------------|
| sender_id  | int32                     | Actor or environment Source id            |
| receiver_id   | int32                     | Actor or environment Target id         |
| payload     | google.protobuf.Any     | Message payload          |

The environment id is `-1`.  Messages for past events will be stored in the datalog.

## Client API

This API is described in `api/cogment/api/orchestrator.proto`. It is implemented by the cogment orchestrator, and client applications are expected to connect to it using the gRPC client API.

### `Start`

Begin a new trial.

**Argument:** `TrialStartRequest`

| name      | type                      | description                |
|-----------|---------------------------|----------------------------|
| config    | EnvironmentConfig         | Environment-specific init data|

**Returns:** `TrialStartReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| trial_id    | string         | Unique id of the trial that was just created|
| actor_id    | int32         | Index of the human actor within the trial|
| observation | Observation    | Initial observation|

**N.B.** If the project does not have a human actor configured, `actor_id` will be -1.

### `End`

Terminate a trial.

**Argument:** `TrialEndRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Trial to end           |

**Returns:** `TrialEndReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### `Action`

Advances time of the trial. The rpc will not return until all agents have made their decision, and the environment has updated.

**Argument:** `TrialActionRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Trial to advance       |
| actor_id  | int32          | Actor_id of the action |
| action    | Action         | Action data            |

N.B. `actor_id` **must** be the `actor_id` that was returned by the `Start` call that creatde the trial.

**Returns:** `TrialActionReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| observation | Observation    | Updated observation        |

### `GiveFeedback`

Provide feedback for another actor within a trial

**Argument:** `TrialFeedbackRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial       |
| feedbacks | repeated Feedback          | Feedback data |

**Returns:** `TrialFeedbackReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### `SendMessage`

Send message to an actor or environment within a trial

**Argument:** `TrialMessageRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial       |
| messages | repeated Message          | Message data |

**Returns:** `TrialMessageReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|


### Version

Request Version information.

**Argument:** `VersionRequest`
| name      | type             | description                |
|-----------|------------------|----------------------------|

**Returns:** `Version`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| versions  | repeated Version | version data               |

## Agent API

The Agent Service is implemented by Agent applications, and used by the orchestrator.

It's important to remember that Agent applications are expected to serve multiple agents from a single instance.

This API is described in `api/cogment/api/agent.proto`, and agent applications are expected to implement the `Agent` service found within it.

### Start

Anounces that a trial has begun and needs an agent for a given actor slot.

If a project has multiple replicas of an actor served by the same agent service, there will be one of these calls for each actor.

**Argument:** `AgentStartRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial       |
| actor_id  | int32          | ID of the actor            |

**Returns:** `AgentStartReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### End

Anounces that a trial has ended.

If a project has multiple replicas of an actor served by the same agent service, there will be one of these calls for each actor.

**Argument:** `AgentEndRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial       |
| actor_id  | int32          | ID of the actor            |

**Returns:** `AgentEndReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### Decide

Request a decision

**Argument:** `AgentDecideRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial       |
| actor_id  | int32          | ID of the actor            |
| observation  | Observation | Observation for which to make a decision |

If the actor class employs an observation delta, then `observation` may be either a snapshot or a delta, and both cases should be handled at all times. Any perceived pattern should be considered coincidental. For example: a snapshot followed by nothing but deltas for the rest of a trial may be a very *common* occurence, but it should not be *relied* upon.

**Returns:** `AgentDecideReply`

| name      | type                 | description                |
|-----------|----------------------|----------------------------|
| action  | Action                 | Action chosen by the agent |
| feedbacks  | repeated Feedback  | Feedback for other actors  |
| messages  | repeated Message | Messages for other actors and environment |

### Reward

Provide reward information

**Argument:** `AgentRewardRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial           |
| actor_id  | int32          | ID of the actor            |
| tick_id   | int32          | Associated Time            |
| reward  | Reward | Reward Data |

N.B. For the moment, cogment only sends live reward data for the latest tick.

`Reward`:

| name      | type           | description                |
|-----------|----------------|----------------------------|
| reward  | float         | Normalized reward value           |
| confidence  | float          | Normalized confidence            |
| feedbacks   | repeated Feedback          | Individual feedbacks used to compute reward            |

**Returns:** `AgentRewardReply`

### OnMessage

Provide message information

**Argument:** `AgentOnMessageRequest`

| name      | type           | description                |
|-----------|----------------|----------------------------|
| trial_id  | string         | Associated trial           |
| actor_id  | int32          | ID of the actor            |
| messages  | Message | Message Data |


`MessageCollection`:

| name      | type           | description                |
|-----------|----------------|----------------------------|
| messages   | repeated Message     | Individual messages |

**Returns:** `AgentOnMessageReply`


### Version

Request Version information.

**Argument:** `VersionRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|

**Returns:** `Version`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| versions  | repeated Version | Version data               |

## Environment API

The Environment Service is implemented by Environment applications, and used by the orchestrator.

It's important to remember that Environment applications are expected to serve multiple environments from a single instance.

This API is described in `api/cogment/api/environment.proto`, and environment applications are expected to implement the `Environment` service found within it.

`ObservationSet`:

Whenever an environment generates Observations, they are efficiently packed so that actors may share a given observation without incuring excessive bandwidth or data storage.

| name      | type             | description                |
|-----------|------------------|----------------------------|
| tick_id  | uint32                      | Tick ID           |
| timestamp  | fixed64         | Wall clock time        |
| observations  | repeated ObservationData | Observations        |
| actors_map  | uint32 | Maps actors to observations         |

- The length of `actors_map` **MUST** be the same as the number of actors defined in the `cogment.yaml` file.
- Each entry within `actors_map` **MUST** be smaller than the number of observations.
- The observation or delta contained at `observations[actors_map[i]]` **MUST** match the observation space or delta type of that actor.

### `Start`

Announces that a trial is beginning.

**Argument:** `EnvStartRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| trial_id  | string           | Associated trial           |
| config  | EnvironmentConfig           | Environment init data (if applicable)           |

**Returns:** `EnvStartReply`

| name      | type                 | description                |
|-----------|----------------------|----------------------------|
| observations  | `ObservationSet` | Initial observations           |

### `End`

Announces that a trial is terminating.

**Argument:** `EnvEndRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| trial_id  | string         | Associated trial           |

**Returns:** `EnvEndReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### `Update`

Provides actions for all actors within a trial, and expects an updated observation set as a reply.

**Argument:** `EnvUpdateRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| trial_id  | string         | Associated trial             |
| action_set  | ActionSet         | Actions for all actors  |

**Returns:** `EnvUpdateReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| observations  | `ObservationSet` | Updated observations   |
| feedbacks  | repeated Feedback  | Feedback for actors  |
| end_tril  | bool  | End trial indicator  |
| messages  | repeated Message  | Message for actors or environment |

### `OnMessage`

Provide message information.

**Argument:** `EnvOnMessageRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| trial_id  | string         | Associated trial             |
| actor_id  | int32         | actor id  |
| messages  | Message         | messages  |

**Returns:** `EnvOnMessageReply`

| name      | type             | description                |
|-----------|------------------|----------------------------|

### `Version`

Request Version information.

**Argument:** `VersionRequest`

| name      | type             | description                |
|-----------|------------------|----------------------------|

**Returns:** `Version`

| name      | type             | description                |
|-----------|------------------|----------------------------|
| versions  | repeated Version | version data               |
