const router = require("express").Router();
const Movie = require('../models/Movie.model');

// all your routes here

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie');
})

router.post('/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast
        });
        res.redirect('/movies');
    } catch(error) {
            next(error);
        res.render('movies/new-movie');
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.render('movies/movie-details', movie);
    } catch(error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch(error) {
        next(error);
    }
})

module.exports = router;