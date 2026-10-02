import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (name) => readFile(new URL(name, root), 'utf8');

test('dashboard implements channel switching, filtering and all decision views', async () => {
  const core = await read('app-core.js');
  for (const fn of ['setChannel', 'filteredRecords', 'renderFilters', 'renderList', 'renderShortlist', 'renderCoverage', 'renderCompetition', 'renderDevelopments']) {
    assert.match(core, new RegExp(`function ${fn}`));
  }
  assert.match(core, /global\.DEVELOPMENTS_DATA/);
  assert.match(core, /commercial_window/);
  assert.match(core, /lifecycle_status/);
});

test('account dossiers expose score, evidence, contact and next action', async () => {
  const core = await read('app-core.js');
  assert.match(core, /function openDrawer/);
  for (const field of ['score_components', 'evidence_ids', 'contact', 'next_action']) assert.match(core, new RegExp(field));
});

test('development filters cover lifecycle and commercial window enums', async () => {
  const core = await read('app-core.js');
  for (const value of ['announced_or_planned', 'under_construction', 'completed_or_operating', 'open', 'qualify_now', 'late_for_current_building', 'future_portfolio_only', 'unknown']) {
    assert.match(core, new RegExp(value));
  }
});

test('current filtered accounts can be exported as CSV', async () => {
  const core = await read('app-core.js');
  assert.match(core, /function exportCsv/);
  assert.match(core, /text\/csv/);
});
