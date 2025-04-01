const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./hitgpt.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the hitgpt database.');
});

// 初始化表
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_id INTEGER,
    content TEXT NOT NULL,
    related_titles TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (title_id) REFERENCES titles(id)
  )`);
});

module.exports = db;