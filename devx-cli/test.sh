#!/bin/bash

# Test script for devx CLI

echo "Testing devx CLI..."

# Create a test directory
mkdir -p test-project
cd test-project

# Initialize a new .devx file
echo "Testing 'devx init'..."
../bin/devx.js init --force --yes --project-name "test-project" --project-type "web" --language "node"

# Validate the .devx file
echo "Testing 'devx validate'..."
../bin/devx.js validate

# Display project info
echo "Testing 'devx info'..."
../bin/devx.js info

# List available scripts and tasks
echo "Testing 'devx list'..."
../bin/devx.js list

# Run a task
echo "Testing 'devx run hello'..."
../bin/devx.js run hello

# Clean up
cd ..
rm -rf test-project

echo "All tests completed!"
