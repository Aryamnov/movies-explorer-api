const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { deleteMovieValidator, createMovieValidator } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);
router.post('/movies', createMovieValidator, createMovie);

module.exports = router;
