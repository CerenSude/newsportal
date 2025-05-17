const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: '*',
}));


const dbPath = path.join(__dirname, 'database.db');  // Check this path carefully
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

app.get('/api/slider_news', (req, res) => {
    db.all('SELECT * FROM slider_news', [], (err, rows) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Failed to retrieve slider news' });
        }
        res.json(rows);
    });
});

app.get('/api/weather_forecast', (req, res) => {
    db.all('SELECT * FROM weather_forecast', [], (err, rows) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ error: 'Failed to retrieve weather forecast data' });
        }
        res.json(rows);
    });
});

app.get('/api/daily-news', (req, res) => {
    const dailyNews = [
        { title: 'Ekonomi bugün yükselişe geçti.' },
        { title: 'Döviz kuru sabit kaldı.' },
        { title: 'Borsa İstanbul rekor kırdı.' },
        { title: 'Altın fiyatları dalgalanıyor.' }
    ];
    res.json(dailyNews);
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
