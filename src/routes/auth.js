const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Введите почту')
			.normalizeEmail(),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Пароль должен быть длиннее 5 символов'),
	],
	authController.signup
);

router.post(
	'/signin',
	[
		body('email')
			.isEmail()
			.withMessage('Введите почту')
			.normalizeEmail(),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Пароль должен быть длиннее 5 символов'),
	],
	authController.signin
);

router.post('/logout', authController.logout);

module.exports = router;
