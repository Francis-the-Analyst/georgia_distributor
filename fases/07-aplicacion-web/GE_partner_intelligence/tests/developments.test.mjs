import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const allowedLifecycle = new Set([
  'announced_or_planned',
  'approved_preconstruction',
  'design_or_procurement',
  'under_construction',
  'fit_out_or_finishing',
  'completed_or_operating',
  'unknown'
]);

const allowedWindows = new Set([
  'open',
  'qualify_now',
  'late_for_current_building',
  'future_portfolio_only',
  'unknown'
]);

test('every development has a valid lifecycle, commercial window and evidence', async () => {
  const path = new URL('../source-data/desarrollos.json', import.meta.url);
  const data = JSON.parse(await readFile(path, 'utf8'));

  assert.equal(data.desarrollos.length, 26);

  const ids = new Set();
  for (const development of data.desarrollos) {
    assert.ok(!ids.has(development.id), `duplicate ID: ${development.id}`);
    ids.add(development.id);
    assert.ok(allowedLifecycle.has(development.lifecycle_status), development.id);
    assert.ok(allowedWindows.has(development.commercial_window), development.id);
    assert.ok(development.source_urls.length > 0, development.id);
    assert.ok(development.evidence_ids.length > 0, development.id);
    assert.ok(development.project_partner_roles.length > 0, development.id);
    if (development.lifecycle_status !== 'unknown') {
      assert.notEqual(development.status_evidence, 'No confirmado', development.id);
    }
  }
});

test('the dataset distinguishes open, urgent and closed current-building windows', async () => {
  const path = new URL('../source-data/desarrollos.json', import.meta.url);
  const data = JSON.parse(await readFile(path, 'utf8'));
  const windows = new Set(data.desarrollos.map((item) => item.commercial_window));

  assert.ok(windows.has('open'));
  assert.ok(windows.has('qualify_now'));
  assert.ok(windows.has('late_for_current_building'));
  assert.ok(windows.has('future_portfolio_only'));
});
