// Verificación del sitio generado: paridad de locales, claves sin resolver,
// anclas internas, archivos referenciados y reglas de contenido.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, loadLocale } from './build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

// 1. Todos los idiomas tienen exactamente las mismas claves y ninguna vacía.
const base = flatten(loadLocale(LANGS[0].code)).sort();
for (const lang of LANGS) {
  const locale = loadLocale(lang.code);
  const keys = flatten(locale).sort();
  for (const k of base) if (!keys.includes(k)) errors.push(`${lang.code}.json: falta "${k}"`);
  for (const k of keys) if (!base.includes(k)) errors.push(`${lang.code}.json: sobra "${k}"`);
  for (const k of keys) {
    const value = k.split('.').reduce((o, p) => o[p], locale);
    if (typeof value !== 'string' || !value.trim()) errors.push(`${lang.code}.json: "${k}" vacía`);
  }
}

// 2. Cada clave del locale se usa en alguna plantilla (no quedan textos huérfanos).
const sources = ['template.html', '404.html'].map((f) => readFileSync(join(ROOT, 'src', f), 'utf8')).join('\n');
for (const k of base) if (!sources.includes(`{{${k}}}`)) errors.push(`clave sin usar: "${k}"`);

// 3. Páginas generadas.
const pages = [...LANGS.map((l) => join(l.dir, 'index.html')), '404.html'];
for (const page of pages) {
  const full = join(ROOT, page);
  if (!existsSync(full)) {
    errors.push(`${page}: no existe, ejecuta el build`);
    continue;
  }
  const html = readFileSync(full, 'utf8');
  if (/\{\{|\}\}/.test(html)) errors.push(`${page}: quedan llaves sin resolver`);
  if (/·/.test(html)) errors.push(`${page}: contiene punto medio`);
  if (/\p{Extended_Pictographic}/u.test(html.replace(/©/g, ''))) errors.push(`${page}: contiene emoji`);

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      if (!ids.has(href.slice(1))) errors.push(`${page}: ancla rota ${href}`);
    } else if (/^https:\/\//.test(href)) {
      continue;
    } else if (/^[a-z]+:/i.test(href)) {
      errors.push(`${page}: enlace no https ${href}`);
    } else {
      // Ruta local: debe existir como archivo o como carpeta con index.html
      const target = href.startsWith('/') ? join(ROOT, href) : join(dirname(full), href);
      const file = href.endsWith('/') ? join(target, 'index.html') : target;
      if (!existsSync(file)) errors.push(`${page}: archivo local inexistente ${href}`);
    }
  }
  for (const [, src] of html.matchAll(/\ssrc="([^"]+)"/g)) {
    const target = src.startsWith('/') ? join(ROOT, src) : join(dirname(full), src);
    if (!existsSync(target)) errors.push(`${page}: recurso inexistente ${src}`);
  }
}

if (errors.length) {
  console.error(errors.map((e) => `ERROR ${e}`).join('\n'));
  process.exit(1);
}
console.log(`OK: ${base.length} claves en ${LANGS.length} idiomas, ${pages.length} páginas verificadas`);
