import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAppData } from '../scripts/lib/build-app-data.mjs';

test('builder joins canonical accounts, scores, classifications and developments', async () => {
  const app = await buildAppData();

  assert.equal(app.distributors.length, 10);
  assert.equal(app.projects.length, 12);
  assert.equal(app.competition.length, 10);
  assert.equal(app.developments.length, 26);

  for (const record of [...app.distributors, ...app.projects]) {
    assert.equal(typeof record.score_total, 'number', record.id);
    assert.ok(record.evidence_ids.length > 0, record.id);
    assert.ok(['high', 'medium', 'low'].includes(record.potential), record.id);
    assert.ok(['square', 'diamond', 'triangle'].includes(record.shape), record.id);
    assert.ok(record.position_x >= 0 && record.position_x <= 100, record.id);
  }
});

test('public distributor channel contains exactly the approved ten targets', async () => {
  const app = await buildAppData();

  assert.deepEqual(
    app.distributors.map((record) => record.id).sort(),
    [
      'allstone',
      'amtile',
      'arestone',
      'ceramaspace',
      'decomix',
      'marmlux',
      'premiergranite',
      'qutstone',
      'vaskaniya',
      'zodi-plus'
    ]
  );
});

test('known records use the approved positioning formulas', async () => {
  const app = await buildAppData();
  const zodi = app.distributors.find((record) => record.id === 'zodi-plus');
  const vaskaniya = app.distributors.find((record) => record.id === 'vaskaniya');
  const signy = app.projects.find((record) => record.id === 'signy');

  assert.deepEqual(
    { score: zodi.score_total, x: zodi.position_x, potential: zodi.potential, shape: zodi.shape },
    { score: 87, x: 90, potential: 'high', shape: 'square' }
  );
  assert.deepEqual(
    { score: vaskaniya.score_total, x: vaskaniya.position_x, potential: vaskaniya.potential, shape: vaskaniya.shape },
    { score: 77, x: 80, potential: 'high', shape: 'diamond' }
  );
  assert.deepEqual(
    { score: signy.score_total, x: signy.position_x, potential: signy.potential, shape: signy.shape },
    { score: 89, x: 77.5, potential: 'high', shape: 'triangle' }
  );
});

test('all developments reference a known project actor', async () => {
  const app = await buildAppData();
  const actorIds = new Set(app.projects.map((record) => record.id));

  for (const development of app.developments) {
    assert.ok(actorIds.has(development.actor_id), development.id);
  }
});
