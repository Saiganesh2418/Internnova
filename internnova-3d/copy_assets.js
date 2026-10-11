const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/yadav/.gemini/antigravity/brain/448839c4-1fa8-4df0-b786-f221c67e6f50';
const targetDir = 'C:/Users/yadav/.gemini/antigravity/scratch/internnova-3d/public';

const filesToCopy = [
  { src: path.join(srcDir, '.user_uploaded/media_1791734589843_78b404d2.png'), dest: 'particles_sphere.png' },
  { src: path.join(srcDir, '.user_uploaded/media_1791734589845_f0f2f181.png'), dest: 'wave_ribbon.png' },
  { src: path.join(srcDir, '.user_uploaded/media_1791734589974_3d8a5517.png'), dest: 'nebula_cloud.png' },
  { src: path.join(srcDir, '.user_uploaded/media_1791734589995_3958a54f.png'), dest: 'hero_reference.png' },
  { src: path.join(srcDir, 'scratch/spline_robot_preview.jpg'), dest: 'robot_preview.jpg' },
  { src: path.join(srcDir, 'scratch/logo.png'), dest: 'logo.png' }
];

for (const f of filesToCopy) {
  if (fs.existsSync(f.src)) {
    const destPath = path.join(targetDir, f.dest);
    fs.copyFileSync(f.src, destPath);
    console.log(`Copied ${f.src} -> ${destPath} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.warn(`Source not found: ${f.src}`);
  }
}
