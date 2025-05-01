# DevX CLI Versioning Strategy

This document outlines the versioning strategy for DevX CLI.

## Semantic Versioning

DevX CLI follows [Semantic Versioning 2.0.0](https://semver.org/) (SemVer). This means that version numbers are structured as `MAJOR.MINOR.PATCH`:

- **MAJOR**: Incremented for incompatible API changes
- **MINOR**: Incremented for new functionality in a backward-compatible manner
- **PATCH**: Incremented for backward-compatible bug fixes

## Version Numbering

### Examples

- `1.0.0`: Initial stable release
- `1.1.0`: Added new features (backward-compatible)
- `1.1.1`: Bug fixes
- `2.0.0`: Breaking changes

## Release Types

### Major Releases (X.0.0)

Major releases contain significant changes that break backward compatibility. Examples include:

- Removing or renaming commands
- Changing the structure of the `.devx` file
- Modifying the behavior of existing commands in a way that could break existing workflows
- Dropping support for older Node.js versions

### Minor Releases (X.Y.0)

Minor releases add new functionality without breaking backward compatibility. Examples include:

- Adding new commands
- Adding new options to existing commands
- Adding new features to the `.devx` file format
- Enhancing plugin capabilities
- Performance improvements

### Patch Releases (X.Y.Z)

Patch releases contain backward-compatible bug fixes. Examples include:

- Fixing bugs in existing commands
- Correcting documentation errors
- Addressing security vulnerabilities
- Improving error messages

## Pre-releases

Pre-release versions may be tagged with a suffix:

- **Alpha**: `1.2.0-alpha.1` - Early development, unstable
- **Beta**: `1.2.0-beta.1` - Feature complete, testing
- **RC**: `1.2.0-rc.1` - Release candidate, final testing

## Version Management

### Updating Versions

To update the version of DevX CLI:

1. Update the version in `package.json`
2. Update the version in the CLI code (typically in `src/index.ts`)
3. Update the CHANGELOG.md file
4. Create a git tag for the new version
5. Publish to npm

### Example Commands

```bash
# Update version in package.json
npm version patch  # or minor, or major

# Create git tag
git tag -a v1.0.1 -m "Version 1.0.1"

# Push to GitHub
git push origin v1.0.1

# Publish to npm
npm publish
```

## Deprecation Policy

When features need to be deprecated:

1. Mark the feature as deprecated in the documentation
2. Add deprecation warnings in the code
3. Maintain the deprecated feature for at least one major version
4. Remove the deprecated feature in the next major version

## Long-Term Support (LTS)

DevX CLI does not currently have a formal LTS policy. Each major version will receive bug fixes and security updates until the next major version is released.

## Compatibility

### Node.js Compatibility

DevX CLI is compatible with Node.js versions as specified in the `engines` field of `package.json`. When dropping support for older Node.js versions, this will be treated as a breaking change and will result in a major version increment.

### Operating System Compatibility

DevX CLI is designed to work on all major operating systems:

- Windows
- macOS
- Linux

## Changelog

All notable changes to DevX CLI are documented in the [CHANGELOG.md](../CHANGELOG.md) file. The changelog follows the [Keep a Changelog](https://keepachangelog.com/) format.

## Version Check

DevX CLI includes a version check feature that can notify users when a new version is available. This helps ensure that users are aware of updates and can take advantage of new features and bug fixes.
