const mongoose = require('mongoose');
const Movie = require('../models/movie');

const { ObjectId } = mongoose.Types;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const { CREATED } = require('../utils/err-status').Status;

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (movies.length === 0) throw new NotFoundError('Фильмов нет');
      res.send(movies);
    })
    .catch((err) => {
      if (err.message === 'Фильмов нет') next(new NotFoundError('Фильмов нет'));
      else next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = ObjectId(req.user._id);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err._message === 'movie validation failed') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) throw new ForbiddenError('Нельзя удалить чужой фильм');
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((movieDelete) => res.send(movieDelete));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Невалидный id'));
      else next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
