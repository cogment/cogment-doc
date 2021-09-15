# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

-   Update installation instructions.

### Fixed

-   Fix example on reward consuming in the API guide.

## v1.3.0 - 2021-08-03

### Added

-   Citation guidelines for research work using Cogment.

### Fixed

-   Fix name of hook session actor dictionary key `actor_class`.
-   Fix access name for `DatalogSample`.

## v1.2.1 - 2021-07-07

### Fixed

-   Fix broken link to `TrialParams` and `DatalogSample` documentation.
-   Documentation for `OnLogSample`
-   Various improvements to the low level API pages

## v1.2.0 - 2021-06-22

### Added

-   Documentation page for metrics & dashboard
-   Documentation for `TrialData` (in `DatalogSample`)

### Changed

-   Documenting the new `prometheus_registry` parameter in the `cogment.Context` constructor.

### Fixed

-   Corrected lots of typos and sentences constructions.

## v1.1.0 - 2021-05-31

### Added

-   Use mkdocs material theme
-   Add Google analytics tracking id

### Changed

-   Update generated website metadata
-   Make outbound links open in a new window
-   Use Cogment official color scheme
-   Use Cogment official font

### Fixed

-   Fix the edit URI link
-   Fix broken links in the grpc reference, tutorial 7 and the api guide
-   Hide unfinisehd parts of the documentation

## v1.0.0 - 2021-05-11

### Added

-   Add current limitations
-   Add tutorial 7 showing how to implement a trained actor implementation

### Fixed

-   Add missing links to tutorial 6.

## v1.0.0-beta3 - 2021-04-27

### Added

-   Integrate
    [@cogment/cogment-js-sdk docs](https://github.com/cogment/cogment-js-sdk)

### Changed

-   Update for latest Python SDK changes (incl. Datalog related features, Controller's `get_trial_info` and `get_actors`)

### Fixed

-   Fix internal documentation releases

## v1.0.0-beta1 - 2021-04-08

### Added

-   Add section related to Controller in the api guide.

### Changed

-   The documentation `main` branch is now continuously published to https://docs.cogment.ai.
-   Update the tutorials to use `controller.watch_trials` and the new `Recv...` classes.

### Fixed

-   Fix typos and grammar errors in the core concept page.

## v1.0.0-alpha1 - 2021-03-11

-   Initial alpha release.
