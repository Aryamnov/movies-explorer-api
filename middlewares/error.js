const { INTERNAL } = require('../utils/err-status').Status;

module.exports = (err, req, res, next) => {
  res.status(err.statusCode || INTERNAL).send({ message: err.statusCode ? err.message : 'Произошла ошибка на сервере' });

  next();
};
