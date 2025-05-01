#!/bin/bash

# Script to publish the package to NPM

echo "Building the package..."
npm run build

echo "Running tests..."
./test.sh

if [ $? -ne 0 ]; then
  echo "Tests failed. Aborting publish."
  exit 1
fi

echo "Do you want to publish to NPM? (y/n)"
read answer

if [ "$answer" != "y" ]; then
  echo "Publish aborted."
  exit 0
fi

echo "Publishing to NPM..."
npm publish

if [ $? -eq 0 ]; then
  echo "Package published successfully!"
else
  echo "Failed to publish package."
  exit 1
fi
