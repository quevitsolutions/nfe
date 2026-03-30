const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

function processFiles(files) {
  for (let f of files) {
    let text = fs.readFileSync(f, 'utf8');
    let original = text;

    // Fix encoding bugs
    text = text.replace(/â†’/g, '→');
    text = text.replace(/1ï¸Γâ£/g, '1️⃣'); // Catch specific corrupted form
    text = text.replace(/2ï¸Γâ£/g, '2️⃣');
    text = text.replace(/3ï¸Γâ£/g, '3️⃣');
    text = text.replace(/4ï¸Γâ£/g, '4️⃣');
    text = text.replace(/1ï¸ Γâ£/g, '1️⃣'); // Catch alternative corrupted form without variation selector
    text = text.replace(/2ï¸ Γâ£/g, '2️⃣');
    text = text.replace(/3ï¸ Γâ£/g, '3️⃣');
    text = text.replace(/4ï¸ Γâ£/g, '4️⃣');
    text = text.replace(/â”€â”€/g, '──');
    text = text.replace(/â”€/g, '─');
    text = text.replace(/├óΓÇ░╦å/g, '≈');
    text = text.replace(/Γëê/g, '≈');

    // Color theme overrides
    // 1. Vi Red mapping globally from previous Sky Blue 'reds' (#e11d48 / rose)
    text = text.replace(/#e11d48/g, '#ed1b24');
    text = text.replace(/rgba\(225,\s*29,\s*72/g, 'rgba(237, 27, 36');
    text = text.replace(/text-rose-/g, 'text-red-');
    text = text.replace(/bg-rose-/g, 'bg-red-');
    text = text.replace(/border-rose-/g, 'border-red-');
    text = text.replace(/from-rose-/g, 'from-red-');
    text = text.replace(/to-rose-/g, 'to-red-');

    // 2. Vi Cream background mapping
    // We target `bg-slate-50` and pure `bg-white` on outer sections
    // Mostly replace slate-50 on layout wraps.
    text = text.replace(/bg-slate-50/g, 'bg-[#fcf3eb]');

    // Let's also swap any text-amber-600 / yellow-500 back to Vi Yellow specifically.
    text = text.replace(/amber-600/g, 'yellow-400'); // Or keep yellow-400

    if (text !== original) {
      fs.writeFileSync(f, text, 'utf8');
      console.log(`Updated ${path.basename(f)}`);
    }
  }
}

walk(path.join(__dirname, 'src'), function(err, results) {
  if (err) throw err;
  processFiles(results);
  console.log('Vi rebrand script finished.');
});
