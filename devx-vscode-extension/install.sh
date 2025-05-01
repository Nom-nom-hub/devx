#!/bin/bash

# Script to install the DevX File Icon extension

echo "Installing DevX File Icon extension..."

# Check if the VSIX file exists
if [ ! -f "devx-file-icon-1.0.0.vsix" ]; then
  echo "VSIX file not found. Packaging the extension..."
  npx @vscode/vsce package
fi

# Check if VS Code is installed
if command -v code >/dev/null 2>&1; then
  echo "Installing the extension in VS Code..."
  code --install-extension devx-file-icon-1.0.0.vsix

  if [ $? -eq 0 ]; then
    echo "Extension installed successfully!"
    echo "The custom icon for .devx files should appear automatically in VS Code."
  else
    echo "Failed to install the extension."
    exit 1
  fi
else
  echo "VS Code not found in PATH. Please install the extension manually:"
  echo "1. Open VS Code"
  echo "2. Go to Extensions (Ctrl+Shift+X)"
  echo "3. Click on the '...' menu in the top-right corner"
  echo "4. Select 'Install from VSIX...'"
  echo "5. Choose the 'devx-file-icon-1.0.0.vsix' file"
fi
