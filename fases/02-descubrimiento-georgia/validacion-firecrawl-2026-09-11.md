# Validación primaria con Firecrawl — Fase 02 — Georgia

Fecha de consulta: 2026-09-11  
Alcance: reintento de la investigación en georgiano, ruso e inglés y extracción de webs primarias.

## Resultado operativo

Firecrawl quedó operativo tras reintentar con conectividad habilitada. Se conservaron los artefactos JSON/Markdown bajo `.firecrawl/`. La búsqueda inglesa fue descartada como muestra de descubrimiento porque confundió Georgia-país con el estado de Georgia (EE. UU.); las búsquedas georgiana y rusa sí devolvieron dominios y señales del mercado local.

## Fuentes primarias validadas

### Canales y superficies

- `amtile-home.md`: AMTile se presenta como importador y distribuidor independiente de azulejos/cerámica en Georgia; declara compra directa a fabricantes, canteras y productores y una colección de cerámica, porcelánico, vidrio y piedra natural. No demuestra distribución de tablas de cuarzo o Dekton.
- `zodi-home.md`: Zodi publica dos sucursales actuales —Tbilisi y Batumi—, teléfono `+995 32 235 80 00` y `info@zodi.ge`. La página extraída muestra catálogo de piedra natural; la relación con Coante/Cimstone procede de la fuente secundaria anterior y sigue pendiente de confirmar.
- `plastics-georgia-silestone.md`: el dominio `.ge` mantiene una página de Silestone y nombra a Cosentino, pero el texto de compra remite a Plastics Ukraine y el vídeo/canal asociado también es ucraniano. Se conserva como pista de canal actual o histórico, no como distribuidor confirmado en Georgia.
- `decomix-home.md`: DECOMIX declara importación oficial e integración profesional en Georgia de superficies acrílicas y aglomerado de cuarzo; publica Staron, Grandex, Caesarstone, Radianz y Belenco, además de contacto local en Tbilisi (`+995 598 166 155`, `info@decomix.ge`).
- `premierstone-ka.md` y `premierstone-contact-ka.md`: Premier Granite / Premier Stone publica cuarzo, porcelánico y piedra natural, además de teléfono, email y dirección en Tbilisi.
- `allstone-home.md`: Allstone publica categorías de cuarzo, granito, mármol y porcelánico; declara canteras propias, fábrica/almacén y proyectos que incluyen Swissôtel Tbilisi. Publica oficina en Tbilisi y `info@allstone.ge`.

### Partners de proyectos

- `petra-group-en.md`: Petra Group publica desarrollos de resort y residencias en Batumi, Gudauri y Borjomi, incluido Pullman Residences, y teléfono `+995 577 251 251`.
- `elt-group-en-about.md`: ELT Group publica más de 470.000 m² construidos/comercializados, ELT Quarter en Batumi, Spanish Quarter en Tbilisi, La Quinta by Wyndham y Occidental by Barceló, además de expansión anunciada en 2026.
- `gwg-development-en-about.md`: GWG publica GWG Krtsanisi —290 apartamentos y 3.500 m² recreativos— y GWG Batumi —complejo apart-hotel de 884 apartamentos—.
- `real-palace-en.md`: Real Palace mantiene cartera de proyectos Alto, Arbour, Green y Blue y publica teléfono `+995 577 22 47 47`.
- `horizon-batumi-home.md`: Horizon declara complejos hoteleros/residenciales premium en primera línea del Mar Negro en Batumi y mantiene páginas de proyectos, hospitality y contacto.
- `konsol-holding-home.md`: Konsol Holding se presenta como grupo integrado de desarrollo, construcción, inversión y hospitality; publica proyectos en desarrollo y portfolio operativo.
- `guru-holding-home.md`: Guru Holding mantiene páginas activas para Guru Subtropical, Guru Status, Guru Residence y Guru StartUp.

### Procesadores e híbridos

- `are-stone-home.md`: ARESTONE publica trabajo de mármol, granito y cuarzo en Tbilisi y dos teléfonos locales.
- `rocklux-home.md`: Rocklux publica productos de mármol y granito, email `ikakoiluridze@gmail.com` y presencia en Tbilisi.
- `granite-diabaz-home.md`: Granite-Diabaz publica fabricación de losas/bloques y trabajos de granito, mármol, basalto y diabasa; contacto en Beliashvili 151b, Tbilisi. La web parece antigua y requiere reconfirmación.
- `marmlux-home.md`: Marmlux declara importación directa desde China, Turquía e Irán, corte CNC en taller propio, instalación y dirección en Batumi (`27 Leonidze St.`).
- `qutstone-home.md` y `qutstone-contact.md`: Kutaisi Stone Factory / Qutstone declara más de 2.000 proyectos, más de seis años de experiencia, procesamiento de granito y contacto en Kutaisi (`kutaisistonefactoryltd@gmail.com`, `+995 599 22 97 33`, `+995 595 63 88 28`).
- `vaskaniya-home.md` y `vaskaniya-shop.md`: Vaskaniya declara producción propia en Batumi de encimeras de piedra acrílica, publica teléfono `+995 595 096 310` y muestra las marcas Hi-Macs, Corian y Montelli.
- `fin-yapi-home.md`: la URL actualmente devuelve “Account Suspended”; la señal previa de FIN YAPI no se considera validada en esta ronda.

## Límites de interpretación

La extracción confirma que las organizaciones tienen presencia web, catálogo, instalaciones o proyectos publicados. No confirma exclusividad, stock, volumen de compra, homologación de proveedor, relación vigente con Cosentino ni capacidad financiera. El siguiente paso comercial debe ser contacto y cualificación con una pregunta concreta por tablas, marcas, compras y proyectos activos.

## IDs de evidencia añadidos a los datos

- Canales: `dist-amtile-fc-001` → `amtile-home.md`; `dist-zodi-fc-001` → `zodi-home.md`; `dist-ceramaspace-fc-001` → `search-georgia-ka-scraped.json`/resultado de CERAMASPACE; `dist-plastics-fc-001` → `plastics-georgia-silestone.md`.
- Híbridos: `hyb-decomix-fc-001` → `decomix-home.md`; `hyb-premier-fc-001` → `premierstone-ka.md`/`premierstone-contact-ka.md`; `hyb-arestone-fc-001` → `are-stone-home.md`; `hyb-rocklux-fc-001` → `rocklux-home.md`; `hyb-granitediabaz-fc-001` → `granite-diabaz-home.md`; `hyb-finyapi-fc-001` → `fin-yapi-home.md`; `hyb-marmlux-fc-001` → `marmlux-home.md`; `hyb-qutstone-fc-001` → `qutstone-home.md`/`qutstone-contact.md`; `hyb-vaskaniya-fc-001` → `vaskaniya-home.md`/`vaskaniya-shop.md`; `hyb-allstone-001` → `allstone-home.md`.
- Proyectos: `proj-petra-fc-001`, `proj-elt-fc-001`, `proj-gwg-fc-001`, `proj-realpalace-fc-001`, `proj-horizon-fc-001`, `proj-konsol-fc-001` y `proj-guru-fc-001` → los siete Markdown de partners con el mismo prefijo.
