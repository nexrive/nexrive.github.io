# Arquitectura - Nexrive Web

## Resumen
Generador estático mínimo: `scripts/build.mjs` combina `src/template.html` con `locales/<idioma>.json` y escribe una página por idioma. No hay servidor, base de datos ni dependencias.

## Módulos
- `src/template.html`: estructura de la página; `{{clave}}` toma el texto del locale y `{{@clave}}` un valor técnico (rutas y URLs).
- `src/404.html`: página de error; usa rutas absolutas porque se sirve desde cualquier profundidad.
- `src/styles.css`, `src/main.js`, `src/favicon.svg`: se copian tal cual a `assets/`.
- `locales/es.json`, `locales/en.json`: todos los textos visibles.
- `scripts/build.mjs`: `LANGS`, `loadLocale`, `render` (escapa HTML y falla si falta una clave) y `build`.
- `scripts/check.mjs`: paridad de locales, claves sin usar, llaves sin resolver, anclas y archivos locales, reglas de contenido.

## Flujo
`locales` + `src` -> `npm run build` -> `index.html`, `en/index.html`, `404.html`, `assets/` -> commit -> push a `main` -> GitHub Pages.

## Estado
Sin estado. El único comportamiento en el navegador es abrir y cerrar el menú móvil.

## Errores
El build se detiene con un mensaje que nombra la clave faltante. El check termina con código 1 y lista cada problema.

## Seguridad
Ver `docs/SECURITY.md`. Política de contenido estricta por etiqueta meta; sin scripts ni estilos en línea.

## Decisiones
- La salida generada se guarda en la raíz del repo porque un sitio de usuario de GitHub Pages publica la raíz de la rama principal sin configuración adicional.
- `.nojekyll` desactiva Jekyll para que GitHub sirva los archivos sin procesar.
- Rutas relativas en las páginas de idioma para que el sitio funcione también bajo una subruta.
- Tipografía del sistema: cero descargas y sin licencias de fuentes que gestionar.
- `SITE_URL` (variable de entorno) cambia el dominio usado en canonical y hreflang si se adopta un dominio propio.
