const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Drop and recreate finance_menu
    db.run(`DROP TABLE IF EXISTS finance_menu`);
    db.run(`
        CREATE TABLE finance_menu (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      name TEXT NOT NULL,
                                      value TEXT NOT NULL,
                                      change REAL NOT NULL
        )
    `);

    // Drop and recreate slider_news
    db.run(`DROP TABLE IF EXISTS slider_news`);
    db.run(`
        CREATE TABLE slider_news (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     title TEXT NOT NULL,
                                     image_url TEXT NOT NULL
        )
    `);

    db.run(`DROP TABLE IF EXISTS weather_forecast`);
    db.run(`
        CREATE TABLE weather_forecast (
                                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                                          day TEXT,
                                          date TEXT,
                                          high INTEGER,
                                          low INTEGER,
                                          condition TEXT,
                                          icon_url TEXT,
                                          location TEXT
        )
    `);

    // Insert into slider_news
    const sliderNewsItems = [
        ['Breaking: CAT ON THE PAN', 'https://i.pinimg.com/736x/88/b2/53/88b2538cc0b8e77f67f2d52201243f8c.jpg'],
        ['Sad Doggo Broke Hearts, Help Needed', 'https://i.pinimg.com/736x/f5/82/34/f582345541d1c828566109463c2b2d06.jpg'],
        ['WANTED! Gangsta Rat', 'https://i.pinimg.com/736x/7a/b1/70/7ab1709c6506e014d31b62fa09221105.jpg'],
        ['Famous Patrick Star Spotted', 'https://i.pinimg.com/736x/c7/a7/d9/c7a7d96df0d5880196b679227de2dc29.jpg'],
        ['In need of an Exorcist', 'https://i.pinimg.com/736x/fa/b8/65/fab8659f0d61be62ce523dd6f0168176.jpg'],
        ['Catfishes Among Us', 'https://i.pinimg.com/736x/7f/78/71/7f78717ac382608fea5d898c005cb91f.jpg'],
        ['Health: New Drug on the Streets', 'https://i.pinimg.com/736x/e7/8b/45/e78b453df8c86365de27e26b92bbc0b8.jpg'],
        ['Pokemons seem to be real after all', 'https://i.pinimg.com/736x/87/c9/1e/87c91e33ae5ce2514cc56f21e032f0bf.jpg'],
        ['Summer is Back, Temperatures are Rising.', 'https://i.pinimg.com/736x/ef/f2/27/eff2271add54e758f5f0c44087f66bd5.jpg'],
        ['Aliens are trying to communicate with us.', 'https://i.pinimg.com/736x/a6/7a/73/a67a738d3df009787d5a3d56a79b5ac9.jpg']
    ];

    const sliderStmt = db.prepare("INSERT INTO slider_news (title, image_url) VALUES (?, ?)");
    sliderNewsItems.forEach(item => sliderStmt.run(...item));
    sliderStmt.finalize();

    // Insert into finance_menu
    const stmt = db.prepare("INSERT INTO finance_menu (name, value, change) VALUES (?, ?, ?)");
    const items = [
        ['DOLAR', '17.98', 0.18],
        ['EURO', '41.66', -0.83],
        ['STERLİN', '49.01', -1.65],
        ['BITCOIN', '82671.76', 0.18],
        ['BIST 100', '3379.83', -1.10],
        ['ALTIN', '3710.58', -2.27],
        ['FAİZ', '45.99', 0.00]
    ];
    items.forEach(item => stmt.run(...item));
    stmt.finalize();

    const weatherStmt = db.prepare("INSERT INTO weather_forecast (day, date, high, low, condition, icon_url, location)VALUES (?, ?, ?, ? ,? ,? ,?)")
    const weatherinfo = [
        ['Cumartesi', '2025-05-17', 18, 12, 'Yağmurlu', '/icons/rainy.png', 'İzmir'],
        ['Pazar', '2025-05-18', 20, 13, 'Güneşli', '/icons/sunny.png', 'İzmir'],
        ['Pazartesi', '2025-05-19', 22, 15, 'Parçalı Bulutlu', '/icons/cloudy.png', 'İzmir'],
        ['Salı', '2025-05-20', 23, 14, 'Güneşli', '/icons/sunny.png', 'İzmir'],
        ['Çarşamba', '2025-05-21', 21, 13, 'Yağmurlu', '/icons/rainy.png', 'İzmir']
    ];

    weatherinfo.forEach(item => weatherStmt.run(...item));
    weatherStmt.finalize();
    console.log('Database seeded successfully.');
    console.log("Weather data:", weatherData);

});

db.close();
