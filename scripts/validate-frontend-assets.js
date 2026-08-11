const fs = require('fs');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..');
const frontendRoot = path.join(repositoryRoot, 'frontend');
const publicRoot = path.join(frontendRoot, 'public');
const filesToScan = [
  path.join(frontendRoot, 'src'),
  path.join(frontendRoot, 'public', 'index.html'),
  path.join(frontendRoot, 'public', 'manifest.json'),
  path.join(repositoryRoot, 'content', 'portfolio.json'),
];
const assetPattern = /\/(?:images\/[A-Za-z0-9._/-]+|[A-Za-z0-9._-]+\.pdf)/g;
const assets = new Set();

const collectFiles = (target) => {
  if (fs.statSync(target).isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(target, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
};

for (const target of filesToScan) {
  for (const filePath of collectFiles(target)) {
    const contents = fs.readFileSync(filePath, 'utf8');
    for (const match of contents.matchAll(assetPattern)) assets.add(match[0]);
  }
}

const missing = [...assets].filter(asset => !fs.existsSync(path.join(publicRoot, asset.slice(1))));
if (missing.length > 0) {
  console.error(`Frontend asset validation failed for ${missing.length} asset(s):`);
  missing.forEach(asset => console.error(`- ${asset}`));
  process.exit(1);
}

console.log(`Frontend assets valid: ${assets.size} referenced public asset paths exist.`);
