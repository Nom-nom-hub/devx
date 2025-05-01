import { spawn } from 'child_process';
import { DevxConfig } from './types';

/**
 * Executes a shell command
 */
export function executeCommand(command: string, options: { cwd?: string } = {}): Promise<number> {
  return new Promise((resolve, reject) => {
    // Split the command into the executable and arguments
    const [cmd, ...args] = command.split(' ');
    
    const childProcess = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: options.cwd || process.cwd(),
    });
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    childProcess.on('error', (err) => {
      reject(new Error(`Failed to execute command: ${err.message}`));
    });
  });
}

/**
 * Runs a script from the .devx config
 */
export async function runScript(config: DevxConfig, scriptName: string): Promise<void> {
  if (!config.scripts || !config.scripts[scriptName]) {
    throw new Error(`Script "${scriptName}" not found in .devx config`);
  }
  
  const command = config.scripts[scriptName];
  
  try {
    await executeCommand(command);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to run script "${scriptName}": ${error.message}`);
    }
    throw error;
  }
}

/**
 * Runs a task from the .devx config
 */
export async function runTask(config: DevxConfig, taskName: string): Promise<void> {
  if (!config.tasks) {
    throw new Error('No tasks defined in .devx config');
  }
  
  const task = config.tasks.find(t => t.name === taskName);
  
  if (!task) {
    throw new Error(`Task "${taskName}" not found in .devx config`);
  }
  
  try {
    await executeCommand(task.run);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to run task "${taskName}": ${error.message}`);
    }
    throw error;
  }
}

/**
 * Runs a script or task from the .devx config
 */
export async function run(config: DevxConfig, name: string): Promise<void> {
  // First try to run as a script
  if (config.scripts && config.scripts[name]) {
    return runScript(config, name);
  }
  
  // Then try to run as a task
  if (config.tasks && config.tasks.find(t => t.name === name)) {
    return runTask(config, name);
  }
  
  throw new Error(`No script or task named "${name}" found in .devx config`);
}
