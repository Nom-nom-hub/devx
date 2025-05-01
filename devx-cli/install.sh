#!/bin/bash

# Installation script for devx CLI

echo "Installing devx CLI..."

# Build the project
npm run build

# Install globally
npm install -g .

echo "devx CLI installed globally. You can now use 'devx' command from anywhere."
echo "Try 'devx --help' to see available commands."
