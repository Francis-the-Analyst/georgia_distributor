import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const canonicalRoot = fileURLToPath(new URL('../../../../datos/', import.meta.url));
const targetRoot = fileURLToPath(new URL('../source-data/', import.meta.url));
const files = [
  'proyectos.json',
  'distribuidores.json',
  'hibridos.json',
  'competencia.json',
  'scoring-inicial.json',
  'desarrollos.json',
  'app-account-classification.json'
];

await mkdir(targetRoot, { recursive: true });

for (const file of files) {
  await copyFile(new URL(`../../../../datos/${file}`, import.meta.url), new URL(`../source-data/${file}`, import.meta.url));
}

console.log(`Synchronized ${files.length} canonical data files from ${canonicalRoot} to ${targetRoot}`);
