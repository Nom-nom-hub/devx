# Installation Guide for DevX File Icon

This guide will help you install the DevX File Icon extension for Visual Studio Code.

## Prerequisites

- Visual Studio Code (version 1.60.0 or higher)

## Installation Methods

### Method 1: Install from VSIX File

1. Download the `devx-file-icon-1.0.0.vsix` file from the release.
2. Open Visual Studio Code.
3. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
4. Click on the "..." (More Actions) button at the top of the Extensions view.
5. Select "Install from VSIX..." from the dropdown menu.
6. Navigate to the downloaded VSIX file and select it.
7. Click "Install" to install the extension.

### Method 2: Install from VS Code Marketplace (Coming Soon)

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or by pressing `Ctrl+Shift+X`.
3. Search for "DevX File Icon" or look for the publisher "DevX-cli".
4. Click on the "Install" button next to the extension.

## Using the Extension

After installation, the extension will automatically apply the custom icon to all `.devx` files in your workspace. No additional configuration is required.

The icon should appear immediately for all `.devx` files in the Explorer view.

## Verifying the Installation

To verify that the extension is working correctly:

1. Create a new file with the `.devx` extension.
2. Save the file.
3. Check that the file has the custom DevX icon in the Explorer view.

## Troubleshooting

If you don't see the custom icon for `.devx` files:

1. Make sure the extension is installed correctly.
2. Try reloading VS Code by pressing `Ctrl+R` (Windows/Linux) or `Cmd+R` (macOS).
3. If the issue persists, check the VS Code Developer Tools (Help > Toggle Developer Tools) for any error messages related to the extension.

## Uninstalling the Extension

To uninstall the extension:

1. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or by pressing `Ctrl+Shift+X`.
2. Find the DevX File Icon extension.
3. Click on the gear icon next to the extension.
4. Select "Uninstall" from the dropdown menu.
5. Reload VS Code when prompted.
