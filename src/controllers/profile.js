const User = require('../models/user');

exports.change = (req, res, next) => {
	const { name, secondname } = req.body;

	if (!name || !secondname) {
		res.json({
			message: 'failer',
			isSuccess: false,
		});
	}
};
