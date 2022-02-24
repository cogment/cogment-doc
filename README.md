# cogment-doc

[![Browse the published version](https://img.shields.io/static/v1?label=cogment%20doc&message=published%20version&color=blue&style=flat-square&logo=read-the-docs)](https://docs.cogment.ai) [![Browse in the repository](https://img.shields.io/static/v1?label=cogment%20doc&message=repository&color=blue&style=flat-square&logo=read-the-docs)](./src/index.md) [![Apache 2 License](https://img.shields.io/badge/license-Apache%202-green?style=flat-square)](./LICENSE) [![Changelog](https://img.shields.io/badge/-Changelog%20-blueviolet?style=flat-square)](./CHANGELOG.md)

[Cogment](https://cogment.ai) is an innovative open source AI platform designed to leverage the advent of AI to benefit humankind through human-AI collaboration developed by [AI Redefined](https://ai-r.com). Cogment enables AI researchers and engineers to build, train and operate AI agents in simulated or real environments shared with humans. For the full user documentation visit <https://docs.cogment.ai>

This is the documentation for the Cogment framework. For further Cogment information, check out the documentation at <https://docs.cogment.ai>

## Documentation architecture

This website is built using [Docusaurus 2](https://docusaurus.io/), the styling framework is [infima](https://infima.dev):

-   `docusaurus.config.js` is the main configuration file for the documentation.
-   `./docs` contains the source for the documentation, mostly markdown file and images.
-   `./src` contains the source for the other pages.

## Developers

### Prerequisites

1. Have a working setup for Node 14 or above.
2. In this directory, run `npm install` to install what's needed to build the doc.

### Running a self reloading server

```console
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
npm run build
```

### Formatting

This project is formatted using prettier. Most editors have support for it. The only requirement is a working Node.js environment. For further information, refer to <https://prettier.io>.

To run a check manually:

```console
npm run lint
```

To fix all the files automatically

```console
npm run task lint_fix
```
