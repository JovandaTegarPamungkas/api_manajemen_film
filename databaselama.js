require('dotenv') .config();
const sqlite3 = require('sqlite3') .verbose();

const DB_SOURCE = process.env.DB_SOURCE;

const db = new sqlite3.Database (DB_SOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Terhubung ke basis data SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT null,
        director TEXT NOT null,
        year INTEGER NOT null
    )`, (err) => {
        if (err) {/*Tabel sudah ada*/} else {
            // tambahkan data awal jika tabel baru ibuat
            // const insert = 'INSERT  OR IGNORE INTO movies (title, director, year) VALUES (?,?,?)';
            // db.run(insert, ["Parasite", "Bong Joon-ho", 2019]);
            // db.run(insert, ["The Dark Knight", "Christopher Nolan", 2008]);
            console.log('add');
        }
        });

        db.run(`CREATE TABLE IF NOT EXISTS directors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT null,
        birthYear INTEGER NOT null
        )`, (err) => {
        if (err) {/*Tabel sudah ada*/} else {
            // tambahkan data awal jika tabel baru ibuat
            // const insert = 'INSERT OR IGNORE INTO directors (name, birthYear) VALUES (?,?)';
            // db.run(insert, ["Wahyu", 1960]);
            // db.run(insert, ["Hadi Sin Yop", 1900]);
            console.log('add');
        }
        });

        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user'
            )`, (err) => {
                if (err) {
                    console.error("Gagal membuat tabel user:", err.message);
                }
            })
    }
});

module.exports = db;