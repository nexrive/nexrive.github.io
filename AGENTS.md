# AGENTS.md - Nexrive Web

## Misión
Sitio corporativo estático de Nexrive (empresa y productos Volta y Avanti), en español e inglés, publicado en GitHub Pages: https://nexrive.github.io

## Fuente de verdad (en orden)
1. `docs/PRODUCT_SPEC.md` 2. `docs/ARCHITECTURE.md` 3. `docs/UI_UX.md` 4. `docs/PROJECT_MAP.md` 5. `docs/STATUS.md`

## Datos del proyecto
- HTML, CSS y JavaScript sin frameworks ni dependencias; build propio en Node >= 20.
- Comandos: `npm run build` (genera), `npm run check` (genera y verifica), `npm run serve` (local en el puerto 4173).
- Despliegue: push a `main` de `nexrive/nexrive.github.io`; Pages sirve la raíz del repo.

## No negociables
- Nunca editar a mano `index.html`, `en/index.html`, `404.html` ni `assets/`: se generan desde `src/` y `locales/`.
- Todo texto visible vive en `locales/*.json`, con las mismas claves en todos los idiomas.
- El repo es público: nada de estrategia interna, credenciales ni datos personales.
- Solo afirmaciones verificables sobre los productos (estado real, sin cifras inventadas).
- Sin emojis ni punto medio como separador; iconos en SVG propio.
- Sin barra de color en el borde izquierdo de tarjetas o bloques.
- `npm run check` debe pasar antes de cada commit, y los archivos generados van en el mismo commit.
