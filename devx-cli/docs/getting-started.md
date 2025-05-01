# Getting Started with DevX CLI

This guide will help you get started with DevX CLI, a TypeScript-based CLI tool for project management and task execution.

## Installation

### Global Installation (Recommended)

To install DevX CLI globally, run:

```bash
npm install -g @devx-cli/devx
```

This will make the `devx` command available system-wide.

### Local Installation

To install DevX CLI as a project dependency:

```bash
npm install --save-dev @devx-cli/devx
```

When installed locally, you can run DevX CLI using npx:

```bash
npx devx <command>
```

### Verifying Installation

To verify that DevX CLI is installed correctly, run:

```bash
devx --version
```

This should display the current version of DevX CLI.

## Basic Usage

DevX CLI uses a `.devx` configuration file to define project metadata, scripts, tasks, and more. Here are the basic commands:

```bash
# Initialize a new .devx file
devx init

# Run a script or task
devx run <script|task>

# Validate the .devx file
devx validate

# Display project information
devx info

# List available scripts and tasks
devx list

# Install the VS Code extension for .devx files
devx install-extension
```

## Quick Start Guide

### 1. Initialize a New Project

Create a new directory for your project and initialize it with DevX:

```bash
mkdir my-project
cd my-project
devx init
```

This will create a `.devx` file with default settings. You'll be prompted for project information such as name, type, and language.

For non-interactive environments, you can use the `--yes` flag:

```bash
devx init --yes --project-name "my-project" --project-type "web" --language "node"
```

### 2. Customize Your .devx File

Open the generated `.devx` file and customize it for your project:

```yaml
project:
  name: "my-project"
  type: "web"
  language: "node"
  version: "1.0.0"

scripts:
  start: "npm start"
  build: "npm run build"
  test: "npm test"

tasks:
  - name: "deploy"
    run: "bash scripts/deploy.sh"
    description: "Deploy the application to production"

env:
  NODE_ENV: "development"
  PORT: "3000"
```

### 3. Run Scripts and Tasks

Run scripts and tasks defined in your `.devx` file:

```bash
# Run a script
devx run build

# Run a task
devx run deploy
```

### 4. Install the VS Code Extension

To enhance your experience with `.devx` files in VS Code, install the DevX File Icon extension:

```bash
devx install-extension
```

This will add a custom icon for `.devx` files in VS Code.

## Next Steps

- Learn more about the [.devx file format](./configuration.md)
- Explore available [commands](./commands.md)
- Discover how to use [plugins](./plugins.md)
- Check out common [workflows](./workflows.md)

For more detailed information, refer to the specific documentation sections.
