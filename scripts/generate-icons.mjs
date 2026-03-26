import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'public', 'icons');

mkdirSync(iconsDir, { recursive: true });

// SVG icon: blue background + white building icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#1D4ED8"/>
  <!-- Building -->
  <rect x="156" y="200" width="200" height="220" rx="8" fill="white" opacity="0.95"/>
  <!-- Roof / triangle -->
  <polygon points="256,100 136,210 376,210" fill="white" opacity="0.95"/>
  <!-- Door -->
  <rect x="220" y="330" width="72" height="90" rx="6" fill="#1D4ED8"/>
  <!-- Windows left column -->
  <rect x="176" y="238" width="44" height="40" rx="4" fill="#1D4ED8" opacity="0.7"/>
  <rect x="176" y="296" width="44" height="40" rx="4" fill="#1D4ED8" opacity="0.7"/>
  <!-- Windows right column -->
  <rect x="292" y="238" width="44" height="40" rx="4" fill="#1D4ED8" opacity="0.7"/>
  <rect x="292" y="296" width="44" height="40" rx="4" fill="#1D4ED8" opacity="0.7"/>
</svg>`;

const svgBuffer = Buffer.from(svgIcon);

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const { name, size } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, name));
  console.log(`✓ Generated ${name} (${size}x${size})`);
}

console.log('All icons generated successfully!');
