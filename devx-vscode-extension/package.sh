#!/bin/bash

# Script to package the VSCode extension

echo "Packaging DevX Icon Theme extension..."

# Run vsce package
npx @vscode/vsce package

if [ $? -eq 0 ]; then
  echo "Extension packaged successfully!"
  echo "You can install it in VS Code using:"
  echo "code --install-extension devx-icon-theme-1.0.0.vsix"
else
  echo "Failed to package extension."
  exit 1
fi
