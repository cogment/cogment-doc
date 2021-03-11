# Cogment documentation

> ⚠️ 🚧 This is part of an upcoming release of cogment and still unstable.
>
> Current stable version can be found at <https://gitlab.com/cogment/cogment>

[![Browse the current version](https://img.shields.io/static/v1?label=cogment%20doc&message=curent%20version&color=blue&style=flat-square&logo=read-the-docs)](./src/index.md) [![Apache 2 License](https://img.shields.io/badge/license-Apache%202-green?style=flat-square)](./LICENSE) [![Changelog](https://img.shields.io/badge/-Changelog%20-blueviolet?style=flat-square)](./CHANGELOG.md)

## Introduction

The Cogment framework is a high-efficiency, open source framework designed to enable the training of models in environments where humans and agents interact with the environment and each other continuously. It’s capable of distributed, multi-agent, multi-model training.

This is the documentation for the Cogment framework. For further Cogment information, check out the documentation at <https://docs.cogment.ai>

## Documentation architecture

- `mkdocs.yml` is the main configuration file for the documentation.
- `./src` contains the source for the documentation, mostly markdown file and images.

## Building this documentation

### Prerequisites

The documentation is built using [**mkdocs**](https://www.mkdocs.org/) however its dependencies and build are managed using [**poetry**](https://python-poetry.org). To build and test locally follow these instructions.

1. Have a working setup for Python 3.7 or above.
2. Install poetry following the [official guidelines](https://python-poetry.org/docs/#installation)
3. In this directory, run `poetry install` to install what's needed to build the doc (including `mkdocs`).

### Running a self reloading server

```console
poetry run task dev
```

open <http://127.0.0.1:8000>

### Build

```console
poetry run task build
```
