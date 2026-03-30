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

    // Fix typo from previous runs
    text = text.replace(/bg-\[#fcf3eb\]0/g, 'bg-[#fcf3eb]');
    
    // Global Landing Page & Subpage Theme Consistency
    // Replace Sky Blue with Vi Red/White themes
    text = text.replace(/bg-sky-500\/5/g, 'bg-white');
    text = text.replace(/bg-sky-500\/10/g, 'bg-[#ed1b24]/5');
    text = text.replace(/text-sky-500/g, 'text-[#ed1b24]');
    text = text.replace(/text-sky-300/g, 'text-slate-400');
    text = text.replace(/border-sky-500\/20/g, 'border-[#ed1b24]/10');
    text = text.replace(/shadow-\[inset_0_4_10_rgba\(0,0,0,0\.3\)\]/g, 'shadow-sm');
    text = text.replace(/shadow-\[0_8_30_rgba\(0,0,0,0\.5\)\]/g, 'shadow-md');
    
    // Fix Landing Page specifically if found
    if (f.endsWith('page.tsx') && f.includes('src' + path.sep + 'app' + path.sep + 'page.tsx')) {
        // Hero section cleanup
        text = text.replace(/bg-gradient-to-br from-yellow-400\/20 to-yellow-400\/5/g, 'bg-white/80');
        text = text.replace(/border-yellow-400\/30/g, 'border-[#ed1b24]/20');
        text = text.replace(/from-neural-gold via-cyber-cyan to-white/g, 'from-[#ed1b24] to-[#fbc50a]');
        text = text.replace(/bg-gradient-to-r from-yellow-600 to-amber-800/g, 'bg-[#ed1b24]');
        text = text.replace(/text-slate-900 px-10 py-5 rounded-\[2rem\] font-black text-xl shadow-\[0_4px_15px_rgba\(237, 27, 36,0\.5\)/g, 'text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-lg');
        
        // Stats section cleanup
        text = text.replace(/bg-black\/20/g, 'bg-[#ed1b24]/5');
        text = text.replace(/bg-black\/50/g, 'bg-white');
        
        // Footer cleanup
        text = text.replace(/bg-black/g, 'bg-white');
        text = text.replace(/text-white\/80/g, 'text-slate-500');
    }

    if (text !== original) {
      fs.writeFileSync(f, text, 'utf8');
      console.log(`Updated theme in ${path.basename(f)}`);
    }
  }
}

walk(path.join(__dirname, 'src'), function(err, results) {
  if (err) throw err;
  processFiles(results);
  console.log('Final Global Theme Alignment Script finished.');
});
