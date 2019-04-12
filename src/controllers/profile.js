const User = require('../models/user');
const fileHelper = require('../lib/file');
const Jimp = require('jimp');
const path = require('path');

exports.change = async (req, res, next) => {
	const { name, secondname } = req.body;
	const { user = {} } = req;
	let currentUser;
	if (!name && !secondname) {
		return res.json({
			message: 'failer',
			isSuccess: false
		});
	}
	try {
		currentUser = await User.findByPk(user.id);
		currentUser = await currentUser.update({ ...req.body });
		return res.json({
			isSuccess: true,
			data: currentUser
		});
	} catch (error) {
		next(error);
	}
};

exports.uploadImage = async (req, res, next) => {
	try {
		let user;
		const image = await Jimp.read(req.file.path);
		await image
			.resize(185, 185)
			.write(path.join(__dirname, '..', '..', 'images', req.file.filename));

		user = await User.findByPk(req.user.id);
		if (req.file) {
			fileHelper.deleteFile(user.avatar);
		}
		user = await user.update({ avatar: req.file.path });
		return res.json({
			data: user,
			isSuccess: true
		});
	} catch (error) {
		next(error);
	}
};
