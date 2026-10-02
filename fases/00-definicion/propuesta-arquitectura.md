# Propuesta de arquitectura — Inteligencia comercial en Georgia

Fecha: 2026-09-11
Estado: alcance aprobado para investigación; scoring y muestra aún pendientes de validación humana

## Objetivo

Encontrar oportunidades comerciales accionables para Sensa®, Silestone® y Dekton® en Georgia, separando tres rutas que no deben mezclarse:

1. Partners de proyectos que puedan especificar o activar producto mediante contacto a puerta fría.
2. Distribuidores que puedan comprar, almacenar, vender y distribuir a escala nacional o regional.
3. Marmolistas/procesadores híbridos que puedan comprar directamente o convertirse desde marcas competidoras.

El estudio incluirá además un inventario de competencia, canales y relaciones de marca.

## Geografía inicial

Se investigará el país completo. El primer bloque de descubrimiento compara Tbilisi, Batumi, Kutaisi, Rustavi y cualquier otro polo que aparezca justificado por proyectos, logística, construcción, hospitality o concentración de empresas.

Tbilisi y Batumi son hipótesis operativas iniciales, no una conclusión sobre el tamaño relativo del mercado.

## Unidades de análisis

- Organización: empresa o estudio, con nombre legal y comercial separados.
- Proyecto: activo o anunciado, conectado con una organización y una ubicación.
- Marca: producto Cosentino, competidor o marca mostrada por un canal.
- Relación: especifica, distribuye, importa, trabaja con, compra a, representa o hipótesis pendiente.
- Evidencia: URL, idioma, fecha, afirmación y confianza.
- Acción: función decisora, mensaje, idioma de contacto y siguiente paso.

## Separación de datos

Los JSON principales se mantienen independientes:

- `datos/proyectos.json`: desarrolladores, arquitectos, interioristas, contratistas y operadores con influencia en proyectos.
- `datos/distribuidores.json`: importadores, distribuidores, showrooms y retailers profesionales.
- `datos/hibridos.json`: marmolistas, procesadores, fabricantes e instaladores con capacidad técnica.
- `datos/competencia.json`: marcas, canales y relaciones competitivas.

Una organización puede tener más de una relación, pero cada relación se describe y puntúa en su ruta correspondiente. No se crea un ranking único que compare un estudio de arquitectura con un distribuidor.

## Evidencia y confianza

La fuente primaria preferida es la web corporativa, seguida de catálogos, páginas de productos/marcas, proyectos, fuentes institucionales, registros y medios. Un directorio o un resultado de buscador solo crea una semilla.

La presencia de una marca no demuestra compra directa, distribución, exclusividad ni volumen. Toda inferencia comercial se marca como tal.

## Scoring

Se calcularán tres scores de 0 a 100 después de validar la muestra:

- `project_partner_score`: proyectos 25, influencia de especificación 20, calidad/potencial de proyectos 15, encaje de producto 15, cobertura/relaciones 10, contacto 10, actividad 5.
- `distributor_score`: encaje de distribución 25, compra/almacenamiento/procesamiento 20, cobertura/red 15, compatibilidad de producto 15, proyectos/clientes 10, contacto 10, actividad 5.
- `hybrid_score`: señales de competencia 25, procesamiento/instalación 20, acceso a proyectos 15, ubicación/logística 15, encaje técnico 10, contacto 10, actividad 5.

La falta de evidencia reduce la confianza y se mantiene como `No verificado`; no se transforma automáticamente en cero.

## Puerta de entrada comercial

- `P1`: partner de proyecto para contactar inmediatamente.
- `D1`: distribuidor prioritario.
- `H1`: híbrido/procesador para conversión o compra directa.
- `CI`: inteligencia competitiva, aunque no sea objetivo inmediato.

La aplicación web solo podrá comenzar cuando estén aprobados esta arquitectura, los campos, los tres scores y una primera muestra con evidencias.
