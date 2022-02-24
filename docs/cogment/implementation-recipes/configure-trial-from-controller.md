---
title: Configure Trial from Controller
---

# Fully configure a trial from a [**Controller**](../../concepts/core-concepts.md#controller)

When starting a trial, the controller can only provide an instance of the **trial configuration** message and from this instance the pre trial hook can fill the **trial parameters**, including a full configuring of the environment and actors involved in the trial. More details can be found [here](../cogment-api-guide.mdx#pre-trial-hook). In some cases, you might want to fully configure a trial from the controller. This recipe is dedicated to this use case.

:::caution
Implementing this recipe enables any client having access to the orchestrator to specify URLs - the actor and environment endpoints - that will be accessed (and trusted) by the orchestrator.
:::

The general idea is to define `TrialConfig` so that it includes everything that's needed to parametrize the trial. It should look something like the following.

```proto
message EnvironmentParams {
  string endpoint = 1;
  EnvConfig config = 2;
  string implementation = 3;
}

message ActorParams {
    string name = 1;
    string actor_class = 2;
    string endpoint = 3;
    string implementation = 4;
    ActorConfig config = 5;
}

message TrialConfig {
    EnvironmentParams environment = 1;
    repeated ActorParams actors = 2;
    uint32 max_steps = 3;
    uint32 max_inactivity = 4;
}
```

When starting a trial from the controller you'll need to define the full config.

```python
trial_id = await controller.start_trial(trial_config=TrialConfig(
    environment=EnvironmentParams(
        endpoint="grpc://my-environment:9000",
        config=# [...],
        implementation="my-implementation"
    )
))
```

Finally a _pass-through_ pre-trial hook needs to be implemented, registered and served. Its endpoint must be specified in to the Orchestrator on startup.

```python
async def passthrough_pre_trial_hook(pre_trial_hook_session):
    trial_config = pre_trial_hook_session.trial_config
    pre_trial_hook_session.environment_config = trial_config.environment.config
    pre_trial_hook_session.environment_endpoint = trial_config.environment.endpoint
    pre_trial_hook_session.environment_implementation = trial_config.environment.implementation
    pre_trial_hook_session.actors = [
        {
            "name": actor_params.name,
            "actor_class": actor_params.actor_class,
            "endpoint": actor_params.endpoint,
            "implementation": actor_params.implementation,
            "config": actor_params.config,
        }
        for actor_params in trial_config.actors
    ]
    pre_trial_hook_session.trial_max_steps = trial_config.max_steps
    pre_trial_hook_session.trial_max_inactivity = trial_config.max_inactivity

    pre_trial_hook_session.validate()

context.register_pre_trial_hook(pre_trial_hook)
```
