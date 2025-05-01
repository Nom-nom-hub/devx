# DevX Configuration

This guide explains the structure and options available in the `.devx` configuration file.

## .devx File Format

The `.devx` file uses YAML format and consists of several sections:

- `project`: Project metadata
- `scripts`: Named commands to run
- `tasks`: More complex tasks with descriptions
- `env`: Environment variables
- `plugins`: Plugin configurations

## Project Configuration

The `project` section contains metadata about your project:

```yaml
project:
  name: "my-app"        # Required: Project name
  type: "web"           # Optional: Project type (web, api, cli, library, generic)
  language: "node"      # Optional: Primary language (node, python, go, rust, other)
  version: "1.0.0"      # Optional: Project version
```

### Project Types

DevX supports various project types:

- `web`: Web applications
- `api`: API services
- `cli`: Command-line tools
- `library`: Libraries and packages
- `generic`: General-purpose projects

### Languages

DevX supports various programming languages:

- `node`: JavaScript/TypeScript projects
- `python`: Python projects
- `go`: Go projects
- `rust`: Rust projects
- `other`: Other languages

## Scripts and Tasks

### Scripts

The `scripts` section defines simple named commands that can be run with `devx run <script-name>`:

```yaml
scripts:
  build: "npm run build"
  dev: "vite"
  lint: "eslint ."
  test: "jest"
```

Scripts are simple key-value pairs where the key is the script name and the value is the command to run.

### Tasks

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

## Environment Variables

The `env` section defines environment variables that will be available to scripts and tasks:

```yaml
env:
  PORT: "3000"
  NODE_ENV: "development"
  API_URL: "https://api.example.com"
```

Environment variables are key-value pairs where both the key and value are strings.

## Plugins

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

For more information on plugins, see the [Plugins](./plugins.md) documentation.

## Complete Example

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

## Configuration Best Practices

1. **Keep it Simple**: Start with a minimal configuration and add more as needed.
2. **Use Descriptive Names**: Use clear, descriptive names for scripts and tasks.
3. **Add Descriptions**: Always add descriptions to tasks to explain what they do.
4. **Organize Scripts**: Group related scripts together and follow a consistent naming convention.
5. **Version Control**: Always include the `.devx` file in version control.
6. **Environment Variables**: Use environment variables for configuration that changes between environments.
7. **Validation**: Regularly validate your `.devx` file using `devx validate`.
