# Georgia Partner Intelligence — diseño de la aplicación

Fecha: 2026-09-12  
Estado: aprobado por el usuario el 2026-09-12, incluidos ejes legibles, formas por tipología y colores por potencial.

## 1. Objetivo

Construir una aplicación estática de inteligencia comercial para Cosentino en Georgia tomando como referencia visual y funcional directa `Bulgaria Partner Intelligence`.

La portada conservará dos canales claramente separados:

1. **Distributor Intelligence:** todos los distribuidores potenciales, marmolistas/fabricadores e híbridos.
2. **Projects Intelligence:** promotores, arquitectos, diseñadores, holdings, constructores y otros actores de proyecto, junto con los desarrollos identificados.

La aplicación deberá convertir la investigación ya guardada en una herramienta para decidir dónde comenzar la siguiente conversación comercial sin presentar como confirmado ningún dato provisional.

## 2. Referencia aprobada

- Web publicada: `https://bulgaria-partner-intelligence.vercel.app/index_R_P.html`
- Código local de referencia: `C:\Users\Usuario\Desktop\cm\exportimport\Cosentino identificacion puntos de venta retail\paises\Bulgaria\Bulgaria market intelligence\BG_partner_intelligence`
- Destino independiente: `fases/07-aplicacion-web/GE_partner_intelligence/`
- Repositorio remoto de entrega: `git@github.com:Francis-the-Analyst/georgia_distributor.git`

La implementación reutilizará la arquitectura estática HTML/CSS/JavaScript, el lenguaje visual, la navegación por hash, el panel de detalle, los filtros, las vistas y los activos de la referencia. El proyecto de Bulgaria permanecerá intacto.

## 3. Enfoques considerados

### Enfoque elegido — adaptación del proyecto estático de Bulgaria

Es el camino más fiel y directo. Conserva la identidad, evita introducir un framework innecesario y permite publicar en Vercel como un conjunto de archivos estáticos.

### Alternativa descartada — reconstrucción con React/Vite

Facilitaría una futura aplicación grande, pero duplicaría una interfaz que ya funciona y añadiría dependencias, compilación y mantenimiento sin necesidad inmediata.

### Alternativa descartada — cambio superficial de textos

Sería rápida, pero conservaría el scoring y el modelo Retail de Bulgaria, incompatibles con distribuidores, marmolistas, híbridos y los scores específicos de Georgia.

## 4. Arquitectura y archivos

El destino tendrá esta estructura:

```text
GE_partner_intelligence/
├── index_R_P.html
├── proposal_A.html
├── base.css
├── brand-normalization.css
├── proposal_A.css
├── app-core.js
├── data.js
├── vercel.json
├── assets/
├── source-data/
│   ├── proyectos.json
│   ├── distribuidores.json
│   ├── hibridos.json
│   ├── competencia.json
│   ├── scoring-inicial.json
│   ├── desarrollos.json
│   └── app-account-classification.json
└── scripts/
    ├── sync-source-data.mjs
    ├── build-data.mjs
    └── validate-data.mjs
```

`sync-source-data.mjs` copiará de forma determinista los JSON canónicos de `datos/` a `source-data/`. Esto permite que el repositorio web sea autónomo sin convertir la copia en una segunda fuente editable. `build-data.mjs` leerá `source-data/` y generará `data.js`. No se copiarán manualmente registros dentro de la interfaz. `validate-data.mjs` comprobará recuentos, IDs únicos, scores, coordenadas, tipologías, niveles de potencial y evidencias.

La aplicación no tendrá backend, login ni edición de datos en esta primera versión. Las actualizaciones se harán en los JSON de investigación y se regenerará `data.js`.

## 5. Modelo de datos de la aplicación

### Distributor Intelligence

Combinará:

- `datos/distribuidores.json`
- `datos/hibridos.json`
- las entradas correspondientes de `datos/scoring-inicial.json`

Cada cuenta tendrá, como mínimo: ID, nombre, ciudad, tipología, materiales, marcas visibles, servicios/capacidades, contacto público, estado de evidencia, siguiente acción, score total, componentes del score, grupo comercial y `evidence_ids`.

Las tipologías visibles serán:

- **Distribuidor / showroom** — cuadrado.
- **Marmolista / fabricador** — rombo.
- **Híbrido** — triángulo.

La asignación será explícita en el adaptador de datos. Una cuenta se clasificará como híbrida cuando combine dos o más funciones relevantes, como importación/distribución, fabricación, instalación o acceso a proyectos. No se inferirá una tipología solo por el nombre de la empresa.

### Projects Intelligence

Combinará:

- `datos/proyectos.json`
- las entradas de proyectos de `datos/scoring-inicial.json`

Las tipologías visibles serán:

- **Promotor / propietario** — cuadrado.
- **Arquitecto / diseñador / especificador** — triángulo.
- **Holding integrado / diseño-construcción** — rombo.

Los desarrollos publicados se extraerán de `proyectos_publicados` y se mostrarán en una vista propia, conservando empresa, ciudad, sector, evidencia y estado de validación.

Cada desarrollo tendrá campos separados para:

- `lifecycle_status`: `announced_or_planned`, `approved_preconstruction`, `design_or_procurement`, `under_construction`, `fit_out_or_finishing`, `completed_or_operating` o `unknown`;
- `status_evidence`: texto de la fuente que respalda la fase;
- `status_date`: fecha de la evidencia, cuando esté disponible;
- `commercial_window`: `open`, `qualify_now`, `late_for_current_building`, `future_portfolio_only` o `unknown`;
- `window_reason`: explicación comercial breve sin sustituir una confirmación humana;
- `project_partner_roles`: promotor, arquitecto, diseñador, contratista, operador hotelero u otro rol evidenciado.

La fase de obra y la ventana comercial no se inferirán únicamente de que una página siga publicada. Un proyecto anunciado no se etiquetará como aprobado sin evidencia específica. Los proyectos completados permanecerán visibles como referencias y acceso al portfolio futuro, pero no se presentarán como oportunidades abiertas del edificio ya terminado.

### Competencia

`datos/competencia.json` alimentará la vista competitiva. Se mantendrá separada de la lista de cuentas para no convertir una marca visible en una relación comercial confirmada.

## 6. Portada y navegación

### Sistema visual

La aplicación conservará el lenguaje editorial de la referencia de Bulgaria y la identidad sobria de Cosentino:

- piedra clara `#F3F3F0` para el fondo;
- blanco `#FFFFFF` para superficies de trabajo;
- carbón `#101112` para texto y bloques de énfasis;
- línea mineral `#D8D8D2` para estructura;
- verde `#147A57` para High Potential;
- naranja `#B45F06` para Medium Potential;
- gris `#6B7072` para Low Potential.

La tipografía seguirá la referencia con Arial/Helvetica, usando escala, peso y espaciado para crear jerarquía sin introducir una identidad ajena a Cosentino. El elemento visual memorable será el mapa de posicionamiento con ejes comerciales, formas y ventanas de entrada; el resto de la interfaz se mantendrá silencioso y funcional.

La revisión visual descarta añadir gradientes, tarjetas redondeadas, sombras decorativas o animaciones repetidas. Se conservan la composición, las líneas, el gran titular y la numeración 01/02 porque en esta aplicación sí representan una elección ordenada entre dos canales.

La portada mantendrá la composición de Bulgaria y mostrará:

- `Georgia Partner Intelligence`.
- Tarjeta 01: `Distributor Intelligence`.
- Tarjeta 02: `Projects Intelligence`.
- Recuentos obtenidos de los datos generados, nunca escritos manualmente.
- Accesos visuales a Silestone®, Dekton®, Sensa® y Eclos® conservando los enlaces oficiales.
- Autoría: `Market research & dashboard created by Francisco González`.

Los idiomas de interfaz serán español e inglés. Los nombres propios y evidencias originales podrán conservar texto georgiano o ruso sin traducir cuando sea necesario para la trazabilidad.

La página de inteligencia conservará selector de canal, regreso a portada, filtros, KPIs, exportación CSV, vistas y panel lateral de detalle.

## 7. Mapa de posicionamiento

### Ejes

Los ejes estarán escritos dentro del mapa, también explicados en la leyenda y visibles en ordenador y móvil.

**Distributor Intelligence**

- Eje X: `Capacidad operativa y de canal` — de baja a alta.
- Eje Y: `Potencial comercial Cosentino` — score total de 0 a 100.

El valor X se normalizará a 0–100 mediante `suma de componentes / máximo posible × 100`:

- Distribuidores: capacidad de compra/stock/proceso + cobertura/red + contactabilidad + actividad reciente, sobre un máximo de 50 puntos.
- Marmolistas e híbridos: capacidad de proceso/instalación + ubicación/logística + contactabilidad + actividad reciente, sobre un máximo de 50 puntos.

**Projects Intelligence**

- Eje X: `Madurez y acceso al proyecto` — de bajo a alto.
- Eje Y: `Potencial de especificación Cosentino` — score total de 0 a 100.

El valor X se calculará con potencial de proyectos + cobertura/red + contactabilidad + actividad reciente, sobre un máximo de 40 puntos, y se normalizará a 0–100.

El panel de detalle mostrará el cálculo exacto y todos los componentes; el mapa no ocultará que el score es provisional.

### Niveles y colores

- **High potential:** verde, score ≥ 75.
- **Medium potential:** naranja, score entre 60 y 74.
- **Low potential:** gris, score < 60.

El color nunca será la única señal: cada punto mostrará también el nivel en texto dentro del detalle y tendrá una forma por tipología.

### Legibilidad

- Leyenda permanente con forma, nombre de tipología y color/nivel.
- Nombre corto de la cuenta visible junto al punto.
- Algoritmo de separación para evitar solapamientos; si un punto se desplaza, se conservará su coordenada real y podrá mostrarse una línea guía.
- Tooltip y selección por teclado con nombre, ciudad, tipología, nivel y score.
- Cuatro zonas de acción: `Priorizar`, `Validar capacidad`, `Desarrollar` y `Monitorizar`.
- En móvil, el mapa conservará un ancho mínimo y desplazamiento horizontal para evitar comprimir textos y ejes hasta volverlos ilegibles.

## 8. Vistas y filtros

Ambos canales incluirán:

- **Mapa:** posicionamiento y cuadrantes.
- **Cuentas:** tabla ordenable con score, tipología, ciudad, estado y acción.
- **Shortlist:** potencial alto y medio, ordenado por score.
- **Cobertura:** distribución por ciudad y tipología.
- **Competencia:** marcas y señales competitivas con su nivel de verificación.

Projects Intelligence añadirá **Desarrollos**. Distributor Intelligence añadirá filtros por distribuidor, marmolista/fabricador e híbrido, además de capacidades y materiales cuando estén evidenciados.

La vista **Desarrollos** permitirá filtrar por fase del ciclo, ventana comercial y ciudad. Mostrará claramente qué proyectos parecen abiertos, cuáles requieren cualificación inmediata, cuáles están en terminación y cuáles ya solo sirven para acceder al partner y a su cartera futura.

Los filtros comunes serán búsqueda, ciudad, tipología, nivel de potencial, grupo comercial y estado de evidencia. El botón CSV exportará solo el conjunto filtrado.

## 9. Panel de detalle y seguridad de la evidencia

Cada ficha mostrará:

- nombre, ciudad y tipología;
- score total, potencial y desglose;
- contacto público y función recomendada;
- materiales, servicios, maquinaria y marcas visibles;
- hipótesis comercial y siguiente acción;
- estado de validación;
- IDs de evidencia y enlaces fuente disponibles.

Los valores desconocidos se mostrarán como `No confirmado`. La interfaz no transformará ausencia de información en una respuesta negativa ni presentará como distribuidor Cosentino a una cuenta no validada.

## 10. Accesibilidad y diseño responsive

- Navegación completa con teclado.
- Foco visible, enlace para saltar al contenido y controles con etiquetas accesibles.
- Contraste suficiente para verde, naranja y gris sobre fondo claro y oscuro.
- Formas, texto y color usados conjuntamente.
- Reducción de animaciones cuando el sistema lo solicite.
- Tablas desplazables y filtros en panel móvil.

## 11. Errores y estados vacíos

- Si un dataset no carga o no pasa la validación, se mostrará un mensaje de datos no disponibles y no se dibujará un mapa engañoso.
- Si un filtro no devuelve cuentas, se mostrará un estado vacío y un botón para restablecer filtros.
- Un registro sin score aparecerá en la tabla como pendiente, pero no se situará en el mapa.
- URLs y campos de contacto se escaparán antes de insertarlos en HTML.

## 12. Verificación y criterios de aceptación

Antes de considerar terminada la aplicación se comprobará:

1. `data.js` se genera desde los JSON sin errores.
2. Los recuentos coinciden con los datos canónicos.
3. Todos los IDs son únicos dentro de cada canal.
4. Todo punto del mapa tiene score, X normalizado, tipología, forma y nivel de potencial.
5. High es verde, Medium naranja y Low gris en mapa, tablas, shortlist y leyendas.
6. Los ejes, extremos, cuadrantes y leyendas son visibles a resoluciones de escritorio y móvil.
7. Cada tipología usa una forma diferente y sigue siendo identificable sin color.
8. Los filtros, cambio de canal, cambio de idioma, hash, panel de detalle y exportación CSV funcionan.
9. No se presentan datos provisionales como confirmaciones comerciales.
10. Cada desarrollo tiene fase, evidencia temporal y ventana comercial, aunque el valor sea `unknown`.
11. Los filtros de fase y ventana comercial funcionan y no alteran el color de potencial del actor.
12. La web se prueba mediante servidor HTTP local y recorrido automatizado de las vistas principales.
13. La entrega final apunta a `git@github.com:Francis-the-Analyst/georgia_distributor.git` sin modificar el proyecto local de Bulgaria.

## 13. Fuera de alcance de esta versión

- Contactar empresas desde la aplicación.
- Login, roles y permisos.
- Base de datos o API remota.
- Edición colaborativa de cuentas.
- Sincronización automática con CRM.
- Confirmación humana de relaciones comerciales.

Estas capacidades podrán añadirse después sin modificar los JSON de investigación que actúan como fuente canónica.
