# cogment-doc

[![Browse the published version](https://img.shields.io/static/v1?label=cogment%20doc&message=published%20version&color=blue&style=flat-square&logo=read-the-docs)](https://docs.cogment.ai) [![Browse in the repository](https://img.shields.io/static/v1?label=cogment%20doc&message=repository&color=blue&style=flat-square&logo=read-the-docs)](./src/index.md) [![Apache 2 License](https://img.shields.io/badge/license-Apache%202-green?style=flat-square)](./LICENSE) [![Changelog](https://img.shields.io/badge/-Changelog%20-blueviolet?style=flat-square)](./CHANGELOG.md)

[Cogment](https://cogment.ai) is an innovative open source AI platform designed to leverage the advent of AI to benefit humankind through human-AI collaboration developed by [AI Redefined](https://ai-r.com). Cogment enables AI researchers and engineers to build, train and operate AI agents in simulated or real environments shared with humans. For the full user documentation visit <https://docs.cogment.ai>

This is the documentation for the Cogment framework. For further Cogment information, check out the documentation at <https://docs.cogment.ai>

## Documentation architecture

- `mkdocs.yml` is the main configuration file for the documentation.
- `./src` contains the source for the documentation, mostly markdown file and images.

## Developers

### Prerequisites

The documentation is built using [**MkDocs**](https://www.mkdocs.org/) and [**Material for MkDocs**](https://squidfunk.github.io/mkdocs-material/). Its dependencies and build are managed using [**poetry**](https://python-poetry.org). To build and test locally follow these instructions.

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

### Release process

People having mainteners rights of the repository can follow these steps to release a version **MAJOR.MINOR.PATCH**. The versioning scheme follows [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

1. Run `./scripts/create_release_branch.sh MAJOR.MINOR.PATCH` to create the release branch and update the version of the package,
2. On the release branch, check and update the changelog if needed and make sure everything's fine on CI,
3. Run `./scripts/tag_release.sh MAJOR.MINOR.PATCH` to create the specific version section in the changelog, merge the release branch in `main`, create the release tag and update the `develop` branch with those.

The rest, publishing to https://docs.cogment.ai and updating the mirror repositories, is handled directly by the CI.
