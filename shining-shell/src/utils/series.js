import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

export async function getSeries() {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.series;
}

export async function getSeriesById(id) {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
  return data.series.find(serie => serie.id === id);
}
