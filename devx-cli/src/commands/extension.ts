import { spawn } from 'child_process';
import { logger } from '../core/utils';

/**
 * Checks if VS Code is installed and accessible via the command line
 */
function isVSCodeInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    const process = spawn('code', ['--version'], { shell: true });

    process.on('close', (code) => {
      resolve(code === 0);
    });

    process.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * Checks if the DevX File Icon extension is already installed
 */
function isExtensionInstalled(): Promise<boolean> {
  return new Promise((resolve) => {
    const process = spawn('code', ['--list-extensions'], { shell: true });
    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.on('close', () => {
      resolve(output.toLowerCase().includes('devx-cli.devx-file-icon'));
    });

    process.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * Installs the DevX File Icon extension
 */
async function installExtension(): Promise<boolean> {
  return new Promise((resolve) => {
    logger.info('Installing DevX File Icon extension...');

    const process = spawn('code', ['--install-extension', 'DevX-cli.devx-file-icon'], {
      shell: true,
      stdio: 'inherit'
    });

    process.on('close', (code) => {
      resolve(code === 0);
    });

    process.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * Command to install the DevX File Icon extension for VS Code
 */
export async function extensionCommand(): Promise<void> {
  try {
    // Check if VS Code is installed
    const vsCodeInstalled = await isVSCodeInstalled();

    if (!vsCodeInstalled) {
      logger.error('VS Code is not installed or not accessible via the command line.');
      logger.info('Please install VS Code and make sure it\'s available in your PATH.');
      logger.info('You can download VS Code from: https://code.visualstudio.com/');
      return;
    }

    // Check if the extension is already installed
    const extensionInstalled = await isExtensionInstalled();

    if (extensionInstalled) {
      logger.info('DevX File Icon extension is already installed.');
      logger.info('The custom icon for .devx files should be visible in VS Code.');
      return;
    }

    // Install the extension
    const success = await installExtension();

    if (success) {
      logger.success('DevX File Icon extension installed successfully!');
      logger.info('The custom icon for .devx files should now be visible in VS Code.');
      logger.info('No additional configuration is required.');
    } else {
      logger.error('Failed to install the DevX File Icon extension.');
      logger.info('You can install it manually from the VS Code Marketplace:');
      logger.info('1. Open VS Code');
      logger.info('2. Go to Extensions (Ctrl+Shift+X)');
      logger.info('3. Search for "DevX File Icon" or look for the publisher "DevX-cli"');
      logger.info('4. Click Install');
    }
  } catch (error) {
    logger.error(`Error installing extension: ${error instanceof Error ? error.message : String(error)}`);
  }
}
