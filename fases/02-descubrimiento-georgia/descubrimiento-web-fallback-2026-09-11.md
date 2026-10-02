# Descubrimiento preliminar — Georgia — 2026-09-11

## Estado

Descubrimiento iniciado. La CLI de Firecrawl está autenticada mediante `FIRECRAWL_API_KEY`, pero las peticiones de red del entorno no pudieron completarse. Para no detener el proyecto se usó búsqueda web abierta como fallback temporal.

Estos resultados son semillas de investigación, no validación comercial. Deben repetirse con Firecrawl usando `search`, `scrape`, `map`, `crawl`, `agent` e `interact` según la complejidad de cada sitio.

## Cobertura inicial

- 12 organizaciones de proyectos: Petra Group, ELT Group, GWG Development, Real Palace, Horizon Group, Konsol Holding, Guru Holding, DesignBureau, Signy LLC, Material, Kurdiani Architects y Geometria.
- 6 candidatos de distribución/canal: AMTile, Zodi/Zodi Plus, CERAMASPACE, Mosaics Showroom, Plastics Georgia y KRAFT.
- 10 candidatos híbridos/procesadores: DECOMIX/Decoryx, PremierGranite, ARE STONE, Rocklux, Granite-Diabaz, FIN YAPI, Marmlux, Kutaisi Stone Factory/Qutstone, Lideni y Vaskaniya.
- 10 grupos de marcas/canales de competencia o inteligencia: Coante, Cimstone, Staron, Grandex, Caesarstone, Radianz, Avarus/Belenco, Silestone/Plastics, Abkstone/Materia y Hi-Macs/Corian/Montelli/Vaskaniya.

## Lectura comercial provisional

### Proyectos

Batumi concentra varias señales públicas de desarrollos de hospitality y residencial premium, mientras Tbilisi aparece como polo de desarrollo residencial y de diseño. Esto es una hipótesis de priorización, no una conclusión de tamaño de mercado.

### Distribución

AMTile es una semilla de canal por su declaración de importación/distribución, compra directa y atención a arquitectos y empresas. Zodi/Zodi Plus es la semilla más completa de red física, piedra, fábrica y procesamiento, pero gran parte de la evidencia operativa procede de una fuente empresarial de 2022 y requiere actualización.

### Híbridos

PremierGranite, ARE STONE, Rocklux y Granite-Diabaz muestran trabajo con piedra y capacidad de fabricación. DECOMIX es especialmente relevante para conversión porque su web corporativa publica importación oficial e integración profesional de superficies acrílicas y aglomerado de cuarzo en Georgia, junto con Staron, Grandex, Caesarstone, Radianz, Avarus y Belenco. Marmlux y Vaskaniya refuerzan Batumi; Qutstone y Lideni amplían la muestra hacia Kutaisi. Todavía no hay evidencia de compra directa por parte de terceros ni de volumen.

### Competencia

Coante y Cimstone aparecen asociadas a Zodi; Staron, Grandex, Caesarstone, Radianz, Avarus y Belenco a DECOMIX. El catálogo de Vaskaniya añade Hi-Macs, Corian y Montelli en Batumi. Plastics Georgia requiere una verificación prioritaria porque publica Silestone, pero el contenido mezcla Georgia y Plastics Ukraine.

## Consultas ejecutadas en búsqueda web abierta

- `Georgia country stone distributor marble granite quartz Tbilisi`
- `Georgia country premium real estate developer Tbilisi Batumi hospitality`
- `ქვის დამუშავება თბილისი მარმარილო გრანიტი`
- `дистрибьютор камня Грузия Тбилиси мрамор гранит`
- `site:.ge marble granite quartz stone showroom Tbilisi Georgia`
- `site:.ge მარმარილო გრანიტი კვარცი თბილისი`
- `site:.ge мрамор гранит кварц Тбилиси Грузия`
- `architectural surfaces porcelain quartz distributor Georgia country showroom`
- `site:ge "მარმარილო" "გრანიტი" "თბილისი"`
- `site:ge "ქვის დამუშავება" Georgia`
- `site:ge "მარმარილოს" "გრანიტის" კომპანია თბილისი`
- `site:ge "კერამოგრანიტი" დისტრიბუტორი თბილისი`
- `site:cosentino.com Georgia Silestone Dekton distributor`
- `Cosentino Georgia distributor Tbilisi Dekton Silestone`
- `Косентино Грузия Дектон Сайлстоун`

## Limitaciones

- Se intentó `firecrawl search --scrape` en inglés el 2026-09-11; agotó el tiempo de red sin producir un resultado utilizable.
- Los resultados de buscador se usaron como descubrimiento; las fuentes primarias deben scrapearse de nuevo y guardar en `.firecrawl/`.
- La presencia de una marca no demuestra compra directa, distribución o exclusividad.
- Los contactos son públicos y provisionales; deben comprobarse antes de outreach.
- El número de proyectos, m², tiendas y capacidad procede de declaraciones de las propias empresas o fuentes secundarias y necesita validación independiente.

## Siguiente acción

Reintentar Firecrawl cuando haya conectividad: primero `search --scrape` por idioma y vía; después `scrape` de las webs corporativas; luego `map + scrape` para productos, marcas, proyectos, showroom y contacto; finalmente `agent --schema` solo para sitios complejos.
