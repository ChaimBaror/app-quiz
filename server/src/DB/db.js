import fs from 'node:fs/promises';

const DB_PATH = new URL('./db.json', import.meta.url);

export const readDB = async () => { 
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export const writeDB = async (data) => { 
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

