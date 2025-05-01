import chalk from 'chalk';
import { loadDevxConfig } from '../core/config';
import { loadPlugins, runPluginHook } from '../core/plugin';
import { formatTable, logger } from '../core/utils';

/**
 * Displays information about the project from the .devx config
 */
export async function infoCommand(): Promise<void> {
  try {
    // Load the .devx config
    const config = loadDevxConfig();
    
    // Load plugins
    const plugins = await loadPlugins(config);
    
    // Run the onInfo hook for all plugins
    await runPluginHook(plugins, 'onInfo', config);
    
    // Display project information
    console.log(chalk.bold('\nProject Information:'));
    console.log(formatTable(config.project, 2));
    
    // Display scripts
    if (config.scripts && Object.keys(config.scripts).length > 0) {
      console.log(chalk.bold('\nAvailable Scripts:'));
      for (const [name, command] of Object.entries(config.scripts)) {
        console.log(`  ${chalk.cyan(name)}: ${command}`);
      }
    }
    
    // Display tasks
    if (config.tasks && config.tasks.length > 0) {
      console.log(chalk.bold('\nAvailable Tasks:'));
      for (const task of config.tasks) {
        console.log(`  ${chalk.cyan(task.name)}: ${task.description || task.run}`);
      }
    }
    
    // Display environment variables
    if (config.env && Object.keys(config.env).length > 0) {
      console.log(chalk.bold('\nEnvironment Variables:'));
      console.log(formatTable(config.env, 2));
    }
    
    // Display plugins
    if (config.plugins && config.plugins.length > 0) {
      console.log(chalk.bold('\nPlugins:'));
      for (const plugin of config.plugins) {
        console.log(`  ${chalk.cyan(plugin.name)} (${plugin.path})`);
      }
    }
  } catch (error) {
    logger.error(`Failed to display project info: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
