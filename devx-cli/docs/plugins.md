# DevX Plugin System

The DevX CLI tool includes a powerful plugin system that allows you to extend its functionality. This document explains how to create and use plugins.

## Plugin Structure

A DevX plugin is a TypeScript/JavaScript module that exports a default function. This function takes a configuration object and returns a plugin object that implements the `DevxPlugin` interface.

```typescript
import { DevxConfig, DevxPlugin } from 'devx';

export default function createPlugin(config: any): DevxPlugin {
  return {
    name: 'my-plugin',
    
    // Plugin methods go here
    onInit(config: DevxConfig) {
      // Called when the plugin is initialized
    },
    
    onRun(scriptName: string, command: string) {
      // Called before a script or task is run
    },
    
    onValidate(config: DevxConfig): string[] {
      // Called during validation
      return []; // Return validation errors
    },
    
    onInfo(config: DevxConfig) {
      // Called when displaying project info
    },
  };
}
```

## Plugin Lifecycle Hooks

DevX plugins can hook into various lifecycle events:

- `onInit(config: DevxConfig)`: Called when the plugin is initialized
- `onRun(scriptName: string, command: string)`: Called before a script or task is run
- `onValidate(config: DevxConfig): string[]`: Called during validation, should return an array of validation errors
- `onInfo(config: DevxConfig)`: Called when displaying project info

## Configuring Plugins

Plugins are configured in the `.devx` file under the `plugins` section:

```yaml
plugins:
  - name: "my-plugin"
    path: "./plugins/my-plugin.js"
    config:
      enabled: true
      logLevel: "info"
      # Other plugin-specific configuration
```

The `config` object is passed to the plugin's constructor function.

## Example Plugins

### Timer Plugin

The timer plugin measures the execution time of scripts and tasks:

```typescript
import { DevxConfig, DevxPlugin } from 'devx';

export default function createTimerPlugin(config: any): DevxPlugin {
  const startTimes: Record<string, number> = {};
  
  return {
    name: 'timer-plugin',
    
    onRun(scriptName: string, command: string) {
      console.log(`Starting timer for ${scriptName}`);
      startTimes[scriptName] = Date.now();
    },
    
    onInfo(config: DevxConfig) {
      console.log('Available scripts and their last execution times:');
      
      for (const scriptName in startTimes) {
        const duration = (Date.now() - startTimes[scriptName]) / 1000;
        console.log(`  ${scriptName}: ${duration.toFixed(2)}s`);
      }
    },
  };
}
```

### Validation Plugin

This plugin adds custom validation rules:

```typescript
import { DevxConfig, DevxPlugin } from 'devx';

export default function createValidationPlugin(config: any): DevxPlugin {
  return {
    name: 'validation-plugin',
    
    onValidate(config: DevxConfig): string[] {
      const errors: string[] = [];
      
      // Example: Ensure all tasks have descriptions
      if (config.tasks) {
        config.tasks.forEach((task, index) => {
          if (!task.description) {
            errors.push(`Task "${task.name}" is missing a description`);
          }
        });
      }
      
      return errors;
    },
  };
}
```

## Building Plugins

Plugins should be compiled to JavaScript before use. You can use the same build tools as the DevX CLI itself (TypeScript + tsup).

For TypeScript plugins, make sure to import the types from the DevX package:

```typescript
import { DevxConfig, DevxPlugin } from 'devx';
```

## Loading Plugins

DevX automatically loads all plugins defined in the `.devx` file. The plugin path can be relative to the current working directory or an absolute path.
