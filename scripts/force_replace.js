const fs = require('fs');
let text = fs.readFileSync('src/app/page.tsx', 'utf8');
let lines = text.split('\n');
lines[120] = "    { num: '1️⃣', title: 'Nodes', desc: 'Each participant is assigned a unique Node ID in the global registry.' },";
lines[121] = "    { num: '2️⃣', title: 'Layers', desc: 'Each layer upgrade unlocks deeper reward layers within the hierarchy.' },";
lines[122] = "    { num: '3️⃣', title: 'Flow Logic', desc: 'Contract distributes Direct, Layer, and Matrix rewards algorithmically.' },";
lines[123] = "    { num: '4️⃣', title: 'Price Oracle', desc: 'BNB costs auto-update via USD-pegged oracles for stability.' },";
fs.writeFileSync('src/app/page.tsx', lines.join('\n'), 'utf8');
console.log("Forced emoji line replacement successful");
