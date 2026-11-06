// Assemble les sources de src/ en un seul fichier dist/index.html
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = f => readFile(path.join(root, 'src', f), 'utf8');

// L'ordre compte : chaque fichier utilise ce que les précédents définissent.
const JS_FILES = ['icons.js', 'data.js', 'pages.js', 'spaces.js', 'admin.js', 'app.js'];

const [html, css, ...js] = await Promise.all([src('index.html'), src('styles.css'), ...JS_FILES.map(src)]);

if (!html.includes('/*CSS*/') || !html.includes('/*JS*/')) {
  throw new Error('src/index.html doit contenir les marqueurs /*CSS*/ et /*JS*/');
}

// split/join plutôt que replace() : le CSS et le JS contiennent des « $ » qui seraient interprétés.
const out = html.split('/*CSS*/').join(css).split('/*JS*/').join(js.join('\n'));

await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist', 'index.html'), out);
if (existsSync(path.join(root, 'photos'))) await cp(path.join(root, 'photos'), path.join(root, 'dist', 'photos'), { recursive: true });
console.log(`dist/index.html généré (${Math.round(Buffer.byteLength(out) / 1024)} Ko)`);
