# Paquete operativo de validación humana — Georgia

Fecha: 2026-09-12  
Estado: listo para ejecutar; no enviado.

## Qué está terminado

- Muestra documental separada por proyectos, distribución, híbridos/procesadores y competencia.
- Evidencias primarias guardadas en `.firecrawl/` y enlazadas desde los JSON e índices.
- Scoring provisional revisado y prioridades A/B definidas.
- Mensajes iniciales preparados en español e inglés.
- Consulta del localizador oficial de Cosentino realizada para Tbilisi y Batumi, con perfiles de propietario y profesional; no aparecieron puntos públicos de `Fabricators/Distributors`.

## Qué no puede completarse sin una persona

1. Enviar emails, llamar o escribir por LinkedIn a los candidatos.
2. Obtener el nombre y la función del decisor real.
3. Confirmar verbalmente marcas, proveedores, stock, formatos, maquinaria, capacidad, proyectos activos y relación formal con Cosentino.
4. Consultar a Cosentino por el canal oficial para Georgia y distinguir ausencia de listado de ausencia de operación.

## Orden recomendado de ejecución

### Primera ola — prioridad A

| Orden | Candidato | Vía pública | Objetivo mínimo |
|---:|---|---|---|
| 1 | DECOMIX | `+995 598 166 155` · `info@decomix.ge` | Confirmar compra directa de tabla, proveedores vigentes, maquinaria y volumen aproximado. |
| 2 | Marmlux | `+995 558 312 312` / `+995 593 763 874` · `info@marmlux.ge` | Confirmar marcas, formatos, CNC, instalación e interés en Sensa®, Silestone® y Dekton®. |
| 3 | Zodi / Zodi Plus | `+995 32 235 80 00` · `info@zodi.ge` | Confirmar entidad, red Tbilisi/Batumi, almacén, marcas y relación actual con Cosentino. |
| 4 | AMTile | `+995 592 441 926` · `info@amtile.ge` | Confirmar si trabaja con slabs además de tile y quién decide compras. |
| 5 | Horizon Group | `+995 557 070 000` · `sales@horizonsbatumi.com` | Conseguir procurement/design lead y saber qué paquetes siguen abiertos. |
| 6 | Petra Group | `+995 577 251 251` | Conseguir contacto de procurement/development y calendario de acabados. |
| 7 | Guru Holding | `info@guruholding.ge` | Confirmar fase, contratista y decisor de materiales. |
| 8 | Real Palace | `+995 577 22 47 47` | Identificar compras/diseño y superficies abiertas en Alto, Arbour, Green o Blue. |

La matriz completa y los textos están en `outreach/cualificacion-prioritaria-2026-09-12.md` y `outreach/mensajes-iniciales-es-en-2026-09-12.md`.

## Registro mínimo por respuesta

Copiar una fila por intento y actualizarla solo con información confirmada por una persona:

`fecha_contacto`, `candidato`, `canal`, `persona_funcion`, `respuesta`, `marcas_actuales`, `formatos_espesores`, `stock_almacen`, `maquinaria`, `instalacion`, `proyectos_activos`, `interes_cosentino`, `proximo_paso`, `fecha_verificacion`, `evidencia_humana`.

Valores permitidos mientras no haya respuesta: `desconocido`, `pendiente`, `no confirmado`. No usar `sí`, `distribuidor`, `comprador`, `stock` o `exclusivo` solo porque aparezcan en una web.

## Criterio para actualizar el scoring

- Respuesta positiva sin detalle: actualizar el estado de contacto, no el score comercial.
- Confirmación de capacidad o compra: añadir la nota de la conversación, fecha y función de la persona; después recalcular el componente afectado.
- Relación Cosentino confirmada: conservar quién la confirmó y si se refiere a compra, distribución, fabricación, showroom o proyecto.
- Sin respuesta: dejar el score provisional intacto y registrar el número de intentos.

## Consulta paralela a Cosentino

Pedir al contacto interno autorizado que confirme:

- si existe cobertura, distribuidor, fabricador o importador activo para Georgia;
- si Tbilisi y Batumi deben aparecer en el localizador público;
- quién gestiona el alta de un nuevo canal y qué requisitos documentales aplica;
- si hay restricciones territoriales o de portfolio para Sensa®, Silestone® y Dekton®.

## Definición de terminado de esta dependencia

La fase queda lista para recalcular el ranking cuando exista al menos una respuesta humana verificable de cada candidato A, o cuando se documente un intento razonable y su resultado. Hasta entonces, cualquier recomendación de canal seguirá siendo provisional.
