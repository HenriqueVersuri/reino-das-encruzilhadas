import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa o banco SQLite
let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT,
    text TEXT,
    timestamp TEXT
  )`);
})();

// CRUD básico
app.get('/messages', async (req, res) => {
  const rows = await db.all('SELECT * FROM messages ORDER BY timestamp DESC');
  res.json(rows);
});

app.post('/messages', async (req, res) => {
  const { role, text, timestamp } = req.body;
  const result = await db.run('INSERT INTO messages (role, text, timestamp) VALUES (?, ?, ?)', [role, text, timestamp]);
  res.json({ id: result.lastID, role, text, timestamp });
});

app.delete('/messages/:id', async (req, res) => {
  await db.run('DELETE FROM messages WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
