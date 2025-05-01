# DevX CLI

A TypeScript-based CLI tool for project management and task execution.

## Installation

```bash
npm install -g @devx-cli/devx
```

Or use it directly with npx:

```bash
npx @devx-cli/devx <command>
```

## Features

- **Project Configuration**: Manage project metadata and settings in a `.devx` file.
- **Script & Task Runner**: Run custom scripts and tasks defined in your `.devx` file.
- **Plugin System**: Extend functionality with custom plugins.
- **Environment Variables**: Define and use environment variables in your scripts.

## Usage

### Initialize a new project

```bash
devx init
```

This will create a `.devx` file in your current directory with default settings.

### Run a script or task

```bash
devx run <script|task>
```

### Validate your .devx file

```bash
devx validate
```

### Display project information

```bash
devx info
```

### List available scripts and tasks

```bash
devx list
```

## .devx File Format

The `.devx` file uses YAML format:

```yaml
project:
  name: "my-app"
  type: "web"
  language: "node"
  version: "1.0.0"

scripts:
  build: "npm run build"
  dev: "vite"
  lint: "eslint ."

tasks:
  - name: "deploy"
    run: "bash scripts/deploy.sh"
    description: "Deploy the application to production"

env:
  PORT: "3000"
  NODE_ENV: "development"

plugins:
  - name: "example-plugin"
    path: "./plugins/example-plugin.js"
    config:
      enabled: true
```

## Plugin System

Plugins can hook into various lifecycle events:

- `onInit`: Called when the plugin is initialized
- `onRun`: Called before a script or task is run
- `onValidate`: Called during validation
- `onInfo`: Called when displaying project info

Example plugin:

```typescript
import { DevxConfig, DevxPlugin } from '@devx-cli/devx';

export default function createPlugin(config: any): DevxPlugin {
  return {
    name: 'my-plugin',

    onInit(config: DevxConfig) {
      console.log('Plugin initialized');
    },

    onRun(scriptName: string, command: string) {
      console.log(`Running ${scriptName}`);
    },

    onValidate(config: DevxConfig): string[] {
      return []; // Return validation errors
    },

    onInfo(config: DevxConfig) {
      console.log('Custom project info');
    },
  };
}
```

## VS Code Extension

To enhance your experience with `.devx` files in Visual Studio Code, we've created a VS Code extension that provides a custom icon for `.devx` files without changing your existing file icon theme.

### Installation

You can install the extension from the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "DevX File Icon" or look for the publisher "DevX-cli"
4. Click Install

Alternatively, you can install it directly from the command line:

```bash
code --install-extension DevX-cli.devx-file-icon
```

Or use the built-in command in the DevX CLI:

```bash
devx install-extension
```

### Features

- Custom icon for `.devx` files in the VS Code file explorer
- Preserves your existing file icon theme for all other files
- No configuration required - works automatically after installation

## License

MIT
