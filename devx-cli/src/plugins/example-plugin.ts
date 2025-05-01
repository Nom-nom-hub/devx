import { DevxConfig, DevxPlugin } from '../core/types';

/**
 * Example plugin that demonstrates the plugin API
 */
export default function createExamplePlugin(config: any): DevxPlugin {
  return {
    name: 'example-plugin',
    
    // Called when the plugin is initialized
    onInit(config: DevxConfig) {
      console.log('Example plugin initialized');
      console.log('Plugin config:', config);
    },
    
    // Called before a script or task is run
    onRun(scriptName: string, command: string) {
      console.log(`Example plugin: Running ${scriptName} with command: ${command}`);
    },
    
    // Called during validation
    onValidate(config: DevxConfig): string[] {
      const errors: string[] = [];
      
      // Example validation: ensure project name is not empty
      if (!config.project.name) {
        errors.push('Project name cannot be empty');
      }
      
      return errors;
    },
    
    // Called when displaying project info
    onInfo(config: DevxConfig) {
      console.log('Example plugin: Project info displayed');
    },
  };
}
