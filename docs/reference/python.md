---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Python SDK

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--py--sdk-%235217b8?style=for-the-badge&logo=github)](https://github.com/cogment/cogment-py-sdk) [![Latest release](https://img.shields.io/pypi/v/cogment?style=for-the-badge)](https://pypi.org/project/cogment/)

## Installation

The simplest way to install the python SDK is to just install it using pip: `pip install cogment`.

To install the generator (for `cog_settings.py`) it is done similarly with pip: `pip install cogment[generate]`. If both are needed, installing the generator will install the Python SDK.

The basic requirement is Python 3.7.

## General usage

### `asyncio`

The Python SDK is designed to run concurrently and asynchronously using the Python `asyncio` library. As such, it should be run in an `asyncio.Task`.

E.g.

```python
asyncio.run(MyMainFunction())
```

### Logging

The Python SDK uses the `cogment.sdk` logger, and the default log level is `INFO`. E.g. to change the log level to `WARNING`:

```python
import cogment
import logging

logging.getLogger("cogment.sdk").setLevel(logging.WARNING)
```

Or set the environment variable `COGMENT_LOG_LEVEL` to one of the values: `off`, `error`, `warning`, `info`, `debug`, `trace` (which match the respective Python levels `logging.CRITICAL`, `logging.ERROR`, `logging.WARNING`, `logging.INFO`, `logging.DEBUG`).
Since the Cogment Python SDK does not output any critical logs, the `logging.CRITICAL` level effectively turns logging off.
The `trace` level does not match a standard Python logging level and is mostly for internal use with a level lower than `logging.DEBUG`.

The Cogment logger does not define a handler, and the handler management is left to the application (as is standard for a library in Python).
Thus the Python `logging.lastResort` handler will be used if no explicit handler is defined by the application (i.e. only warnings and errors will be output to stderr, with no formatting).
The application should enable a handler as required.
E.g. for a default logging setup (including a stream handler):

```python
import cogment
import logging

logging.basicConfig()
```

:::note
Calling any of the module level functions `logging.log`, `logging.debug`, `logging.info`, `logging.warning`, `logging.error`, `logging.critical` or `logging.exception`, will implicitly call `logging.basicConfig`.
And calling `logging.basicConfig` does nothing if there is a root handler already defined.
See Python documentation for [logging.basicConfig](https://docs.python.org/3/library/logging.html#logging.basicConfig)
:::

### Trial Specifications

The specifications (specs) of a trial type are contained in a [spec file](./cogment-yaml.md) and the imported files defined in the spec file. This file is typically named `cogment.yaml`.

For example, an [actor](../guide/core-concepts.md#actors) class is defined by its required observation space and action space.

These "spaces" are defined by using protobuf message types (from the imported files). [Observations and actions](../guide/core-concepts.md#observations--actions) will simply be instances of the appropriate type.

Messages and feedback user data don't have a set type, they can be any type of protobuf message as long as the receiver can manage that type (i.e. the object received is an instance of `google.protobuf.Any` and the contained type should be checked against known types before handling). The type is determined by the provided message from the originator.

### Trial Parameters

The trial [parameters](./parameters.md) can come from the Controller `start_trial` command, from the default parameters provided to the Orchestrator on startup, or from the pre-trial hooks (themselves provided to the Orchestrator on startup).

The parameters are mostly independent of the spec file (cogment.yaml), except that the active actors listed in the parameters must have their actor class match an actor class defined in the spec file.

Below, when we refer to the trial parameters, we mean the final parameters after any pre-trial hooks.

### Compiling the spec file into cog_settings.py

In order to use the specifications within python scripts, the [spec file](#trial-specifications) needs to be compiled into python modules. This is done by the Python SDK generator (see [#installation]).

The generator is used this way:

```bash
$ python3 -m cogment.generate --spec cogment.yaml --output ./cog_settings.py
```

This will create a `cog_settings.py` specs module in the current directory (`--output ./`). The generator will also compile the imported `*.proto` files into python modules that will be saved in the same location as the specified output file (`cog_settings.py`) and they will be named according to their proto names (`*_pb2.py`).

The `cog_settings.py` Python module is required by all API entry points.

### Top-level import

The main module of the Cogment SDK is `cogment`. But all cogment scripts need to start with a `cogment.Context`, which also requires the generated module [cog_settings](#compiling-the-spec-file-into-cog_settingspy) (project specific definitions created from the spec file).

If one needs to create a `cogment.TrialParameters` or `cogment.ActorParameters` from scratch, the `cog_settings` module is also required.

```python
import cog_settings
import cogment
```

<!---
## make_logger(name, env_name=None, default_level="INFO")

Function to create a Cogment styled logger.

Parameters:

-   `name`: _str_ - Name of the logger. This is used in `logging.getLogger(name)`.
-   `env_name`: _str_ - Name of the environment variable to set this logger's log level. The environment variable will be checked when this function is called. If `None`, then the environment will not be used to set log level on this logger.
-   `default_level`: _str_ - The default logging level.

Return: _logging.Logger instance_ - Logger defined in the Cogment style (i.e. with "trace", "deprecated", etc).

--->

## class cogment.Context

Class to setup and run all the different aspects of Cogment trials.

`served_port`: _int_ - The port on which `serve_all_registered` is offering the various registered services. `None` if no services are offered (e.g. `serve_all_registered` was not called yet).

### `__init__(self, user_id, cog_settings, asyncio_loop=None, prometheus_registry=prometheus_client.core.REGISTRY, directory_endpoint=None, directory_auth_token=None)`

Parameters:

-   `user_id`: _str_ - Identifier for the user of this context.
-   `cog_settings`: _module_ - Specs module associated with trials that will be run, observed or inquired (see [cog_settings generation](#compiling-the-spec-file-into-cog_settingspy)).
-   `asyncio_loop`: _asyncio.Loop instance_ - The asyncio loop into which the Context should operate. If `None`, the current loop will be used.
-   `prometheus_registry`: _prometheus_client.core.CollectorRegistry instance_ - Prometheus registry that'll be used by the Cogment metrics in this context. Can be set to `None` to completely deactivate them. The default value is Prometheus' default global registry.
-   `directory_endpoint`: _Endpoint instance_ - Grpc endpoint (i.e. starting with "grpc://") to access the directory. The directory will be used to inquire discovery endpoints, and to register the services for discovery. If no endpoint is provided, a check for the environment variable `COGMENT_DIRECTORY_ENDPOINT` will be made and if it exists, it will be used as the URL of a basic endpoint.
-   `directory_auth_token`: _str_ - Authentication token for access to the directory. This token will be registered with the services, and must match registered tokens when inquiring the directory. If no token is provided, a check for the environment variable `COGMENT_DIRECTORY_AUTHENTICATION_TOKEN` will be made and if it exists, it will be used as the token.

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known. False otherwise. The specs are known if the `cog_settings` argument was provided and not `None`. A context instantiated without specs has limited functionality and will produce objects without specs (thus also having limited functionality).

### `async serve_all_registered(self, served_endpoint=ServedEndpoint(), prometheus_port=None, directory_registration_host=None)`

Method to start and run the communication server for the registered components (environment, actor, prehook, datalog). This coroutine will end when all activity has stopped. If a directory is defined in the Context, then this method will also register the services in the defined directory.

Parameters:

-   `served_endpoint`: _ServedEndpoint instance_ - Details of the connection for the served components. If `served_endpoint.port` is zero(0), then the system will choose a free port. The port chosen is found in the `served_port` attribute of the Context.
-   `prometheus_port`: _int_ - TCP/IP port number for Prometheus. Set to None to disable the Prometheus metrics server.
-   `directory_registration_host`: _str_ - Hostname (or IP address) of the host to register to the directory (the port is taken from the `served_endpoint`) for the services registered. If `None`, the SDK will determine the current host IP address automatically. In some circumstances, the IP address determined by the SDK may be wrong (e.g. multiple interfaces, load balancing, firewall), thus a host must be explicitly provided.

Return: None

### `async get_controller(self, endpoint=Endpoint())`

Method to get a controller instance to manage trials (start, stop, inquire, etc).

Parameters:

-   `endpoint`: _[Endpoint](#class-cogmentendpoint) instance_ - Details of the connection to the Orchestrator.

Return: _Controller instance_ - An instance of the `Controller` class used to manage trials.

### `async get_datastore(self, endpoint=Endpoint())`

Method to get a class instance to retrieve and manage data in a Datastore.

Parameters:

-   `endpoint`: _[Endpoint](#class-cogmentendpoint) instance_ - Details of the connection to the Datastore.

Return: _Datastore instance_ - An instance of the `Datastore` class.

### `async get_model_registry_v2(self, endpoint=Endpoint())`

Method to get a class instance to store and retrieve models in a Model Registry

Parameters:

-   `endpoint`: _[Endpoint](#class-cogmentendpoint) instance_ - Details of the connection to the Model Registry.

Return: _ModelRegistry instance_ - An instance of the `ModelRegistry` class.

### `async join_trial(self, trial_id, endpoint=Endpoint(), impl_name=None, actor_name=None, actor_class=None)`

Method for an actor to asynchronously join an existing trial. This task will normally end after the user implementation has exited.

Parameters:

-   `trial_id`: _str_ - The UUID of the trial to join.
-   `endpoint`: _[Endpoint](#class-cogmentendpoint) instance_ - Details of the connection to the Orchestrator.
-   `impl_name`: _str_ - **deprecated**
-   `actor_name`: _str_ - Name of the actor joining the trial. If `None`, `actor_class` will be used to find the actor to join. The name must match an active actor in the trial as found in the trial parameters in the sections `trial_params:actors:name` with `trial_params:actors:endpoint` set to "cogment://client".
-   `actor_class`: _str_ - The class of actor to join the trial. If `None`, `actor_name` will be used to find the actor to join. The class must match an active actor in the trial as found in the trial parameters in the sections `trial_params:actors:actor_class` with `trial_params:actors:endpoint` set to "cogment://client".

Return: None

### `register_environment(self, impl, impl_name, properties={})`

Method to register the asynchronous callback function that will run an environment for a trial.

Parameters:

-   `impl`: _async function(EnvironmentSession instance)_ - Callback function to be registered.
-   `impl_name`: _str_ - Name for the environment being run by the given callback function.
-   `properties`: _dict{str:str}_ : Properties associated with the environment to be registered in the directory. These properties may be used for inquiries into the directory to find this environment.

Return: None

### `register_actor(self, impl, impl_name, actor_classes=[], properties={})`

Method to register the asynchronous callback function that will run an actor for a trial.

Parameters:

-   `impl`: _async func(ActorSession instance)_ - Callback function to be registered.
-   `impl_name`: _str_ - Name for the actor implementation being run by the given callback function.
-   `actor_classes`: _list[str]_ - The actor class name(s) that can be run by the given callback function. The possible names are specified in the spec file under section `actor_classes:name`.
-   `properties`: _dict{str:str}_ : Properties associated with the actor to be registered in the directory. These properties may be used for inquiries into the directory to find this actor.

Return: None

### `register_pre_trial_hook(self, impl, properties={})`

Method to register an asynchronous callback function that will be called before a trial is started. Only one such function can be registered. But there may be multiple hook services for an Orchestrator. They are provided to the Orchestrator at startup. All hooks registered with the Orchestrator will be called in a pipeline fashion before each new trial.

Parameters:

-   `impl`: _async func(PrehookSession instance)_ - Callback function to be registered. The `PrehookSession` instance member data should be changed as needed for the new trial before returning from this function.
-   `properties`: _dict{str:str}_ : Properties associated with the hook to be registered in the directory. These properties may be used for inquiries into the directory to find this hook.

Return: None

### `register_datalog(self, impl, properties={})`

Method to register an asynchronous callback function that will be called for each trial to serve log requests. Only one such function can be registered. This service is addressed in the trial parameters in the `datalog` section.

Parameters:

-   `impl`: _async func(DatalogSession instance)_ - Callback function to be registered
-   `properties`: _dict{str:str}_ : Properties associated with the datalog to be registered in the directory. These properties may be used for inquiries into the directory to find this datalog.

Return: None

<!---

### `get_context_directory(self)`

Method to return the internal Directory instance used by the Context.
This instance connects to the directory provided when instantiating the Context (i.e. using `directory_endpoint`).

Parameters: None

Return: _Directory instance_ - And instance of the `Directory` class.

### `get_directory(self, endpoint, authentication_token=None)`

Method to return a new Directory instance.

Parameters:

-   `endpoint`: _Endpoint instance_ - Grpc endpoint (i.e. starting with "grpc://") to access the directory.
-   `directory_auth_token`: _str_ - Authentication token for access to the directory. This token will be registered with the services, and must match registered tokens when inquiring the directory.

Return: _Directory instance_ - And instance of the `Directory` class.

## class Directory

Class containing data and methods to manage directory registration, deregistration, and inquiries.

### `register_host(self, type, host, port, ssl=False, properties=None)`

### `deregister_service(self, service_id, secret)`

### `inquire_by_id(self, service_id)`

### `inquire_by_type(self, type, properties)`

### `get_inquired_endpoint(self, endpoint, type=None, properties=None)`

Utility method to return a new endpoint if one is found in the directory, or the same endpoint if not.

--->

## class Controller

Class containing data and methods to control and manage trials.

### `has_specs(self)`

Parameters: None

Return: _bool_ - Always True since the Controller does not rely on trial specs.

### `async start_trial(self, trial_config=None, trial_id_requested=None, trial_params=None)`

Method to start a new trial.
The config and parameter options are mutually exclusive.

Parameters:

-   `trial_config`: _protobuf class instance_ - Configuration for the trial. The type is specified in the spec file under the section `trial:config_type`. The config will be added to the default parameters (in the Orchestrator) and sent to the pre-trial hooks (if any). The pre-trial hooks will set the trial parameters according to the config. If there is no pre-trial hooks, the config is ignored and the default parameters are used. This cannot be provided with the `trial_params`. <!--- If this is a bytes string, it will be passed raw to the orchestrator. --->
-   `trial_id_requested`: _str_ - The trial identifier requested for the new trial. It must be unique among all active trials and a limited set of the latest ended trials (this list of trials can be retrieved with `get_trial_info` or `watch_trial`). If provided, the Orchestrator will try to use this trial_id, otherwise, a UUID will be created.
-   `trial_params`: _TrialParameters instance_ - Fully defined parameters to start the new trial. This will be used as the trial parameters (I.e. the default parameters and pre-trial hooks are ignored). This cannot be provided with the `trial_config`.

Return: _str_ - The newly started trial ID. An empty string if the trial was not started due to a non-unique requested ID.

### `async terminate_trial(self, trial_ids, hard=False)`

Method to request the end of a trial.

Parameters:

-   `trial_ids`: _list[str]_ - The trial ID(s) to request to terminate. There must be at least one ID.
-   `hard`: _bool_ - If `True`, the termination will be forced and immediate, it will not wait for any action or observation. If `False`, the trial will wait for the end of the next step, to end gracefully (i.e. wait for the next full set of actions and response observations), and the environment will have a chance to respond to an end request (an event of type ENDING).

Return: None

### `async get_trial_info(self, trial_ids)`

Method to get information about a trial.

Parameters:

-   `trial_ids`: _list[str]_ - The trial ID(s) from which to request information. If no ID is provided, returns information about all trials. Note that ended trials may only appear for a short time in this list after they have ended.

Return: _list[TrialInfo instance]_ - List of trial information, one per trial. Can be empty if no trial matches.

### `async watch_trials(self, trial_state_filters=[], full_info=False)`

Generator method to iterate, in real-time, through all trials with state matching the filters. When called, it will first iterate over the trials with current state matching the filters. Afterwards, it will wait, and yield in real-time, as trial states change and match the filters.

Parameters:

-   `trial_state_filters`: _list[cogment.TrialState]_ - List of enum values from `cogment.TrialState` for which we are interested in receiving state changes.
-   `full_info`: _bool_ - If True, all the fields of the returned `TrialInfo` will be set. Otherwise only the trial ID and state will be set.

Return: _generator(TrialInfo instance)_ - A generator for the relevant trial info.

### `async get_actors(self, trial_id)`

Method to get the list of configured actors in a trial.

Parameters:

-   `trial_id`: _str_ - The trial ID from which to request the list of actors.

Return: _list[ActorInfo instance]_ - List of actors configured in this trial.

### `async get_remote_versions(self)`

Method to get the versions from the remote Orchestrator.

Parameters: None

Return: _dict_ - The key of the dictionary is the name of the component (_str_), and the value is the version (_str_).

## class Datastore

Class containing data and methods to retrieve historical (or real-time) trial samples from a Datastore.
This class can also be used to delete trials from a Datastore.

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs.

### `async get_trials(self, ids=[], properties={})`

Method to get information about historical (or ongoing) trials in the Datastore.
This method is more efficient than `all_trials()`, but can be problematic if too many trials are to be returned.

Parameters:

-   `ids`: _list[str]_ - The trial IDs for which to request information. If no ID is provided (empty list), returns information about all trials in the Datastore.

-   `properties`: _dict{str:str}_ - Properties that must match the trial properties (see [trial parameters](./parameters.md)).

Return: _list[DatastoreTrialInfo instance]_ - List of trial information, one per trial. Can be empty if no trial matches any of the provided trial IDs and properties.

### `async all_trials(self, bundle_size=1, wait_for_trials=0, properties={}, ids=[])`

Generator method to iterate through the trials in the Datastore that match the given properties.

Parameters:

-   `bundle_size`: _int_ - Number of trials to retrieve at a time from the Datastore. This may be increased to more efficiently inquire the Datastore at the price of increased memory use.

-   `wait_for_trials`: _float_ - Number of seconds to wait for new trials (to reach bundle size). If 0, only the trials currently in the datastore will be returned.

-   `properties`: _dict{str:str}_ - Properties that must match the trial properties (see [trial parameters](./parameters.md)). If empty, all trials match.

-   `ids`: _list[str]_ - The trial IDs that are considered for retrieval. If no ID is provided (empty list), all trials are considered.

Return: _generator(DatastoreTrialInfo instance)_ - A generator for the trials in the Datastore.

### `async delete_trials(self, ids)`

Method to delete historical trials recorded in the Datastore.

Parameters:

-   `ids`: _list[str]_ - The trial IDs to remove from the Datastore.

Return: None

### `async all_samples(self, trial_infos, actor_names=[], actor_classes=[], actor_implementations=[], fields=[])`

Generator method to iterate through the samples from trials in the Datastore.
The samples can be historical (if the trial has ended) or real-time (if a trial is ongoing).

Parameters:

-   `trial_infos`: _list[DatastoreTrialInfo]_ - Trials to request samples from. These should be the info instances received from `get_trials`.

-   `actor_names`: _list[str]_ - Names of actors to consider including in the samples. If empty, all actors will be considered.

-   `actor_classes`: _list[str]_ - Actor classes to match for an actor to be included in the samples. If empty, actors in any class will be considered.

-   `actor_implementations`: _list[str]_ - Actor implementations to match for an actor to be included in the samples. If empty, actors with any implementation will be considered.

-   `fields`: _list[cogment.DatastoreFields]_ - Data fields to be filled in `DatastoreActorData` (otherwise left empty). If the list is empty, all data will be filled in.

Return: _generator(DatastoreSample instance)_ - A generator for the samples from the Datastore.

## class ModelRegistry

Class containing data and methods to store and retrieve models from a ModelRegistry.

### `has_specs(self)`

Parameters: None

Return: _bool_ - Always True since the ModelRegistry does not rely on trial specs.

### `async store_model(self, name, model, iteration_properties=None)`

Method to publish and save the model to storage in the Model Registry.
When stored, a model name will be available until explicitly deleted.

If the model name already exists, the model will be saved as a new iteration of the existing model name.
Iteration numbers start at 1 (the first model sent to the Model Registry) and increase by 1 for every new iteration.
But not all iterations may be in storage (see [publish_model](#async-publish_modelself-name-model-iteration_propertiesnone)).

Parameters:

-   `name`: _str_ - The model name to be stored.
-   `model`: _bytes_ - The data representing the model.
-   `iteration_properties`: _dict{str:str}_ - Custom information that is specific to this iteration and will be stored with it.

Return: _ModelIterationInfo instance_ - The information about the newly stored model iteration.

### `async publish_model(self, name, model, iteration_properties=None)`

Method to send a model to the Model Registry for the sole purpose of being published to other services.
This model will be transient and not saved in storage.
It will stay available in the Model Registry for a time, dependent on the Model Registry [max_cache_item](cli/model-registry.md#cache_max_items) option, then be deleted automatically.

If the model name already exists, the model will be seen as a new iteration of the existing model name.
Iteration numbers start at 0 (the first model sent to the Model Registry) and increase by 1 for every new iteration.

Parameters:

-   `name`: _str_ - The model name to be published.
-   `model`: _bytes_ - The data representing the model.
-   `iteration_properties`: _dict{str:str}_ - Custom information that is specific to this iteration.

Return: _ModelIterationInfo instance_ - The information about the newly published model iteration.

### `async retrieve_model(self, name, iteration=-1)`

Method to retrieve the data of a specific model iteration from the ModelRegistry.
Transient iterations may become unavailable at any time.

Parameters:

-   `name`: _str_ - The model name to be retrieved.
-   `iteration`: _int_ - The number of the model iteration to be retrieved. If -1, then the latest (most recent) iteration will be retrieved.

Return: _bytes_ - The model data representing the specific iteration requested. `None` if the iteration is not available (if `iteration` = -1, it means the model has no iteration available).

### `async remove_model(self, name)`

Method to delete a model (and all its stored and transient iterations) from the Model Registry.

Parameters:

-   `name`: _str_ - The model name to be removed from the Model Registry.

Return: None

### `async list_models(self)`

Method to retrieve the list of all models stored in the Model Registry.

Parameters: None

Return: _list[ModelInfo instance]_ - List of model info for all models stored in the Model Registry.

### `async list_iterations(self, model_name)`

Method to retrieve the list of all available iterations for a model in the Model Registry.

Parameters:

-   `model_name`: _str_ - The model name.

Return: _list[ModelIterationInfo instance]_ - List of iteration info for all available iterations of the model. This includes all stored iterations and all currently available transient iterations.

### `async get_iteration_info(self, name, iteration)`

Method to retrieve information about a specific model iteration.

Parameters:

-   `name`: _str_ - The model name.
-   `iteration`: _int_ - The iteration number. If -1, then information about the latest (most recent) iteration will be retrieved.

Return: _ModelIterationInfo instance_ - The information about the model iteration. `None` if the iteration is not available (if `iteration` = -1, it means the model has no iteration available).

### `async update_model_info(self, name, properties)`

Method to store or update properties associated with the model name (not specific to any iteration).

Parameters:

-   `name`: _str_ - The model name.
-   `properties`: _dict{str:str}_ - Custom information that will be stored with the model name, independently of any iteration. If the model name already has properties, they will be overwritten.

Return: None

### `async get_model_info(self, name)`

Method to retrieve information associated with the model name (not specific to any iteration).

Parameters:

-   `name`: _str_ - The model name.

Return: _ModelInfo instance_ - Info associated with the model name, independent of any iteration. `None` if the model is not found in the Model Registry.

### `async iteration_updates(self, model_name)`

Generator method to receive the information about the model iterations as they are stored or published.

Information about the latest iteration will be returned immediately, then the function will wait for new iterations to be stored or published to the Model Registry and return their information when they are made available.

Parameters:

-   `model_name`: _str_ - The model name for which to receive iteration information.

Return: _generator(ModelIterationInfo instance)_ - A generator for the model iteration information.

### `async track_latest_model(self, name, deserialize_func=None, initial_wait=0)`

Method to start automatically tracking a specific model and make the latest iteration available seamlessly.

A background task will be started (running `iteration_updates`) to track the latest model iteration and retrieve it automatically.
Multiple calls for the same model will not duplicate the background task and will point to the same underlying model.
Thus if the model is changed by a caller, all callers will see the changes (unless and until a new model is retrieved from the Model Registry).

Due to background processing and caching, this method is not thread safe and cannot be used by different async loops.
It is best used for simple cases. More complicated use-cases should explicitly use `iteration_updates`.

Parameters:

-   `name`: _str_ - The model name to track.
-   `deserialize_func`: _func(bytes)_ - Callback function to deserialize the model iteration from a `bytes` string to a user defined object instance. This is called asynchronously in the background to deserialize the raw bytes from the Model Registry, and the user object is made available in `LatestModel`. If not provided, the raw `bytes` string from the Model Registry is made available in `LatestModel` instead of a user object.
-   `initial_wait`: _int_ - Number of seconds to wait for the model name to be available in the Model Registry. The method will return once the model name is available, or raise an exception if the model name was not available within the given time. The model name being available only means that it is registered in the Model Registry, not necessarily that it has iterations; i.e. the background task may wait more for iterations to be available.

Return: _LatestModel instance_ -  An instance of the `LatestModel` class.

## class Session

Abstract class that manages aspects of a trial. Contains data and methods common to all sessions .

### `get_trial_id(self)`

Method to get the UUID of the trial managed by this session.

Parameters: None

Return: _str_ - UUID of the trial.

### `get_tick_id(self)`

Method to get the current tick id of the trial (i.e. time step).

Parameters: None

Return: _int_ - The current tick id.

### `is_trial_over(self)`

Method to inquire if the current trial has ended.

Parameters: None

Return: _bool_ - True if the trial has ended, false otherwise.

### `sending_done(self)`

Method to notify the Orchestrator that all data for the trial, from this session, has been sent. This can be called only when the session is ending. When starting the session (see `EnvironmentSession` and `ActorSession`), if the `auto_done_sending` parameter is True, this method should not be called, and if the parameter is False, it MUST be called to end the trial properly.

Parameters: None

Return: None

### `add_reward(self, value, confidence, to, tick_id=-1, user_data=None)`

Method to send a reward to one or more actors.

Parameters:

-   `value`: _float_ - Value of the reward. This will be aggregated with other rewards for the same target actor.
-   `confidence`: _float_ - Weight of this reward value in determining the final aggregated reward. Should be > 0.
-   `to`: _list[str]_ - Target(s) of reward. A list value could be the name of an actor in the trial. Or it could represent a set of actors; A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` is the name of the class as specified in the spec file).
-   `tick_id`: _int_ - The tick id (time step) for which the reward should be applied. If "-1", then the reward applies to the current time step.
-   `user_data`: _protobuf class instance_ - Extra user data to be sent with the reward. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received (packed in a `google.protobuf.Any`).

Return: None

## class EnvironmentSession(Session)

Class based on `Session`, containing session data and methods necessary to run an environment for a trial. An instance of this class is passed as an argument to the environment callback function registered with `cogment.Context.register_environment`.

`impl_name`: _str_ - Name of the implementation running this environment.

`config`: _protobuf class instance_ - User configuration received for this environment instance. Can be `None` if no configuration was provided. The type of the protobuf class is specified in the spec file in the section `environment:config_type`.

`name`: _str_ - Name of the environment this instance represents.

### `start(self, observations = None, auto_done_sending=True)`

Method to report that the environment is starting to run the trial. The method should be called before any other method in the session.

Parameters:

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The initial observations from which the environment is starting the trial. This is the same as the parameter for `self.produce_observations`. If not provided, then the first observation sent with `produce_observation` will be used to initiate the trial (note that no actions will be received until the first observation is sent).

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after `end` is called. If False, the user MUST call `sending_done` (after `end`) to end the trial properly.

Return: None

### `async all_events(self)`

Generator method to iterate over all events (actions, messages) as they are received. This will block and wait for an event.
When this generator exits, the callback function (registered with `register_environment`) should return to end the trial cleanly.
The generator will exit for various reasons indicating the termination of the trial, a loss of communication with the orchestrator, or if the generator is sent "False" (in which case the callback function does not necessarily need to exit).

Parameters: None

Return: _generator(RecvEvent instance)_ - A generator for the events that arrive. The `RecvEvent` instances received from this generator will only contain actions or messages; no observations nor rewards. When receiving actions in the event, the `self.produce_observation` method is normally used to "reply" (or `self.end` to end the trial).

### `produce_observations(self, observations)`

Method to send observations to actors. If called after receiving an event of type `EventType.ENDING`, the observation will be considered the final observation (equivalent to calling `end()`).

Parameters:

-   `observations`: _list[tuple(str, protobuf class instance)]_ - The observations to send to actors. The string in the tuple is the name of the destination actor (or "\*" for all actors). The name of the actors can be found in trial parameters under `trial_params:actors:name`. The protobuf class is the Observation Space for that actor, found in the spec file in the corresponding section `actor_classes:observation:space`.

Return: None

### `end(self, final_observations)`

Method to report the end of the environment. This will effectively end the trial. Message events can still arrive after this call.

Parameters:

-   `final_observations`: _list[tuple(str, protobuf class instance)]_ - The final observations to send to the actors. This is the same as the parameter for `self.produce_observations`.

Return: None

### `get_active_actors(self)`

Method to get the list of active actors in the trial.

Parameters: None

Return: _list[ActorInfo instance]_ - List of active actors and classes involved in this trial.

### `send_message(self, payload, to)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _protobuf class instance_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving environment to manage the class received (packed in a `google.protobuf.Any`).
-   `to`: _list[str]_ - Targets of feedback. Each value could be the name of an actor in the trial. Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.

Return: None

## class ActorSession(Session)

Class based on `Session`, containing session/trial data and methods necessary to run an actor for a trial. An instance of this class is passed as argument to the actor callback function registered with `cogment.Context.register_actor`.

`actor_class`: _str_ - Name of the class of actor this instance represents. Specified in the spec file as `actor_classes:name`.

`impl_name`: _str_ - Name of the implementation of the actor represented by this instance.

`config`: _protobuf class instance_ - User configuration received for this actor instance. Can be `None` is no configuration was provided. The type of the protobuf class is specified in the spec file in the section `actor_classes:config_type`.

`name`: _str_ - Name of the actor this instance represents.

`env_name`: _str_ - Name of the environment running the trial this actor is participating in (used to send messages to the environment).

### `start(self, auto_done_sending=True)`

Method to start the actor. This method should be called before any other method in the session.

Parameters:

-   `auto_done_sending`: _bool_ - Controls when to notify the Orchestrator that all data has been sent. If True, the session will automatically send the notification after receiving the last observation. If False, the user MUST call `sending_done` to end the trial properly.

Return: None

### `async all_events(self)`

Generator method to iterate over all events (observations, rewards, messages) as they are received. This will block and wait for an event.
When this generator exits, the callback function (registered with `register_actor`) should return to end the trial cleanly.
The generator will exit for various reasons indicating the end of the trial, a loss of communication with the orchestrator, or if the generator is sent "False".

Parameters: None

Return: _generator(RecvEvent instance)_ - A generator for the events that arrive. The `RecvEvent` instances received from this generator will not contain actions. When receiving an observation in the event, the `self.do_action` method is normally used to "reply" (if the event type is `EventType.ACTIVE`).

### `do_action(self, action)`

Method to send actions to the environment.

Parameters:

-   `action`: _protobuf class instance_ - An instance of the action space class specified in the corresponding section `actor_classes:action:space` of the spec file. If `None`, then no action space is sent (empty content) and the environment will receive a default initialized action space of the appropriate type.

Return: None

### `send_message(self, payload, to)`

Method to send a message related to the current time step (tick id).

Parameters:

-   `payload`: _protobuf class instance_ - The message data to be sent. The class can be any protobuf class. It is the responsibility of the receiving actor to manage the class received (packed in a `google.protobuf.Any`).
-   `to`: _list[str]_ - Targets of feedback. Each value could be the name of an actor in the trial, or the name of the environment (from `self.env_name`). Or it could represent a set of actors (with wildcards); A set of actors can be represented with the wildcard character "`*`" for all actors (of all classes), or "`actor_class.*`" for all actors of a specific class (the `actor_class` must match one of the classes listed in the trial parameters). Note that the wildcard does not include the environment.

Return: None

## class PrehookSession

Class containing trial parameters to define the specifics of a trial. An instance of this class is passed as argument to the pre-trial hook callback function registered with `cogment.Context.register_pre_trial_hook`. The first pre-trial hook to be called will receive the default parameters set in the Orchestrator, the following hooks will receive the parameters set by the preceding hooks.

`trial_parameters`: _TrialParameters instance_ - Parameters for the trial. Initially received with parameters from the previous hook, or default parameters from the Orchestrator if it is the first hook. Changes to this instance will be forwarded to the next hook, or to the Orchestrator if it is the last hook.

### `get_trial_id(self)`

Method to retrieve the ID of the trial.

Parameters: None

Return: _str_ - ID of the trial.

### `get_user_id(self)`

Method to retrieve the identifier of the user that started the trial.

Parameters: None

Return: _str_ - Identifier of the user that started the trial.

## class DatalogSession

Class containing session data and methods necessary to manage the logging of trial run data. An instance of this class is passed as an argument to the datalog callback function registered with `cogment.Context.register_datalog`.

`trial_id`: _str_ - UUID of the trial managed by this instance.

`user_id`: _str_ - Identifier of the user that started the trial.

`trial_parameters`: _cogment.TrialParameters instance_ - Parameters of the trial.

### `start(self)`

Method to start receiving samples.

Parameters: None

Return: None

### `all_samples(self)`

Generator method to iterate over all samples as they are received (waiting for each in turn).

Parameters: None

Return: _generator(cogment.LogSample instance)_ - A generator for the samples received.

## class cogment.Endpoint

Class enclosing the details for connecting to an Orchestrator.

`url`: _str_ - The URL where to connect to the Orchestrator.

`private_key`: _str_ - To use TLS for the connection, this must be set to the PEM-encoded private key.

`root_certificates`: _str_ - If using TLS for the connection (i.e. the `private_key` is not `None`), this can be set to the PEM-encoded root certificates. If not set and using TLS for the connection, the root certificates will be fetched from the system default location.

`certificate_chain`: _str_ - If using TLS for the connection, this can be set to the PEM-encoded certificate chain.

### `__init__(self, url="cogment://discover")`

Parameters:

-   `url`: _str_ - The URL where to connect to the Orchestrator. By default this is a discovery URL that uses the Directory to find the corresponding endpoint.

## class cogment.ServedEndpoint

Class enclosing the details for connection from an Orchestrator.

`port`: _int_ - The TCP/IP port where the service will be awaiting the Orchestrator connection.

`private_key_certificate_chain_pairs`: _list[tuple(str, str)]_ - To use TLS for incoming connections, this must be set to a list of tuples of the form (PEM-encoded private key, PEM-encoded certificate chain).

`root_certificates`: _str_ - If using TLS for the connection (i.e. `private_key_certificate_chain_pairs` is not `None`), this should be set to PEM-encoded Orchestrator root certificates that the server will use to verify Orchestrator authentication.

### `__init__(self, port=0)`

Parameters:

-   `port`: _int_ - The TCP/IP port where the service will be awaiting the Orchestrator connection. If 0, the system will choose a free port.

## class cogment.TrialState(enum.Enum)

Enum representing the various states of trials.

-   UNKNOWN: Should not be used.
-   INITIALIZING: The trial is in the process of starting.
-   PENDING: The trial is waiting for its final parameters, all the components to be ready, and the first observation.
-   RUNNING: The trial is running. 
-   TERMINATING: The trial is in the process of ending (either a request to end has been received or the last observation has been received).
-   ENDED: The trial has ended. Only a set number of ended trials will be kept (configured in the Orchestrator).

For further information on trial lifetime, check the [dedicated section](../guide/development-guide.mdx#trial-lifetime).

## class TrialInfo

Class enclosing the details of a trial.

`trial_id`: _str_ - The trial ID to which the details pertain.

`properties`: _dict{str:str}_ - User defined properties provided on trial start (see [Trial Parameters](./parameters.md#trial-parameters)).

`state`: _cogment.TrialState_ - The current state of the trial.

`env_name`: _str_ - The name of the environment running the trial.

`tick_id`: _int_ - The time step that the information relates to. Only provided from a call to `get_trial_info`.

`duration`: _int_ - The time (in nanoseconds) that the trial has run. Only provided from a call to `get_trial_info`.

## class ActorInfo

Class enclosing the details of an actor.

`actor_name`: _str_ - The name of the actor.

`actor_class_name`: _str_ - The name of the actor's class (as defined in the spec file).

## class RecvEvent

Class representing a received event (for environments and actors). It can contain any combination of data according to the receiver needs, or even be empty, but it will always have a type.

`type`: _Enum EventType_ - Type of event the enclosed data represents.

`observation`: _RecvObservation instance_ - Observation data. This can only be received by actors. `None` if not present.

`actions`: _list[RecvAction instance]_ - Action data from actors. This can only be received by the environment. The list is empty if not present.

`rewards`: _list[RecvReward instance]_ - Reward values and data. This can only be received by actors. The list is empty if not present.

`messages`: _list[RecvMessage instance]_ - Message data. The list is empty if not present.

### class cogment.EventType(enum.Enum)

Enum representing the type of an event.

-   `EventType.NONE`: Empty event. This kind of event should never be received.

-   `EventType.ACTIVE`: Normal event from an active trial. Most events will be of this type.

-   `EventType.ENDING`: Events from a trial in the process of ending. Events of this type can contain the same data as `ACTIVE` events. For the environment, the data received in `ENDING` events are the last actions/messages, and the trial is awaiting a final observation. For the actors, the data received in `ENDING` events are the final observations/rewards/messages, and no action can/need to be sent in response.

-   `EventType.FINAL`: Final event for the trial. This does not contain data. The event loop will exit after this event is delivered. This event can be ignored if nothing needs to be done before exiting the loop.

For further information on trial lifetime, check the [dedicated section](../guide/development-guide.mdx#trial-lifetime).

## class RecvObservation

Class containing the details of an observation for an actor.

`tick_id`: _int_ - The time step that the observation relates to.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970). Undefined if actor status is `ActorStatus.UNAVAILABLE`.

`observation`: _protobuf class instance_ - Observation received from the environment. The class of the observation is defined as observation space for the actor class. This is specified in section `actor_classes:observation:space` in the spec file for the appropriate/receiving actor class. Undefined if actor status is `ActorStatus.UNAVAILABLE`.

## class cogment.ActorStatus(enum.Enum)

Enum representing the status of actors.

-   `ActorStatus.UNKNOWN`: This status should never be received.

-   `ActorStatus.ACTIVE`: The actor is active and responding to observations normally.

-   `ActorStatus.UNAVAILABLE`: The (optional) actor is unavailable (typically because of a time out).

-   `ActorStatus.DEFAULT`: The (optional) actor is acting by default (responding with the default action defined in the actor parameters). The environment will not see this kind of actor because a "default" actor looks active to the environment.

## class RecvAction

Class containing the details of an action from an actor.

`tick_id`: _int_ - The time step that the action relates to.

`actor_index`: _int_ - Index of the actor in the list of all trial actors (returned by `Session.get_active_actors`).

`status`: _ActorStatus instance_ - Indicate the status of the actor.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970) for the action. Undefined if `status` is not `ActorStatus.ACTIVE`.

`action`: _protobuf class instance_ - Action from the actor which has index `actor_index` in the trial. The class of the action is defined as action space for the specific actor in the section `actor_classes:action:space` in the spec file for the appropriate actor class. Undefined if `status` is not `ActorStatus.ACTIVE`.

## class RecvMessage

Class containing a message.

`tick_id`: _int_ - The time step that the message relates to.

`receiver_name`: _str_ - Name of the receiver for the message (the name of an actor, or wildcard string).

`sender_name`: _str_ - Name of the sender of the message (the name of an actor, or the environment).

`payload`: _google.protobuf.Any instance_ - Data for a received message. The class enclosed in `google.protobuf.Any` is of the type set by the sender; It is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class RecvReward

Class containing the details of a received reward.

`tick_id`: _int_ - The tick id (time step) for which the reward should be applied.

`receiver_name`: _str_ - Name of the receiver for the reward (the name of an actor, or wildcard string).

`value`: _float_ - Value of the reward (aggregated from the sources)

### `get_nb_sources(self)`

Return the number of source rewards this reward is based upon.

Parameters: None

Return: _int_ - Number of sources.

### `all_sources(self)`

Generator method to iterate over all sources making up this reward.

Parameters: None

Return: _generator(RecvRewardSource instance)_ - A generator for the sources in the reward (simple rewards that make up this final/aggregate reward).

## class RecvRewardSource

Class containing the details of a received single source reward.

`value`: _float_ - Value of the reward from the sender.

`confidence`: _float_ - Confidence level of this reward value.

`sender_name`: _str_ - Name of the sender of this reward (the name of an actor, or the environment).

`user_data`: _google.protobuf.Any instance_ - Data for a user-specific reward format. Can be `None` if no specific data was provided. The class enclosed in `google.protobuf.Any` is of the type set by the sender; it is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class cogment.TrialParameters

Class containing the parameters of the trial (see [Trial Parameters](./parameters.md#trial-parameters)).

Any attribute can be set to `None` to reset it to its default.
Some attributes (`config` and `environment_config`) are immutable: changes to the instance received will not be reflected in `TrialParameters`, the attribute must be set with a new instance to make changes. These attributes can also return `None` if not set.

`config`: _protobuf class instance_ - The type is specified in the spec file under the section `trial:config_type`.

`config_serialized`: _bytes_ - Config in serialized (class independent) form. This can be accessed even without specs (see `has_specs()`).

`properties`: _dict{str:str}_

`max_steps`: _int_

`max_inactivity`: _int_

`nb_buffered_ticks`: _int_

`datalog_endpoint`: _str_

`datalog_exclude_fields`: _tuple(str)_

`environment_config`: _protobuf class instance_ - The type is specified in the spec file under the section `environment:config_type`.

`environment_serialized`: _bytes_ - Config in serialized (class independent) form. This can be accessed even without specs (see `has_specs()`).

`environment_name`: _str_

`environment_endpoint`: _str_

`environment_implementation`: _str_

`actors`: _list(cogment.ActorParameters)_ - The parameters for the actors. This is a list style object that implements the basic Python `list` functionality. If the actors' data is not being edited (e.g. read only parameters), the "index" of this list can be the name of an actor.

### `__init__(self, cog_settings, **kwargs)`

Parameters:

-   `cog_settings`: _module_ - Specs module associated with trials that relate to these parameters (see [cog_settings generation](#compiling-the-spec-file-into-cog_settingspy)).
-   `**kwargs`: Accepts any of the attributes as keyword to set their value on construction. E.g. `TrialParameters(settings, max_steps=1000, environment_name="level")`

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs or if a non `None` argument `cog_settings` was provided.

### `get_serialization_type(self)`

Return the type of serial data produced by `serialize` and accepted by `deserialize`. The type represents an ID dependent on [TrialParams](./grpc.md#trialparams) defined in the low level gRPC API.

Parameters: None

Return: _int_ - The type of the serialization string data. This is the type of string that is returned by `serialize`, and the only type accepted by `deserialize`; it is undefined behavior to try to deserialize the wrong type of data. This value is strictly larger than 1.

### `serialize(self)`

Return a binary string equivalent of the parameters.

Parameters: None

Return: _str_ - Serialized parameters.

### `deserialize(self, raw_string, type=None)`

Takes a serialized parameter string and sets the `TrialParameters` instance.

Parameters:

-   `raw_string`: _bytes_ - Binary string representing a serialized `TrialParameters` of type `type`.
-   `type`: _int_ - Type of serial data in `raw_string` (from `get_serialization` of the source). If `None`, the current type is assumed (i.e. this instance type matches the source type).

## class cogment.ActorParameters

Class containing the parameters for a particular actor (see [Trial Parameters](./parameters.md#trial-parameters)).

Any attribute can be set to `None` to reset it to its default.
Some attributes (`config`, `default_action`) are immutable: changes to the instance received will not be reflected in `ActorParameters`, the attribute must be set with a new instance to make changes. These attributes can also return `None` if not set.

`config`: _protobuf class instance_ - The type is specified in the spec file under the section `actor_classes:config_type` for the specific actor class of the actor.

`config_serialized`: _bytes_ - Config in serialized (class independent) form. This can be accessed even without specs (see `has_specs()`).

`class_name`: _str_ - This cannot be changed (it is a parameter of the constructor).

`name`: _str_

`endpoint`: _str_

`implementation`: _str_

`initial_connection_timeout`: _float_

`response_timeout`: _float_

`optional`: _bool_

`default_action`: _protobuf class instance_ - The type is specified in the spec file under the section `actor_classes:action:space` for the specific class of the actor.

`default_action_serialized`: _bytes_ - Action in serialized (class independent) form. This can be accessed even without specs (see `has_specs()`).

### `__init__(self, cog_settings, class_name, **kwargs)`

Parameters:

-   `cog_settings`: _module_ - Specs module associated with trials that relate to these parameters (see [cog_settings generation](#compiling-the-spec-file-into-cog_settingspy)).
-   `class_name`: _str_ - The name of the actor class for the actor. This is specific to a type of trial and must match values in the spec file under section `actor_classes:name`.
-   `**kwargs`: Accepts any of the attributes (except `class_name`) as keyword to set their value on construction. E.g. `ActorParameters(settings, class_name="some_class", name="act_name")`

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs or if a non `None` argument `cog_settings` was provided.

## class cogment.LogSample

Class containing a datalog sample.
A sample starts and ends with the arrival of new observations from the environment. The last sample will end after all components have acknowledged the end of the trial (the state of that sample will then be `TrialState.ENDED`).

Note that some of the data may not be available (`None`) if it was excluded from the sample (see datalog parameters `TrialParameters.datalog_exclude_fields`).

`out_of_sync`: _bool_ - False if it is a normal/full sample. True if it is an out-of-sync/partial sample. Out-of-sync samples do not follow the normal time step progression of the trial, they represent isolated data (typically a reward) for steps that have already past. Out-of-sync samples will be produced according to the trial parameter [nb_buffered_ticks](./parameters.md#nb_buffered_ticks).

`tick_id`: _int_ - The time step that the sample data relates to.

`state`: _cogment.TrialState_ - The state of the trial at the end of the sample period. Undefined for out-of-sync samples.

`timestamp`: _int_ - Unix style Epoch timestamp in nanoseconds (time since 00:00:00 UTC Jan 1, 1970) at the beginning of the sample period. For out-of-sync samples, this is the time the data in the sample was received.

`events`: _str_ - Description of special events that happened during the time frame of the sample. For out-of-sync samples, it may contain an explanation of the data.

### `__init__(self, params)`

Parameters:

-   `params`: _LogParams instance_ - The parameters of the trial.

### `get_serialization_type(self)`

Returns the type of serial data produced by `serialize` and accepted by `deserialize`. The type represents an ID dependent on [DatalogSample](./grpc.md#logexportersamplerequest) defined in the low level gRPC API.

Parameters: None

Return: _int_ - The type of the serialization string data. This is the type of string that is returned by `serialize`, and the only type accepted by `deserialize`; it is undefined behavior to try to deserialize the wrong type of data. This value is strictly larger than 1.

### `serialize(self)`

Returns a binary string equivalent of the sample.

Parameters: None

Return: _str_ - Serialized sample.

### `deserialize(self, raw_string)`

Takes a serialized sample string and sets the LogSample instance.

Parameters:

-   `raw_string`: _str_ - Binary string representing a serialized LogSample of the same type.

### `all_actor_names(self)`

Generator method to iterate over all actors in the trial. This information can also be retrieved from the parameters of the trial.

Parameters: None

Return: _generator(str)_ - A generator for the names of the actors in the trial.

### `get_action(self, actor)`

Retrieves the action from the actor in the sample.

Parameters:

-   `actor`: _str_ or _int_ - The name or index of the actor for which to retrieve the action. The number, index and name of actors can be retrieved from the parameters of the trial.

Return: _RecvAction instance_ - The action of the actor in the sample.

### `get_observation(self, actor)`

Retrieve the observation destined for the actor in the sample. Can be `None` (specifically for out-of-sync samples).

Parameters:

-   `actor`: _str_ or _int_ - The name or index of the actor for which to retrieve the observation. The number, index and name of actors can be retrieved from the parameters of the trial.

Return: _RecvObservation instance_ - The observation of the actor in the sample. Can be `None` (specifically for out-of-sync samples).

### `all_rewards(self)`

Generator method to iterate over all the rewards in the sample.

Parameters: None

Return: _generator(RecvReward instance)_ - A generator for the rewards in the sample.

### `all_messages(self)`

Generator method to iterate over all the messages in the sample.

Parameters: None

Return: _generator(RecvMessage instance)_ - A generator for the messages in the sample.

## class ModelInfo

Class containing information about a model name stored in the ModelRegistry.

`name`: _str_ - The model name.

`properties`: _dict{str:str}_ - Custom information associated with the model name (not specific to any iteration).

## class ModelIterationInfo

Class containing information specific to a model iteration stored in the Model Registry.

`model_name`: _str_ - The name of the model.

`iteration`: _int_ - The iteration number.

`timestamp`: _int_ - When the iteration was stored in the Model Registry. Unix epoch time in nanoseconds.

`hash`: _str_ - SHA 256 hash (encoded in base64 with standard 64 characters with padding) of the iteration's data.

`size`: _int_ - Size (in bytes) of the iteration's data.

`stored`: _bool_ - Whether the model is stored, as opposed to just being published (and therefore transient).

`properties`: _dict{str:str}_ - Custom information associated with the iteration.

## class LatestModel

Class making the latest model iteration, from the Model Registry, available on-demand.

`name`: _str_ - The name of the model.

### `async get(self)`

Method to return the latest iteration that has been downloaded in the background. This method may wait for the first iteration to be available. Once an iteration is available, this method will not be blocking.

Subsequent calls to this method may return different results according to the availability of new data.

Parameters: None

Return: _tuple(data, ModelIterationInfo instance)_ - The data can either be a `bytes` string or a user object depending on `is_deserialized()`. The second tuple item is a `ModelIterationInfo` instance containing the information of the iteration represented by the data.

### `is_deserialized(self)`

Method to check if the model iteration is deserialized automatically.

Parameters: None

Return: _bool_ - True if the model is deserialized automatically in the background, in which case the data (returned by `get`) is a user object. This user object is derived by calling `deserialize_func` (parameter of `ModelRegistry.track_latest_model`) with the raw bytes from the Model Registry. False if the data (returned by `get`) is the raw bytes retrieved from the Model Registry.

### `is_available(self)`

Method to check if an iteration is available.

Parameters: None

Returns: _bool_ - True if an iteration is available, an thus `get` will not block. False otherwise.

### `async wait_for_available(self)`

Method to wait for an iteration to be available.

Parameters: None

Returns: None

### `async wait_for_newer(self, iteration)`

Method to wait for a newer iteration to be available.
Once this method returns, the newer iteration can be retrieved with `get`.

Parameters:

-   `iteration`: _int_ - Strict lower bound for awaited model iteration. I.e. the method will wait for a model iteration that is newer, and not equal, to this.

Returns: None

## class cogment.DatastoreFields(enum.Enum)

Enum representing the various data in a `DatastoreActorData` instance

-   UNKNOWN: Should not be used.
-   OBSERVATION: The observation.
-   ACTION: The action.
-   REWARD: The aggregated reward.
-   RECEIVED_REWARDS: All the individual rewards received by the actor (`all_received_rewards` method)
-   SENT_REWARDS: All the individual rewards sent by the actor (`all_sent_rewards` method)
-   RECEIVED_MESSAGES: All the messages received by the actor (`all_received_messages` method)
-   SENT_MESSAGES: All the messages sent by the actor (`all_received_messages` method)

## class DatastoreTrialInfo

Class containing the information of a trial stored in the Datastore.

`trial_id`: _str_ - The trial id for this trial.

`user_id`: _str_ - The user ID for the trial (provided on trial start).

`trial_state`: _cogment.TrialState instance_ - The last (or current) state of the trial. This will change over time if not `TrialState.ENDED`.

`sample_count`: _int_ - The number of samples currently stored for this trial. This will change over time if the trial state is not `TrialState.ENDED`.

`parameters`: _cogment.TrialParameters instance_ - The parameters for the trial.

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs.

## class DatastoreSample

Class containing the data of a trial sample (typically representing all the data during a trial tick).

`trial_id`: _str_ - The id of the trial the data in the sample relates to.

`trial_state`: _cogment.TrialState instance_ - The state of the trial at the end of the sample period.

`tick_id`: _int_ - The step/tick at which the data in the sample was obtained.

`timestamp`: _int_ - Unix style Epoch timestamp of the start of the step/tick (in nanoseconds since 00:00:00 UTC Jan 1, 1970).

`actors_data`: _dict{str:DatastoreActorData instance}_ - Dictionary of all actors data included in the sample, indexed by actor name.

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs.

## class DatastoreActorData

Class containing the data related to an actor in a sample.

`name`: _str_ - Name of the actor.

`observation`: _protobuf class instance_ - Observation received by the actor. The class of the observation is defined as observation space for the actor class. This is specified in section `actor_classes:observation:space` in the spec file for the appropriate actor class.

`observation_serialized`: _bytes_ - Observation received by the actor in serialized (class independent) form. This can be retrieved even without specs (see `has_specs()`).

`action`: _protobuf class instance_ - Action from the actor. The class of the action is defined as action space for the specific actor in the section `actor_classes:action:space` in the spec file for the appropriate actor class.

`action_serialized`: _bytes_ - Action from the actor in serialized (class independent) form. This can be retrieved even without specs (see `has_specs()`).

`reward`: _float_ - The aggregated reward received by the actor in the sample.

### `has_specs(self)`

Parameters: None

Return: _bool_ - True if the specs are known by this instance. False otherwise. Specs will be known if the top level Cogment Context has specs.

### `all_received_rewards(self)`

Generator method to iterate over all the individual rewards received by the actor in the sample.
The aggregated reward is calculated from these.

Parameters: None

Return: _generator(DatastoreReward instance)_ - A generator for the individual actor rewards received.

### `all_sent_rewards(self)`

Generator method to iterate over all the individual rewards sent by the actor in the sample.

Parameters: None

Return: _generator(DatastoreReward instance)_ - A generator for the individual actor rewards sent.

### `all_received_messages(self)`

Generator method to iterate over all the messages received by the actor in the sample.

Parameters: None

Return: _generator(DatastoreMessage instance)_ - A generator for the messages received.

### `all_sent_messages(self)`

Generator method to iterate over all the messages sent by the actor in the sample.

Parameters: None

Return: _generator(DatastoreMessage instance)_ - A generator for the messages sent.

## class DatastoreReward

Class containing the data for an individual reward in the Datastore.

`value`: _float_ - Value of the reward.

`confidence`: _float_ - Confidence level of the reward value.

`sender`: _str_ - Name of the sender of the reward.

`receiver`: _str_ - Name of the receiver of the reward. The string could contain wildcard characters to represent multiple receivers intended by the sender.

`user_data`: _google.protobuf.Any instance_ - Data for a user-specific reward format. Can be `None` if no specific data was provided. The class enclosed in `google.protobuf.Any` is of the type set by the sender; it is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).

## class DatastoreMessage

Class containing the data of a message in the Datastore.

`sender`: _str_ - Name of the sender of the message.

`receiver`: _str_ - Name of the receiver of the message. The string could contain wildcard characters to represent multiple receivers intended by the sender.

`payload`: _google.protobuf.Any instance_ - Data for a received message. The class enclosed in `google.protobuf.Any` is of the type set by the sender; It is the responsibility of the receiver to manage the data received (i.e. determine the type and unpack the data).
