import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sqlPath = path.join(root, 'sql', 'tools.sql');
const dataDir = path.join(root, 'src', 'data');
const outputPath = path.join(dataDir, 'tools.json');
const dbPath = path.join(os.tmpdir(), `san-san-tools-${process.pid}.db`);

fs.mkdirSync(dataDir, { recursive: true });
try {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  execFileSync('sqlite3', [dbPath], { input: sql, stdio: ['pipe', 'inherit', 'inherit'] });
  const json = execFileSync('sqlite3', [dbPath, '-json', 'SELECT id, name, url, category, keywords, description, icon_url, sort_order, is_featured FROM tools ORDER BY sort_order, id;'], { encoding: 'utf8' });
  const tools = JSON.parse(json || '[]').map((tool) => ({
    ...tool,
    keywords: JSON.parse(tool.keywords),
    is_featured: Boolean(tool.is_featured),
  }));
  fs.writeFileSync(outputPath, `${JSON.stringify(tools, null, 2)}\n`);
  console.log(`Generated ${tools.length} tools from sql/tools.sql -> src/data/tools.json`);
} finally {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
}
