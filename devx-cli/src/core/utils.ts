import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

/**
 * Logger utility with different log levels
 */
export const logger = {
  info: (message: string) => console.log(chalk.blue('ℹ'), message),
  success: (message: string) => console.log(chalk.green('✓'), message),
  warning: (message: string) => console.log(chalk.yellow('⚠'), message),
  error: (message: string) => console.error(chalk.red('✗'), message),
  debug: (message: string) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🔍'), message);
    }
  },
};

/**
 * Checks if a file exists
 */
export function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

/**
 * Creates a directory if it doesn't exist
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Resolves environment variables in a string
 * Example: "Hello ${NAME}" -> "Hello John" (if process.env.NAME === "John")
 */
export function resolveEnvVars(str: string, env: Record<string, string> = {}): string {
  const combinedEnv = { ...process.env, ...env };
  
  return str.replace(/\${([^}]+)}/g, (_, varName) => {
    return combinedEnv[varName] || '';
  });
}

/**
 * Formats an object as a table for display
 */
export function formatTable(obj: Record<string, any>, indent: number = 0): string {
  const indentStr = ' '.repeat(indent);
  let result = '';
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      result += `${indentStr}${key}:\n${formatTable(value, indent + 2)}`;
    } else {
      result += `${indentStr}${key}: ${value}\n`;
    }
  }
  
  return result;
}
