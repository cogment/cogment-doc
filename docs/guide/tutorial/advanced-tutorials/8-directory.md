# Improve Operational Efficiency with a Cogment Directory for Service Discovery

:::note

It is not necessary to have gone through all the previous sections to understand this part, but the code changes refer to the code in the previous step. The code can be retrieved from the [tutorial's repository](https://github.com/cogment/cogment-tutorial-rps).

:::

In this step of the tutorial, we will add the Cogment [Directory](../../../reference/cli/directory/directory-server.md) to
the project. A directory is a register of services together with the network addresses where to connect to the services.
This will let components find the services they need instead of having to already know the network address.
It makes it easier to manage more complicated projects and complex deployments.

## Adding the Directory service

In the `./run.sh` script we will add the command to start the Directory service.

```bash
function directory_start() {
  cogment services directory --port=9005
}
```

Since the Directory is a service that all other services depend upon, it needs to be started first.

Here we have a few choices; we could decide to start it in a separate terminal before the other services, or we could
start it in the background with the same command as starting the services. It could also be kept running all the time.

For the purpose of demonstration and simplicity we will start it in the background, so in the `./run.sh` script we will
change the `services_start` command like this:

```bash
function services_start() {
  directory_start &
  sleep 3
  _run_parallel orchestrator_start environment_start random_agent_start dqn_agent_start
}
```

## Registering services to the Directory

Now that we have a directory, we need to register the services so they can be "discovered" by components.
The Cogment SDK and CLI know how to use a directory and will register themselves if possible.
To make it possible, the components need to know the network address of the directory.
This can be provided on an individual basis at the code level, e.g.:

```python
  context = cogment.Context(cog_settings=cog_settings, user_id="rps", directory_endpoint="grpc://localhost:9005")
```

For the CLI it can be provided on the command line, e.g.:

```bash
$ cogment services orchestrator --directory_endpoint="grpc://localhost:9005"
```

But the easiest way is to set the environment variable `COGMENT_DIRECTORY_ENDPOINT`, which is what we will do here by
adding it to the `./.env` file. And while we are there, we will parametrize the directory port for better maintainability:

```bash
DIRECTORY_PORT=9005
COGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${DIRECTORY_PORT}"
```

and in `./run.sh` we update the directory start command like this:

```bash
function directory_start() {
  _load_dot_env
  cogment services directory --port="${DIRECTORY_PORT}"
}
```

:::note

In special circumstances, which we don't need for this tutorial, components can be registered explicitly with the
[Directory client CLI](../../../reference/cli/directory/directory-client.md).

:::

## Discovering services from the Directory

We have a directory, and the services are registered in that directory, but for it to be useful, we need to "discover"
these services. This is done by providing Cogment with [discovery endpoints](../../../reference/parameters.md#cogment-endpoints)
instead grpc endpoints (i.e. network addresses).

Let's start with the Trial Runner (`./trial_runner/main.py`), we'll change the endpoint variables to context discovery endpoints like this:

```python
ORCHESTRATOR_ENDPOINT = "cogment://discover"
ENVIRONMENT_ENDPOINT = "cogment://discover"
RANDOM_AGENT_ENDPOINT = "cogment://discover"
DQN_AGENT_ENDPOINT = "cogment://discover"
```

How is Cogment differentiating and finding the right service? This is done by using the context where the endpoint is provided, thus the name "context" discovery endpoint. Endpoints can also be "explicit" discovery endpoints, in which case they don't use the context in which they are used; all the information is in the endpoint explicitly (since we consider the context information to be implicit).

An example of context information can be seen here where the orchestrator endpoint is given:

```python
controller = await context.get_controller(endpoint=cogment.Endpoint("cogment://discover"))
```

The `cogment://discover` string does not contain anything to say that this is for an orchestrator.
But because it is given to the `get_controller` parameter which requires an orchestrator endpoint, Cogment has the context that this is an endpoint to communicate with an orchestrator, so it will use this fact (i.e. this must be an endpoint for an orchestrator) to inquire the directory. In other words, it matters where a context discovery endpoint is used.

We can also simplify the code even further because the method `get_controller` has a default endpoint parameter, and the default value for a `cogment.Endpoint` is a pure context discovery endpoint (i.e. "cogment://discover"), so we can change it like this:

```python
controller = await context.get_controller()
```

Which means that we don't need the `ORCHESTRATOR_ENDPOINT` variable anymore, and we'll remove that from the Trial Runner file.
Then we also don't need the `ORCHESTRATOR_HOST` environment variable, and we'll remove that from the `./.env` file. Note
that we still want to keep the `ORCHESTRATOR_PORT` environment variable to centralize the port selection for our
different services, it just makes it easier to maintain our project.

Now we do the same (still in the Trial Runner file) for the environment; we remove the `ENVIRONMENT_ENDPOINT` variable, and
since the environment also has a pure context discovery default endpoint, we can remove it:

```python
trial_params=cogment.TrialParameters(
        cog_settings,
        environment_name="env",
        environment_config=environment_config,
        actors=[
            actor_1_params,
            actor_2_params,
        ]
    )
```

And we remove the `ENVIRONMENT_HOST` environment variable from the `./.env` file.

And finally for the actors... But wait a second, we have multiple actors, how is Cogment to differentiate them?
In this case, it is easy, the context for actors has three elements: that it is an "actor, its actor class, and its
implementation name (note that the environment also has an implementation name in its context, but here we only have one
environment, so there is no confusion).
Since all our actors have different implementation names, then the context is sufficient to uniquely identify our actors.
So we do the same here as we did for the environment, and again the default endpoint for actors is a context discovery
endpoint, so we can remove it, getting:

```python
actor_1_params = cogment.ActorParameters(
        cog_settings,
        name="player_1",
        class_name="player",
        implementation="dqn_agent"
    )
    actor_2_params = cogment.ActorParameters(
        cog_settings,
        name="player_2",
        class_name="player",
        implementation="heuristic_agent"
    )
```

and the final `./.env` file looks like this:

```bash
ORCHESTRATOR_PORT=9000
ENVIRONMENT_PORT=9001
RANDOM_AGENT_PORT=9002
DQN_AGENT_PORT=9003
DIRECTORY_PORT=9005
COGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${DIRECTORY_PORT}"
```

:::note

In cases when the context would not be enough to differentiate between services, the directory allows properties to be
added to registered services (e.g. for actors, as parameters to the `Context.register_actor` method), and these
properties can be added to a context discovery endpoint (e.g. `cogment://discover?tag=red&zone=1`).

:::

## Special case for Client Actors

In step 5 and 6 of the tutorial we had a client actor. Client actors are effectively not services and thus don't register themselves in the directory. They could be explicitly registered using the CLI if it could simplify things, but for the purpose of this tutorial, it is not useful. On the other hand, the way a client actor joins a trial is simplified when there is a directory.
Instead of something like this:

```python
await context.join_trial(trial_id=trial_id, endpoint=cogment.Endpoint(ORCHESTRATOR_ENDPOINT), actor_name="player_1")
```

Because, again, the endpoint parameter has a default context discovery endpoint, this would suffice:

```python
await context.join_trial(trial_id=trial_id, actor_name="player_1")
```

## Authentication Token

All directory communications require an Authentication Token. By default, this is empty, but it can be set to any string and used in many situations. One case that is useful is to isolate different running projects, when there is only a single directory that is always running. The easiest way to do this is to add this environment variable to the `./.env` file:

```bash
COGMENT_DIRECTORY_AUTHENTICATION_TOKEN="project-tutorial-8"
```

Then all registrations will use this authentication token and all inquiries will require this authentication token
(i.e. only services that were registered with this authentication token will be found).

# Step 8.5: Using Cogment environment variables

In this step we'll use the Cogment environment variables to simplify management of the project.
So we will add these environment variables to the `./.env` file:

```bash
COGMENT_DIRECTORY_PORT=9005
COGMENT_LIFECYCLE_PORT=9000
COGMENT_ACTOR_PORT=9000
```

and remove the tutorial specifc variables, which leaves us with a `./.env` file that looks like this:

```bash
# Local (tutorial specific) variables
ENVIRONMENT_PORT=9001
RANDOM_AGENT_PORT=9002
DQN_AGENT_PORT=9003

# Cogment environment variables
COGMENT_LIFECYCLE_PORT=9000
COGMENT_ACTOR_PORT=9000
COGMENT_DIRECTORY_PORT=9005
COGMENT_DIRECTORY_ENDPOINT="grpc://localhost:${COGMENT_DIRECTORY_PORT}"
COGMENT_DIRECTORY_AUTHENTICATION_TOKEN="project-tutorial-8"
```

With this, these two commands in the `./run.sh` file are simplified to:

```bash
function directory_start() {
  _load_dot_env
  cogment services directory
}

function orchestrator_start() {
  _load_dot_env
  cogment services orchestrator
}
```
