import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { distributorX, potentialTier, projectX, shapeFor } from './positioning.mjs';

const DEFAULT_SOURCE_DIR = new URL('../../source-data/', import.meta.url);

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === '') return [];
  return [value];
}

async function readJson(sourceDir, filename) {
  const url = sourceDir instanceof URL
    ? new URL(filename, sourceDir)
    : new URL(filename, pathToFileURL(`${resolve(sourceDir)}/`));
  return JSON.parse(await readFile(url, 'utf8'));
}

function indexById(records, label) {
  const index = new Map();
  for (const record of records) {
    if (!record.id) throw new Error(`${label} record is missing an ID`);
    if (index.has(record.id)) throw new Error(`Duplicate ${label} ID: ${record.id}`);
    index.set(record.id, record);
  }
  return index;
}

function checkedScore(score, id) {
  if (!score) throw new Error(`Missing score for ${id}`);
  if (!Number.isFinite(score.total) || score.total < 0 || score.total > 100) {
    throw new Error(`Invalid score total for ${id}`);
  }
  const componentTotal = Object.values(score.componentes || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  if (componentTotal !== score.total) throw new Error(`Score components do not total ${score.total} for ${id}`);
  if (!asArray(score.evidence_ids).length) throw new Error(`Missing score evidence for ${id}`);
  return score;
}

function distributorRecord(record, score, typology, scoringFamily) {
  const checked = checkedScore(score, record.id);
  return {
    id: record.id,
    name: record.nombre,
    city: record.ciudad || 'No confirmado',
    coverage: record.cobertura || 'No confirmado',
    channel: 'distributor',
    source_family: scoringFamily,
    typology,
    shape: shapeFor('distributor', typology),
    group: checked.grupo,
    score_total: checked.total,
    score_components: checked.componentes,
    score_interpretation: checked.interpretacion,
    potential: potentialTier(checked.total),
    position_x: distributorX(checked.componentes, scoringFamily === 'distributor' ? 'distributor' : typology),
    materials: asArray(record.materiales),
    brands: asArray(record.marcas_visibles),
    services: asArray(record.servicios || record.tipo),
    signals: asArray(record.señales_comerciales || record.señales_competencia),
    contact: record.contacto_publico || {},
    evidence_status: record.estado_evidencia || 'No confirmado',
    confidence: record.confianza || 'No confirmado',
    next_action: record.next_action || 'No confirmado',
    evidence_ids: unique([...asArray(record.evidence_ids), ...asArray(checked.evidence_ids)])
  };
}

function projectRecord(record, score, typology, developmentCount) {
  const checked = checkedScore(score, record.id);
  return {
    id: record.id,
    name: record.nombre,
    city: record.ciudad_base || 'No confirmado',
    cities: asArray(record.zonas),
    coverage: record.cobertura || 'No confirmado',
    channel: 'projects',
    typology,
    shape: shapeFor('projects', typology),
    group: checked.grupo,
    score_total: checked.total,
    score_components: checked.componentes,
    score_interpretation: checked.interpretacion,
    potential: potentialTier(checked.total),
    position_x: projectX(checked.componentes),
    sectors: asArray(record.sectores),
    published_projects: asArray(record.proyectos_publicados),
    signals: asArray(record.señales),
    contact: record.contacto_publico || {},
    evidence_status: record.estado_evidencia || 'No confirmado',
    confidence: record.confianza || 'No confirmado',
    next_action: record.hipotesis_puerta_fria || record['hipotesis_puerta_fría'] || 'No confirmado',
    development_count: developmentCount,
    evidence_ids: unique([...asArray(record.evidence_ids), ...asArray(checked.evidence_ids)])
  };
}

export async function buildAppData(options = {}) {
  const sourceDir = options.sourceDir || DEFAULT_SOURCE_DIR;
  const [projects, distributors, hybrids, competition, scoring, developments, classifications] = await Promise.all([
    readJson(sourceDir, 'proyectos.json'),
    readJson(sourceDir, 'distribuidores.json'),
    readJson(sourceDir, 'hibridos.json'),
    readJson(sourceDir, 'competencia.json'),
    readJson(sourceDir, 'scoring-inicial.json'),
    readJson(sourceDir, 'desarrollos.json'),
    readJson(sourceDir, 'app-account-classification.json')
  ]);

  const distributorScores = indexById(scoring.distribuidores, 'distributor score');
  const hybridScores = indexById(scoring.hibridos, 'hybrid score');
  const projectScores = indexById(scoring.proyectos, 'project score');
  const developmentCounts = new Map();

  for (const development of developments.desarrollos) {
    developmentCounts.set(development.actor_id, (developmentCounts.get(development.actor_id) || 0) + 1);
  }

  const distributorAccounts = [
    ...distributors.organizaciones.map((record) => distributorRecord(
      record,
      distributorScores.get(record.id),
      classifications.distributor[record.id],
      'distributor'
    )),
    ...hybrids.organizaciones.map((record) => distributorRecord(
      record,
      hybridScores.get(record.id),
      classifications.distributor[record.id],
      'hybrid'
    ))
  ];
  const publicDistributorTargets = new Set(classifications.public_distributor_targets);
  const publicDistributorAccounts = distributorAccounts.filter((record) => publicDistributorTargets.has(record.id));

  const projectActors = projects.organizaciones.map((record) => projectRecord(
    record,
    projectScores.get(record.id),
    classifications.projects[record.id],
    developmentCounts.get(record.id) || 0
  ));

  indexById(distributorAccounts, 'application distributor');
  indexById(projectActors, 'application project');
  const projectActorIds = new Set(projectActors.map((record) => record.id));
  for (const development of developments.desarrollos) {
    if (!projectActorIds.has(development.actor_id)) {
      throw new Error(`Development ${development.id} references unknown actor ${development.actor_id}`);
    }
  }

  return {
    meta: {
      market: 'Georgia',
      generated_from: scoring.fecha_corte,
      evidence_cutoff: developments.fecha_corte,
      status: 'provisional_research_for_commercial_qualification'
    },
    distributors: publicDistributorAccounts.sort((a, b) => a.id.localeCompare(b.id)),
    projects: projectActors.sort((a, b) => a.id.localeCompare(b.id)),
    developments: [...developments.desarrollos].sort((a, b) => a.id.localeCompare(b.id)),
    competition: competition.marcas.map((record) => ({
      id: record.id,
      brand: record.marca,
      category: record.categoria,
      visible_channel: record.canal_visible,
      geography: asArray(record.geografia),
      relationship: record.relacion,
      evidence_ids: asArray(record.evidence_ids)
    })).sort((a, b) => a.id.localeCompare(b.id))
  };
}

export const defaultSourceDirectory = fileURLToPath(DEFAULT_SOURCE_DIR);
