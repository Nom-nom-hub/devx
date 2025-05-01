#!/usr/bin/env node

// This file is the entry point for the CLI
// It loads the compiled JavaScript from the dist directory

try {
  // Try to load the ESM version first
  import('../dist/index.mjs')
    .then(module => {
      module.main();
    })
    .catch(() => {
      // Fall back to CommonJS if ESM fails
      require('../dist/index.js').main();
    });
} catch (error) {
  console.error('Failed to load devx CLI:', error);
  process.exit(1);
}
