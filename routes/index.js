const router = require('express').Router();

const routerUser = require('./users');
const routerMovies = require('./movies');

const auth = require('../middlewares/auth');

const { signInValidator, signUpValidator } = require('../middlewares/validation');

const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');

router.post('/signin', signInValidator, login);
router.post('/signup', signUpValidator, createUser);
router.use(auth);
router.use('/', routerUser);
router.use('/', routerMovies);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
