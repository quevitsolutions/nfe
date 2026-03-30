const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/app/dashboard');
files.push('src/components/Sidebar.tsx');
files.push('src/components/BottomNav.tsx');

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    
    // Wipe all dark configurations
    c = c.replace(/dark:[a-zA-Z0-9\-\/\[\]\(\)\.\,\#]+/g, '');
    
    // Purge gray topographies into stark black
    c = c.replace(/text-slate-\d+/g, 'text-black');
    c = c.replace(/text-black\/[0-9]+/g, 'text-black'); // Clean opacity variations

    // Solidify borders
    c = c.replace(/border-white\/[0-9]+/g, 'border-brand-green/20');
    c = c.replace(/border-slate-[0-9]+\/?[0-9]*/g, 'border-brand-green/20');
    c = c.replace(/border-black\/[0-9]+/g, 'border-brand-green/20');
    
    // Enhance card and div backgrounds to solid white
    c = c.replace(/bg-black\/[0-9]+/g, 'bg-white');
    c = c.replace(/bg-slate-[0-9]+\/?[0-9]*/g, 'bg-white');
    c = c.replace(/bg-white\/[0-9]+/g, 'bg-white');
    
    // Ensure the new classnames are clean
    c = c.replace(/ className=" /g, ' className="');
    c = c.replace(/ " /g, '"');
    
    fs.writeFileSync(f, c);
});
console.log("Scrub completed successfully on " + files.length + " files.");
