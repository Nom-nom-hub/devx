# DevX File Format

The `.devx` file is a YAML configuration file that defines your project's metadata, scripts, tasks, environment variables, and plugins. This document explains the structure and options available in the `.devx` file.

## Basic Structure

A `.devx` file has the following top-level sections:

```yaml
project:
  # Project metadata
  
scripts:
  # Named scripts to run
  
tasks:
  # More complex tasks with descriptions
  
env:
  # Environment variables
  
plugins:
  # Plugin configurations
```

## Project Section

The `project` section contains metadata about your project:

```yaml
project:
  name: "my-app"        # Required: Project name
  type: "web"           # Optional: Project type (web, api, cli, library, generic)
  language: "node"      # Optional: Primary language (node, python, go, rust, other)
  version: "1.0.0"      # Optional: Project version
```

## Scripts Section

The `scripts` section defines simple named commands that can be run with `devx run <script-name>`:

```yaml
scripts:
  build: "npm run build"
  dev: "vite"
  lint: "eslint ."
  test: "jest"
```

Scripts are simple key-value pairs where the key is the script name and the value is the command to run.

## Tasks Section

The `tasks` section defines more complex tasks with additional metadata:

```yaml
tasks:
  - name: "deploy"
    run: "bash scripts/deploy.sh"
    description: "Deploy the application to production"
  
  - name: "backup"
    run: "tar -czf backup.tar.gz src"
    description: "Create a backup of the source code"
```

Each task has the following properties:

- `name`: The name of the task (required)
- `run`: The command to run (required)
- `description`: A description of what the task does (optional)

Tasks can be run with `devx run <task-name>`.

## Environment Variables Section

The `env` section defines environment variables that will be available to scripts and tasks:

```yaml
env:
  PORT: "3000"
  NODE_ENV: "development"
  API_URL: "https://api.example.com"
```

Environment variables are key-value pairs where both the key and value are strings.

## Plugins Section

The `plugins` section defines plugins to load and their configurations:

```yaml
plugins:
  - name: "example-plugin"
    path: "./plugins/example-plugin.js"
    config:
      enabled: true
      logLevel: "info"
```

Each plugin has the following properties:

- `name`: The name of the plugin (required)
- `path`: The path to the plugin file (required)
- `config`: Plugin-specific configuration (optional)

## Example .devx File

Here's a complete example of a `.devx` file:

```yaml
project:
  name: "my-web-app"
  type: "web"
  language: "node"
  version: "1.0.0"

scripts:
  build: "npm run build"
  dev: "vite"
  lint: "eslint ."
  test: "jest"

tasks:
  - name: "deploy"
    run: "bash scripts/deploy.sh"
    description: "Deploy the application to production"
  
  - name: "backup"
    run: "tar -czf backup.tar.gz src"
    description: "Create a backup of the source code"

env:
  PORT: "3000"
  NODE_ENV: "development"
  API_URL: "https://api.example.com"

plugins:
  - name: "example-plugin"
    path: "./plugins/example-plugin.js"
    config:
      enabled: true
      logLevel: "info"
```

## Creating a .devx File

You can create a `.devx` file manually or use the `devx init` command to generate one interactively:

```bash
devx init
```

This will prompt you for project information and create a `.devx` file with default settings.

## Validating a .devx File

You can validate your `.devx` file using the `devx validate` command:

```bash
devx validate
```

This will check that your `.devx` file conforms to the expected schema and report any errors.
