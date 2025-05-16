const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: '*',
}));


// Correct DB path
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

app.get('/api/finance', (req, res) => {
    db.all('SELECT * FROM finance_menu', [], (err, rows) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Failed to retrieve data' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
