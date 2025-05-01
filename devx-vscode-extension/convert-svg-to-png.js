const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define the sizes we want to generate
const sizes = [16, 24, 32, 48, 64, 128, 256];

// Input SVG file
const inputSvg = path.join(__dirname, 'icons', 'devx-icon-hq.svg');

// Create the output directory if it doesn't exist
const outputDir = path.join(__dirname, 'icons', 'png');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the SVG file
const svgBuffer = fs.readFileSync(inputSvg);

// Generate PNGs for each size
async function generatePngs() {
  console.log('Generating PNG files from SVG...');
  
  for (const size of sizes) {
    const outputFile = path.join(outputDir, `devx-icon-${size}.png`);
    
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputFile);
      
      console.log(`Created ${outputFile}`);
    } catch (error) {
      console.error(`Error creating ${outputFile}:`, error);
    }
  }
  
  // Also create a copy in the main icons directory for the extension
  try {
    await sharp(svgBuffer)
      .resize(128, 128)
      .png()
      .toFile(path.join(__dirname, 'icons', 'devx-icon.png'));
    
    console.log('Created icons/devx-icon.png');
  } catch (error) {
    console.error('Error creating icons/devx-icon.png:', error);
  }
  
  console.log('PNG generation complete!');
}

generatePngs().catch(console.error);
