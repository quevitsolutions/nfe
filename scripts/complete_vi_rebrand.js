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

    // Remaining Mojibake
    text = text.replace(/â€”/g, '—');
    text = text.replace(/âš™ï¸ /g, '⚙️ ');
    text = text.replace(/âš™ï¸/g, '⚙️');
    text = text.replace(/âœ“/g, '✓');
    text = text.replace(/â‰ˆ/g, '≈');
    text = text.replace(/2Ã—2/g, '2x2');
    text = text.replace(/L0â€“L17/g, 'L0–L17');
    text = text.replace(/1â€“5/g, '1–5');
    text = text.replace(/6â€“10/g, '6–10');
    text = text.replace(/11â€“17/g, '11–17');

    // Layout sidebar cleanup
    // Replacing remaining amber/gold glows on `bg-red-600`
    text = text.replace(/rgba\(202,138,4,0\.3\)/g, 'rgba(237, 27, 36, 0.3)');
    text = text.replace(/hover:bg-amber-50 hover:text-amber-700/g, 'hover:bg-red-50 hover:text-[#ed1b24]');
    
    // Removing any stray `text-amber-600` not converted to `#ed1b24`
    text = text.replace(/text-amber-600/g, 'text-[#ed1b24]');
    text = text.replace(/text-neural-gold/g, 'text-[#ed1b24]');
    text = text.replace(/bg-amber-600/g, 'bg-[#ed1b24]');

    // Let's replace yellow-400 where it was a fallback of sky-400... wait, yellow-400 is fine as an accent unless it's the main button glow
    text = text.replace(/border-neural-gold\/30/g, 'border-[#ed1b24]/30');
    text = text.replace(/border-amber-500/g, 'border-[#ed1b24]');
    text = text.replace(/from-amber-600 to-amber-800/g, 'from-[#ed1b24] to-[#c4121b]');
    
    // Convert red-600 or rose-500 globally to Vi exact `#ed1b24` (already mostly done, but verify)
    text = text.replace(/bg-red-600/g, 'bg-[#ed1b24]');

    if (text !== original) {
      fs.writeFileSync(f, text, 'utf8');
      console.log(`Updated ${path.basename(f)}`);
    }
  }
}

walk(path.join(__dirname, 'src'), function(err, results) {
  if (err) throw err;
  processFiles(results);
  console.log('Final Vi layout + encoding rebrand script finished.');
});
