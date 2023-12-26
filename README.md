<p align="center">
  <a target="_blank" href="https://mojaloop.io">
    <img src="./assets/mojaloop_logo.png"/>
  </a>
</p>

Mojaloop aims at creating payment platforms that are interoperable, connecting digital financial service providers and customers by providing specifications, standards and open-source software.

[![Git Releases](https://img.shields.io/github/v/release/mojaloop/helm?label=helm%20version)](https://github.com/mojaloop/helm/releases)
[![License](https://img.shields.io/badge/Licence-Apache%202.0-orange.svg)](./LICENSE.md)

## Documentation
- [Official Mojaloop Documentation](https://docs.mojaloop.io/documentation)
- [Mojaloop Specification](https://github.com/mojaloop/mojaloop-specification)
- [Developer Onboarding Guide](./onboarding.md)
- [Deploy Mojaloop On Kubernetes](https://docs.mojaloop.io/documentation/deployment-guide/)
- [Mojaloop Business Documentation](https://docs.mojaloop.io/mojaloop-business-docs/)

## Contact

[Slack](https://slack.com) is the best way to keep in touch with the Mojaloop Community. Sign up for your Mojaloop Slack account [here](https://mojaloop.slack.com).

__Channels:__
- `#announcements` - Announcements for new Releases and QA Status
- `#design-authority`- Questions + Discussion around Mojaloop Design
- `#general` - General discussion about Mojaloop
- `#help-mojaloop` - Ask for help with installing or running Mojaloop
- `#ml-oss-bug-triage` - Discussion and triage for new bugs and issues

## Contributing

Refer to the [Contributors guide](https://docs.mojaloop.io/documentation/contributors-guide/) to get started making contributions.

You may also want to read:
- [Mojaloop Github Project](https://github.com/mojaloop/project)
  > _note: You must install the [ZenHub extension](https://www.zenhub.com/extension) in order to see the Project Kanban Board_
- [Developer Onboarding Guide](./onboarding.md)

If you have any trouble getting started, or want to know where to start, reach out to us on the `#help-mojaloop` channel in [Slack](https://mojaloop.slack.com)!

### Mojaloop Repositories

Refer to the [Mojaloop Repository Overview](https://docs.mojaloop.io/documentation/repositories/) for a detailed breakdown of each Mojaloop Repository in development.

As a quick reference, some of the most important repositories for contributors are:

- [central-ledger](https://github.com/mojaloop/central-ledger) - Core Service in charge of managing transfers between DFSPs
- [ml-api-adapter](https://github.com/mojaloop/ml-api-adapter) - Translation layer to convert to/from Mojaloop API to an internal format that is used in Central Services Stack.
- [account-lookup-service](https://github.com/mojaloop/account-lookup-service) - A service for managing party accounts across a Mojaloop environment
- [helm](https://github.com/mojaloop/helm) - The Helm chart development for deploying Mojaloop on Kubernetes
- [Testing Toolkit](https://github.com/mojaloop/ml-testing-toolkit) - The swiss army knife of testing Mojaloop and DFSP APIs
- [project](https://github.com/mojaloop/project) - The Mojaloop Project issue tracker and Kanban board

### Creating New Issues

We use the [mojaloop/project](https://github.com/mojaloop/project) repository as an issue tracker for all repositories across the Mojaloop Project.

When creating a new issue, select from the issue templates provided [here](https://github.com/mojaloop/project/issues/new/choose)


## Support from the wider community

Special thanks to all the organizations and individuals who have supported this Open-Source effort.

>_This list (in alphabetical order) is by no means exhaustive and complete. Please raise a Pull Request if you believe your Organization should be included in this list._

- [Bill & Melinda Gates Foundation](https://www.gatesfoundation.org/)
- [Coil](https://coil.com/)
- [Crosslake](https://crosslaketech.com/)
- [Fintech Inversiones](http://www.fintechinversiones.com.py)
- [Google LLC](https://opensource.google/)
- [Modusbox](http://modusbox.com/)
- [![pullreminders](https://pullreminders.com/badge.svg)](https://pullreminders.com?ref=badge)


## Project Tracking

We use a unified [scrum or kanban board](https://github.com/mojaloop/project#zenhub) for tracking issues across all Mojaloop Projects.

## Can't see the Scrum Board?

This repo relies on the [Zenhub Browser Extension](https://www.zenhub.com/extension) in order to see Github issues in a scrum board.

You should be able to see the _"ZenHub"_ tab in the top bar. If not, go through the following steps to see the kanban board:

> _Note:_ In order to add __mojaloop__ to your Zenhub workspaces, you need your Github account be added to the Mojaloop project. If you believe you should be added, contact us on the [Mojaloop Slack](https://mojaloop.slack.com).

1. Go to the [Zenhub Login Page](https://app.zenhub.com/login) and log in to Zenhub with your Github account
2. Connect your new Zenhub account with the Mojaloop Organisation, Search for the _'project'_ workspace
3. Install the [Zenhub Browser extension](https://www.zenhub.com/extension) for Chrome or Firefox, and reload this page. You should now see the following: 

<img src="./assets/zenhub_tabs.png" height="100%" width="90%">

## Templates, Labels and Pipelines
1. Please use the available templates for bugs or feature requests (epics, stories). There are [templates for bugs and stories](https://github.com/mojaloop/project/issues/new/choose).
2. Please use appropriate labels as applicable (epic or story) along with the work-stream that it belongs to (example: 'oss-core' for core related issues, 'oss-ver' for versioning work-stream, 'oss-perf' for performance work-stream and so on.)
3. The pipelines are intended to give a view of the movement of stories and epics. <br>
3.1. **Product Backlog Epics** - All Epics that span more than one Program Increment (PI) are included under this pipeline as long as they're active.<br>
3.2. **Product Backlog** - All stories, bugs are included in this by default if they cannot be assigned to the current or a particular PI.<br>
3.3. **PI Backlog Epics** - All Epics that span a single (PI) and are prioritized for the current PI are included under this pipeline until they're closed.<br>
3.4. **PI Backlog** - All stories, bugs are included for the current PI are included in this until they're prioritized for a particular Sprint.<br>
3.5. **Sprint Backlog** - Once stories, epics are prioritized for a Sprint by a work-stream, they can be moved to the Sprint backlog.<br>
3.6. **Blocked** - Stories, bugs relevant to the current PI and are blocked because of an immediate work-item/issue are present in this pipeline.<br>
3.7. **In Progress** - All issues that are currently being worked on are present in this pipeline. Ideally by now all stories, bugs should have an assigned milestone, an estimate, an Epic, proper labeling and acceptance criteria.<br>
3.8. **Review** - Stories, bugs once completed and ready for review are moved to this pipleline to be reviewed by Product Owner, etc. before moving to the closed pipleine.<br>
3.9. **Closed** - All Epics, Stories, bugs once completed are moved to the Closed pipeline (issues closed by default are also moved to this).<br>
