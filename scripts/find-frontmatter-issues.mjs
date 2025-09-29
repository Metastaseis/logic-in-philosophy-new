import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';

function stripBOM(s){ return s.charCodeAt(0) === 0xFEFF ? s.slice(1) : s; }

const patterns = ['src/**/*.{md,mdx,astro}'];
const files = await fg(patterns, { dot: false });

let failures = 0;

for (const file of files) {
  const raw = stripBOM(fs.readFileSync(file, 'utf8'));
  // Only parse matter if file starts with '---' at byte 0; otherwise skip
  if (!raw.startsWith('---')) continue;
  try {
    matter(raw); // will throw on malformed YAML
  } catch (err) {
    failures++;
    console.error(`❌ Front-matter error in: ${file}\n   → ${err.message}\n`);
  }
}

if (failures === 0) {
  console.log('✅ No front-matter parse errors detected.');
} else {
  process.exitCode = 1;
}
