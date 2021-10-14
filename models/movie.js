const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Передаваемый адрес должен быть ссылкой',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Передаваемый адрес должен быть ссылкой',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Передаваемый адрес должен быть ссылкой',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('movie', movieSchema);
