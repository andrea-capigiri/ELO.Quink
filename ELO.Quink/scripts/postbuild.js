const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const pkg = require('../package.json');
const version = pkg.version;
const target = (process.argv[2] || 'chrome').toUpperCase();

const buildsDir = path.resolve(__dirname, '../../Builds');
if (!fs.existsSync(buildsDir)) fs.mkdirSync(buildsDir, { recursive: true });

const zipName = `${target} v${version}.zip`;
const zipPath = path.join(buildsDir, zipName);

const distDir = path.resolve(__dirname, '../dist/browser');

const zip = new AdmZip();
zip.addLocalFolder(distDir);
zip.writeZip(zipPath);

console.log(`✅ Creato: Builds/${zipName}`);
