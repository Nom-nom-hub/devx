# Changelog

All notable changes to the DevX CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2023-11-15

### Added
- Core CLI commands: `init`, `run`, `validate`, `info`, `list`
- YAML configuration file format (`.devx`)
- Script and task execution
- Plugin system with lifecycle hooks
- Environment variable support
- VS Code extension integration with `install-extension` command
- Documentation
- Example plugins and configurations

### Changed
- N/A (initial release)

### Deprecated
- N/A (initial release)

### Removed
- N/A (initial release)

### Fixed
- N/A (initial release)

### Security
- N/A (initial release)

## [1.0.1] - Unreleased

### Added
- Enhanced documentation with examples and workflows
- Versioning strategy documentation

### Changed
- Updated repository URLs in package.json
- Renamed VS Code extension from "DevX Icon Theme" to "DevX File Icon"

### Fixed
- Non-interactive mode for the `init` command
- VS Code extension to only change icons for `.devx` files
