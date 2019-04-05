const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.json({
			errors: errors.array(),
			message: 'failer',
			isSuccess: false,
		});
	}
	User.findOne({
		where: { email: email },
	})
		.then((user) => {
			if (user) {
				res.json({
					message: 'Пользователь с таким email уже существует',
					isSuccess: false,
				});
			}
		})
		.then(() => {
			bcrypt.hash(password, 12).then((hashPass) => {
				User.create({ email: email, password: hashPass });
			});
		})
		.then((result) => {
			console.log(result);
			res.json({
				data: result,
				isSuccess: true,
			});
		})
		.catch((err) => console.log(err));
};

exports.signin = (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.json({
			errors: errors.array(),
			isSuccess: false,
			message: 'failer',
		});
	}

	User.findOne({
		where: { email: email },
	})
		.then((user) => {
			if (!user) {
				return res.json({
					message: 'Пользователя с таким email не существует',
					isSuccess: false,
				});
			}
			bcrypt
				.compare(password, user.password)
				.then((result) => {
					if (!result) {
						return res.json({
							isSuccess: false,
							message: 'Не верный пароль',
						});
					}
					const token = jwt.sign({ email: user.email, id: user.id }, 'superpupersecret', {
						expiresIn: '5min',
					});
					return res.json({
						isSuccess: true,
						data: {
							token: token,
						},
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};
