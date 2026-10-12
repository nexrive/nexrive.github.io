# Sistema de diseño - Nexrive Web

## Dirección
Oscura, sobria y técnica, heredada de la guía de marca de Volta: fondo carbón con violeta contenido. El violeta marca acción y énfasis, no tiñe la interfaz.

## Tokens (definidos en `src/styles.css`, bloque `:root`)
- Color: fondo `#0D0D10`, superficie `#1C1B21`, superficie profunda `#15141A`, línea `#2C2A36`, marca `#413770`, marca luminosa `#8F78F6`, texto `#F4F3F5`, texto secundario `#A5A4A5`, disponible `#6FBF6A`, en desarrollo `#F28F05`.
- Tipografía: pila del sistema; escala `--step--1` a `--step-4`, con títulos fluidos mediante `clamp`.
- Espaciado: `--space-1` a `--space-5`. Radios: 16 px y 10 px. Ancho máximo: 1120 px.

## Iconografía
SVG propio en línea, trazo de 1,7 con extremos redondeados. Sin emojis.

## Componentes
Cabecera fija con menú, botones primario y secundario, tarjeta de producto con insignia de estado, lista de puntos, pasos del ecosistema, línea de tiempo, mosaico de principios y pie.

## Estados
Hover y foco visible en enlaces, botones y tarjetas; presionado en botones; menú abierto o cerrado con `aria-expanded`.

## Adaptación
- Hasta 720 px: una columna y menú desplegable.
- Hasta 900 px: tarjetas en una columna y línea de tiempo en dos.
- Desde 900 px: tres tarjetas y cuatro etapas en fila.

## Accesibilidad
Enlace para saltar al contenido, un solo `h1`, regiones con etiqueta, foco visible, tecla Escape para cerrar el menú y `prefers-reduced-motion` respetado.
