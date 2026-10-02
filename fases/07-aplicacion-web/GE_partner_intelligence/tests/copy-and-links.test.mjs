import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

async function page(name) {
  return readFile(new URL(name, root), 'utf8');
}

test('cover and application expose only Georgia distributor/projects channels', async () => {
  const html = `${await page('index_R_P.html')}\n${await page('proposal_A.html')}`;
  assert.match(html, /Georgia/);
  assert.doesNotMatch(html, /Bulgaria|Retail intelligence|channel=retail|channel=proyectos/i);
  assert.match(html, /channel=distributor/);
  assert.match(html, /channel=projects/);
  assert.match(html, /id="lang-en"/);
  assert.match(html, /id="lang-es"/);
  assert.doesNotMatch(html, /id="lang-(bg|ru)"/);
});

test('generated data loads before the application core', async () => {
  for (const name of ['index_R_P.html', 'proposal_A.html']) {
    const html = await page(name);
    assert.ok(html.indexOf('data.js') < html.indexOf('app-core.js'), `${name} must load data first`);
  }
});

test('application core is bilingual and uses generated Georgia datasets', async () => {
  const core = await page('app-core.js');
  assert.match(core, /LANGS\s*=\s*\['en',\s*'es'\]/);
  assert.match(core, /DISTRIBUTOR_DATA/);
  assert.match(core, /PROJECTS_DATA/);
  assert.doesNotMatch(core, /RETAIL_DATA|PROYECTOS_DATA|\['en',\s*'bg',\s*'ru'\]/);
});
