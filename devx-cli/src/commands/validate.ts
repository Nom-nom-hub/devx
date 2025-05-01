import { loadDevxConfig, validateDevxConfig } from '../core/config';
import { loadPlugins, runPluginHook } from '../core/plugin';
import { logger } from '../core/utils';

/**
 * Validates the .devx config file
 */
export async function validateCommand(): Promise<void> {
  try {
    // Load the .devx config
    const config = loadDevxConfig();
    
    // Validate the config against the schema
    const errors = validateDevxConfig(config);
    
    // Load plugins
    const plugins = await loadPlugins(config);
    
    // Run the onValidate hook for all plugins
    const pluginErrors = await runPluginHook<string>(plugins, 'onValidate', config);
    
    // Combine all errors
    const allErrors = [...errors, ...pluginErrors.flat()];
    
    if (allErrors.length > 0) {
      logger.error('Validation failed with the following errors:');
      allErrors.forEach(error => {
        logger.error(`- ${error}`);
      });
      process.exit(1);
    } else {
      logger.success('Validation successful! .devx file is valid.');
    }
  } catch (error) {
    logger.error(`Validation failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}
