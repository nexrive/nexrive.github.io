# Localización - Nexrive Web

## Idiomas
Español (`es`, por defecto, en `/`) e inglés (`en`, en `/en/`).

## Sistema
Un archivo JSON anidado por idioma en `locales/`. La plantilla referencia cada texto como `{{seccion.clave}}`; el build lo resuelve al generar, así el sitio funciona sin JavaScript y cada idioma tiene su propia URL indexable.

## Reglas
- Ningún texto visible en `src/`: todo va en los locales, incluidas las etiquetas de accesibilidad.
- Mismas claves en todos los idiomas, ninguna vacía ni sin usar.
- Los nombres de producto no se traducen.
- Sin emojis ni punto medio como separador.

## Añadir un idioma
1. Copiar `locales/es.json` a `locales/<código>.json` y traducirlo.
2. Añadir el idioma a `LANGS` en `scripts/build.mjs` y su `hreflang` en `src/template.html`.
3. Adaptar el cambio de idioma, que hoy alterna entre dos.

## Verificación
`npm run check` valida paridad, claves vacías y claves sin usar.
