const fs = require('fs');

const file = 'f:/GICLUB/webapp/src/app/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Container Styles & Shadows
content = content.replace(/shadow-\[0_8px_30px_rgba\(0,0,0,1\),inset_0_1px_1px_rgba\(255,255,255,0\.05\)\]/g, 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]');
content = content.replace(/shadow-\[0_8px_20px_rgba\(0,0,0,1\),inset_0_1px_1px_rgba\(255,255,255,0\.05\)\]/g, 'shadow-[0_4px_15px_rgba(0,0,0,0.03)]');
content = content.replace(/shadow-\[inset_0_2px_8px_rgba\(0,0,0,1\),0_1px_0_rgba\(255,255,255,0\.05\)\]/g, 'shadow-sm bg-gradient-to-b from-gray-50 to-white');
content = content.replace(/bg-\[#18181b\] blur-\[50px\]/g, 'bg-white/40 blur-[40px]');
content = content.replace(/border-\[#18181b\]/g, 'border-white border-[2px]');
content = content.replace(/bg-white border border-\[#18181b\] shadow-\[inset_2px_2px_5px_rgba\(0,0,0,0\.05\),inset_-1px_-1px_2px_rgba\(255,255,255,1\)\] rounded-xl/g, 'bg-gradient-to-b from-white to-gray-50 border border-gray-100 shadow-sm rounded-xl');

content = content.replace(/shadow-\[inset_0_1px_3px_rgba\(0,0,0,1\)\]/g, 'shadow-sm');
content = content.replace(/bg-black border-\[#18181b\] shadow-\[inset_0_2px_10px_rgba\(0,0,0,1\)\]/g, 'bg-white border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]');

// REMOVE ALL Text Shadows
content = content.replace(/\[text-shadow:[^\]]+\]/g, '');
content = content.replace(/drop-shadow-\[0_2px_2px_rgba\(0,0,0,0\.2\)\]/g, 'drop-shadow-sm');

// Make text colors cleaner
content = content.replace(/text-yellow-400/g, 'text-[#1b5e20]');
content = content.replace(/text-purple-700/g, 'text-purple-800');
content = content.replace(/text-blue-700/g, 'text-blue-800');
content = content.replace(/text-gray-700 font-bold drop-shadow-sm/g, 'text-gray-500 font-bold tracking-wider');

// Additional cleanup for pure elegant boxes
content = content.replace(/bg-\[#f4f8f4\] border border-\[#c8e6c9\]/g, 'bg-white/80 backdrop-blur-xl border border-white');

fs.writeFileSync(file, content);
console.log('Dashboard Page Refreshed Beautifully.');
