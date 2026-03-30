const fs = require('fs');
const files = [
    'src/app/page.tsx',
    'src/app/dashboard/page.tsx',
    'src/components/CurrencySelector.tsx',
    'src/app/dashboard/layout.tsx'
];
files.forEach(f => {
    let text = fs.readFileSync(f, 'utf8');
    text = text.replace(/#ca8a04/g, '#e11d48');
    text = text.replace(/amber-600/g, 'red-600');
    fs.writeFileSync(f, text, 'utf8');
});

let contextText = fs.readFileSync('src/lib/CurrencyContext.tsx', 'utf8');
contextText = contextText.replace('SUPPORTED_CURRENCIES[1]', 'SUPPORTED_CURRENCIES[0]');
fs.writeFileSync('src/lib/CurrencyContext.tsx', contextText, 'utf8');

console.log("Revert successful.");
