# Seguridad - Nexrive Web

## Qué se protege
La integridad del sitio publicado y la reputación de la marca. El sitio no maneja datos de usuarios.

## Modelo de amenazas
- Repo público: cualquier archivo subido queda visible para siempre en el historial.
- Inyección de contenido: los textos de los locales se escapan al generar el HTML.
- Recursos de terceros: no se usan; la política de contenido solo permite archivos propios.

## Secretos
Ninguno en el repo. `.gitignore` excluye `.env`. Las credenciales de GitHub viven fuera del proyecto.

## Entrada no confiable
No hay formularios ni parámetros de URL procesados. JavaScript no escribe HTML.

## Transporte y cabeceras
HTTPS forzado por GitHub Pages. Como Pages no permite cabeceras propias, la política de contenido y la de referencia van en etiquetas meta. Enlaces externos solo `https` y con `rel="noopener"`.

## Dependencias
Cero. Si se añade alguna, verificar licencia, mantenimiento y `npm audit`.

## Antes de publicar
`npm run check`, revisar `git diff` y buscar credenciales con `git grep -nIE "token|secret|password|api[_-]?key"`.
