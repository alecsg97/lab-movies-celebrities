const router = require("express").Router();
const Movie = require('../models/Movie.model');

// all your routes here

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie');
})

router.post('/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;
        await Celebrity.create({
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

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch(error) {
        next(error);
    }
})

module.exports = router;