const { celebrate } = require('celebrate');
const Joi = require('joi-oid');
const validator = require('validator');// регулярное выражение для ссылок

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(8),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().required().valid('application/json'),
  }).unknown(true),
});

const signUpValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
  headers: Joi.object().keys({
    'content-type': Joi.string().required().valid('application/json'),
  }).unknown(true),
});

const patchUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
  }).unknown(true),
  headers: Joi.object().keys({
    'content-type': Joi.string().required().valid('application/json'),
  }).unknown(true),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1),
    director: Joi.string().required().min(1),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required().min(1),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передана некорректная ссылка для image');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передана некорректная ссылка для trailer');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Передана некорректная ссылка для thumbnail');
    }),
    movieId: Joi.number().required().min(1),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
  }).unknown(true),
});

module.exports = {
  signInValidator,
  signUpValidator,
  patchUserValidator,
  deleteMovieValidator,
  createMovieValidator,
};
