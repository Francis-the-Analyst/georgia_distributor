# Georgia Market Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a traceable commercial-intelligence project for Cosentino in Georgia that separates project partners, distributors, hybrid processors and competitor intelligence.

**Execution status — 2026-09-12:** Tasks 1–4 are complete at the documentary/research level. Task 5 has provisional scoring, separate commercial recommendations and bilingual outreach ready. Direct commercial validation, formal Cosentino channel confirmation, scoring approval and the web dashboard remain gated on human responses/approval.

**Architecture:** Research is organized into persisted phases. Firecrawl outputs remain in `.firecrawl/`; normalized entities, projects and competitors live in `datos/`; evidence indexes live in `fuentes/`; decisions and continuity checkpoints live in `decisiones/` and `ESTATUS.md`. The web dashboard is deferred until the taxonomy, schemas, three scores and a validated sample are approved.

**Tech Stack:** Markdown, JSON, PowerShell, Firecrawl CLI, local source files, and later Vite + React for the bilingual dashboard.

**Spec:** `PROMPT_MAESTRO.md`

## Global Constraints

- Market: Georgia, the country in the Caucasus; do not mix it with the US state of Georgia.
- Research languages: Georgian, Russian and English, with the original language and transliteration preserved.
- Commercial tracks: project partners, distributors, hybrid marmolistas/processors and competitor intelligence remain separate.
- Evidence: no invented contacts, legal entities, machinery, stock, projects, volumes, exclusivity, purchases or market share.
- Firecrawl: use the narrowest suitable mode and save outputs under `.firecrawl/`.
- Web implementation: do not begin until taxonomy, data model, three scores and a validated sample are approved.

---

### Task 1: Project scaffold and continuity files

**Files:**
- Create: `ESTATUS.md`
- Create: `fases/README.md`
- Create: `decisiones/2026-09-11-alcance-inicial-georgia.md`
- Create: `.gitignore`

**Interfaces:**
- Produces the phase names, scope decisions and continuity rules used by every later task.

- [ ] **Step 1: Record the initial scope**

  Write that the country is Georgia, the default products are Sensa®, Silestone® and Dekton®, and the work is split into project partners, distributors, hybrid processors and competitor intelligence.

- [ ] **Step 2: Record research and persistence rules**

  Document Georgian, Russian and English searches; Firecrawl output under `.firecrawl/`; sources under `fuentes/`; normalized data under `datos/`; and a checkpoint after each meaningful research block.

- [ ] **Step 3: Protect generated research artifacts**

  Add `.firecrawl/` and local environment files to `.gitignore` while keeping Markdown, JSON and the prompt versioned.

- [ ] **Step 4: Verify the scaffold**

  Run:

  ```powershell
  Get-ChildItem -Force -Recurse | Select-Object FullName
  ```

  Expected: all phase, data, source, decision, outreach and `.firecrawl` directories are present.

### Task 2: Firecrawl discovery in three languages

**Files:**
- Create: `.firecrawl/search-ka-tbilisi-project-partners.json`
- Create: `.firecrawl/search-ru-tbilisi-distributors.json`
- Create: `.firecrawl/search-en-georgia-market.json`
- Create: `.firecrawl/search-ka-batumi-hospitality.json`
- Create: `.firecrawl/search-ru-georgia-stone-processors.json`
- Create: `.firecrawl/search-en-georgia-competitors.json`
- Create: `fases/02-descubrimiento-georgia/consultas-ejecutadas.md`
- Create: `fuentes/fase-02-indice.md`

**Interfaces:**
- Consumes: `PROMPT_MAESTRO.md` and the scope decision from Task 1.
- Produces: URL seeds grouped by commercial track, language and geography.

- [ ] **Step 1: Check Firecrawl authentication, credits and concurrency**

  Run `firecrawl --status` and `firecrawl credit-usage` when available. Record the result and any limitation in `ESTATUS.md`.

- [ ] **Step 2: Search the project-partner track**

  Search Georgian, Russian and English queries for developers, architects, interior designers, hospitality, contract and fit-out companies in Tbilisi, Batumi and other justified hubs. Save each search JSON in `.firecrawl/`.

- [ ] **Step 3: Search the distributor and hybrid tracks**

  Search Georgian, Russian and English queries for stone distributors, architectural-surface importers, showrooms, marble/granite processors, CNC workshops and kitchen/bathroom suppliers. Save each search JSON in `.firecrawl/`.

- [ ] **Step 4: Search competitor intelligence**

  Search for quartz, porcelain, sintered stone, natural stone and architectural-surface brands, together with Georgia-based importers, resellers, showrooms and processors.

- [ ] **Step 5: Send search feedback and index sources**

  For every non-empty search, send one honest `firecrawl search-feedback` event within the available time window. Index the URLs, query language, source language, track and retrieval date without treating search snippets as validation.

- [ ] **Step 6: Verify discovery outputs**

  Run bounded reads over the JSON files and confirm that each contains either non-empty results or a recorded failed-query note. Do not scrape duplicate URLs already present in a useful search-with-scrape response.

### Task 3: Company and project extraction

**Files:**
- Create: `.firecrawl/amtile-home.md`, `.firecrawl/zodi-home.md`, `.firecrawl/plastics-silestone.md`
- Create: `.firecrawl/decomix-profile.md`, `.firecrawl/premiergranite-about.md`, `.firecrawl/arestone-home.md`, `.firecrawl/rocklux-home.md`, `.firecrawl/granite-diabaz-home.md`, `.firecrawl/fin-yapi-home.md`
- Create: `.firecrawl/petra-home.md`, `.firecrawl/elt-about.md`, `.firecrawl/gwg-about.md`, `.firecrawl/realpalace-home.md`, `.firecrawl/horizon-home.md`, `.firecrawl/konsol-home.md`, `.firecrawl/guru-home.md`
- Create: `.firecrawl/` map and structured-agent outputs named from the corresponding company IDs
- Create: `fases/02-descubrimiento-georgia/proyectos/semillas.md`
- Create: `fases/02-descubrimiento-georgia/distribuidores/semillas.md`
- Create: `fases/02-descubrimiento-georgia/hibridos/semillas.md`
- Create: `fases/02-descubrimiento-georgia/competencia/semillas.md`

**Interfaces:**
- Consumes: URL seeds and language/query index from Task 2.
- Produces: source-backed candidate seeds with original names, transliterations and URLs.

- [ ] **Step 1: Scrape primary company pages**

  Use `scrape` for known home, products, brands, projects, showroom, services, contact and legal pages. Use `--wait-for` for JavaScript-rendered pages and save each result under `.firecrawl/`.

- [ ] **Step 2: Map complex company sites**

  Use `map --search` to locate internal pages before scraping them. Record the selected URLs and why each page supports a candidate field.

- [ ] **Step 3: Crawl bounded sections**

  Use `crawl` only for a coherent project, product or catalogue section. Set `--include-paths`, `--max-depth` and `--limit`, then inspect the terminal output file.

- [ ] **Step 4: Use structured extraction for complex sites**

  Use `agent --schema` only when multiple pages need structured extraction. Store evidence URLs in the returned JSON and verify the result against primary pages.

- [ ] **Step 5: Use interaction only when required**

  Scrape first. Use `interact` for pagination, tabs, filters, modals or infinite scroll, capture the result, and stop the session with `firecrawl interact stop`.

- [ ] **Step 6: Produce separate seed lists**

  Write one Markdown seed list per track. Each row must include name, original spelling, transliteration, city, track, evidence URL, source language, retrieval date and validation status.

### Task 4: Normalize entities and build the first evidence-backed sample

**Files:**
- Create: `datos/proyectos.json`
- Create: `datos/distribuidores.json`
- Create: `datos/hibridos.json`
- Create: `datos/competencia.json`
- Create: `fases/03-extraccion-normalizacion/registro-de-duplicados.md`
- Create: `fases/04-validacion/muestra-inicial.md`
- Create: `fuentes/fase-03-04-indice.md`

**Interfaces:**
- Consumes: extracted `.firecrawl/` sources and track seed lists from Task 3.
- Produces: stable organization IDs, evidence-linked JSON records and a first sample ready for commercial validation.

- [ ] **Step 1: Define stable IDs and deduplication rules**

  Normalize domains, legal names, trading names, transliterations, addresses, phone numbers and known subsidiaries. Log every merge, possible duplicate and unresolved identity.

- [ ] **Step 2: Create project-partner records**

  Store role in decision chain, project type, city, phase, visible scale, sector, specification influence, contact role and cold-outreach hypothesis.

- [ ] **Step 3: Create distributor records**

  Store distribution type, products, brands, showroom, warehouse, stock, logistics, B2B network, services, coverage and buyer role. Mark every unverified field explicitly.

- [ ] **Step 4: Create hybrid-processor records**

  Store processes, machinery, materials, project access, brands worked with, competitor signals and whether direct purchasing is verified, inferred or unknown.

- [ ] **Step 5: Create competitor records**

  Separate brand, category, local company, channel, geography, evidence of working with the brand, evidence of distributing it and evidence of buying from it.

- [ ] **Step 6: Validate a balanced first sample**

  Select candidates across Tbilisi, Batumi and any additional justified hubs, with representation from projects, distribution, hybrid processors and competition. Require a primary source for material claims and a second independent source where available.

### Task 5: Scoring, commercial recommendation and dashboard gate

**Files:**
- Create: `datos/scoring-inicial.json`
- Create: `fases/05-scoring-priorizacion/criterios-y-ranking.md`
- Create: `fases/06-recomendacion-comercial/cartera-puerta-fria.md`
- Create: `fases/06-recomendacion-comercial/cartera-distribuidores.md`
- Create: `fases/06-recomendacion-comercial/cartera-hibridos.md`
- Create: `fases/06-recomendacion-comercial/mapa-competencia.md`

**Interfaces:**
- Consumes: validated sample and evidence index from Task 4.
- Produces: independent project, distributor and hybrid scores, commercial next actions and a documented decision about whether the web phase may start.

- [ ] **Step 1: Calculate independent scores**

  Apply the three score models in `PROMPT_MAESTRO.md`, retain each component and cite the evidence supporting it.

- [ ] **Step 2: Create four commercial groups**

  Classify records as P1 project outreach, D1 distributor, H1 hybrid conversion or CI competitor intelligence. Do not rank unlike tracks in one undifferentiated list.

- [ ] **Step 3: Write outreach actions**

  For every P1, D1 and H1 record, specify the recommended contact function, language, opening message, validation question and next action. Do not invent an individual when only a role is known.

- [ ] **Step 4: Run the dashboard gate**

  Mark the web phase as pending until taxonomy, schemas, scoring and first sample have an explicit approval record. Once approved, the dashboard plan can be implemented under `fases/07-aplicacion-web/`.

- [ ] **Step 5: Verify and checkpoint**

  Run JSON parsing checks, inspect counts by track and zone, confirm every scored record has evidence IDs, and update `ESTATUS.md` with completed work, limitations, decisions and the next exact action.
