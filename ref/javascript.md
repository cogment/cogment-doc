# Javascript SDK

As of today, the javascript API only supports the client API. This is because we
do not want such APIs, but siimply that no one has had a need for them yet. If you would like
to implement agents and/or environments in Javascript, please file an [issue](https://gitlab.com/cogment/cogment/issues) for it.

## Installation

The simplest way to install the javascript SDK is to just install it using npm:
`npm install cogment`

## General usage

### cog_settings.js

All API entrypoints require a cogment configuration object. This configuration object can be deterministically determined
from the content of a project's `cogment.yaml`. As such, it should be generated using the `cogment-cli` tool.

```bash
# From the directory containing cogment.yaml
$ cogment generate --js_dir=path/to/js/project
```

This will generate both a `cog_settings.js` file, as well as any required compiled protocol buffer files.

### Top-level import

```javascript
import {Connection} from 'cogment'; // import the cogment sdk entrypoint
import cog_settings from './cog_settings'; // import the generated cog_settings
```

## Client API

### Connection

`Connection`

**example:**

```javascript
const aom_conn = new Connection(cog_settings, "http://" + window.location.hostname + ":8088");
```

#### Constructors

`Connection.constructor(settings, endpoint)`

Creates a new Connection.

parameters:

- `settings`: the settings object
- `endpoint`: The url of the grpc-web proxy (generally envoy) connected to the orchestrator.

#### Methods

`Connection.start_trial(actor_class, cfg=undefined)`

parameters:

- `actor_class`: The actor class the human is registering as
- `cfg`: if applicable, an instance of the environment's config protocol buffer.

returns:

- A Promise to the newly created trial.

### Trial

`Trial`

Represents the state of an ongoing trial managed by an orchestrator.

#### Properties

- `id`: The trial id.
- `settings`: The settings object associated with this trial.
- `actors`: A dictionary of actor classes. Each entry is a list of actors.
- `actors.all`: A linear list of all actors present in the trial.
- `tick_id`: The current tick id.

### Actor

`Actor`

Represents an interface to an actor within the trial.

- `actor_id`: The actor's identification.
- `actor_class`: The actor's actor class.
- `feedbacks`: List of pending feedbacks
- `messages`: List of messages
- `trial`: The trial this actor is member of.

#### Methods

`add_feedback(value, confidence, time=-1)`

Provide feedback that will contribute to that actor's reward.

parameters:

- `value`: The numerical value of the feedback
- `confidence`: The weight this feedback has relative to other feedbacks.
- `time`: The tick id for which this feedback refers to. If left at -1, it implicitely refers to the latest point in time, and can be **reliably** expected to be propagated live to the agent.

`send_message(user_data, user_data_type)`

Send a message to an actor or the environment.

parameters:

- `user_data`: protobuf class - The message to the actor or environment.
- `user_data_type`: string - class name of user_data protobuf class.

### Client Trial

`ClientTrial extends Trial`

Represents the client-side state of a trial.

#### Properties

- `actor_id` The id of the local actor.
- `actor_class`: The actor class of the local actor.
- `connection`: The Connection instance managing that trial.
- `observation`: The current state of the environment, as seen by the local actor.

#### Methods

`do_action(action)`

Request the advancement of time for the trial by providing a human action. Any pending feedback is also flushed.

parameters:

- `action`: the human's action, must be an instance of the client's actor class' action space.

returns:

- A promise to the updated Observation for the local actor. The promised object is the same as `ClientTrial.observation`.

`end()`

Request the end of the trial. Any pending feedback is also flushed.

`flush_feedback()`

Explicitely flush any pending feedback. This should rarely be needed.
