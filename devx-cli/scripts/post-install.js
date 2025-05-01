#!/usr/bin/env node

/**
 * Post-install script to notify users about the VS Code extension
 */

const chalk = require('chalk');

// Only show the message when installing globally
const isGlobalInstall = process.env.npm_config_global === 'true';

if (isGlobalInstall) {
  console.log('\n');
  console.log(chalk.green('✓'), chalk.bold('DevX CLI installed successfully!'));
  console.log('\n');
  console.log(chalk.cyan('📦'), chalk.bold('VS Code Extension Available'));
  console.log('   Enhance your experience with a custom icon for .devx files in VS Code.');
  console.log('   Install it with:');
  console.log('   ', chalk.yellow('devx install-extension'));
  console.log('\n');
  console.log('   Or manually from the VS Code Marketplace:');
  console.log('   1. Open VS Code');
  console.log('   2. Go to Extensions (Ctrl+Shift+X)');
  console.log('   3. Search for "DevX File Icon"');
  console.log('   4. Click Install');
  console.log('\n');
  console.log(chalk.cyan('📚'), chalk.bold('Getting Started'));
  console.log('   Initialize a new project:');
  console.log('   ', chalk.yellow('devx init'));
  console.log('\n');
  console.log('   For more information, run:');
  console.log('   ', chalk.yellow('devx --help'));
  console.log('\n');
}
