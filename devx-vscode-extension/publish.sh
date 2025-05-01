#!/bin/bash

# Script to publish the DevX File Icon extension to the VS Code Marketplace

echo "Publishing DevX File Icon extension to the VS Code Marketplace..."

# Check if the Personal Access Token is provided
if [ -z "$VSCE_PAT" ]; then
  echo "Error: Personal Access Token not found."
  echo "Please set the VSCE_PAT environment variable with your Azure DevOps Personal Access Token."
  echo "Example: export VSCE_PAT=your_personal_access_token"
  exit 1
fi

# Package the extension
echo "Packaging the extension..."
npx @vscode/vsce package

# Publish the extension
echo "Publishing the extension..."
npx @vscode/vsce publish

if [ $? -eq 0 ]; then
  echo "Extension published successfully!"
  echo "It should now be available on the VS Code Marketplace under the publisher 'DevX-cli'."
else
  echo "Failed to publish the extension."
  echo "Please check the error message above for details."
  exit 1
fi
