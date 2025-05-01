import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { DevxConfig, DevxConfigSchema } from './types';

/**
 * Finds the .devx file in the current directory or parent directories
 */
export function findDevxFile(startDir: string = process.cwd()): string | null {
  let currentDir = startDir;
  
  while (true) {
    const devxPath = path.join(currentDir, '.devx');
    if (fs.existsSync(devxPath)) {
      return devxPath;
    }
    
    // Check if we've reached the root directory
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }
    
    currentDir = parentDir;
  }
}

/**
 * Loads and parses the .devx file
 */
export function loadDevxConfig(filePath?: string): DevxConfig {
  const configPath = filePath || findDevxFile();
  
  if (!configPath) {
    throw new Error('No .devx file found. Run "devx init" to create one.');
  }
  
  try {
    const fileContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContent) as DevxConfig;
    
    // Validate the config against the schema
    const result = DevxConfigSchema.safeParse(config);
    
    if (!result.success) {
      throw new Error(`Invalid .devx file: ${result.error.message}`);
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load .devx file: ${error.message}`);
    }
    throw new Error('Failed to load .devx file');
  }
}

/**
 * Saves a DevxConfig to a .devx file
 */
export function saveDevxConfig(config: DevxConfig, filePath: string = '.devx'): void {
  try {
    const yamlContent = yaml.dump(config, {
      indent: 2,
      lineWidth: 100,
      noRefs: true,
    });
    
    fs.writeFileSync(filePath, yamlContent, 'utf8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to save .devx file: ${error.message}`);
    }
    throw new Error('Failed to save .devx file');
  }
}

/**
 * Validates a DevxConfig against the schema
 */
export function validateDevxConfig(config: DevxConfig): string[] {
  const result = DevxConfigSchema.safeParse(config);
  
  if (!result.success) {
    return result.error.errors.map(err => 
      `${err.path.join('.')}: ${err.message}`
    );
  }
  
  return [];
}
