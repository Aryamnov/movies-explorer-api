const mongoose = require('mongoose');
const Movie = require('../models/movie');

const { ObjectId } = mongoose.Types;

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (movies.length === 0) throw new NotFoundError('Фильмов нет');
      res.send(movies);
    })
    .catch((err) => {
      if (err.message === 'Фильмов нет') next(new NotFoundError('Фильмов нет'));
      next(new ServerError('Произошла ошибка'));
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
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err._message === 'movie validation failed') next(new BadRequestError('Переданы некорректные данные'));
      next(new ServerError('Произошла ошибка'));
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) throw new ForbiddenError('Нельзя удалить чужой фильм');
      Movie.findByIdAndRemove(req.params.movieId)
        .then((movieDelete) => res.send(movieDelete));
    })
    .catch((err) => {
      if (err.message === 'Нельзя удалить чужой фильм') next(new ForbiddenError('Нельзя удалить чужой фильм'));
      if (err.message === 'Фильм не найден') next(new NotFoundError('Фильм не найден'));
      if (err._message === undefined) next(new BadRequestError('Невалидный id'));
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
