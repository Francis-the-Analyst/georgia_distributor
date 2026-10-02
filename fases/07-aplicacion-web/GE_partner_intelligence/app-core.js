/* Georgia Partner Intelligence — bilingual application core. */
(function (global) {
  'use strict';

  var LANGS = ['en', 'es'];
  var state = { lang: 'en', channel: 'distributor', view: 'map', search: '', typology: 'all', potential: 'all' };
  var I18N = {
    en: {
      cover_choose_channel: 'Choose an intelligence channel', cover_explore: 'Explore market →', cover_view: 'View channel →',
      internal_use: 'Commercial intelligence · Internal use', executive_intelligence: 'Executive intelligence · Internal decision support',
      brand_line_pre: 'Market research & dashboard created by', brand_author: 'Francisco González', cover_eyebrow: 'Cosentino · Georgia',
      cover_message: 'From market visibility to the next partner conversation.', cover_enter_distributor: 'Distributor Intelligence',
      cover_enter_projects: 'Projects Intelligence', cover_stat_distributors: 'potential accounts', cover_stat_projects: 'project actors',
      cover_stat_developments: 'named developments', cover_stat_cities: 'base cities', channel_distributor: 'Distributors', channel_projects: 'Projects',
      back_to_cover: 'Back to cover', hero_eyebrow: 'Market view · Commercial intelligence', hero_title: 'Where should the next conversation start?',
      hero_context: 'A decision tool for prioritising prospective distributors, fabricators, hybrid operators and project partners in Georgia.',
      filters_refine: 'Refine the market', filters_search_label: 'Search', filters_search: 'Search account, city, material or signal…', filters_reset: 'Reset',
      filters_open_mobile: 'Filters', filters_close_mobile: 'Done', map_key: 'Potential key', priority_high: 'High potential', priority_medium: 'Medium potential', priority_low: 'Low potential',
      nav_map: 'Positioning map', opportunity_field: 'Commercial opportunity field', nav_list: 'Account list', all_accounts: 'All accounts in view',
      nav_shortlist: 'Priority shortlist', first_conversations: 'First conversations', nav_coverage: 'Coverage', coverage_title: 'Market coverage',
      nav_competitive: 'Competition', competitive_title: 'Visible competitive signals', nav_developments: 'Developments', developments_title: 'Named project developments',
      export_csv: 'Export CSV', model_about_title: 'About the model', drawer_title: 'Account dossier', drawer_close: 'Close',
      axis_distributor_x: 'Operational and channel capability', axis_distributor_y: 'Cosentino commercial potential',
      axis_projects_x: 'Project maturity and access', axis_projects_y: 'Cosentino specification potential',
      axis_low: 'Low', axis_high: 'High', legend_title: 'Typology / potential',
      legend_distributor: 'Distributor', legend_fabricator: 'Fabricator', legend_hybrid: 'Hybrid',
      legend_developer: 'Developer', legend_specifier: 'Specifier', legend_integrated: 'Integrated operator'
    },
    es: {
      cover_choose_channel: 'Elige un canal de inteligencia', cover_explore: 'Explorar mercado →', cover_view: 'Ver canal →',
      internal_use: 'Inteligencia comercial · Uso interno', executive_intelligence: 'Inteligencia ejecutiva · Apoyo a la decisión interna',
      brand_line_pre: 'Investigación de mercado y dashboard creado por', brand_author: 'Francisco González', cover_eyebrow: 'Cosentino · Georgia',
      cover_message: 'De la visibilidad de mercado a la próxima conversación con un partner.', cover_enter_distributor: 'Distributor Intelligence',
      cover_enter_projects: 'Projects Intelligence', cover_stat_distributors: 'cuentas potenciales', cover_stat_projects: 'actores de proyectos',
      cover_stat_developments: 'desarrollos identificados', cover_stat_cities: 'ciudades base', channel_distributor: 'Distribuidores', channel_projects: 'Proyectos',
      back_to_cover: 'Volver a portada', hero_eyebrow: 'Visión de mercado · Inteligencia comercial', hero_title: '¿Dónde debe empezar la próxima conversación?',
      hero_context: 'Una herramienta de decisión para priorizar distribuidores, marmolistas, operadores híbridos y partners de proyectos en Georgia.',
      filters_refine: 'Afinar el mercado', filters_search_label: 'Buscar', filters_search: 'Buscar cuenta, ciudad, material o señal…', filters_reset: 'Restablecer',
      filters_open_mobile: 'Filtros', filters_close_mobile: 'Listo', map_key: 'Clave de potencial', priority_high: 'Alto potencial', priority_medium: 'Potencial medio', priority_low: 'Bajo potencial',
      nav_map: 'Mapa de posicionamiento', opportunity_field: 'Campo de oportunidad comercial', nav_list: 'Lista de cuentas', all_accounts: 'Todas las cuentas visibles',
      nav_shortlist: 'Prioridad', first_conversations: 'Primeras conversaciones', nav_coverage: 'Cobertura', coverage_title: 'Cobertura de mercado',
      nav_competitive: 'Competencia', competitive_title: 'Señales competitivas visibles', nav_developments: 'Desarrollos', developments_title: 'Desarrollos identificados',
      export_csv: 'Exportar CSV', model_about_title: 'Sobre el modelo', drawer_title: 'Ficha de cuenta', drawer_close: 'Cerrar',
      axis_distributor_x: 'Capacidad operativa y de canal', axis_distributor_y: 'Potencial comercial Cosentino',
      axis_projects_x: 'Madurez y acceso al proyecto', axis_projects_y: 'Potencial de especificación Cosentino',
      axis_low: 'Bajo', axis_high: 'Alto', legend_title: 'Tipología / potencial',
      legend_distributor: 'Distribuidor', legend_fabricator: 'Marmolista', legend_hybrid: 'Híbrido',
      legend_developer: 'Promotor', legend_specifier: 'Prescriptor', legend_integrated: 'Operador integrado'
    }
  };

  function t(lang, key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]; }); }
  function normCity(value) { return String(value || 'Not confirmed').trim(); }
  function loadSession() {
    try { var saved = JSON.parse(sessionStorage.getItem('georgia-partner-intelligence') || '{}'); if (LANGS.indexOf(saved.lang) >= 0) state.lang = saved.lang; } catch (_) {}
  }
  function saveSession() { try { sessionStorage.setItem('georgia-partner-intelligence', JSON.stringify({ lang: state.lang })); } catch (_) {} }
  function applyCopy() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(function (node) { node.textContent = t(state.lang, node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) { node.placeholder = t(state.lang, node.dataset.i18nPlaceholder); });
    LANGS.forEach(function (lang) { var button = document.getElementById('lang-' + lang); if (button) button.classList.toggle('is-active', state.lang === lang); });
    var owner = esc(t(state.lang, 'brand_line_pre')) + ' <strong>' + esc(t(state.lang, 'brand_author')) + '</strong>';
    ['brand-authorship', 'cover-ownership', 'brand-authorship-footer'].forEach(function (id) { var node = document.getElementById(id); if (node) node.innerHTML = owner; });
  }
  function shapeMarkup(record, x, y) {
    if (record.shape === 'diamond') return '<rect class="shape-diamond" x="' + (x - 6) + '" y="' + (y - 6) + '" width="12" height="12" transform="rotate(45 ' + x + ' ' + y + ')"/>';
    if (record.shape === 'triangle') return '<path class="shape-triangle" d="M ' + x + ' ' + (y - 8) + ' L ' + (x + 8) + ' ' + (y + 7) + ' L ' + (x - 8) + ' ' + (y + 7) + ' Z"/>';
    return '<rect class="shape-square" x="' + (x - 7) + '" y="' + (y - 7) + '" width="14" height="14" rx="1"/>';
  }
  function readablePoints(records) {
    var placed = [];
    records.slice().sort(function (a, b) { return b.score_total - a.score_total || a.name.localeCompare(b.name); }).forEach(function (record) {
      var x = 86 + (record.position_x * 8.2);
      var anchorY = 470 - (record.score_total * 4.05);
      var labelY = anchorY;
      var labelWidth = Math.min(240, Math.max(54, record.name.length * 7.6));
      var labelX = x > 800 ? x - labelWidth - 12 : x + 12;
      var tries = 0;
      function collides() {
        return placed.some(function (p) { return labelX < p.right && labelX + labelWidth > p.left && labelY - 11 < p.bottom && labelY + 5 > p.top; });
      }
      while (collides() && tries < 30) {
        labelY = anchorY + (tries % 2 ? -1 : 1) * Math.ceil((tries + 1) / 2) * 18;
        labelY = Math.max(48, Math.min(474, labelY));
        tries += 1;
      }
      placed.push({ record: record, x: x, anchorY: anchorY, labelX: labelX, labelY: labelY, left: labelX, right: labelX + labelWidth, top: labelY - 11, bottom: labelY + 5 });
    });
    return placed;
  }
  function renderLegend() {
    var node = document.getElementById('map-legend'); if (!node) return;
    var types = state.channel === 'projects'
      ? [['square','legend_developer'],['triangle','legend_specifier'],['diamond','legend_integrated']]
      : [['square','legend_distributor'],['diamond','legend_fabricator'],['triangle','legend_hybrid']];
    node.innerHTML = '<strong>' + esc(t(state.lang, 'legend_title')) + '</strong>' + types.map(function (item) {
      return '<span><i class="legend-shape legend-' + item[0] + '"></i>' + esc(t(state.lang, item[1])) + '</span>';
    }).join('') + '<span><i class="legend-dot high"></i>' + esc(t(state.lang, 'priority_high')) + '</span><span><i class="legend-dot medium"></i>' + esc(t(state.lang, 'priority_medium')) + '</span><span><i class="legend-dot low"></i>' + esc(t(state.lang, 'priority_low')) + '</span>';
  }
  function renderMap(records) {
    var wrap = document.getElementById('map-svg-wrap'); if (!wrap) return;
    var axisX = state.channel === 'projects' ? 'axis_projects_x' : 'axis_distributor_x';
    var axisY = state.channel === 'projects' ? 'axis_projects_y' : 'axis_distributor_y';
    var points = readablePoints(records);
    var svg = '<svg viewBox="0 0 1000 540" width="100%" height="540" role="img" aria-label="' + esc(t(state.lang, axisY) + ' / ' + t(state.lang, axisX)) + '">' +
      '<rect class="map-zone map-zone-monitor" x="70" y="30" width="450" height="225"/><rect class="map-zone map-zone-priority" x="520" y="30" width="450" height="225"/>' +
      '<rect class="map-zone map-zone-qualify" x="70" y="255" width="450" height="225"/><rect class="map-zone map-zone-develop" x="520" y="255" width="450" height="225"/>' +
      '<line class="map-splitline" x1="520" y1="30" x2="520" y2="480"/><line class="map-splitline" x1="70" y1="255" x2="970" y2="255"/>' +
      '<line class="map-gridline" x1="70" y1="480" x2="970" y2="480"/><line class="map-gridline" x1="70" y1="30" x2="70" y2="480"/>' +
      '<text class="map-axis-title" x="520" y="526" text-anchor="middle">' + esc(t(state.lang, axisX)) + '</text>' +
      '<text class="map-axis-end" x="70" y="503">' + esc(t(state.lang, 'axis_low')) + '</text><text class="map-axis-end" x="970" y="503" text-anchor="end">' + esc(t(state.lang, 'axis_high')) + '</text>' +
      '<text class="map-axis-title" x="18" y="255" text-anchor="middle" transform="rotate(-90 18 255)">' + esc(t(state.lang, axisY)) + '</text>' +
      '<text class="map-axis-end" x="48" y="480" text-anchor="end">' + esc(t(state.lang, 'axis_low')) + '</text><text class="map-axis-end" x="48" y="38" text-anchor="end">' + esc(t(state.lang, 'axis_high')) + '</text>';
    points.forEach(function (point) {
      var r = point.record;
      svg += '<g class="map-point priority-' + esc(r.potential) + '" data-account-id="' + esc(r.id) + '" tabindex="0" role="button">' +
        '<title>' + esc(r.name + ' · ' + r.score_total + '/100') + '</title>' +
        (point.labelY !== point.anchorY ? '<line class="map-guide" x1="' + point.x + '" y1="' + point.anchorY + '" x2="' + point.labelX + '" y2="' + point.labelY + '"/>' : '') +
        shapeMarkup(r, point.x, point.anchorY) + '<text class="map-label" x="' + point.labelX + '" y="' + (point.labelY + 4) + '">' + esc(r.name) + '</text></g>';
    });
    wrap.innerHTML = svg + '</svg>';
    renderLegend();
  }
  var LIFECYCLE_VALUES = ['announced_or_planned','approved_preconstruction','design_or_procurement','under_construction','fit_out_or_finishing','completed_or_operating','unknown'];
  var WINDOW_VALUES = ['open','qualify_now','late_for_current_building','future_portfolio_only','unknown'];
  function local(en, es) { return state.lang === 'es' ? es : en; }
  function human(value) { return String(value || local('Not confirmed','No confirmado')).replace(/_/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); }); }
  function sourceRecords() { return state.channel === 'projects' ? (global.PROJECTS_DATA || []) : (global.DISTRIBUTOR_DATA || []); }
  function searchable(record) { return JSON.stringify(record).toLocaleLowerCase(); }
  function filteredRecords() {
    return sourceRecords().filter(function (record) {
      return (!state.search || searchable(record).indexOf(state.search.toLocaleLowerCase()) >= 0) &&
        (state.typology === 'all' || record.typology === state.typology) &&
        (state.potential === 'all' || record.potential === state.potential);
    }).sort(function (a, b) { return b.score_total - a.score_total || a.name.localeCompare(b.name); });
  }
  function setChannel(channel) {
    state.channel = channel === 'projects' ? 'projects' : 'distributor';
    state.view = 'map'; state.search = ''; state.typology = 'all'; state.potential = 'all';
    location.hash = 'channel=' + state.channel + '&view=map'; renderDashboard();
  }
  function setView(view) {
    state.view = view; location.hash = 'channel=' + state.channel + '&view=' + view; renderDashboard();
  }
  function renderKpis(records) {
    var cities = new Set(records.map(function (r) { return r.city; }));
    var values = [[records.length,local('Accounts','Cuentas')],[records.filter(function(r){return r.potential==='high';}).length,local('High potential','Alto potencial')],[records.filter(function(r){return r.potential==='medium';}).length,local('Medium potential','Potencial medio')],[cities.size,local('Base cities','Ciudades base')]];
    document.getElementById('kpi-band').innerHTML = values.map(function(v){return '<div class="kpi-tile"><strong class="kpi-value">'+v[0]+'</strong><span class="kpi-label">'+esc(v[1])+'</span></div>';}).join('');
  }
  function renderNav() {
    var views = [['map','nav_map'],['list','nav_list'],['shortlist','nav_shortlist'],['coverage','nav_coverage'],['competitive','nav_competitive']];
    if (state.channel === 'projects') views.push(['developments','nav_developments']);
    var nav = document.getElementById('nav-band'); nav.classList.toggle('nav-band-6', views.length === 6);
    nav.innerHTML = views.map(function(v,i){return '<button class="nav-mod '+(state.view===v[0]?'is-active':'')+'" data-view="'+v[0]+'"><span class="nav-mod-num">0'+(i+1)+'</span><strong class="nav-mod-title">'+esc(t(state.lang,v[1]))+'</strong></button>';}).join('');
  }
  function renderFilters(records) {
    var types = Array.from(new Set(sourceRecords().map(function(r){return r.typology;}))).sort();
    function chips(group, label, values, selected) {
      return '<div class="chip-group"><span class="chip-group-label">'+esc(label)+'</span><button class="chip '+(selected==='all'?'is-pressed':'')+'" data-filter="'+group+'" data-value="all">'+local('All','Todos')+'</button>'+values.map(function(v){return '<button class="chip '+(selected===v?'is-pressed':'')+'" data-filter="'+group+'" data-value="'+esc(v)+'">'+esc(human(v))+'</button>';}).join('')+'</div>';
    }
    document.getElementById('filters-chips').innerHTML = chips('typology',local('Typology','Tipología'),types,state.typology)+chips('potential',local('Potential','Potencial'),['high','medium','low'],state.potential);
    document.getElementById('filter-live-count').textContent = records.length+' '+local('visible','visibles');
    document.getElementById('results-count').textContent = records.length+' '+local('accounts match current filters','cuentas coinciden con los filtros');
    var search = document.getElementById('filters-search'); if (search && search.value !== state.search) search.value = state.search;
  }
  function badge(record) { return '<span class="badge badge-priority-'+record.potential+'">'+esc(human(record.potential))+' · '+record.score_total+'</span>'; }
  function renderList(records) {
    document.getElementById('table-container').innerHTML = '<table class="data-table"><thead><tr><th>'+local('Account','Cuenta')+'</th><th>'+local('City','Ciudad')+'</th><th>'+local('Typology','Tipología')+'</th><th>'+local('Potential / score','Potencial / score')+'</th><th>'+local('Next action','Siguiente acción')+'</th></tr></thead><tbody>'+records.map(function(r){return '<tr class="table-row" data-account-id="'+esc(r.id)+'"><td><strong>'+esc(r.name)+'</strong></td><td>'+esc(r.city)+'</td><td>'+esc(human(r.typology))+'</td><td>'+badge(r)+'</td><td>'+esc(r.next_action)+'</td></tr>';}).join('')+'</tbody></table>';
  }
  function renderShortlist(records) {
    var shortlisted = records.filter(function(r){return r.potential!=='low';});
    document.getElementById('shortlist-container').innerHTML = shortlisted.map(function(r){return '<article class="shortlist-card" data-account-id="'+esc(r.id)+'"><div class="shortlist-head"><h3>'+esc(r.name)+'</h3>'+badge(r)+'</div><p class="shortlist-why">'+esc(r.score_interpretation)+'</p><p class="shortlist-next"><strong>'+local('Next: ','Siguiente: ')+'</strong>'+esc(r.next_action)+'</p></article>';}).join('') || '<p class="empty-state">'+local('No priority accounts in this selection.','No hay cuentas prioritarias en esta selección.')+'</p>';
  }
  function countBy(records, key) { return records.reduce(function(acc,r){var v=r[key]||local('Not confirmed','No confirmado');acc[v]=(acc[v]||0)+1;return acc;},{}); }
  function renderCoverage(records) {
    function block(title, counts) { var max=Math.max.apply(null,Object.values(counts).concat([1])); return '<div class="cov-block"><h3>'+esc(title)+'</h3>'+Object.entries(counts).sort(function(a,b){return b[1]-a[1];}).map(function(v){return '<div class="cov-row"><span>'+esc(human(v[0]))+'</span><i class="cov-bar-track"><b class="cov-bar-fill" style="width:'+(v[1]/max*100)+'%"></b></i><strong>'+v[1]+'</strong></div>';}).join('')+'</div>'; }
    document.getElementById('coverage-container').innerHTML = block(local('By city','Por ciudad'),countBy(records,'city'))+block(local('By typology','Por tipología'),countBy(records,'typology'))+block(local('By potential','Por potencial'),countBy(records,'potential'));
  }
  function renderCompetition() {
    var records = global.COMPETITION_DATA || [];
    document.getElementById('competitive-container').innerHTML = '<table class="data-table"><thead><tr><th>'+local('Brand','Marca')+'</th><th>'+local('Category','Categoría')+'</th><th>'+local('Visible channel','Canal visible')+'</th><th>'+local('Geography','Geografía')+'</th></tr></thead><tbody>'+records.map(function(r){return '<tr><td><strong>'+esc(r.brand)+'</strong></td><td>'+esc(r.category)+'</td><td>'+esc(r.visible_channel)+'</td><td>'+esc((r.geography||[]).join(', '))+'</td></tr>';}).join('')+'</tbody></table>';
  }
  function renderDevelopments() {
    var lifecycle = state.devLifecycle || 'all', windowValue = state.devWindow || 'all';
    var records = (global.DEVELOPMENTS_DATA || []).filter(function(d){return (lifecycle==='all'||d.lifecycle_status===lifecycle)&&(windowValue==='all'||d.commercial_window===windowValue);});
    function options(values,selected){return '<option value="all">'+local('All','Todos')+'</option>'+values.map(function(v){return '<option value="'+v+'" '+(v===selected?'selected':'')+'>'+esc(human(v))+'</option>';}).join('');}
    document.getElementById('dev-filters').innerHTML = '<label class="dev-select"><span>'+local('Lifecycle status','Fase del proyecto')+'</span><select id="dev-lifecycle">'+options(LIFECYCLE_VALUES,lifecycle)+'</select></label><label class="dev-select"><span>'+local('Commercial window','Ventana comercial')+'</span><select id="dev-window">'+options(WINDOW_VALUES,windowValue)+'</select></label>';
    document.getElementById('dev-table-container').innerHTML = '<table class="data-table developments-table"><thead><tr><th>'+local('Development','Desarrollo')+'</th><th>'+local('Location','Localización')+'</th><th>'+local('Lifecycle','Fase')+'</th><th>'+local('Commercial window','Ventana comercial')+'</th><th>'+local('Partners / roles','Partners / roles')+'</th><th>'+local('Commercial reading','Lectura comercial')+'</th></tr></thead><tbody>'+records.map(function(d){return '<tr><td><strong>'+esc(d.project_name)+'</strong></td><td>'+esc(d.city)+'</td><td>'+esc(human(d.lifecycle_status))+'</td><td><span class="window window-'+esc(d.commercial_window)+'">'+esc(human(d.commercial_window))+'</span></td><td>'+esc((d.project_partner_roles||[]).map(human).join(', '))+'</td><td>'+esc(d.window_reason)+'</td></tr>';}).join('')+'</tbody></table>';
  }
  function field(label,value){return '<div class="field-row"><span class="field-label">'+esc(label)+'</span><div class="field-value">'+esc(Array.isArray(value)?value.join(', '):(value||local('Not confirmed','No confirmado')))+'</div></div>';}
  function openDrawer(id) {
    var record = sourceRecords().find(function(r){return r.id===id;}); if(!record)return;
    var components = Object.entries(record.score_components||{}).map(function(v){return human(v[0])+': '+v[1];});
    var contact = Object.entries(record.contact||{}).map(function(v){return human(v[0])+': '+v[1];});
    document.getElementById('drawer-body').innerHTML = '<h2>'+esc(record.name)+'</h2>'+field(local('Potential / score','Potencial / score'),human(record.potential)+' · '+record.score_total+'/100')+field(local('Typology','Tipología'),human(record.typology))+field(local('City / coverage','Ciudad / cobertura'),record.city+' · '+record.coverage)+field(local('Score components','Componentes del score'),components)+field(local('Evidence reading','Lectura de evidencia'),record.score_interpretation)+field(local('Contact','Contacto'),contact)+field(local('Signals','Señales'),record.signals)+field(local('Evidence IDs','IDs de evidencia'),record.evidence_ids)+'<div class="recommendation-block"><strong>'+local('Recommended next action','Siguiente acción recomendada')+'</strong><p>'+esc(record.next_action)+'</p></div>';
    document.getElementById('drawer-overlay').hidden=false; var drawer=document.getElementById('drawer');drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');
  }
  function closeDrawer(){document.getElementById('drawer-overlay').hidden=true;var d=document.getElementById('drawer');d.classList.remove('is-open');d.setAttribute('aria-hidden','true');}
  function exportCsv(){var rows=[['name','city','typology','potential','score','next_action']].concat(filteredRecords().map(function(r){return [r.name,r.city,r.typology,r.potential,r.score_total,r.next_action];}));var csv=rows.map(function(row){return row.map(function(v){return '"'+String(v||'').replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');var url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));var a=document.createElement('a');a.href=url;a.download='georgia-'+state.channel+'-intelligence.csv';a.click();URL.revokeObjectURL(url);}
  function renderDashboard(){
    var records=filteredRecords();applyCopy();renderKpis(sourceRecords());renderNav();renderFilters(records);
    ['map','list','shortlist','coverage','competitive','developments'].forEach(function(v){var n=document.getElementById('view-'+v);if(n)n.hidden=state.view!==v;});
    renderMap(records);renderList(records);renderShortlist(records);renderCoverage(records);renderCompetition();renderDevelopments();
    document.body.classList.toggle('developments-active',state.view==='developments');
    var summary=document.getElementById('model-summary');if(summary)summary.textContent=local('Scores combine verified market evidence; High ≥75, Medium 60–74, Low <60. Confirm commercially before committing resources.','Los scores combinan evidencia de mercado verificada: alto ≥75, medio 60–74 y bajo <60. Confirmar comercialmente antes de comprometer recursos.');
    ['distributor','projects'].forEach(function(c){var b=document.getElementById('channel-btn-'+c);if(b){b.classList.toggle('is-active',state.channel===c);b.setAttribute('aria-pressed',String(state.channel===c));}});
  }
  function bindEvents(){
    document.addEventListener('click',function(event){
      var channel=event.target.closest('[id^="channel-btn-"]');if(channel)return setChannel(channel.id.replace('channel-btn-',''));
      var nav=event.target.closest('[data-view]');if(nav)return setView(nav.dataset.view);
      var chip=event.target.closest('[data-filter]');if(chip){state[chip.dataset.filter]=chip.dataset.value;return renderDashboard();}
      var account=event.target.closest('[data-account-id]');if(account)return openDrawer(account.dataset.accountId);
    });
    document.getElementById('filters-search').addEventListener('input',function(event){state.search=event.target.value;renderDashboard();});
    document.getElementById('filters-reset').onclick=function(){state.search='';state.typology='all';state.potential='all';renderDashboard();};
    document.getElementById('export-btn').onclick=exportCsv;
    document.getElementById('drawer-close-btn').onclick=closeDrawer;
    document.getElementById('drawer-overlay').onclick=closeDrawer;
    document.getElementById('filters-mobile-toggle').onclick=function(){document.getElementById('filters-drawer').classList.add('is-open-mobile');};
    document.getElementById('filters-mobile-close').onclick=function(){document.getElementById('filters-drawer').classList.remove('is-open-mobile');};
    document.addEventListener('change',function(event){if(event.target.id==='dev-lifecycle'){state.devLifecycle=event.target.value;renderDevelopments();}if(event.target.id==='dev-window'){state.devWindow=event.target.value;renderDevelopments();}});
    document.addEventListener('keydown',function(event){if(event.key==='Escape')closeDrawer();if((event.key==='Enter'||event.key===' ')&&event.target.matches('.map-point'))openDrawer(event.target.dataset.accountId);});
  }
  function mount() {
    loadSession();
    var distributorAccounts = global.DISTRIBUTOR_DATA || [];
    var projectAccounts = global.PROJECTS_DATA || [];
    var params = new URLSearchParams(location.hash.slice(1));
    state.channel = params.get('channel') === 'projects' ? 'projects' : 'distributor';
    state.view = params.get('view') || 'map';
    state.records = state.channel === 'projects' ? projectAccounts : distributorAccounts;
    bindEvents();renderDashboard();
    LANGS.forEach(function (lang) { var button = document.getElementById('lang-' + lang); if (button) button.onclick = function () { state.lang = lang; saveSession(); renderDashboard(); }; });
  }

  global.AppCore = { LANGS: LANGS, I18N: I18N, state: state, t: t, esc: esc, normCity: normCity, loadSession: loadSession, saveSession: saveSession, applyCopy: applyCopy, renderMap: renderMap, mount: mount };
})(window);
