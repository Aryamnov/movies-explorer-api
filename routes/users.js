const router = require('express').Router();

const { patchUser, getMeInfo } = require('../controllers/users');

const { patchUserValidator } = require('../middlewares/validation');

router.get('/users/me', getMeInfo);
router.patch('/users/me', patchUserValidator, patchUser);

module.exports = router;
