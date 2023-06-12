---
sidebar_position: 2
---

# Runner

:::note Cogment Enterprise
This is part of the **Cogment Enterprise**, [AI Redefined's](https://ai-r.com/) commercial offering.
:::

## General usage

### `asyncio`

The use of this module requires [Cogment Python SDK](../python.md) >= 2.8.0. It uses Python's `asyncio` library and as such should be run in an `asyncio.Task`.
This documentation assumes some familiarity with the `asyncio` library of Python (see [Python documentation](https://docs.python.org/3/library/asyncio.html)).

E.g.

```python
import asyncio

asyncio.run(MyMainFunction())
```

### Logging

This module uses the `cogment.enterprise` logger, and the default log level is `INFO`. E.g. to change the log level to `WARNING`:

```python
import cogment_enterprise
import logging

logging.getLogger("cogment.enterprise").setLevel(logging.WARNING)
```

Or set the environment variable `COGMENT_ENTERPRISE_LOG_LEVEL` to one of the values: `off`, `error`, `warning`, `info`, `debug`, `trace`.
The logging works the same as Cogment Python SDK logging (see Cogment Python SDK documentation).

### Trial Specifications

This module is designed to work without any trial specifications (i.e. `cog_settings`), but is easier to use if the specification are available.

If the specifications are not provided, some internal object deserializations will not happen (e.g. `sample.observation`), and special serialized versions will have to be used (e.g. `sample.observation_serialized`).
Helper functions are provided for deserializing the various defined objects in the specifications (see below).

Objects normally received as `google.protobuf.Any` will still be deserialized to such an object as it does not depend on the specification of the trial.

### Top-level import

The main module of the Runner SDK is `cogment_enterprise.runner`, and most enterprise scripts will start with a [cogment_enterprise.runner.TrialRunner](#class-cogment_enterpriserunnertrialrunner).

## Utilities and Constants

### `cogment_enterprise.runner.BATCH_ID_PROPERTY`

This is the name of the trial property where the batch ID is stored.
Each trial started by a batch will have this property.

```python
batch_id = trial_parameters.properties[cogment_enterprise.runner.BATCH_ID_PROPERTY]
```

### `cogment_enterprise.runner.BATCH_TRIAL_INDEX_PROPERTY`

This is the name of the trial property where the index of the trial in the batch is stored.
Each trial started by a batch will have this property.

```python
trial_index_in_batch = trial_parameters.properties[cogment_enterprise.runner.BATCH_TRIAL_INDEX_PROPERTY]
```

### `cogment_enterprise.runner.BATCH_LAST_TRIAL_PROPERTY`

This is the name of the trial property that will be set on the last trial of the batch.
The property value is empty, it's presence indicates that this is the last trial of the batch.
Only one trial in a batch may have this property.

Note that there may not be a trial with this property if the batch was stopped prematurely.

```python
last_trial = cogment_enterprise.runner.BATCH_LAST_TRIAL_PROPERTY in trial_parameters.properties
```

### `cogment_enterprise.runner.deserialize_action(serialized_data, actor_class, cog_settings)`

Function to deserialize raw data into a Python class instance.

The data can only be deserialized by knowing the protobuf message it represents.
It can be done manually if one knows the protobuf message represented.
This function simplifies deserialization of messages related to a Cogment project with the trial spec module `cog_settings`.

Parameters:

-   `serialized_data`: _bytes_ - Raw data received.
-   `actor_class`: _str_ - Name of the class of the actor to which this data relates. This information is necessary to find the proper message type in the spec.
-   `cog_settings`: _module_ - Specification module associated with the trial from which the data relates.

Return: _protobuf class instance_ - Action from an actor of type `actor_class`. The class of the action is defined as action space for the specific actor class in the section `actor_classes:action:space` in the spec file (e.g. `cog_settings`).

### `cogment_enterprise.runner.deserialize_actor_observation(serialized_data, actor_class, cog_settings)`

Function to deserialize raw data into a Python class instance.

The data can only be deserialized by knowing the protobuf message it represents.
It can be done manually if one knows the protobuf message represented.
This function simplifies deserialization of messages related to a Cogment project with the trial spec module `cog_settings`.

Parameters:

-   `serialized_data`: _bytes_ - Raw data received.
-   `actor_class`: _str_ - Name of the class of the actor to which this data relates. This information is necessary to find the proper message type in the spec.
-   `cog_settings`: _module_ - Specification module associated with the trial from which the data relates.

Return: _protobuf class instance_ - Observation for an actor of type `actor_class`. The class of the observation is defined as observation space for the specific actor class in the section `actor_classes:observation:space` in the spec file (e.g. `cog_settings`).

### `cogment_enterprise.runner.deserialize_actor_config(serialized_data, actor_class, cog_settings)`

Function to deserialize raw data into a Python class instance.

The data can only be deserialized by knowing the protobuf message it represents.
It can be done manually if one knows the protobuf message represented.
This function simplifies deserialization of messages related to a Cogment project with the trial spec module `cog_settings`.

Parameters:

-   `serialized_data`: _bytes_ - Raw data received.
-   `actor_class`: _str_ - Name of the class of the actor to which this data relates. This information is necessary to find the proper message type in the spec.
-   `cog_settings`: _module_ - Specification module associated with the trial from which the data relates.

Return: _protobuf class instance_ - Config for an actor of type `actor_class`. The class of the config is defined as config type for the specific actor class in the section `actor_classes:config_type` in the spec file (e.g. `cog_settings`).

### `cogment_enterprise.runner.deserialize_environment_config(serialized_data, cog_settings)`

Function to deserialize raw data into a Python class instance.

The data can only be deserialized by knowing the protobuf message it represents.
It can be done manually if one knows the protobuf message represented.
This function simplifies deserialization of messages related to a Cogment project with the trial spec module `cog_settings`.

Parameters:

-   `serialized_data`: _bytes_ - Raw data received.
-   `cog_settings`: _module_ - Specification module associated with the trial from which the data relates.

Return: _protobuf class instance_ - Config for the environment. The class of the config is defined as config type in the section `environment:config_type` in the spec file (e.g. `cog_settings`).

### `cogment_enterprise.runner.deserialize_trial_config(serialized_data, cog_settings)`

Function to deserialize raw data into a Python class instance.

The data can only be deserialized by knowing the protobuf message it represents.
It can be done manually if one knows the protobuf message represented.
This function simplifies deserialization of messages related to a Cogment project with the trial spec module `cog_settings`.

Parameters:

-   `serialized_data`: _bytes_ - Raw data received.
-   `cog_settings`: _module_ - Specification module associated with the trial from which the data relates.

Return: _protobuf class instance_ - Config for the trial. The class of the config is defined as config type in the section `trial:config_type` in the spec file (e.g. `cog_settings`).

## class cogment_enterprise.runner.TrialRunner

### `__init__(self, user_id, cog_settings=None, asyncio_loop=None, directory_endpoint=None, directory_auth_token=None, orchestrator_endpoint=None, datastore_endpoint=None, model_registry=None)`

Parameters:

-   `user_id`: _str_ - Identifier for the user of this context.
-   `cog_settings`: _module_ - Settings module associated with trials that will be run ([cog_settings](#cog_settings.py) namespace).
-   `asyncio_loop`: _asyncio.Loop_ - For special purpose implementations.
-   `directory_endpoint`: _Endpoint instance_ - Grpc endpoint (i.e. starting with "grpc://") to access the directory. The directory will be used to inquire discovery endpoints, and to register the services for discovery. If no endpoint is provided, a check for the environment variable `COGMENT_DIRECTORY_ENDPOINT` will be made and if it exists, it will be used as the URL of a basic endpoint.
-   `directory_auth_token`: _str_ - Authentication token for access to the directory. This token will be registered with the services, and must match registered tokens when inquiring the directory. If no token is provided, a check for the environment variable `COGMENT_DIRECTORY_AUTHENTICATION_TOKEN` will be made and if it exists, it will be used as the token.
-   `orchestrator_endpoint`: _Endpoint instance_ - Details of the connection to the Orchestrator. If not provided, the directory will be inquired. Only needed for running batches, not for training.
-   `datastore_endpoint`: _Endpoint instance_ - Details of the connection to the Datastore. If not provided, the directory will be inquired if necessary. This will be used as the datalog endpoint of the trials started by the batch. And it will be used as the source of samples for training.
-   `model_registry_endpoint`: _Endpoint instance_ - Details of the connection to the Model Registry. If not provided, the directory will be inquired if necessary. Only needed for training, not running batches.

### `async get_controller(self)`

Returns the Controller used by the TrialRunner.

Parameters: None

Return: _cogment.Controller instance_ - An instance of `cogment.Controller` class used to manage trials.

### `async get_datastore(self)`

Returns the Datastore used by the TrialRunner.

Parameters: None

Return: _cogment.Datastore instance_ - Datastore.

### `async get_model_registry(self)`

Returns the Model Registry used by the TrialRunner.

Parameters: None

Return: _cogment.ModelRegistry instance_ - Model Registry.

### `async run_simple_batch(self, nb_trials, nb_parallel_trials=1, id=None, pre_trial_callback=None, post_trial_callback=None)`

Method to start a batch of trials.

Parameters:

-   `nb_trials`: _int_ - The number of trials to run.
-   `nb_parallel_trials`: _int_ - The number of trials to run in parallel. Must be <= `nb_trials`.
-   `id`: _str_ - ID of the batch. This will be added to the properties of the trials that are started by the batch. This should be unique in the Datastore, otherwise there could be a clash of trial IDs (a mix of trials from different batches could also be used by the `BatchTrainer`). If `None`, an ID will be chosen by the system.
-   `pre_trial_callback`: _async func(BatchTrialInfo instance) -> cogment.TrialParameters_ - This [Callbacks](#callbacks) function will be called before any new trial is started.
-   `post_trial_callback`: _async func(sample, trial_parameters, model_registry)_ - This [Callbacks](#callbacks) function will be called after the end of a trial.

Return: _TrialBatch instance_ - An instance of the `TrialBatch` class.

### `async run_simple_training(self, batch, sampler_callback, actor_names=None, max_trial_wait=None)`

Method to start training on a batch of trials with a per-sample callback.

Parameters:

-   `batch`: _TrialBatch instance_ - The batch to train on. This will be used to identify the trials that are part of the batch and retrieve only the samples from these trials.
-   `sampler_callback`: _async func(cogment.DatastoreSample, cogment.TrialParameters, cogment.ModelRegistry) -> bool_ - This [Callbacks](#callbacks) function will be called for every sample in the batch.
-   `actor_names`: _list[str]_ - Names of actors to include in the samples. If `None`, all actors will be included.
-   `max_trial_wait`: _int_ - Maximum number of seconds to wait for new trials to be started by the batch. Since this depends on the running time of trials, this should be longer than the expected max trial duration. If `None`, then 86400 seconds (24 hours) will be used.

Return: _BatchTrainer instance_ - An instance of the `BatchTrainer` class.

### `async run_simple_trial_training(self, batch, trial_callback, actor_names=None, max_trial_wait=None)`

Method to start training on a batch of trials.

Parameters:

-   `batch`: _TrialBatch instance_ - The batch to train on. This will be used to identify the trials that are part of the batch and retrieve only the samples from these trials.
-   `trial_callback`: _async func(cogment.DatastoreSample, cogment.TrialParameters, cogment.ModelRegistry) -> bool_ - This [Callbacks](#callbacks) function will be called for every trial in the batch.
-   `actor_names`: _list[str]_ - Names of actors to include in the samples. If `None`, all actors will be included.
-   `max_trial_wait`: _int_ - Maximum number of seconds to wait for new trials to be started by the batch. Since this depends on the running time of trials, this should be longer than the expected max trial duration. If `None`, then 86400 seconds (24 hours) will be used.

Return: _BatchTrainer instance_ - An instance of the `BatchTrainer` class.

## class TrialBatch

Class to run a batch of related trials.

### __init__(self, id, controller, nb_trials, pre_trial_callback, post_trial_callback, datalog_endpoint)

The parameters are the same as provided to [`run_simple_batch`](#class-cogment_enterpriserunnertrialrunner).

Parameters:

-   `id`: _str_ - ID of the batch. This will be added to the properties of the trials that are started by the batch. This should be unique in the Datastore, otherwise there could be a clash of trial IDs (a mix of trials from different batches could also be used by the `BatchTrainer`). If `None`, an ID will be chosen by the system.
-   `controller`: _cogment.Controller instance_ - Controller used to start trials.
-   `nb_trials`: _int_ - Number of trials to run.
-   `pre_trial_callback`: _async func(BatchTrialInfo instance) -> cogment.TrialParameters_ - This [Callbacks](#callbacks) function will be called before any new trial is started. If None, then the parameters for the trials will come from the Orchestrator defaults and pre-trial hooks (see Cogment Orchestrator documentation). In which case the `BatchTrainer` cannot work with this batch (because the necessary trial properties cannot be set).
-   `post_trial_callback`: _async func(sample, trial_parameters, model_registry)_ - This [Callbacks](#callbacks) function will be called after the end of a trial. If None, then no call will happen at the end of trials.
-   `datalog_endpoint`: _cogment.Endpoint instance_ - Details of the connection to the Datalog that will be set for the trials.

### `start_trials(self, nb_trials)`

Method to start the batch. At least one trial must be started for the batch to run.

This will start the trials in parallel. The batch will maintain active the number of trials started by this method by starting a new trial when one ends.

-   `nb_trials`: _int_ - Number of trials to start that will be running in parallel. Any new calls of this method on a running batch will just add to the number of trials running in parallel.

Return: None

<!--
### `async all_trials(self, timeout)`

Generator method to iterate through all the trials that the batch has or is starting. If the batch is ongoing, this will wait for new trials until the end of the batch. Current limitation: No more than one task can wait for trials in an ongoing batch with a timeout > 0 (i.e. only one task can be waiting on the batch).

Parameters:

- `timeout`: _float_ - Maximum time to wait in seconds. If 0, then only already started trials will be returned. If `None`, then wait indefinitely.

Return: _generator(str)_ - A generator for the trial ids in the batch.
-->

### `pause(self)`

Method to pause the running of the batch. It stops any new trial from starting, but does not stop currently running trials. Even if all running trials end, the batch is not considered done until it is resumed, stopped or terminated.

Parameters: None

Return: None

### `resume(self)`

Method to restart a batch that was [paused](#pauseself). It resumes the starting of new trials in the batch.

Parameters: None

Return: None

### `stop(self)`

Method to stop the batch. It stops new trials from starting, and currently running trials continue to their normal end. Once all trials have ended, the batch is done.

Parameters: None

Return: None

### `terminate(self, hard=False)`

Method to terminate the batch. It stops new trials from starting, and currently running trials are terminated. The batch is then considered done.

Parameters:

-   `hard`: _bool_ - If True the trials are sent a "hard" terminate, otherwise they are sent a "soft" terminate (see Python Documentation "Controller.terminate_trial").

Return: None

### `is_running(self)`

Method to inquire whether the batch is done or not.

Parameters: None

Return: _bool_ - True if the batch is still running. I.e. there are still trials running or it is paused. False otherwise.

### `nb_trials_run(self)`

Method to inquire the number of trials run so far.

Parameters: None

Return: _int_ - Number of trials that were run (and ended) so far in the batch.

### `async wait(self, timeout)`

Method to wait for the batch to be done. The batch will end normally when all trials have run and ended. The batch can also be stopped, terminated, or encounter an error to become done.

Parameters:

-   `timeout`: _float_ - Maximum time to wait in seconds.

Return: _bool_ - True if the batch ended normally with the last trial tagged as such. False otherwise. `None` if timed out.

## class BatchTrainer

Class to help train a model on a specific batch of trials.

### `__init__(self, batch_spec, datastore, model_registry, trial_callback, max_trial_wait)`

Parameters:

-   `batch_spec`: _str_ or _dict{str:str}_ or _list[str]_ or _TrialBatch instance_ - If a string, it represents a batch ID of the trials to use for training. If a dictionary, it represents the properties of the trials to use for training. If a list, it represents the list of trial IDs to use for training. If an instance of `TrialBatch`, then the trials started by that batch will be used for training. For anything other than a `TrialBatch` instance, there is no reliable way to know if an ongoing batch has ended, therefore the trainer will have to manually be stopped or use `max_trial_wait` to stop automatically.
-   `datastore`: _cogment.Datastore instance_ - The datastore used to retrieve the samples.
-   `model_registry`: _cogment.ModelRegistry instance_ - The registry that will be passed to the callbacks.
-   `trial_callback`: same parameter as provided to [`run_simple_training`](#async-run_simple_trainingself-batch-trial_callback-actor_names).
-   `max_trial_wait`: _int_ - Maximum number of seconds to wait for a new trial. If `batch_spec` is an instance of `TrialBatch` then this wait is for new trials to be started by the batch. Otherwise, this wait if for trials that match `batch_spec` to appear in the datastore (If set to 0, then only trials already in the datastore will be used).

### `start(self, actor_names=[], actor_classes=[], actor_implementations=[], fields=[])`

Method to start training.

Parameters: Same as `cogment.Datastore.all_samples` of the same name. These parameters will be passed as-is to the datastore `all_sample` method.

Return: None

### `terminate(self)`

Method to terminate training.
The callback tasks will be cancelled.

Parameters: None

Return: None

### `async stop(self)`

Method to stop training.
Stops retrieving trials from the Datastore.
All trials already started will continue training.

Parameters: None

Return: None

### `is_running(self)`

Method to inquire whether the training is done or not.

Parameters: None

Return: _bool_ - True if the training is still running. The training has stopped running when no more samples are being retrieved and all callbacks have returned.

### `async wait(self, timeout)`

Method to wait for the training to be done.
The training will end normally when all trials of the batch have started processing and all callbacks have returned.
The training can also be stopped, or encounter an error to become done.

Parameters:

-   `timeout`: _float_ - Maximum time to wait in seconds.

Return: _bool_ - False if timed out, True otherwise. If True, then `is_running` will also return True.

## class BatchTrialInfo

`batch_id`: _str_ - ID of the batch

`trial_index`: _int_ - The index of the trial in the batch. Generally the order the trials were started, and unique in the batch (`[0, nb_trials[`).

`trial_info`: _cogment.DatastoreTrialInfo_ - The running trial information. May not always be present.

## class TrainerTrialSession

Class to help train a model on a specific batch of trials.

`trial_id`: _str_ - ID of the trial.

`parameters`: _cogment.TrialParameters instance_ - Parameters of the trial.

`model_registry`: _cogment.ModelRegistry instance_ - Common model registry for the whole batch being trained. The TrialRunner argument `model_registry_endpoint` is used to retrieve this model registry.

### `async all_samples(self)`

Method to retrieve all samples from the trial.

Parameters: None

Return: _generator(cogment.DatastoreSample instance)_ - A generator for the trial samples that arrive.

## Callbacks

### Use

These functions are passed to the [`TrialRunner.run_simple_batch`](#class-cogment_enterpriserunnertrialrunner) or [`TrialRunner.run_simple_training`](#async-run_simple_trainingself-batch-sampler_callback-actor_names) methods and will be called at specific times to request information to the user or provide information to the user.
They can be defined and used in a number of ways.

Here we take the `pre_trial_callback` as an example, but the other callbacks are similar, except for parameters and return values:

```python
async def my_pre_trial_callback(info: BatchTrialInfo):
    trial_params = cogment.TrialParameters()
    # ... Fill in the parameters here
    return trial_params

runner = TrialRunner(1, 1, None, my_pre_trial_callback)
```

Sometimes it is more convenient for the callback to be a method of a class in order to re-use data between calls, or share data with other parts of the program (or other callbacks), in this case it could look like this:

```python
class MyBatchData:
    async def my_pre_trial_callback(self, info: BatchTrialInfo):
        trial_params = cogment.TrialParameters()
        # ... Fill in the parameters here
        return trial_params

my_data = MyBatchData()
runner = TrialRunner(1, 1, None, my_data.my_pre_trial_callback)
```

Although rare, it may be inconvenient sometimes to use a class for sharing data, in which case the Python `functools` module can be used:

```python
import functools

async def my_function(my_data, info: BatchTrialInfo):
    trial_params = cogment.TrialParameters()
    # ... Fill in the parameters here
    return trial_params

shared_data = #...
actual_callback = functools.partial(my_function, shared_data)
runner = TrialRunner(1, 1, None, actual_callback)
```

### Pre-Trial Callback

This function is passed to the [`TrialRunner.run_simple_batch`](#class-cogment_enterpriserunnertrialrunner) method and will be called before any trial is started to define the trial parameters.
It is an `asyncio` coroutine.

e.g.:

```python
async def my_pre_trial_callback(info: BatchTrialInfo) -> cogment.TrialParameters:
    trial_params = cogment.TrialParameters()
    # ... Fill in the parameters here
    return trial_params
```

Parameters Received:

-   `info`: _BatchTrialInfo instance_ - Partially filled info of the trial to start; it does not contain `trial_info`.

Expected Return: _None or tuple(str, cogment.TrialParameters instance)_ - The first item of the tuple is the requested trial ID. If the trial ID is `None`, it will be automatically created using the batch ID and the trial index. The second item of the tuple is the trial parameters that must be fully populated to start the new trial. If the return value is `None` (instead of a tuple), the trial will not start and the batch will stop (i.e. not start any new trial, but ongoing trials will continue).

In case of exceptions: Exceptions raised by the callback will do the same as if `None` was returned.

Once the parameters are received by the `TrialBatch`, some data will be added, and some will be overwritten before starting the trial.
These are the `TrialParameters` attributes changed:

-   `properties`: Some properties will be added to the existing properties (see [Module Attributes](#module-attributes)). If the property names clash, the user properties will be overwritten. In general, do not start property names with an underscore to prevent such clashes.
-   `datalog_endpoint`: This attribute of the trial parameters will be overwritten. If the `datastore_endpoint` argument of `TrialRunner` is provided, it will be used. If `datastore_endpoint` was not provided, or it was `None`, then the directory will be used to find an appropriate datalog/datastore. The same datastore must be used by both the `TrialBatch` (as a datalog) and `BatchTrainer` (as a datastore), so the endpoint should resolve to the same datastore locally and at the Orchestrator (i.e. ideally use the same directory).
-   `datalog_exclude_fields`: This attribute will be reset (i.e. not excluding any fields from the datalog).

### Post-Trial Callback

This function is passed to the [`TrialRunner.run_simple_batch`](#class-cogment_enterpriserunnertrialrunner) method and will be called after a trial has ended normally (i.e. was not terminated).
It is an `asyncio` coroutine.

e.g.:

```python
async def my_post_trial_callback(info):
    # ... Do cleanup, tracking, etc
```

Parameters Received:

-   `info`: _BatchTrialInfo instance_ - The full info of the trial that ended.

Expected Return: None

In case of exceptions: All exceptions raised by the callback will be ignored.

### Sampler Callback

This function is passed to the `TrialRunner.run_simple_trainer` method and will be called for each sample of the trials being run in the batch.
This is asynchronous with the actual running of the trials and uses the Cogment Datastore to retrieve the samples.
It is an `asyncio` coroutine.

e.g.:

```python
async def my_sampler_callback(sample, trial_parameters, model_registry):
    # ... Train model
```

Parameters Received:

-   `sample`: _cogment.DatastoreSample instance_ - Trial sample received.
-   `trial_parameters`: _cogment.TrialParameters instance_ - Parameters of the trial from which the sample came from.
-   `model_registry`: _cogment.ModelRegistry instance_ - Common model registry for the whole batch being trained. The TrialRunner argument `model_registry_endpoint` is used to retrieve this model registry.

Expected Return: _None or bool_ - If `None` or True, the training will continue normally. If a bool and False, the sampler callback will stop being called, and the `BatchTrainer` will stop.

In case of exceptions: If the callback raises an exception, the `BatchTrainer` will stop at the next sample.

### Trial Callback

This function is passed to the `TrialRunner.run_simple_trial_trainer` method and will be called for each trial of the batch.
This is asynchronous with the actual running of the trials and uses the Cogment Datastore to retrieve the trial data and samples.
It is an `asyncio` coroutine.

e.g.:

```python
async def my_trial_callback(session):
    async for sample in session.all_samples():
        # ... process sample
```

Parameters Received:

-   `session`: _TrainerTrialSession instance_ - The session for the trial.

Expected Return: _None or bool_ - If `None` or True, continue processing the batch. If a bool and False, stop the `BatchTrainer`.

In case of exceptions: If the callback raises an exception, the `BatchTrainer` will stop immediately.
