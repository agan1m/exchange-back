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
			.isLength({ min: 5 }),
	],
	authController.signup
);

module.exports = router;
