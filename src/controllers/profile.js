const User = require('../models/user');
const fileHelper = require('../lib/file')

exports.change = (req, res, next) => {
	const { name, secondname } = req.body;
	const { user = {} } = req;
	if (!name && !secondname) {
		res.json({
			message: 'failer',
			isSuccess: false,
		});
	}
	User.findByPk(user.id)
		.then((user) => {
			user.update({
				...req.body,
			})
				.then((result) => {
					res.json({
						isSuccess: true,
						data: result,
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

exports.uploadImage = (req, res, next) => {
	User.findByPk(req.user.id)
		.then((user) => {
			if(req.file) {
				fileHelper.deleteFile(user.avatar);
			}
			user.update({ avatar: req.file.path })
				.then((result) => {
					res.json({
						data: result,
						isSuccess: true,
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
			res.json({
				isSuccess: false,
			});
		});
};
