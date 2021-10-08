# Model Registry

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--model--registry-%23ffb400?style=flat-square&logo=github)](https://github.com/cogment/cogment-model-registry) [![Latest Release](https://img.shields.io/docker/v/cogment/model-registry?label=docker%20release&sort=semver&style=flat-square)](https://hub.docker.com/r/cogment/model-registry)

<!-- prettier-ignore -->
!!! warning
    This module is only available as a prerelease. It is not yet fully documented nor stable.

Cogment Model Registry is an **out-of-the-box** component. It is a versioned key value store dedicated to the storage of AI models used in Cogment actors.

## Usage

<!-- prettier-ignore -->
!!! warning
    🚧 under construction

## Setup

Cogment Model Registry is available as a docker container on dockerhub as [`cogment/model-registry`](https://hub.docker.com/r/cogment/model-registry).

It can be launched using the following;

```console
docker run -p 9000:9000 -v $(pwd)/relative/path/to/model/archive:/data cogment/model-registry
```

If you want to provide specific configuration as environment variables use docker `-e` option.

```console
docker run -p 9000:9000 -e COGMENT_MODEL_REGISTRY_GRPC_REFLECTION=1 -v $(pwd)/relative/path/to/model/archive:/data cogment/model-registry
```

The following environment variables can be used to configure the server:

-   `COGMENT_MODEL_REGISTRY_PORT`: The port to listen on. Defaults to 9000.
-   `COGMENT_MODEL_REGISTRY_ARCHIVE_DIR`: The directory to store model archives. Docker images default to `/data`.
-   `COGMENT_MODEL_REGISTRY_SENT_MODEL_VERSION_DATA_CHUNK_SIZE`: The size of the model version data chunk sent by the server. Defaults to 5*1024*1024 (5MB).
-   `COGMENT_MODEL_REGISTRY_GRPC_REFLECTION`: Set to start a [gRPC reflection server](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md). Defaults to `false`.
