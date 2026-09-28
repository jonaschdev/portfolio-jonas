import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const svgPath = path.resolve('public/favicon.svg');
const svg = fs.readFileSync(svgPath, 'utf8');

const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1024,
  },
  shapeRendering: 2,
  textRendering: 1,
  imageRendering: 0,
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync(path.resolve('public/ulquiorra-icon.png'), pngBuffer);
fs.writeFileSync(path.resolve('public/icon.png'), pngBuffer);
console.log('Successfully generated high-resolution PNG icon at 1024x1024!');
