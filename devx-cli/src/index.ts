import { Command } from 'commander';
import { initCommand } from './commands/init';
import { runCommand } from './commands/run';
import { validateCommand } from './commands/validate';
import { infoCommand } from './commands/info';
import { listCommand } from './commands/list';
import { extensionCommand } from './commands/extension';

// Export core modules for plugin developers
export * from './core/types';
export * from './core/config';
export * from './core/executor';
export * from './core/plugin';
export * from './core/utils';

// Create the CLI program
export function createCli(): Command {
  const program = new Command();

  program
    .name('devx')
    .description('A TypeScript-based CLI tool for project management and task execution')
    .version('1.0.0');

  // Init command
  program
    .command('init')
    .description('Initialize a new .devx file')
    .option('-f, --force', 'Force overwrite if .devx file already exists')
    .option('-y, --yes', 'Skip prompts and use default values')
    .option('--project-name <name>', 'Set the project name')
    .option('--project-type <type>', 'Set the project type (web, api, cli, library, generic)')
    .option('--language <language>', 'Set the primary language (node, python, go, rust, other)')
    .action((options) => {
      initCommand({
        force: options.force,
        yes: options.yes,
        projectName: options.projectName,
        projectType: options.projectType,
        language: options.language,
      });
    });

  // Run command
  program
    .command('run <script|task>')
    .description('Run a script or task defined in the .devx file')
    .action((name) => {
      runCommand(name);
    });

  // Validate command
  program
    .command('validate')
    .description('Validate the .devx file schema')
    .action(() => {
      validateCommand();
    });

  // Info command
  program
    .command('info')
    .description('Display project information from the .devx file')
    .action(() => {
      infoCommand();
    });

  // List command
  program
    .command('list')
    .description('List all available scripts and tasks')
    .action(() => {
      listCommand();
    });

  // Extension command
  program
    .command('install-extension')
    .description('Install the DevX Icon Theme extension for VS Code')
    .action(() => {
      extensionCommand();
    });

  return program;
}

// Main function
export function main(): void {
  const program = createCli();
  program.parse(process.argv);
}

// Run the CLI if this file is executed directly
if (require.main === module) {
  main();
}
