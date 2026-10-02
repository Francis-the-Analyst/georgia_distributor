# Georgia Distributor Market Intelligence

Estudio de mercado para priorizar la entrada comercial de Cosentino en Georgia (país del Cáucaso). El repositorio conserva la investigación completa y contiene una aplicación web bilingüe para presentar la selección comercial.

## Selección pública

La aplicación muestra diez objetivos prioritarios para la primera ola comercial:

1. DECOMIX
2. Zodi / Zodi Plus
3. Marmlux
4. Vaskaniya
5. AMTile
6. PremierGranite / Premier Stone
7. Allstone / Olstone
8. Kutaisi Stone Factory / Qutstone
9. ARE STONE
10. CERAMASPACE

La selección es una priorización provisional basada en señales públicas. No confirma distribución oficial, compra, exclusividad, stock, capacidad industrial ni relación contractual con Cosentino. Los candidatos de reserva permanecen en `datos/` y en la documentación de investigación.

## Contenido

- `datos/`: registros normalizados, scoring y clasificación usada por la aplicación.
- `fuentes/`: índices de evidencias y trazabilidad.
- `fases/`: trabajo por fases y aplicación web.
- `decisiones/`: decisiones metodológicas y comerciales.
- `outreach/`: matriz de cualificación y borradores de contacto.
- `docs/`: especificaciones y planes técnicos.

La aplicación está en `fases/07-aplicacion-web/GE_partner_intelligence`.

## Ejecutar en local

```powershell
cd fases/07-aplicacion-web/GE_partner_intelligence
python -m http.server 4173
```

Abrir `http://127.0.0.1:4173/index_R_P.html`.

## Actualizar y verificar datos

Desde el directorio de la aplicación:

```powershell
node scripts/sync-source-data.mjs
node scripts/build-data.mjs
node scripts/validate-data.mjs
node --test tests/*.test.mjs
```

## Publicar en Vercel

Al importar este repositorio en Vercel:

1. Seleccionar **Other** como Framework Preset.
2. Configurar **Root Directory** como `fases/07-aplicacion-web/GE_partner_intelligence`.
3. Dejar vacíos Build Command y Output Directory.
4. Desplegar.

El `vercel.json` de la aplicación dirige `/` a `index_R_P.html`. Usar el directorio raíz indicado evita publicar como activos web los documentos internos del estudio.

## Privacidad del repositorio

No se versionan secretos, archivos `.env`, dependencias locales ni la caché de extracción `.firecrawl/`.
