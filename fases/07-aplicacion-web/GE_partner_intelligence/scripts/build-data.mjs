import { writeFile } from 'node:fs/promises';
import { buildAppData } from './lib/build-app-data.mjs';

const app = await buildAppData();
const banner = '/*! Generated from source-data by scripts/build-data.mjs. Do not hand-edit. */\n';
const output = [
  banner,
  `window.APP_META = ${JSON.stringify(app.meta, null, 2)};`,
  `window.DISTRIBUTOR_DATA = ${JSON.stringify(app.distributors, null, 2)};`,
  `window.PROJECTS_DATA = ${JSON.stringify(app.projects, null, 2)};`,
  `window.DEVELOPMENTS_DATA = ${JSON.stringify(app.developments, null, 2)};`,
  `window.COMPETITION_DATA = ${JSON.stringify(app.competition, null, 2)};`,
  ''
].join('\n');

await writeFile(new URL('../data.js', import.meta.url), output, 'utf8');
console.log(`Generated data.js: ${app.distributors.length} distributor accounts, ${app.projects.length} project actors, ${app.developments.length} developments, ${app.competition.length} competitor groups`);
