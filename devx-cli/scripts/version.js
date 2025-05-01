#!/usr/bin/env node

/**
 * Version management script for DevX CLI
 * 
 * This script helps with updating the version across all necessary files.
 * 
 * Usage:
 *   node scripts/version.js <version-type>
 * 
 * Where <version-type> is one of:
 *   - patch: Increment the patch version (e.g., 1.0.0 -> 1.0.1)
 *   - minor: Increment the minor version (e.g., 1.0.0 -> 1.1.0)
 *   - major: Increment the major version (e.g., 1.0.0 -> 2.0.0)
 *   - <specific-version>: Set to a specific version (e.g., 1.2.3)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { version: currentVersion } = require('../package.json');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/version.js <version-type>');
  process.exit(1);
}

const versionType = args[0];

// Determine the new version
let newVersion;
if (['patch', 'minor', 'major'].includes(versionType)) {
  // Use npm version to calculate the new version number
  const output = execSync(`npm --no-git-tag-version version ${versionType} --json`, { encoding: 'utf8' });
  const versionInfo = JSON.parse(output);
  newVersion = versionInfo.version || versionInfo;
  
  // Revert the change made by npm version
  execSync('git checkout -- package.json');
} else if (/^\d+\.\d+\.\d+$/.test(versionType)) {
  // Use the specific version provided
  newVersion = versionType;
} else {
  console.error('Invalid version type. Must be "patch", "minor", "major", or a specific version (e.g., "1.2.3").');
  process.exit(1);
}

console.log(`Updating version from ${currentVersion} to ${newVersion}`);

// Update package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = require(packageJsonPath);
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`✓ Updated version in package.json`);

// Update version in src/index.ts
const indexTsPath = path.join(__dirname, '..', 'src', 'index.ts');
let indexTsContent = fs.readFileSync(indexTsPath, 'utf8');
indexTsContent = indexTsContent.replace(
  /\.version\(['"].*?['"]\)/,
  `.version('${newVersion}')`
);
fs.writeFileSync(indexTsPath, indexTsContent);
console.log(`✓ Updated version in src/index.ts`);

// Update CHANGELOG.md
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
let changelogContent = fs.readFileSync(changelogPath, 'utf8');

// Check if there's an Unreleased section
if (changelogContent.includes('## [Unreleased]')) {
  // Replace Unreleased with the new version
  changelogContent = changelogContent.replace(
    '## [Unreleased]',
    `## [${newVersion}] - ${new Date().toISOString().split('T')[0]}`
  );
} else if (changelogContent.includes(`## [${newVersion}] - Unreleased`)) {
  // Replace "Unreleased" with the current date
  changelogContent = changelogContent.replace(
    `## [${newVersion}] - Unreleased`,
    `## [${newVersion}] - ${new Date().toISOString().split('T')[0]}`
  );
}

// Add a new Unreleased section if we're not just updating the date for the current version
if (!changelogContent.includes('## [Unreleased]') && !changelogContent.includes(`## [${newVersion}] - Unreleased`)) {
  // Add a new Unreleased section at the top
  const unreleasedSection = `## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

`;
  
  // Find the position after the header
  const headerEndPos = changelogContent.indexOf('## [');
  if (headerEndPos !== -1) {
    changelogContent = 
      changelogContent.substring(0, headerEndPos) + 
      unreleasedSection + 
      changelogContent.substring(headerEndPos);
  }
}

fs.writeFileSync(changelogPath, changelogContent);
console.log(`✓ Updated CHANGELOG.md`);

console.log(`\nVersion updated to ${newVersion}`);
console.log(`\nNext steps:`);
console.log(`1. Review and update the CHANGELOG.md file`);
console.log(`2. Build the project: npm run build`);
console.log(`3. Commit the changes: git commit -am "Bump version to ${newVersion}"`);
console.log(`4. Create a tag: git tag -a v${newVersion} -m "Version ${newVersion}"`);
console.log(`5. Push changes: git push && git push --tags`);
console.log(`6. Publish to npm: npm publish --access public`);
