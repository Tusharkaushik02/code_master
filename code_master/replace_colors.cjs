const fs = require('fs');
const path = require('path');

const directory = './src';

const colorMap = {
  '#1a1a2e': '#0B0E14',
  '#16213e': '#151921',
  '#0f3460': '#1C222D',
  '#1e293b': '#151921',
  '#e2e8f0': '#f0e0d1',
  '#94a3b8': '#a18d7a',
  '#64748b': '#544434',
  '#475569': '#544434',
  '#2d3748': '#262C36',
  '#1a1a2e 0%': '#0B0E14 0%',
  '#16213e 40%': '#151921 40%',
  '#0f3460 100%': '#1C222D 100%'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Replace case-insensitive colors
    const regex = new RegExp(oldColor, 'gi');
    content = content.replace(regex, newColor);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
});
