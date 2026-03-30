const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/app/dashboard');

const replacements = [
    { from: /text-yellow-400/g, to: 'text-[#1b5e20]' },
    { from: /bg-black/g, to: 'bg-white' },
    { from: /bg-\[#09090b\]/g, to: 'bg-[#f4f8f4]' },
    { from: /border-white\/5/g, to: 'border-[#c8e6c9]' },
    { from: /text-white\/80/g, to: 'text-gray-700' },
    { from: /bg-\[#1a1f2e\]/g, to: 'bg-[#e8f5e9]' },
    { from: /border-white\/10/g, to: 'border-[#a5d6a7]' },
    { from: /text-gray-400/g, to: 'text-gray-500' },
    { from: /border-\[#27272a\]/g, to: 'border-[#c8e6c9]' },
    { from: /bg-zinc-900\/50/g, to: 'bg-white/50' },
    { from: /bg-zinc-900/g, to: 'bg-white' },
    { from: /text-gray-300/g, to: 'text-gray-700' },
    { from: /bg-\[#111113\]/g, to: 'bg-[#fcfdfc]' },
    { from: /from-\[#111113\]/g, to: 'from-white' },
    { from: /to-\[#09090b\]/g, to: 'to-[#f4f8f4]' },
    { from: /shadow-\[0_-1px_0_rgba\(255,255,255,0.15\),0_2px_4px_rgba\(0,0,0,0.9\)\]/g, to: 'shadow-[0_1px_2px_rgba(255,255,255,0.8)]' },
    { from: /\[text-shadow:0_-1px_0_rgba\(255,255,255,0.15\),0_2px_4px_rgba\(0,0,0,0.9\)\]/g, to: '[text-shadow:0_1px_1px_rgba(255,255,255,0.8)]' },
    { from: /\[text-shadow:0_0_15px_rgba\(250,204,21,0.4\),2px_2px_6px_rgba\(0,0,0,0.8\)\]/g, to: '[text-shadow:0_1px_1px_rgba(255,255,255,0.8)]' }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            for (const rule of replacements) {
                content = content.replace(rule.from, rule.to);
            }
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated theme in:', fullPath);
            }
        }
    }
}

processDirectory(directoryPath);
console.log('Theme toggle complete.');
