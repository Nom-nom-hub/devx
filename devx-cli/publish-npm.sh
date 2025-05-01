#!/bin/bash

# Script to publish the DevX CLI to NPM

echo "Publishing DevX CLI to NPM..."

# Build the package
echo "Building the package..."
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting publish."
  exit 1
fi

# Publish to NPM
echo "Publishing to NPM..."
npm publish --access public

if [ $? -eq 0 ]; then
  echo "Package published successfully to NPM!"
  echo "It should now be available as @devx-cli/devx"
else
  echo "Failed to publish package to NPM."
  echo "Please check the error message above for details."
  exit 1
fi
