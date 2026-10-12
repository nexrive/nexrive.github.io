# Lista de implementación - Nexrive Web

Cada punto indica cómo se verifica.

- [x] W01 Generador estático con fallo ante claves faltantes - `npm run build`.
- [x] W02 Locales es y en completos y en paridad (R8) - `npm run check`.
- [x] W03 Portada (R1) - revisión visual.
- [x] W04 Productos con estado (R2) - revisión visual; enlace de Google Play responde 200.
- [x] W05 Ecosistema, hoja de ruta, principios y empresa (R3 a R6) - revisión visual.
- [x] W06 Contacto (R7) - enlaces de soporte y GitHub responden 200.
- [x] W07 Página 404 (R9) - generada y validada por el check.
- [x] W08 Adaptación y menú móvil (R10) - revisión a 375 px, sin desborde horizontal.
- [x] W09 SEO por idioma (R11) - etiquetas presentes en la salida.
- [x] W10 Sin recursos de terceros (R12) - política de contenido `default-src 'none'`.
- [ ] W11 Publicación en `https://nexrive.github.io` - `curl -sI` devuelve 200 en `/` y `/en/`. Requiere que exista el repo `nexrive/nexrive.github.io` con acceso de escritura.
- [ ] W12 Revisión en producción en un teléfono real - a cargo del dueño tras publicar.
