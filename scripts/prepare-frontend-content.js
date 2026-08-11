const fs = require('fs');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(repositoryRoot, 'content', 'portfolio.json');
const targetDirectory = path.join(repositoryRoot, 'frontend', 'src', 'data');
const targetPath = path.join(targetDirectory, 'portfolio.generated.js');

const portfolio = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
fs.mkdirSync(targetDirectory, { recursive: true });

const generatedSource = [
  '// Generated from content/portfolio.json. Do not edit directly.',
  `const portfolio = ${JSON.stringify(portfolio, null, 2)};`,
  '',
  'export default portfolio;',
  ''
].join('\n');

fs.writeFileSync(targetPath, generatedSource);
console.log(`Prepared frontend content at ${path.relative(repositoryRoot, targetPath)}`);
