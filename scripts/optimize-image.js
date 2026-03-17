const sharp = require('sharp');
const path = require('path');

async function optimizeGalaxy() {
  const input = path.join(__dirname, '../public/images/galaxy-bg.jpg');
  const output = path.join(__dirname, '../public/images/galaxy-bg-optimized.webp');
  
  await sharp(input)
    .resize(3840, 2160, { // 4K but reasonable
      fit: 'cover',
      withoutEnlargement: true
    })
    .webp({ quality: 85 }) // High quality WebP
    .toFile(output);
  
  console.log('✅ Galaxy image optimized!');
  console.log(`Original: ${(await sharp(input).metadata()).size / 1024 / 1024} MB`);
  console.log(`Optimized: ${(await sharp(output).metadata()).size / 1024 / 1024} MB`);
}

optimizeGalaxy().catch(console.error);
