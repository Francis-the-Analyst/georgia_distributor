# Estado del proyecto — Georgia

## Objetivo

Desarrollar una inteligencia comercial accionable para Cosentino en Georgia, el país del Cáucaso, separando partners de proyectos para contacto a puerta fría, distribuidores, opciones híbridas de marmolistas/procesadores y competencia.

## Productos objetivo

- Sensa®.
- Silestone®.
- Dekton®.

## Alcance confirmado

- Mercado: Georgia, país del Cáucaso.
- Idiomas de investigación: georgiano, ruso e inglés.
- Vías comerciales: partners de proyectos, distribuidores y opción híbrida.
- Competencia: marcas, importadores, distribuidores, showrooms y procesadores.
- Referencia metodológica: proyecto de Rumanía, sin reutilizar sus datos como evidencia georgiana.
- Aplicación futura: español e inglés, con nombres originales y evidencias conservados en georgiano/ruso cuando corresponda.

## Estado actual

- [x] Prompt maestro adaptado a Georgia.
- [x] Estructura inicial de carpetas creada.
- [x] Plan de trabajo guardado.
- [x] Estado de Firecrawl comprobado: CLI autenticada mediante `FIRECRAWL_API_KEY`; el estado de cuenta no pudo consultarse, pero `search`, `scrape` e `interact` sí produjeron artefactos útiles.
- [x] Descubrimiento multilingüe iniciado mediante fallback web provisional en georgiano, ruso e inglés.
- [ ] Muestra inicial de proyectos validada comercialmente.
- [ ] Muestra inicial de distribuidores validada comercialmente.
- [ ] Muestra inicial de híbridos validada comercialmente.
- [ ] Estudio inicial de competencia validado comercialmente.
- [ ] Scoring aprobado.
- [x] Aplicación web implementada.
- [ ] Revisión y publicación.

## Protocolo de continuidad

Al comenzar una nueva sesión, leer este archivo completo, la última decisión de `decisiones/`, el índice de fuentes más reciente y los artefactos de la fase activa.

Después de cada bloque de investigación:

1. Guardar resultados en `.firecrawl/` y la fase correspondiente.
2. Actualizar `fuentes/`.
3. Registrar decisiones y límites.
4. Actualizar este archivo con estado, errores y siguiente acción.

## Fase activa

Fase 02 — descubrimiento, validación primaria y preparación de cualificación comercial. Se mantienen 12 organizaciones de proyectos, 6 candidatos de distribución/canal, 11 híbridos/procesadores y 10 grupos de marcas/canales de competencia. El scoring provisional fue revisado con las reextracciones Firecrawl y se prepararon la matriz de cualificación y los borradores de outreach bilingüe. La validación comercial sigue pendiente.

## Bloqueos

- Firecrawl ya responde con conectividad habilitada; queda pendiente mantener una rutina de reextracción y registrar cualquier cambio de webs.
- El localizador oficial de Cosentino no devuelve puntos de Fabricators/Distributors en Tbilisi ni Batumi, tanto con perfil de propietario como profesional. Es una ausencia de listado público, no una prueba de inexistencia de canal.
- Las primeras empresas, proyectos y marcas están en descubrimiento y no constituyen todavía validación comercial.

## Último checkpoint

Fecha: 2026-09-12.

Trabajo realizado:

- Se confirmó que Georgia se refiere al país del Cáucaso.
- Se generó `PROMPT_MAESTRO.md` con las vías de proyectos, distribución, híbridos y competencia.
- Se incorporó el uso de Firecrawl en georgiano, ruso e inglés, incluyendo `search`, `scrape`, `map`, `crawl`, `agent`, `interact` y `parse`.
- Se creó la estructura de fases, datos, fuentes, decisiones, outreach y `.firecrawl/`.
- Se guardó el plan de implementación.
- Se comprobó la CLI de Firecrawl con `firecrawl.cmd --status`: autenticación presente, consulta de cuenta no disponible por fallo de red.
- Se ejecutó un descubrimiento web abierto provisional en georgiano, ruso e inglés.
- Se guardaron registros preliminares en `datos/proyectos.json`, `datos/distribuidores.json`, `datos/hibridos.json` y `datos/competencia.json`.
- Se ampliaron los partners de proyectos con DesignBureau, Signy, Material, Kurdiani Architects y Geometria.
- Se actualizó DECOMIX con su web corporativa, contactos públicos y seis marcas visibles: Staron, Grandex, Caesarstone, Radianz, Avarus y Belenco.
- Se guardó `fases/02-descubrimiento-georgia/descubrimiento-web-fallback-2026-09-11.md` y el índice `fuentes/fase-02-indice.md`.
- Se ampliaron los híbridos con Marmlux y Vaskaniya (Batumi), Kutaisi Stone Factory/Qutstone y Lideni (Kutaisi), con la advertencia de que Lideni procede de un directorio empresarial y requiere confirmar identidad.
- Se añadió KRAFT (Rustavi) como canal de materiales/proyectos a cualificar, sin etiquetarlo como distribuidor de tablas.
- Se registró Hi-Macs, Corian y Montelli como señales competitivas de catálogo en Vaskaniya.
- Se ejecutó una prueba real `firecrawl search --scrape` en inglés; agotó el tiempo de red sin generar un artefacto utilizable.
- Se recuperó la conectividad y se ejecutaron búsquedas `search --scrape` en georgiano, ruso e inglés; la búsqueda inglesa se descartó por ambigüedad con el estado de EE. UU.
- Se reextrajeron AMTile, Zodi, Plastics Georgia, DECOMIX, Premier Stone, Allstone, siete partners de proyectos y siete procesadores/híbridos; los artefactos y límites están en `fases/02-descubrimiento-georgia/validacion-firecrawl-2026-09-11.md`.
- Se añadió Allstone como híbrido/procesador candidato con señales de canteras, fábrica, almacén, cuarzo y proyectos en Tbilisi.
- Se reforzaron Marmlux, Qutstone y Vaskaniya con evidencia primaria; FIN YAPI devuelve cuenta suspendida y Granite-Diabaz requiere verificar vigencia.
- Se actualizó `datos/scoring-inicial.json` con criterio explícito de revisión, nuevas evidencias y ajustes de prioridad para Zodi, AMTile, Real Palace, Vaskaniya, Qutstone y FIN YAPI.
- Se añadió Allstone al scoring provisional con prioridad H2.
- Se creó `outreach/cualificacion-prioritaria-2026-09-12.md` con prioridades A/B, hipótesis de entrada y preguntas de cualificación.
- Se crearon borradores de outreach en español e inglés en `outreach/mensajes-iniciales-es-en-2026-09-12.md`.
- Se registró la decisión en `decisiones/2026-09-12-cualificacion-y-scoring.md`; no se ha enviado ningún contacto externo.
- Se consultó interactivamente el localizador oficial de Cosentino para Tbilisi y Batumi con dos perfiles; las cuatro búsquedas devolvieron sin resultados. Se registró en `datos/verificacion-cosentino-localizador.json` y `fases/02-descubrimiento-georgia/verificacion-localizador-cosentino-2026-09-12.md`.
- Se creó `RESUMEN-EJECUTIVO-2026-09-12.md` para consolidar el estado por fase, el inventario y la compuerta de la aplicación web.
- Se creó `outreach/pendientes-humanos-2026-09-12.md` con el orden de contacto, preguntas mínimas, registro de respuestas y consulta paralela a Cosentino.
- Se verificó la integridad: los seis JSON de datos cargan correctamente; el inventario contiene 12 proyectos, 6 distribuidores/canales, 11 híbridos y 10 grupos de competencia; las 29 puntuaciones suman con sus componentes y todas tienen `evidence_ids`.

## Siguiente acción exacta

Publicar la aplicación desde GitHub en Vercel usando `fases/07-aplicacion-web/GE_partner_intelligence` como Root Directory. En paralelo, ejecutar la cualificación con los diez objetivos publicados, registrar respuestas en los campos definidos y actualizar el scoring solo con confirmaciones directas.

## Checkpoint de publicación

Fecha: 2026-10-02.

- Aplicación bilingüe implementada y preparada para Vercel.
- Selección pública fijada en diez objetivos prioritarios; los candidatos de reserva permanecen en los datos canónicos.
- Repositorio GitHub objetivo: `Francis-the-Analyst/georgia_distributor`.
- Pendiente: despliegue público en Vercel y cualificación comercial humana.

## Paquete operativo pendiente de intervención humana

El trabajo documental y de preparación está listo en `outreach/pendientes-humanos-2026-09-12.md`. La única dependencia externa real es que una persona autorizada envíe los borradores, haga las llamadas o consiga una respuesta de cada empresa y del equipo de Cosentino. No se ha enviado ningún contacto desde este proyecto.
