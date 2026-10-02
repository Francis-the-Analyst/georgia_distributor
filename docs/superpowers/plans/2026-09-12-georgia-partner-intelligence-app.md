# Georgia Partner Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a bilingual static Georgia Partner Intelligence application with separate Distributor and Projects channels, evidence-backed scoring maps and explicit project lifecycle windows.

**Architecture:** Adapt the existing Bulgaria HTML/CSS/JavaScript dashboard into an independent static application under `fases/07-aplicacion-web/GE_partner_intelligence/`. Synchronize canonical Georgia JSON into a versioned `source-data/` snapshot, then generate browser data through Node scripts while preserving separate scoring models and adding a source-backed developments lifecycle dataset. Keep the Bulgaria source untouched and publish the self-contained static folder to the empty remote repository `git@github.com:Francis-the-Analyst/georgia_distributor.git`.

**Tech Stack:** Static HTML5, CSS, browser JavaScript, Node.js ESM scripts, Node built-in test runner, Python local HTTP server, Playwright CLI, Git and Vercel static configuration.

**Spec:** `docs/superpowers/specs/2026-09-12-georgia-partner-intelligence-design.md`

## Global Constraints

- Keep the Bulgaria source directory unchanged.
- Application languages are Spanish and English; preserve original Georgian/Russian names and evidence where required.
- Channel 01 is `Distributor Intelligence`; it combines distributor/showroom, marmolista/fabricator and hybrid accounts.
- Channel 02 is `Projects Intelligence`; it combines project actors and named developments.
- Map Y is the existing 0–100 score; map X is a normalized operational/maturity score defined in the spec.
- Potential tiers are fixed: High ≥ 75, Medium 60–74, Low < 60.
- Potential colors are fixed: High green, Medium orange, Low gray.
- Shapes are fixed by channel typology and must remain clearly distinguishable without color.
- Unknown or provisional facts must display as `No confirmado` / `Not confirmed`.
- An announced project is not approved unless a source explicitly confirms approval.
- The application has no backend, authentication, CRM integration or outbound contact function.
- Remote delivery target is `git@github.com:Francis-the-Analyst/georgia_distributor.git`; the remote is empty as of 2026-09-12.

---

### Task 1: Create the independent static baseline and smoke test

**Files:**
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/index_R_P.html`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/proposal_A.html`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/base.css`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/brand-normalization.css`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/proposal_A.css`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/app-core.js`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/vercel.json`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/assets/*`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/baseline.test.mjs`

**Interfaces:**
- Consumes: the approved design and the Bulgaria reference directory.
- Produces: a standalone static shell whose relative assets resolve without modifying Bulgaria.

- [ ] **Step 1: Write the failing baseline test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('Georgia static shell has both entry pages and local assets', async () => {
  const cover = await readFile(new URL('index_R_P.html', root), 'utf8');
  const app = await readFile(new URL('proposal_A.html', root), 'utf8');
  assert.match(cover, /Georgia/);
  assert.match(cover, /Distributor Intelligence/);
  assert.match(cover, /Projects Intelligence/);
  assert.match(app, /app-core\.js/);
  assert.doesNotMatch(cover + app, /Bulgaria · Partner Intelligence/);
});
```

- [ ] **Step 2: Run the test and confirm it fails because the destination files do not exist**

Run: `node --test tests/baseline.test.mjs` from `GE_partner_intelligence`.

Expected: FAIL with an `ENOENT` error for `index_R_P.html`.

- [ ] **Step 3: Copy the static Bulgaria baseline into the independent destination**

Copy only `index_R_P.html`, `proposal_A.html`, `base.css`, `brand-normalization.css`, `proposal_A.css`, `app-core.js`, `vercel.json` and `assets/`. Do not copy Bulgaria research or generated datasets. Replace the visible country and channel names with Georgia, Distributor Intelligence and Projects Intelligence.

- [ ] **Step 4: Run the baseline test**

Run: `node --test tests/baseline.test.mjs`.

Expected: PASS.

- [ ] **Step 5: Record the baseline checkpoint**

Update `ESTATUS.md` with the destination path and state that the Bulgaria source was not changed.

### Task 2: Define account classifications and positioning math

**Files:**
- Create: `datos/app-account-classification.json`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/scripts/lib/positioning.mjs`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/positioning.test.mjs`

**Interfaces:**
- Produces: `potentialTier(total)`, `shapeFor(channel, typology)`, `distributorX(record, family)` and `projectX(record)`.
- Consumers: Tasks 4, 6 and 7.

- [ ] **Step 1: Create explicit account classifications**

Create JSON maps with these exact assignments:

```json
{
  "distributor": {
    "zodi-plus": "distributor",
    "amtile": "distributor",
    "ceramaspace": "distributor",
    "plastics-georgia": "distributor",
    "kraft": "distributor",
    "mosaics-showroom": "distributor",
    "decomix": "hybrid",
    "premiergranite": "fabricator",
    "arestone": "fabricator",
    "rocklux": "fabricator",
    "granite-diabaz": "fabricator",
    "fin-yapi": "hybrid",
    "marmlux": "hybrid",
    "vaskaniya": "fabricator",
    "qutstone": "fabricator",
    "lideni": "fabricator",
    "allstone": "hybrid"
  },
  "projects": {
    "petra-group": "developer",
    "elt-group": "developer",
    "gwg-development": "developer",
    "real-palace": "developer",
    "horizon-group": "developer",
    "konsol-holding": "integrated",
    "guru-holding": "integrated",
    "designbureau": "specifier",
    "signy": "specifier",
    "material-ge": "integrated",
    "kurdiani-architects": "specifier",
    "geometria": "specifier"
  }
}
```

- [ ] **Step 2: Write failing positioning tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { potentialTier, shapeFor, distributorX, projectX } from '../scripts/lib/positioning.mjs';

test('potential thresholds are exact', () => {
  assert.equal(potentialTier(75), 'high');
  assert.equal(potentialTier(74), 'medium');
  assert.equal(potentialTier(60), 'medium');
  assert.equal(potentialTier(59), 'low');
});

test('each channel typology has a distinct shape', () => {
  assert.equal(shapeFor('distributor', 'distributor'), 'square');
  assert.equal(shapeFor('distributor', 'fabricator'), 'diamond');
  assert.equal(shapeFor('distributor', 'hybrid'), 'triangle');
  assert.equal(shapeFor('projects', 'developer'), 'square');
  assert.equal(shapeFor('projects', 'specifier'), 'triangle');
  assert.equal(shapeFor('projects', 'integrated'), 'diamond');
});

test('X calculations normalize their defined component maxima', () => {
  assert.equal(distributorX({ capacidad_compra_stock_proceso: 20, cobertura_red: 15, contactabilidad: 10, actividad_reciente: 5 }, 'distributor'), 100);
  assert.equal(distributorX({ capacidad_proceso_instalacion: 10, ubicacion_logistica: 10, contactabilidad: 5, actividad_reciente: 0 }, 'hybrid'), 50);
  assert.equal(projectX({ potencial_proyectos: 15, cobertura_red: 10, contactabilidad: 10, actividad_reciente: 5 }), 100);
});
```

- [ ] **Step 3: Run tests and confirm missing-module failure**

Run: `node --test tests/positioning.test.mjs`.

Expected: FAIL because `positioning.mjs` does not exist.

- [ ] **Step 4: Implement the positioning functions**

Implement clamped 0–100 values rounded to one decimal. Throw a descriptive error for an unsupported channel/typology or scoring family rather than silently selecting a shape or formula.

- [ ] **Step 5: Run positioning tests**

Run: `node --test tests/positioning.test.mjs`.

Expected: PASS.

### Task 3: Enrich named developments with lifecycle and commercial window

**Files:**
- Create: `datos/desarrollos.json`
- Create: `fuentes/fase-07-proyectos-indice.md`
- Create: `.firecrawl/georgia-project-*.md`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/developments.test.mjs`

**Interfaces:**
- Produces: canonical development records with `lifecycle_status`, `status_evidence`, `status_date`, `commercial_window`, `window_reason` and `project_partner_roles`.
- Consumers: Tasks 4 and 8.

- [ ] **Step 1: Scrape the exact primary project pages**

Use Firecrawl on the project pages already discovered for Petra Group, Real Palace, Horizon Group and Guru Holding, plus the existing primary pages for ELT Group, GWG Development and Konsol Holding. Save each result under `.firecrawl/georgia-project-<slug>.md` and index its URL, retrieval date and language.

Required project-page set:

```text
https://petragroup.ge/en/petra
https://petragroup.ge/en/pullman
https://petragroup.ge/en/hotel-and-residences-gudauri
https://petragroup.ge/en/composers-resort-borjomi
https://realpalace.ge/en/projects/alto
https://realpalace.ge/en/projects/arbour
https://realpalace.ge/en/projects/green
https://realpalace.ge/en/projects/blue
https://horizonsbatumi.com/our-projects
https://horizonsbatumi.com/horizon-elegance
https://guruholding.ge/project_gurustatus
https://guruholding.ge/project_residence
https://guruholding.ge/project_startup
https://guruholding.ge/project_subtropical
```

- [ ] **Step 2: Create one canonical record per evidenced development**

Use this exact contract:

```json
{
  "id": "company-project-slug",
  "project_name": "Public project name",
  "actor_id": "matching datos/proyectos.json ID",
  "city": "city or No confirmado",
  "sector": ["residential", "hospitality"],
  "lifecycle_status": "unknown",
  "status_evidence": "No confirmado",
  "status_date": "No confirmado",
  "commercial_window": "unknown",
  "window_reason": "No hay evidencia temporal suficiente para estimar la ventana de entrada.",
  "project_partner_roles": ["developer"],
  "source_urls": ["https://primary-source.example/project"],
  "evidence_ids": ["proj-example-fc-001"]
}
```

Use only the lifecycle enums from the spec. Assign `late_for_current_building` to completed/operating projects and to finishing projects when surfaces are likely already purchased, while preserving `future_portfolio_only` when the actor remains commercially relevant. Use `unknown` whenever the source does not establish timing.

- [ ] **Step 3: Write lifecycle validation tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const allowedLifecycle = new Set(['announced_or_planned','approved_preconstruction','design_or_procurement','under_construction','fit_out_or_finishing','completed_or_operating','unknown']);
const allowedWindows = new Set(['open','qualify_now','late_for_current_building','future_portfolio_only','unknown']);

test('every development has a valid lifecycle, window and source', async () => {
  const path = new URL('../source-data/desarrollos.json', import.meta.url);
  const data = JSON.parse(await readFile(path, 'utf8'));
  assert.ok(data.desarrollos.length > 0);
  for (const dev of data.desarrollos) {
    assert.ok(allowedLifecycle.has(dev.lifecycle_status), dev.id);
    assert.ok(allowedWindows.has(dev.commercial_window), dev.id);
    assert.ok(dev.source_urls.length > 0, dev.id);
    if (dev.lifecycle_status !== 'unknown') assert.notEqual(dev.status_evidence, 'No confirmado', dev.id);
  }
});
```

- [ ] **Step 4: Run lifecycle tests**

Run: `node --test tests/developments.test.mjs`.

Expected: PASS after `datos/desarrollos.json` is populated.

- [ ] **Step 5: Document the evidence boundary**

In `fuentes/fase-07-proyectos-indice.md`, state which developments are current opportunities, which are finishing/completed references and which remain unknown. Explicitly separate company/partner relevance from the opportunity window of an individual building.

### Task 4: Build and validate generated application data

**Files:**
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/scripts/lib/build-app-data.mjs`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/scripts/sync-source-data.mjs`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/scripts/build-data.mjs`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/scripts/validate-data.mjs`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/data.js`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/source-data/*.json`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/build-data.test.mjs`

**Interfaces:**
- Produces: `window.DISTRIBUTOR_DATA`, `window.PROJECTS_DATA`, `window.DEVELOPMENTS_DATA`, `window.COMPETITION_DATA`.
- Consumers: all browser views.

- [ ] **Step 1: Write the failing data-builder test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAppData } from '../scripts/lib/build-app-data.mjs';

test('builder joins canonical records to scores and classifications', async () => {
  const app = await buildAppData();
  assert.equal(app.distributors.length, 17);
  assert.equal(app.projects.length, 12);
  assert.equal(app.competition.length, 10);
  assert.ok(app.developments.length > 0);
  for (const record of [...app.distributors, ...app.projects]) {
    assert.equal(typeof record.score_total, 'number');
    assert.ok(record.evidence_ids.length > 0);
    assert.ok(['high','medium','low'].includes(record.potential));
    assert.ok(['square','diamond','triangle'].includes(record.shape));
  }
});
```

- [ ] **Step 2: Run the builder test and confirm it fails**

Run: `node --test tests/build-data.test.mjs`.

Expected: FAIL because `build-app-data.mjs` does not exist.

- [ ] **Step 3: Implement canonical joins**

Implement `sync-source-data.mjs` to copy the seven approved JSON files from the workspace `datos/` directory into local `source-data/`. Join the local snapshots by exact ID. Reject missing scores, duplicate IDs, missing classifications, totals outside 0–100 or missing evidence. Preserve all score components and source-backed text. Do not mutate source JSON.

- [ ] **Step 4: Implement deterministic JavaScript generation**

`build-data.mjs` must serialize the four arrays as `window.*` assignments in stable ID order and include the source cutoff date. `validate-data.mjs` must import the builder and exit non-zero on any contract violation.

- [ ] **Step 5: Generate and validate `data.js`**

Run:

```powershell
node scripts/sync-source-data.mjs
node scripts/build-data.mjs
node scripts/validate-data.mjs
node --test tests/build-data.test.mjs
```

Expected: all commands exit 0; counts are 17 distributor accounts, 12 project actors and 10 competitor groups, plus the actual validated development count.

### Task 5: Adapt the cover, identity and bilingual copy

**Files:**
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/index_R_P.html`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/proposal_A.html`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/app-core.js`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/copy-and-links.test.mjs`

**Interfaces:**
- Consumes: generated datasets and the existing Bulgaria interaction contract.
- Produces: Georgia cover and EN/ES channel navigation.

- [ ] **Step 1: Write failing copy and navigation tests**

Test that both pages contain Georgia identity, `Distributor Intelligence`, `Projects Intelligence`, EN/ES controls and the correct hash links, while excluding Bulgaria/BG language controls and Retail Intelligence.

- [ ] **Step 2: Run the test and confirm reference-copy failures**

Run: `node --test tests/copy-and-links.test.mjs`.

Expected: FAIL on Bulgaria, Retail or BG/RU assertions before adaptation.

- [ ] **Step 3: Implement translated copy and dynamic counts**

Use `LANGS = ['en', 'es']`. Keep the reference authorship and product links. The cover must calculate 17 combined distributor accounts and 12 project actors from generated arrays rather than hard-coded text.

- [ ] **Step 4: Run copy tests**

Run: `node --test tests/copy-and-links.test.mjs`.

Expected: PASS.

### Task 6: Adapt channels, KPIs, filters and shared views

**Files:**
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/app-core.js`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/proposal_A.html`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/channel-contract.test.mjs`

**Interfaces:**
- Consumes: the four `window.*_DATA` arrays.
- Produces: channel switching, KPIs, search, typology/potential/city/group/evidence filters and hash persistence.

- [ ] **Step 1: Write a failing browser-contract test**

Assert that `getDataset('distributor')` selects `DISTRIBUTOR_DATA`, `getDataset('projects')` selects `PROJECTS_DATA`, shared filters use canonical `potential`, `typology`, `city`, `group` and `evidence_status`, and unknown channels throw or safely fall back to Distributor without loading Bulgaria names.

- [ ] **Step 2: Run the test and confirm old channel failures**

Run: `node --test tests/channel-contract.test.mjs`.

Expected: FAIL because the copied code still expects `retail` and `proyectos`.

- [ ] **Step 3: Implement the two Georgia channels**

Replace Retail-specific scoring at runtime with precomputed Georgia values. Preserve search, sorting, shortlist, coverage, competition, hash navigation and CSV export. Add project lifecycle/window filters only when the developments view is active.

- [ ] **Step 4: Run channel tests**

Run: `node --test tests/channel-contract.test.mjs`.

Expected: PASS.

### Task 7: Implement the legible positioning maps

**Files:**
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/app-core.js`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/base.css`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/map-contract.test.mjs`

**Interfaces:**
- Consumes: `score_total`, `position_x`, `potential`, `shape`, localized labels and filtered records.
- Produces: accessible SVG maps for both channels.

- [ ] **Step 1: Write failing map-contract tests**

Assert generated SVG contains X/Y titles, low/high axis endpoints, four action-zone labels, a legend entry for every visible shape, CSS classes `potential-high`, `potential-medium`, `potential-low`, and an accessible label containing account name, city, typology and score.

- [ ] **Step 2: Run the map tests and confirm missing Georgia semantics**

Run: `node --test tests/map-contract.test.mjs`.

Expected: FAIL because the reference map uses Bulgaria axis and priority semantics.

- [ ] **Step 3: Render exact shape geometry**

Use SVG `<rect>` for square, a rotated square/path for diamond and `<polygon>` for triangle. Keep a transparent hit area around each point. Do not use the same SVG shape with only a CSS class change.

- [ ] **Step 4: Render exact colors and text labels**

Define `--potential-high: #147A57`, `--potential-medium: #B45F06` and `--potential-low: #6B7072`. Draw a short account label next to each point. Preserve true coordinates, nudge labels/points to prevent overlap and draw a guide line when displacement exceeds 10 pixels.

- [ ] **Step 5: Make axes and legends responsive**

Keep a minimum SVG width of 720 pixels on small screens with horizontal scrolling. Axis titles, endpoints, zones and legends must remain visible rather than being removed at mobile breakpoints.

- [ ] **Step 6: Run map tests**

Run: `node --test tests/map-contract.test.mjs`.

Expected: PASS.

### Task 8: Implement dossiers, developments and evidence-safe exports

**Files:**
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/app-core.js`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/proposal_A.html`
- Modify: `fases/07-aplicacion-web/GE_partner_intelligence/base.css`
- Test: `fases/07-aplicacion-web/GE_partner_intelligence/tests/detail-and-developments.test.mjs`

**Interfaces:**
- Produces: account drawer, score breakdown, sources, development table, lifecycle/window badges and filtered CSV.

- [ ] **Step 1: Write failing detail/development tests**

Test that an account drawer includes score, X calculation, evidence state, evidence IDs, source/contact, next action and `No confirmado` fallback. Test that development rows contain lifecycle, commercial window, status evidence and actor link.

- [ ] **Step 2: Run tests and confirm failures**

Run: `node --test tests/detail-and-developments.test.mjs`.

Expected: FAIL on Georgia-specific fields.

- [ ] **Step 3: Implement account dossiers and source safety**

Escape all values before HTML insertion, allow only `http:`/`https:` source links and use `mailto:`/`tel:` links only for explicit public contacts. Show provisional labels beside web-derived claims.

- [ ] **Step 4: Implement developments view**

Add selectors for lifecycle, commercial window and city. Keep completed projects visible but label them `late for current building` or `future portfolio only`; do not color them as low potential unless the actor score itself is low.

- [ ] **Step 5: Implement filtered CSV exports**

Account exports include score, X, potential, shape, group and evidence IDs. Development exports include lifecycle, status evidence/date, commercial window/reason, roles and source URLs.

- [ ] **Step 6: Run detail/development tests**

Run: `node --test tests/detail-and-developments.test.mjs`.

Expected: PASS.

### Task 9: Run responsive, accessibility and interaction verification

**Files:**
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/tests/rendered-html.test.mjs`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/VERIFICACION.md`

**Interfaces:**
- Consumes: complete static application.
- Produces: reproducible verification evidence and screenshots if useful.

- [ ] **Step 1: Run all automated tests and data validation**

Run:

```powershell
node scripts/validate-data.mjs
node --test tests/*.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Start a local HTTP server**

Run from `GE_partner_intelligence`:

```powershell
python -m http.server 4173
```

Expected: `http://127.0.0.1:4173/index_R_P.html` returns HTTP 200.

- [ ] **Step 3: Verify desktop flows with Playwright CLI**

Check cover, both channel cards, EN/ES switch, every view, map labels, all filters, drawer opening/closing, hash reload and CSV export at 1440×900.

- [ ] **Step 4: Verify mobile flows with Playwright CLI**

Repeat at 390×844. Confirm keyboard focus, filter drawer, horizontal map scrolling, visible axes/legend and no clipped detail panel.

- [ ] **Step 5: Record exact results**

Write commands, pass/fail counts, tested viewport sizes and any known limitations in `VERIFICACION.md`. Stop the local server.

### Task 10: Final checkpoint and remote publication

**Files:**
- Modify: `ESTATUS.md`
- Modify: `RESUMEN-EJECUTIVO-2026-09-12.md`
- Create: `fases/07-aplicacion-web/GE_partner_intelligence/README.md`

**Interfaces:**
- Produces: documented, versioned and pushed static application.

- [ ] **Step 1: Write deployment documentation**

Document local serving, data regeneration, tests, Vercel entry page, channels, score thresholds, shape mapping and evidence limitations.

- [ ] **Step 2: Run the complete verification suite fresh**

Run data validation, all Node tests and a final local browser smoke test. Do not rely on earlier output.

- [ ] **Step 3: Initialize the application folder as its own Git repository**

Run from `GE_partner_intelligence`:

```powershell
git init
git branch -M main
git remote add origin git@github.com:Francis-the-Analyst/georgia_distributor.git
git remote -v
```

Expected: `origin` fetch/push both point to the provided repository.

- [ ] **Step 4: Commit the verified application**

```powershell
git add -- .
git commit -m "feat: build Georgia partner intelligence dashboard"
```

- [ ] **Step 5: Push the main branch**

Run: `git push -u origin main`.

Expected: push succeeds without force; the previously empty remote receives the application.

- [ ] **Step 6: Update project status**

Record the verified counts, test results, commit ID, remote URL, publication state and any remaining human-only commercial validation in `ESTATUS.md` and the executive summary.
