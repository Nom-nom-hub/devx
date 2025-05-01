import { DevxConfig, DevxPlugin } from '../../src/core/types';

/**
 * Example timer plugin that measures execution time of scripts and tasks
 */
export default function createTimerPlugin(config: any): DevxPlugin {
  const startTimes: Record<string, number> = {};
  
  return {
    name: 'timer-plugin',
    
    onInit(config: DevxConfig) {
      console.log('Timer plugin initialized');
      console.log('Timer plugin config:', config);
    },
    
    onRun(scriptName: string, command: string) {
      console.log(`Timer plugin: Starting timer for ${scriptName}`);
      startTimes[scriptName] = Date.now();
    },
    
    onValidate(config: DevxConfig): string[] {
      return []; // No validation errors
    },
    
    onInfo(config: DevxConfig) {
      console.log('Timer plugin: Available scripts and their last execution times:');
      
      for (const scriptName in startTimes) {
        const duration = (Date.now() - startTimes[scriptName]) / 1000;
        console.log(`  ${scriptName}: ${duration.toFixed(2)}s`);
      }
    },
  };
}
