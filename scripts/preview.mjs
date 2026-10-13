import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../dist/portafolio/browser', import.meta.url));
const prefix = '/portafolio/';
const port = 4173;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.vtt': 'text/vtt; charset=utf-8' };
try { await stat(resolve(root, 'index.html')); }
catch { console.error('Primero ejecuta npm run build:pages.'); process.exit(1); }
createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    if (pathname === '/' || pathname === '/portafolio') { response.writeHead(302, { Location: prefix }).end(); return; }
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end('No encontrado'); return; }
    const path = resolve(root, pathname.slice(prefix.length) || 'index.html');
    if (!path.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    const bytes = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Content-Length': bytes.length, 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch { response.writeHead(404).end('No encontrado'); }
}).listen(port, '127.0.0.1', () => console.log(`Vista previa de producción: http://127.0.0.1:${port}${prefix}`));
