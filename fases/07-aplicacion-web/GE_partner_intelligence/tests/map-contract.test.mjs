import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (name) => readFile(new URL(name, root), 'utf8');

test('potential palette is green, orange and grey', async () => {
  const css = await read('proposal_A.css');
  assert.match(css, /--priority-high:\s*#147a57/i);
  assert.match(css, /--priority-medium:\s*#b45f06/i);
  assert.match(css, /--priority-low:\s*#6b7072/i);
});

test('map renders explicit channel axes and three typology shapes', async () => {
  const core = await read('app-core.js');
  for (const label of [
    'Operational and channel capability',
    'Cosentino commercial potential',
    'Project maturity and access',
    'Cosentino specification potential'
  ]) assert.match(core, new RegExp(label));
  assert.match(core, /function renderMap/);
  assert.match(core, /shape-square/);
  assert.match(core, /shape-diamond/);
  assert.match(core, /shape-triangle/);
  assert.match(core, /map-label/);
});

test('map preserves precomputed X positions and score totals', async () => {
  const core = await read('app-core.js');
  assert.match(core, /position_x/);
  assert.match(core, /score_total/);
  assert.doesNotMatch(core, /Math\.random/);
});
