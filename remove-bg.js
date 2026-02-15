const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

async function removeBg() {
  const inputPath = path.join(__dirname, '..', 'hector sedo.jpeg');
  const outputPath = path.join(__dirname, 'public', 'team', 'hector-sedo-nobg.png');
  
  console.log('Removing background from:', inputPath);
  
  const blob = await removeBackground('file://' + inputPath.replace(/\\/g, '/'));
  const buffer = Buffer.from(await blob.arrayBuffer());
  
  fs.writeFileSync(outputPath, buffer);
  console.log('Background removed! Saved to:', outputPath);
}

removeBg().catch(console.error);
