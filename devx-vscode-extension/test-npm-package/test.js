#!/usr/bin/env node

// This script tests the devx CLI by running various commands

const { execSync } = require('child_process');

function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    const output = execSync(`npx @devx-cli/devx ${command}`, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    return false;
  }
}

// Run tests
console.log('Testing @devx-cli/devx package...');

// Test info command
runCommand('info');

// Test list command
runCommand('list');

// Test run command
runCommand('run hello');

console.log('\nTests completed!');
