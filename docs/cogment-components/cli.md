---
title: CLI
sidebar_position: 1
---

# Command Line Interface (CLI)

[![Repository](https://img.shields.io/badge/repository-cogment%2Fcogment--cli-%23ffb400?style=flat-square&logo=github)](https://github.com/cogment/cogment-cli) [![Latest GitHub release](https://img.shields.io/github/v/release/cogment/cogment-cli?label=release&sort=semver&style=flat-square)](https://github.com/cogment/cogment-cli/releases)

Cogment CLI is the **out-of-the-box** entry point to use Cogment. It provides a set of tools to initialize a Cogment project and run the code generations phase.

# Commands

## copy

---

Copy all files in a list into all folders in that list, supports glob

Example:

```bash
cogment copy spec.yaml *.proto environment agent web-client
```

## init

---

Initializes a cogment project, this will ask you a few questions about what should be included in the generated project

Example:

```bash
cogment init my_new_project
```

A full tutorial on how to bootstrap a project can be found [here](../cogment/tutorial/1-bootstrap-and-data-structures.md)

## run

---

Runs a command from the `commands:` section of the cogment.yaml file in the current directory.

Example:

```bash
cogment run generate
```

An explanation of the cogment.yaml file can be found [here](../cogment/cogment-api-reference/cogment-yaml.md)
