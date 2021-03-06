const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const RegistrationError = require('../errors/registration-err');
const { CREATED } = require('../utils/err-status').Status;

const { NODE_ENV, JWT_SECRET } = require('../configs');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      User.findOne({ email })
        .then((user) => res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key-dev', { expiresIn: '7d' }) }))
        .catch((err) => next(err));
    })
    .catch(() => { next(new UnauthorizedError('Неправильные почта или пароль')); });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      User.find({ _id })
        .then((newUser) => res.status(CREATED).send(newUser));
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) next(new RegistrationError('Такой пользователь уже существует'));
      else if (err._message === 'user validation failed') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

const getMeInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .then((user) => {
      if (user) res.send(user);
    })
    .catch((err) => next(err));
};

const patchUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email },
    { new: true, runValidators: true, upsert: false })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) next(new RegistrationError('Такая почта уже существует'));
      else if (err._message === 'Validation failed') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

module.exports = {
  createUser, patchUser, login, getMeInfo,
};
