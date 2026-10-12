# Pruebas - Nexrive Web

## Capas
- Automática: `npm run check` genera el sitio y valida locales, llaves sin resolver, anclas internas, archivos referenciados, enlaces solo https y reglas de contenido.
- Visual: `npm run serve` y revisión en escritorio y a 375 px, en ambos idiomas, con el menú móvil abierto y cerrado.
- Producción: `curl -sI https://nexrive.github.io | head -1` debe devolver 200, igual que `/en/`.

## Cobertura esperada
El check cubre todas las páginas generadas. No hay lógica de negocio que requiera pruebas unitarias.

## Ante un defecto
Reproducir, corregir en `src/` o `locales/`, regenerar, repetir el check y la revisión visual de la sección afectada.
