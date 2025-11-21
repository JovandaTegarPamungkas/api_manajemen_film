require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Movie = require ('./models/movie.js');
const Directors = require ('./models/directors.js')

connectDB(); //panggil fungsi koneksi di awal

const app = express();
const PORT = process.env.PORT || 3300; // gunakan PORT dari .env

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server API Manajemen Film berjalan!');
});

app.get('/status', (req, res) => {
    res.json({ ok: true, service: 'film-api'});
});

app.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (err) {
        next (err);
    }
});

app.get('/movies/:id', async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({error: 'Film tidak ditemukan'});
        }
        res.json(movie);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({error: 'Format ID tidak valid'});
        }
        next(err);
    }
});

app.post('/movies', async (req, res, next) => {
    try {
        const newMovie = new Movie ({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year
        });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({error: err.message});
        }
        next(err);
    }
});

app.put('/movies/:id', async (req, res, next) => {
    try {
        const {title, director, year} = req.body;
        if (!title || !director || !year) {
            return res.status(400).json({error: 'title, director, year wajib diisi'});
        }
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {title, director, year},
            {new: true, runValidators: true}
        );
        if (!updatedMovie) {
            return res.status(404).json({error: 'Film tidak ditemukan'});
        }
        res.json(updatedMovie);
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.status(400).json({error: err.message});
        }
        if (err.kind === 'ObjectID') {
            return res.status(400).json({error: 'Format ID tidak valid'});
        }
        next(err);
    }
});

app.delete('/movies/:id', async (req, res, next) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({error: 'Film tidak ditemukan'});
        }
        res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({error : 'Format ID tidak valid'});
        }
        next(err);
    }
});

// directors

app.get('/directors', async (req, res, next) => {
        try {
        const directors = await Directors.find({});
        res.json(directors);
    } catch (err) {
        next (err);
    }
});

app.get('/directors/:id', async (req, res, next) => {
    try {
        const directors = await Directors.findById(req.params.id);
        if (!directors) {
            return res.status(404).json({error: 'Directors tidak ditemukan'});
        }
        res.json(directors);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({error: 'Format ID tidak valid'});
        }
        next(err);
    }
});

app.post('/directors', async (req, res, next) => {
        try {
        const newDirectors = new Directors ({
            name: req.body.name,
            birthYear: req.body.birthYear
        });
        const savedDirectors = await newDirectors.save();
        res.status(201).json(savedDirectors);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({error: err.message});
        }
        next(err);
    }
});

app.put('/directors/:id', async (req, res, next) => {
        try {
        const {name, birthYear} = req.body;
        if (!name || !birthYear) {
            return res.status(400).json({error: 'name, birthYear wajib diisi'});
        }
        const updatedDirectors = await Directors.findByIdAndUpdate(
            req.params.id,
            {name, birthYear},
            {new: true, runValidators: true}
        );
        if (!updatedDirectors) {
            return res.status(404).json({error: 'Directors tidak ditemukan'});
        }
        res.json(updatedDirectors);
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.status(400).json({error: err.message});
        }
        if (err.kind === 'ObjectID') {
            return res.status(400).json({error: 'Format ID tidak valid'});
        }
        next(err);
    }
});

app.delete('/directors/:id', async (req, res, next) => {
        try {
        const deletedDirectors = await Directors.findByIdAndDelete(req.params.id);
        if (!deletedDirectors) {
            return res.status(404).json({error: 'Directors tidak ditemukan'});
        }
        res.status(204).send();
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({error : 'Format ID tidak valid'});
        }
        next(err);
    }
});

// Fallback 404
app.use((req, res) => {
    res.status(404).json({error: 'Rute tidak ditemukan'});
});

// Error handler (opsional tapi bagus ditambahkan)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Terjadi Kesalahan pada server'});
});

app.listen(PORT, () => {
    console.log(`Server aktif di http://localhost:${PORT}`);
});