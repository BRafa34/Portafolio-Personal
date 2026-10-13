import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const errors = [];
const pending = [];
let cv;
try { cv = JSON.parse(readFileSync(new URL('../public/data/cv.json', import.meta.url), 'utf8')); }
catch (error) { console.error('cv.json no es un JSON válido:', error.message); process.exit(1); }
const root = fileURLToPath(new URL('../public', import.meta.url));
const object = (value, path) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) { errors.push(`${path}: debe ser un objeto.`); return false; }
  return true;
};
const string = (value, path, required = false) => {
  if (typeof value !== 'string') { errors.push(`${path}: debe ser texto.`); return false; }
  if (required && !value.trim()) errors.push(`${path}: no puede estar vacío.`);
  return true;
};
const array = (value, path, check) => {
  if (!Array.isArray(value)) { errors.push(`${path}: debe ser una lista.`); return; }
  value.forEach((item, index) => check(item, `${path}[${index}]`));
};
const webUrl = (value, path, required = false) => {
  if (!string(value, path, required) || !value) return;
  try { if (!['https:', 'http:'].includes(new URL(value).protocol)) throw new Error(); }
  catch { errors.push(`${path}: usa una URL completa http:// o https://.`); }
};
const asset = (value, path, required = false) => {
  if (!string(value, path, required) || !value) return;
  if (/^https?:\/\//i.test(value)) { webUrl(value, path); return; }
  if (/^[\/\\]|[:?#\\]/.test(value)) { errors.push(`${path}: usa una ruta relativa, como photos/perfil.webp.`); return; }
  const target = resolve(root, value);
  if (!target.startsWith(root + sep) || !existsSync(target)) errors.push(`${path}: no se encuentra el archivo dentro de public/: ${value}`);
};
const photo = (value, path, decorative = false) => {
  if (!object(value, path)) return;
  asset(value.src, `${path}.src`);
  string(value.alt, `${path}.alt`, !!value.src && !decorative);
};
if (!object(cv, 'CV')) process.exit(1);
if (cv.demo !== undefined && typeof cv.demo !== 'boolean') errors.push('demo: usa true o false.');
if (object(cv.profile, 'profile')) {
  for (const key of ['name', 'role', 'intro', 'bio', 'location', 'availability']) string(cv.profile[key], `profile.${key}`);
  photo(cv.profile.photo, 'profile.photo'); photo(cv.profile.cover, 'profile.cover', true); asset(cv.profile.cvFile, 'profile.cvFile');
  for (const key of ['name', 'role', 'bio']) if (!cv.profile[key]) pending.push(`profile.${key}`);
  if (!cv.profile.photo?.src) pending.push('fotografía personal');
  if (!cv.profile.cover?.src) pending.push('fotografía de portada');
}
for (const key of ['education', 'experience']) array(cv[key], key, (entry, path) => {
  if (!object(entry, path)) return;
  string(entry.title || entry.degree || '', `${path}.title/degree`, true);
  string(entry.organization ?? entry.institution ?? '', `${path}.organization/institution`);
  string(entry.period ?? (typeof entry.year === 'number' ? String(entry.year) : entry.year) ?? '', `${path}.period/year`);
  if (entry.description !== undefined) string(entry.description, `${path}.description`);
  if (entry.highlights !== undefined) array(entry.highlights, `${path}.highlights`, (item, itemPath) => string(item, itemPath, true));
});
array(cv.skills, 'skills', (entry, path) => {
  if (!object(entry, path)) return;
  string(entry.name, `${path}.name`, true);
  if (entry.level !== null && (typeof entry.level !== 'number' || !Number.isFinite(entry.level) || entry.level < 0 || entry.level > 100)) errors.push(`${path}.level: usa null o un número entre 0 y 100.`);
});
array(cv.languages, 'languages', (entry, path) => {
  if (object(entry, path)) { string(entry.name, `${path}.name`, true); string(entry.level, `${path}.level`, true); }
});
const ids = new Set();
array(cv.projects, 'projects', (entry, path) => {
  if (!object(entry, path)) return;
  for (const key of ['id', 'title', 'category', 'description']) string(entry[key], `${path}.${key}`, true);
  if (ids.has(entry.id)) errors.push(`${path}.id: debe ser único.`);
  ids.add(entry.id);
  if (entry.category === 'Todos') errors.push(`${path}.category: 'Todos' está reservado para el filtro.`);
  photo(entry.image, `${path}.image`);
  array(entry.technologies, `${path}.technologies`, (item, itemPath) => string(item, itemPath, true));
  webUrl(entry.url, `${path}.url`); webUrl(entry.repository, `${path}.repository`);
});
array(cv.media, 'media', (entry, path) => {
  if (!object(entry, path)) return;
  if (!['image', 'video', 'audio'].includes(entry.type)) errors.push(`${path}.type: usa image, video o audio.`);
  asset(entry.src, `${path}.src`, true);
  for (const key of ['alt', 'title', 'description']) string(entry[key], `${path}.${key}`, key !== 'description');
  if (entry.captionSrc !== undefined) asset(entry.captionSrc, `${path}.captionSrc`);
});
if (object(cv.contact, 'contact')) {
  string(cv.contact.email, 'contact.email'); string(cv.contact.phone, 'contact.phone');
  if (cv.contact.email && !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(cv.contact.email)) errors.push('contact.email: correo no válido.');
  if (cv.contact.phone && !/^\+?[\d ()-]+$/.test(cv.contact.phone)) errors.push('contact.phone: usa solo dígitos, +, espacios, guiones o paréntesis.');
  array(cv.contact.links, 'contact.links', (entry, path) => {
    if (object(entry, path)) { string(entry.label, `${path}.label`, true); webUrl(entry.url, `${path}.url`, true); }
  });
  if (!cv.contact.email && !cv.contact.phone && !cv.contact.links?.length) pending.push('datos de contacto');
}
for (const key of ['education', 'experience', 'skills', 'languages', 'projects', 'media']) if (cv[key]?.length === 0) pending.push(key);
if (errors.length) { console.error('Corrige cv.json:\n- ' + errors.join('\n- ')); process.exit(1); }
console.log('CV válido.');
if (pending.length) console.log('Contenido pendiente (sin inventar datos): ' + pending.join(', ') + '.');
