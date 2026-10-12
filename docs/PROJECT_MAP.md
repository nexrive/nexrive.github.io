# Mapa del proyecto - Nexrive Web

## Orientación
Sitio estático bilingüe sin dependencias. Se edita en `src/` y `locales/`; lo demás en la raíz es salida generada.

## Directorios
| Ruta | Contenido | Se edita |
|---|---|---|
| `src/` | Plantillas, estilos, script y favicon | Sí |
| `locales/` | Textos por idioma | Sí |
| `scripts/` | Build y verificación | Sí |
| `docs/` | Documentación | Sí |
| `index.html`, `en/`, `404.html`, `assets/` | Salida publicada | No, se genera |
| `.nojekyll` | Desactiva Jekyll en Pages | No |

## Módulos y quién depende de ellos
- `scripts/build.mjs` exporta `LANGS`, `loadLocale`, `render`, `build` - lo importa `scripts/check.mjs`.
- `src/template.html` - usa claves de `locales/*`, clases de `src/styles.css` y `#menu` con `.nav-toggle` de `src/main.js`.
- `src/404.html` - usa las claves `meta.lang` y `notfound.*` y clases de `src/styles.css`.
- `locales/*.json` - consumidos por build y check.

## Secciones de la página (id)
`contenido` (portada), `productos`, `ecosistema`, `ruta`, `principios`, `empresa`, `contacto`.

## Transversales
- i18n: `docs/LOCALIZATION.md`. Diseño: `docs/UI_UX.md`. Seguridad: `docs/SECURITY.md`.

## Invariantes
- Mismas claves en todos los locales; cada clave se usa en alguna plantilla.
- Los id de sección son destino del menú: renombrar uno exige actualizar los `href`.
- Las clases `is-open`, `nav-toggle` y el id `menu` son contrato entre plantilla, estilos y script.
- La política de contenido prohíbe scripts y estilos en línea.

## Notas de impacto
- Cambiar `LANGS` afecta rutas, hreflang y el cambio de idioma.
- Cambiar de dominio: definir `SITE_URL` al generar y, en GitHub Pages, añadir el archivo `CNAME`.
- Enlaces externos fijos en la plantilla: Google Play de Volta, soporte, privacidad y términos en `nexrive-volta.web.app`, y `github.com/nexrive`.
