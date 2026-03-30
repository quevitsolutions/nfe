const fs = require('fs');
const filesToFix = ['src/app/page.tsx', 'src/app/dashboard/page.tsx'];

for (let file of filesToFix) {
    if (!fs.existsSync(file)) continue;
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/1ï¸ âƒ£/g, '1️⃣');
    text = text.replace(/2ï¸ âƒ£/g, '2️⃣');
    text = text.replace(/3ï¸ âƒ£/g, '3️⃣');
    text = text.replace(/4ï¸ âƒ£/g, '4️⃣');
    text = text.replace(/â”€/g, '─');
    text = text.replace(/├óΓÇ░╦å/g, '≈');
    text = text.replace(/Γëê/g, '≈');
    text = text.replace(/bg-slate-50/g, 'bg-[#fcf3eb]');
    // also replacing white/red accents
    text = text.replace(/from-rose-500/g, 'from-[#ed1b24]');
    text = text.replace(/to-red-600/g, 'to-[#c4121b]');
    text = text.replace(/text-rose-500/g, 'text-[#ed1b24]');
    fs.writeFileSync(file, text, 'utf8');
    console.log(`Mojibake fixed in ${file}`);
}
