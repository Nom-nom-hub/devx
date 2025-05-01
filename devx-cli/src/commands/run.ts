import { loadDevxConfig } from '../core/config';
import { run } from '../core/executor';
import { loadPlugins, runPluginHook } from '../core/plugin';
import { logger } from '../core/utils';

/**
 * Runs a script or task from the .devx config
 */
export async function runCommand(name: string): Promise<void> {
  try {
    // Load the .devx config
    const config = loadDevxConfig();
    
    // Load plugins
    const plugins = await loadPlugins(config);
    
    // Run the onRun hook for all plugins
    if (config.scripts && config.scripts[name]) {
      await runPluginHook(plugins, 'onRun', name, config.scripts[name]);
    } else if (config.tasks) {
      const task = config.tasks.find(t => t.name === name);
      if (task) {
        await runPluginHook(plugins, 'onRun', name, task.run);
      }
    }
    
    // Run the script or task
    logger.info(`Running ${name}...`);
    await run(config, name);
    logger.success(`Successfully ran ${name}`);
  } catch (error) {
    logger.error(`Failed to run ${name}: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
