// Genera el sitio estático: una página por idioma a partir de src/template.html
// y los textos de locales/<idioma>.json. Sin dependencias externas.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = process.env.SITE_URL || 'https://nexrive.github.io';

// Idioma por defecto en la raíz; los demás en su propia carpeta.
export const LANGS = [
  { code: 'es', dir: '' },
  { code: 'en', dir: 'en' },
];

export function loadLocale(code) {
  return JSON.parse(readFileSync(join(ROOT, 'locales', `${code}.json`), 'utf8'));
}

// "products.volta.name" -> valor dentro del objeto anidado
function lookup(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// {{clave}} sale del locale; {{@clave}} son valores técnicos (rutas, URLs).
export function render(template, locale, vars, name) {
  return template.replace(/\{\{(@?)([\w.]+)\}\}/g, (_, isVar, key) => {
    const value = isVar ? vars[key] : lookup(locale, key);
    if (typeof value !== 'string') {
      throw new Error(`${name}: falta la clave "${isVar}${key}"`);
    }
    return escapeHtml(value);
  });
}

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log(`generado ${relPath}`);
}

export function build() {
  const template = readFileSync(join(ROOT, 'src', 'template.html'), 'utf8');
  const urlFor = (lang) => `${SITE_URL}/${lang.dir ? lang.dir + '/' : ''}`;

  for (const lang of LANGS) {
    const alt = LANGS.find((l) => l.code !== lang.code);
    const root = lang.dir ? '../' : './';
    const vars = {
      root,
      home: './',
      alt_href: alt.dir ? `${root}${alt.dir}/` : root,
      canonical: urlFor(lang),
      url_es: urlFor(LANGS[0]),
      url_en: urlFor(LANGS[1]),
    };
    const html = render(template, loadLocale(lang.code), vars, `template.html [${lang.code}]`);
    write(join(lang.dir, 'index.html'), html);
  }

  const notFound = readFileSync(join(ROOT, 'src', '404.html'), 'utf8');
  write('404.html', render(notFound, loadLocale(LANGS[0].code), {}, '404.html'));

  mkdirSync(join(ROOT, 'assets'), { recursive: true });
  for (const file of ['styles.css', 'main.js', 'favicon.svg']) {
    copyFileSync(join(ROOT, 'src', file), join(ROOT, 'assets', file));
    console.log(`copiado assets/${file}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();
