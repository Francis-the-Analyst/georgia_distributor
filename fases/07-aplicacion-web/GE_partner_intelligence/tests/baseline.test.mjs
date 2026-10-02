import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('the Georgia shell exposes the two approved intelligence channels', async () => {
  const cover = await readFile(new URL('index_R_P.html', root), 'utf8');
  const app = await readFile(new URL('proposal_A.html', root), 'utf8');

  assert.match(cover, /Georgia/);
  assert.match(cover, /Distributor Intelligence/);
  assert.match(cover, /Projects Intelligence/);
  assert.match(cover, /id="stat-distributors">10</);
  assert.match(app, /app-core\.js/);
  assert.doesNotMatch(cover + app, /Bulgaria · Partner Intelligence/);
});
