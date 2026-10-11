const fs = require('fs');
const path = require('path');

const libsDir = 'C:/Users/yadav/.gemini/antigravity/scratch/internnova-3d/public/libs';
fs.mkdirSync(libsDir, { recursive: true });

async function downloadLib(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    fs.writeFileSync(path.join(libsDir, filename), text);
    console.log(`Downloaded ${filename} (${text.length} chars)`);
  } catch (err) {
    console.error(`Failed ${filename}:`, err.message);
  }
}

async function main() {
  await downloadLib('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'three.min.js');
  await downloadLib('https://unpkg.com/lucide@latest/dist/umd/lucide.min.js', 'lucide.min.js');
}

main();
