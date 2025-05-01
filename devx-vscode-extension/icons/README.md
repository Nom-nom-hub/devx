# DevX Icons

This directory contains the icons used by the DevX Icon Theme extension.

## Icon Files

- `devx-icon.svg`: Vector version of the DevX icon
- `devx-icon.png`: PNG version of the DevX icon (128x128 pixels)
- `devx-icon-hq.svg`: High-quality SVG source for generating PNGs

## PNG Icons

The `png` directory contains various sizes of the DevX icon:

- `devx-icon-16.png`: 16x16 pixels
- `devx-icon-24.png`: 24x24 pixels
- `devx-icon-32.png`: 32x32 pixels
- `devx-icon-48.png`: 48x48 pixels
- `devx-icon-64.png`: 64x64 pixels
- `devx-icon-128.png`: 128x128 pixels
- `devx-icon-256.png`: 256x256 pixels

## Usage

The icons are used by the extension to display a custom icon for `.devx` files in the VS Code file explorer.

## Regenerating Icons

To regenerate the PNG icons from the SVG source, run:

```bash
node convert-svg-to-png.js
```

This script uses the Sharp library to convert the SVG to various PNG sizes.
