import path from 'path';
import { DevxConfig, DevxPlugin, PluginConstructor } from './types';

/**
 * Loads a plugin from a file path
 */
export async function loadPlugin(pluginPath: string, config: any): Promise<DevxPlugin> {
  try {
    // Resolve the plugin path relative to the current working directory
    const resolvedPath = path.resolve(process.cwd(), pluginPath);
    
    // Dynamically import the plugin module
    const pluginModule = await import(resolvedPath);
    
    // Get the default export which should be the plugin constructor
    const pluginConstructor: PluginConstructor = pluginModule.default;
    
    if (typeof pluginConstructor !== 'function') {
      throw new Error(`Plugin at ${pluginPath} does not export a default function`);
    }
    
    // Instantiate the plugin with its config
    const plugin = pluginConstructor(config);
    
    return plugin;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load plugin from ${pluginPath}: ${error.message}`);
    }
    throw new Error(`Failed to load plugin from ${pluginPath}`);
  }
}

/**
 * Loads all plugins defined in the .devx config
 */
export async function loadPlugins(config: DevxConfig): Promise<DevxPlugin[]> {
  if (!config.plugins || config.plugins.length === 0) {
    return [];
  }
  
  const plugins: DevxPlugin[] = [];
  
  for (const pluginDef of config.plugins) {
    try {
      const plugin = await loadPlugin(pluginDef.path, pluginDef.config || {});
      plugins.push(plugin);
    } catch (error) {
      console.error(`Error loading plugin ${pluginDef.name}: ${error instanceof Error ? error.message : error}`);
    }
  }
  
  return plugins;
}

/**
 * Runs the onInit hook for all plugins
 */
export async function runPluginHook<T>(
  plugins: DevxPlugin[],
  hookName: keyof DevxPlugin,
  ...args: any[]
): Promise<T[]> {
  const results: T[] = [];
  
  for (const plugin of plugins) {
    const hook = plugin[hookName];
    
    if (typeof hook === 'function') {
      try {
        const result = await hook.apply(plugin, args);
        if (result !== undefined) {
          results.push(result as T);
        }
      } catch (error) {
        console.error(`Error in plugin ${plugin.name} hook ${String(hookName)}: ${error instanceof Error ? error.message : error}`);
      }
    }
  }
  
  return results;
}
