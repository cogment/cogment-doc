# Cogment documentation

## Introduction

The Cogment framework is a high-efficiency, open source framework designed to enable the training of models in environments where humans and agents interact with the environment and each other continuously. It’s capable of distributed, multi-agent, multi-model training.

This is the documentation for the Cogment framework.  For further Cogment information, check out the documentation at <https://docs.cogment.ai>

## Architecture

- `mkdocs.yml` is the main configuration file for the documentation.
- `./src` contains the source for the documentation, mostly markdown file and images.

## Build & develop

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
