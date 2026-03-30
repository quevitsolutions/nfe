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

    // Correct the hero title in page.tsx
    if (f.endsWith('page.tsx') && f.includes('src' + path.sep + 'app' + path.sep + 'page.tsx')) {
        // Hero title AIPCore
        text = text.replace(/<span className="bg-gradient-to-r from-neural-gold via-cyber-cyan to-white bg-clip-text text-transparent uppercase text-glow">AIPCore<\/span>/g, '<span className="text-[#0088ff] uppercase">AIP</span><span className="bg-gradient-to-r from-[#ed1b24] to-[#fbc50a] bg-clip-text text-transparent uppercase text-glow">Core</span>');
        
        // Footer AIP CORE
        text = text.replace(/<span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">AIP CORE<\/span>/g, '<span className="text-2xl font-black tracking-tighter uppercase"><span className="text-[#0088ff]">AIP</span> <span className="text-[#ed1b24]">CORE</span></span>');
        
        // Status AIPCORE
        text = text.replace(/<span className="text-cyber-cyan">AIPCORE v4.0<\/span>/g, '<span className="text-slate-900 font-bold"><span className="text-[#0088ff]">AIP</span>CORE v4.0</span>');
    }

    if (text !== original) {
      fs.writeFileSync(f, text, 'utf8');
      console.log(`Updated Logo Colors in ${path.basename(f)}`);
    }
  }
}

walk(path.join(__dirname, 'src'), function(err, results) {
  if (err) throw err;
  processFiles(results);
  console.log('Final Logo Color Alignment Script finished.');
});
