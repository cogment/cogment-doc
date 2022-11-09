---
title: Client
sidebar_position: 2
---

# Trial Datastore Client

:::caution
This module is still in active development and should be considered a prerelease version.
:::

The Trial Datastore client provides command line access to some features of the [Trial Datastore](#service), and in general any service implementing the [Trial Datastore API](../../grpc.md#trial-datastore-api).

It is called this way:

```bash
$ cogment client trial_datastore --endpoint="grpc://trial_datastore:9003" [command]
```

The Trial Datastore client has the following commands:

-   [`list_trials`](#listtrials-command) to list trials stored in the Trial Datastore,
-   [`delete_trials`](#deletetrials-command) to delete trials from the Trial Datastore,
-   [`export`](#export-command) to export trials and their samples from the Trial Datastore,
-   [`import`](#import-command) to import trials and their samples to the Trial Datastore.

### Common options

A few configuration options are shared by the different commands, they can be specified either through the command line or environment variables.

#### `endpoint`

The [gRPC endpoint](../../parameters.md#grpc-scheme) of the target Trial Datastore.

Can be specified as:

-   a command line option, e.g. `--endpoint="grpc://10.0.123.5:9003"`,
-   an environment variable, e.g. `COGMENT_TRIAL_DATASTORE_ENDPOINT=grpc://trial_datastore:9003`,
-   its default value is `grpc://localhost:9003` (which is the default when running `cogment services trial_datastore` locally).

#### `timeout`

The maximum duration for the execution of the request. The duration should be specified as a sequence of numbers followed by a unit suffix: "300ms", "1.5h" or "2h45m" are valid timeouts. Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".

Can be specified as:

-   a command line option, e.g. `--timeout=1m`,
-   an environment variable, e.g. `COGMENT_CLIENT_TIMEOUT=90s`,
-   its default value is 30 seconds.

#### `console_output`

The format for what the command outputs to `stdout`. Can be either set to:

-   `text`, for human consumption, this output usually only includes partial information to ensure readability,
-   `json`, for consumption through scripts, we recommend using a tool like [`jq`](https://stedolan.github.io/jq/) to parse and manipulate it.

Can be specified as:

-   a command line option, e.g. `--console_output=json`,
-   an environment variable, e.g. `COGMENT_CLIENT_CONSOLE_OUTPUT=text`,
-   its default value is `text`.

### `list_trials` command

`list_trials` can be used to list the trials stored in a Trial Datastore.

It can be called this way:

```bash
$ cogment client trial_datastore --endpoint="grpc://trial_datastore:9003" list_trials --count 20
```

In addition to the [shared configuration](#shared-configuration), `list_trials` can be configured with the following options.

#### `count`

The maximum number of trials to retrieve.

Can be specified as:

-   a command line option, e.g. `--count=45`,
-   its default value is 10.

#### `from`

The handle of the first trial to be retrieved: leave empty to retrieve a first page of results, for subsequent ones, set it to the _next trial handle_ retrieved alongside the previous page.

Can be specified as:

-   a command line option, e.g. `--from=23`,
-   it has no default value (which will retrieve the first page of results)

#### Command output

The `text` output of `list_trials` is an array listing the following information for each trial.

-   _trial id_: the unique ID of the trial.
-   _user id_: the ID of the user that started or imported the trial.
-   _state_: the [trial state](../../grpc.md#trialstate) for the last stored sample.
-   _samples_: the number of samples received for this trial.
-   _actors_: the number of actors involved in this trial.

The number of retrieved trials and the _next trial handle_ are also printed.

The `json` output of `list_trials` is an instance of [`cogmentAPI.RetrieveTrialsReply`](../../grpc.md#retrievetrialsreply) serialized in [JSON](https://developers.google.com/protocol-buffers/docs/proto3#json).

### `delete_trials` command

`delete_trials` can be used to delete trials stored in a Trial Datastore.

It can be called this way:

```bash
$ cogment client delete_trials --endpoint="grpc://trial_datastore:9003" delete_trials <trial_id1> [...]
```

#### Command output

The `text` output of `delete_trials` is a human readable summary of the operation.

The `json` output of `delete_trials` is an object holding:

-   `"message"` a human readable summary,
-   `"trial_ids"` the list of deleted trial IDs (this also includes the trial IDs that didn't exist).

### `export` command

`export` can be used to export the samples of multiple trials.

It can be called this way:

```bash
$ cogment client trial_datastore --endpoint="grpc://trial_datastore:9003" export <trial_id1> [...] --file="data.dump"
```

In addition to the [shared configuration](#shared-configuration), `export` can be configured with the following options.

#### `file`

Path to the file where the data will be exported. If none is provided the same export is written to `stdout` and no summary output is generated.

Can be specified as:

-   a command line option, e.g. `--file="./path/to/data.dump"`,
-   it has no default value.

The output format is binary, it is composed of the following:

-   A [16 bytes _magic_ string](https://en.wikipedia.org/wiki/File_format#Magic_number) used for file identification, its current value is `COGMENTTRIALS001`,
-   A [`cogmentAPI.TrialSamplesFileHeader`](../../grpc.md#trialsamplesfileheader) protobuf message defining some metadata as well as the parameters of the trials exported in the file,
-   A list of [`cogmentAPI.StoredTrialSample`](../../grpc.md#storedtrialsample) protobuf messages defining the samples.

:::note

Protobuf messages are stored in the file as:

1. the size of the serialized message, as a 32 bits unsigned integer encoded in little endian,
2. the serialized message.

:::

#### Command output

The `text` output of `export` is a human readable summary of the operation.

The `json` output of `export` is an object holding:

-   `"message"`, a human readable summary.
-   `"bytes"`, the size of the output file, in bytes,
-   `"trial_ids"`, the list of the exported trial IDs,
-   `"filepath"`, the path to the output file,

:::note

If the [`--file`](#file) option is not provided, only the binary content is outputed, no other command output is printed.

:::

### `import` command

`import` can be used to import multiple trials and their samples from a previously [exported](#export-command) source.

It can be called this way:

```bash
$ cogment client trial_datastore --endpoint="grpc://trial_datastore:9003" import --file="data.dump"
```

In addition to the [shared configuration](#shared-configuration), `import` can be configured with the following options.

#### `file`

Path to the file from which the data will be imported. If none is provided the import reads from `stdin`.

Can be specified as:

-   a command line option, e.g. `--file="./path/to/data.dump"`,
-   it has no default value.

The input file format is expected to match the [`export`'s](#file).

#### `prefix`

Prefix to apply to the ID of trials present in the file. This option is useful to prevent ID conflicts as each trial ID needs to be unique.

Can be specified as:

-   a command line option, e.g. `--prefix="2022-08-08-import-"`,
-   it has no default value.

#### `user_id`

The User ID to use for the imported trials.

Can be specified as:

-   a command line option, e.g. `--user_id="Jane Doe"`,
-   its default value is `"cogment CLI"`.

#### Command output

The `text` output of `import` is a message specifying the number of imported trials, the input file path and the number of imported samples.

The `json` output of `import` is an object holding:

-   `"message"`, a human readable summary.
-   `"samples_count"`, the number of imported samples,
-   `"trials"`, a list containing an object for each trial defining,
    -   `"trial_id"`, the trial ID,
    -   `"samples_count"`, the number of imported samples for this trial,
-   `"filepath"`, the path to the input file,
