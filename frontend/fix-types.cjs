const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  // Match imports from types directory
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"](\.\.?\/.*types(?:\/[^'"]*)?)['"]/g;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, 'import type { $1 } from \'$2\'');
    modified = true;
  }
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
  }
});
