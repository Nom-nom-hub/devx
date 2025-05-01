import inquirer from 'inquirer';
import path from 'path';
import { DevxConfig } from '../core/types';
import { saveDevxConfig } from '../core/config';
import { fileExists, logger } from '../core/utils';

/**
 * Default .devx configuration
 */
const defaultConfig: DevxConfig = {
  project: {
    name: '',
    type: 'generic',
    language: 'node',
    version: '1.0.0',
  },
  scripts: {
    start: 'npm start',
    build: 'npm run build',
    test: 'npm test',
  },
  tasks: [
    {
      name: 'hello',
      run: 'echo "Hello from devx!"',
      description: 'A simple hello world task',
    },
  ],
  env: {
    NODE_ENV: 'development',
  },
  plugins: [],
};

/**
 * Prompts the user for project information
 */
async function promptForProjectInfo(): Promise<DevxConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: path.basename(process.cwd()),
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Project type:',
      choices: ['web', 'api', 'cli', 'library', 'generic'],
      default: 'generic',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Primary language:',
      choices: ['node', 'python', 'go', 'rust', 'other'],
      default: 'node',
    },
  ]);

  const config: DevxConfig = {
    ...defaultConfig,
    project: {
      name: answers.projectName,
      type: answers.projectType,
      language: answers.language,
      version: '1.0.0',
    },
  };

  return config;
}

/**
 * Creates a default config with the given project name
 */
function createDefaultConfig(projectName: string = path.basename(process.cwd())): DevxConfig {
  return {
    ...defaultConfig,
    project: {
      ...defaultConfig.project,
      name: projectName,
    },
  };
}

/**
 * Initializes a new .devx file
 */
export async function initCommand(options: {
  force?: boolean;
  yes?: boolean;
  projectName?: string;
  projectType?: string;
  language?: string;
} = {}): Promise<void> {
  const devxFilePath = '.devx';

  // Check if .devx file already exists
  if (fileExists(devxFilePath) && !options.force) {
    if (options.yes) {
      logger.info('.devx file already exists. Use --force to overwrite.');
      return;
    }

    try {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: '.devx file already exists. Overwrite?',
          default: false,
        },
      ]);

      if (!overwrite) {
        logger.info('Initialization cancelled.');
        return;
      }
    } catch (error) {
      logger.error('Interactive prompt failed. Use --yes flag for non-interactive mode.');
      return;
    }
  }

  try {
    let config: DevxConfig;

    // Use non-interactive mode if --yes flag is provided
    if (options.yes) {
      config = createDefaultConfig(options.projectName);

      // Override defaults with provided options
      if (options.projectType) {
        config.project.type = options.projectType;
      }

      if (options.language) {
        config.project.language = options.language;
      }
    } else {
      try {
        // Prompt for project information in interactive mode
        config = await promptForProjectInfo();
      } catch (error) {
        // Fall back to default config if prompts fail
        logger.warning('Interactive prompts failed, using default configuration.');
        config = createDefaultConfig(options.projectName);
      }
    }

    // Save the config to .devx file
    saveDevxConfig(config, devxFilePath);

    logger.success(`Created .devx file in ${process.cwd()}`);
  } catch (error) {
    logger.error(`Failed to initialize .devx file: ${error instanceof Error ? error.message : String(error)}`);
  }
}
