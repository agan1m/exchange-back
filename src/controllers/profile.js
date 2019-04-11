const User = require('../models/user');
const fileHelper = require('../lib/file');
const Jimp = require('jimp');
const path = require('path');

exports.change = (req, res, next) => {
	const { name, secondname } = req.body;
	const { user = {} } = req;
	if (!name && !secondname) {
		res.json({
			message: 'failer',
			isSuccess: false
		});
	}
	User.findByPk(user.id)
		.then((user) => {
			user
				.update({
					...req.body
				})
				.then((result) => {
					res.json({
						isSuccess: true,
						data: result
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

exports.uploadImage = async (req, res, next) => {
	try {
		let user;
		const image = await Jimp.read(req.file.path);
		await image
			.resize(150, 150)
			.write(path.join(__dirname, '..', '..', 'images', req.file.filename));

		user = await User.findByPk(req.user.id);
		if (req.file) {
			fileHelper.deleteFile(user.avatar);
		}
		user = await user.update({ avatar: req.file.path });
		res.json({
			data: user,
			isSuccess: true
		});
	} catch (error) {
		console.log(error);
		res.json({
			isSuccess: false
		});
	}
};
