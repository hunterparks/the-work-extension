const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const version = require('./package.json').version;

const outputPath = path.join(__dirname, 'dist');

if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true, force: true });
}
fs.mkdirSync(outputPath);

const zipItems = [
    'manifest.json',
    'styles/*',
    'scripts/*',
    'images/*.png',
    'assets/the-work.webm',
    '_locales/**/*'
];

const command = `pushd src; zip ../dist/the-work-${version}.zip ${zipItems.join(' ')}`;

console.log(`Running command: '${command}'`)

execSync(command);