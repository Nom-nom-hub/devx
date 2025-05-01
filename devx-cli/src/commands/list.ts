import chalk from 'chalk';
import { loadDevxConfig } from '../core/config';
import { logger } from '../core/utils';

/**
 * Lists all available scripts and tasks
 */
export async function listCommand(): Promise<void> {
  try {
    // Load the .devx config
    const config = loadDevxConfig();
    
    let hasItems = false;
    
    // List scripts
    if (config.scripts && Object.keys(config.scripts).length > 0) {
      console.log(chalk.bold('\nAvailable Scripts:'));
      for (const [name, command] of Object.entries(config.scripts)) {
        console.log(`  ${chalk.cyan(name)}: ${command}`);
      }
      hasItems = true;
    }
    
    // List tasks
    if (config.tasks && config.tasks.length > 0) {
      console.log(chalk.bold('\nAvailable Tasks:'));
      for (const task of config.tasks) {
        console.log(`  ${chalk.cyan(task.name)}: ${task.description || task.run}`);
      }
      hasItems = true;
    }
    
    if (!hasItems) {
      logger.info('No scripts or tasks found in .devx config');
    }
    
    console.log('\nRun a script or task with:');
    console.log(`  ${chalk.cyan('devx run <script|task>')}`);
  } catch (error) {
    logger.error(`Failed to list scripts and tasks: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
