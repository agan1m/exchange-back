const { validationResult } = require('express-validator/check');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.json({
			errors: errors.array(),
			message: 'failer'
		});
	}
	User.create({
		email: email,
		password: password
	})
		.then((user) => {
			console.log(user);
			res.json({
				message: 'success'
			});
		})
		.catch((err) => console.log(err));
};
