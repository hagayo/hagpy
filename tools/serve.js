import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve(process.cwd());
const host = '127.0.0.1';
const port = Number.parseInt(process.env.PORT ?? '8000', 10);
const e2eMode = process.argv.includes('--e2e');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

function safeFilePath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${host}`).pathname);
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) return null;
  return filePath;
}

const server = createServer(async (request, response) => {
  let filePath;
  try {
    filePath = safeFilePath(request.url ?? '/');
    if (!filePath) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = resolve(filePath, 'index.html');
    await stat(filePath);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }

  response.writeHead(200, {
    'cache-control': 'no-store',
    'content-type': contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  const path = e2eMode ? '/e2e/' : '/';
  console.log(`HagPy preview: http://${host}:${port}${path}`);
});
