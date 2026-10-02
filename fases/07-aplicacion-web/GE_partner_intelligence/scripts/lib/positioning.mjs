const SHAPES = Object.freeze({
  distributor: Object.freeze({
    distributor: 'square',
    fabricator: 'diamond',
    hybrid: 'triangle'
  }),
  projects: Object.freeze({
    developer: 'square',
    specifier: 'triangle',
    integrated: 'diamond'
  })
});

function numeric(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalize(sum, maximum) {
  const value = Math.max(0, Math.min(100, (sum / maximum) * 100));
  return Math.round(value * 10) / 10;
}

export function potentialTier(total) {
  const score = numeric(total);
  if (score >= 75) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

export function shapeFor(channel, typology) {
  const channelShapes = SHAPES[channel];
  const shape = channelShapes && channelShapes[typology];
  if (!shape) {
    throw new Error(`Unsupported typology "${typology}" for channel "${channel}"`);
  }
  return shape;
}

export function distributorX(components, family) {
  let keys;
  if (family === 'distributor') {
    keys = [
      'capacidad_compra_stock_proceso',
      'cobertura_red',
      'contactabilidad',
      'actividad_reciente'
    ];
  } else if (family === 'hybrid' || family === 'fabricator') {
    keys = [
      'capacidad_proceso_instalacion',
      'ubicacion_logistica',
      'contactabilidad',
      'actividad_reciente'
    ];
  } else {
    throw new Error(`Unsupported scoring family "${family}"`);
  }

  return normalize(keys.reduce((sum, key) => sum + numeric(components[key]), 0), 50);
}

export function projectX(components) {
  const keys = [
    'potencial_proyectos',
    'cobertura_red',
    'contactabilidad',
    'actividad_reciente'
  ];
  return normalize(keys.reduce((sum, key) => sum + numeric(components[key]), 0), 40);
}
