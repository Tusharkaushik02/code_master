const fs = require('fs');
const path = require('path');

const directory = './src';

// We map both the original LeetCode colors AND the ones we just added,
// to ensure EVERYTHING matches the new Technical Precision tokens exactly.
const colorMap = {
  // Deepest Backgrounds -> #19120a
  '#0B0E14': '#19120a',
  '#1a1a2e': '#19120a',
  
  // Surfaces / Cards -> #261e15
  '#151921': '#261e15',
  '#16213e': '#261e15',
  '#1e293b': '#261e15',

  // Higher Surfaces / Hover -> #31281f
  '#1C222D': '#31281f',
  '#0f3460': '#31281f',

  // Borders -> #544434 (outline-variant)
  '#262C36': '#544434',
  '#2d3748': '#544434',

  // Hover Borders -> #a18d7a (outline)
  '#3D4452': '#a18d7a',

  // Text Primary
  '#f0e0d1': '#f0e0d1',
  '#e2e8f0': '#f0e0d1',

  // Text Secondary
  '#a18d7a': '#d9c3ad', // on-surface-variant
  '#94a3b8': '#d9c3ad',

  // Muted Text
  '#544434': '#a18d7a', // outline
  '#64748b': '#a18d7a',
  '#475569': '#a18d7a',

  // Easy / Success
  '#00b8a3': '#00b7a2', // secondary-container

  // Hard / Error
  '#ff375f': '#ffb4ab', // error
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
    // Replace case-insensitive colors globally
    const regex = new RegExp(oldColor, 'gi');
    content = content.replace(regex, newColor);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated colors in ${file}`);
  }
});
