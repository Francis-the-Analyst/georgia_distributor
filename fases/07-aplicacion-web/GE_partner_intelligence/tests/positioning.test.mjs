import test from 'node:test';
import assert from 'node:assert/strict';
import {
  distributorX,
  potentialTier,
  projectX,
  shapeFor
} from '../scripts/lib/positioning.mjs';

test('potential thresholds put boundary scores in the correct tier', () => {
  assert.equal(potentialTier(100), 'high');
  assert.equal(potentialTier(75), 'high');
  assert.equal(potentialTier(74), 'medium');
  assert.equal(potentialTier(60), 'medium');
  assert.equal(potentialTier(59), 'low');
  assert.equal(potentialTier(0), 'low');
});

test('each distributor typology has a distinct geometric shape', () => {
  assert.equal(shapeFor('distributor', 'distributor'), 'square');
  assert.equal(shapeFor('distributor', 'fabricator'), 'diamond');
  assert.equal(shapeFor('distributor', 'hybrid'), 'triangle');
});

test('each project typology has a distinct geometric shape', () => {
  assert.equal(shapeFor('projects', 'developer'), 'square');
  assert.equal(shapeFor('projects', 'specifier'), 'triangle');
  assert.equal(shapeFor('projects', 'integrated'), 'diamond');
});

test('distributor readiness uses the 50-point distributor component maximum', () => {
  assert.equal(distributorX({
    capacidad_compra_stock_proceso: 20,
    cobertura_red: 15,
    contactabilidad: 10,
    actividad_reciente: 5
  }, 'distributor'), 100);
});

test('fabricator and hybrid readiness use the processor component family', () => {
  assert.equal(distributorX({
    capacidad_proceso_instalacion: 10,
    ubicacion_logistica: 10,
    contactabilidad: 5,
    actividad_reciente: 0
  }, 'hybrid'), 50);
  assert.equal(distributorX({
    capacidad_proceso_instalacion: 10,
    ubicacion_logistica: 10,
    contactabilidad: 5,
    actividad_reciente: 0
  }, 'fabricator'), 50);
});

test('project maturity uses the 40-point access component maximum', () => {
  assert.equal(projectX({
    potencial_proyectos: 15,
    cobertura_red: 10,
    contactabilidad: 10,
    actividad_reciente: 5
  }), 100);
});

test('position calculations clamp and round output', () => {
  assert.equal(projectX({
    potencial_proyectos: 7.777,
    cobertura_red: 0,
    contactabilidad: 0,
    actividad_reciente: 0
  }), 19.4);
  assert.equal(distributorX({
    capacidad_compra_stock_proceso: 100,
    cobertura_red: 100,
    contactabilidad: 100,
    actividad_reciente: 100
  }, 'distributor'), 100);
});

test('unsupported positioning categories fail loudly', () => {
  assert.throws(() => shapeFor('distributor', 'unknown'), /Unsupported typology/);
  assert.throws(() => distributorX({}, 'unknown'), /Unsupported scoring family/);
});
