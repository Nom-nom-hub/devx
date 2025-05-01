# DevX CLI Commands

This document provides detailed information about all available DevX CLI commands.

## Overview

DevX CLI provides the following commands:

- `init`: Initialize a new `.devx` file
- `run`: Execute a script or task
- `validate`: Validate the `.devx` file
- `info`: Display project information
- `list`: List available scripts and tasks
- `install-extension`: Install the VS Code extension

## init

The `init` command creates a new `.devx` file in the current directory.

### Usage

```bash
devx init [options]
```

### Options

- `-f, --force`: Force overwrite if `.devx` file already exists
- `-y, --yes`: Skip prompts and use default values
- `--project-name <name>`: Set the project name
- `--project-type <type>`: Set the project type (web, api, cli, library, generic)
- `--language <language>`: Set the primary language (node, python, go, rust, other)

### Examples

```bash
# Interactive initialization
devx init

# Force overwrite existing .devx file
devx init --force

# Non-interactive initialization with custom values
devx init --yes --project-name "my-app" --project-type "web" --language "node"
```

## run

The `run` command executes a script or task defined in the `.devx` file.

### Usage

```bash
devx run <script|task>
```

### Examples

```bash
# Run a script
devx run build

# Run a task
devx run deploy
```

### Notes

- If a name exists as both a script and a task, the script will be executed.
- The command will fail if the specified script or task doesn't exist.
- Environment variables defined in the `.devx` file will be available to the script or task.

## validate

The `validate` command checks the `.devx` file for errors.

### Usage

```bash
devx validate
```

### Examples

```bash
devx validate
```

### Notes

- Validation checks the structure of the `.devx` file against the expected schema.
- Plugins can add additional validation rules through the `onValidate` hook.
- The command will exit with a non-zero status code if validation fails.

## info

The `info` command displays information about the project from the `.devx` file.

### Usage

```bash
devx info
```

### Examples

```bash
devx info
```

### Notes

- The command displays project metadata, available scripts, tasks, environment variables, and plugins.
- Plugins can add additional information through the `onInfo` hook.

## list

The `list` command displays all available scripts and tasks defined in the `.devx` file.

### Usage

```bash
devx list
```

### Examples

```bash
devx list
```

### Notes

- The command shows the name and description (if available) for each script and task.
- For scripts, the command to be executed is shown.
- For tasks, the description or command is shown.

## install-extension

The `install-extension` command installs the DevX File Icon extension for VS Code.

### Usage

```bash
devx install-extension
```

### Examples

```bash
devx install-extension
```

### Notes

- This command requires VS Code to be installed and accessible from the command line.
- The extension adds a custom icon for `.devx` files in VS Code.
- No additional configuration is required after installation.

## Global Options

These options are available for all DevX CLI commands:

- `--help`: Display help information for the command
- `--version`: Display the version of DevX CLI

### Examples

```bash
# Display help for the init command
devx init --help

# Display the version of DevX CLI
devx --version
```

## Exit Codes

DevX CLI uses the following exit codes:

- `0`: Success
- `1`: General error
- `2`: Invalid command or options
- `3`: Validation error

## Environment Variables

DevX CLI respects the following environment variables:

- `DEBUG`: When set to any value, enables debug logging
- `NODE_ENV`: Affects the default environment for some commands
