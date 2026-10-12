# Definición de terminado - Nexrive Web

Un cambio está terminado cuando:
- Se hizo en `src/` o `locales/` y la salida se regeneró.
- `npm run check` pasa sin errores.
- La sección afectada se revisó en escritorio y móvil, en español e inglés.
- No hay errores en la consola del navegador.
- Toda afirmación nueva sobre un producto es verificable.
- `git diff` revisado: sin credenciales, sin datos internos, sin textos provisionales.
- `docs/STATUS.md` y, si cambió la estructura, `docs/PROJECT_MAP.md` están al día.
- Tras el push, el sitio en producción responde 200 y muestra el cambio.
