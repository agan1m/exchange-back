const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Bill = require('../models/bill');

exports.signup = async (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({
			errors: errors.array(),
			message: 'failer',
			isSuccess: false
		});
	}
	try {
		let user = await User.findOne({
			where: { email: email }
		});
		if (user) {
			return res.json({
				message: 'Пользователь с таким email уже существует',
				isSuccess: false
			});
		}
		const hashPass = await bcrypt.hash(password, 12);
		user = await User.create({ email: email, password: hashPass });
		const bill = await user.createBill();
		const token = jwt.sign(
			{ email: user.email, id: user.id },
			'superpupersecret',
			{
				expiresIn: '15min'
			}
		);
		const userModel = {
			avatar: user.avatar,
			id: user.id,
			name: user.name,
			secondname: user.secondname,
			email: user.email
		};
		return res.json({
			data: { user: userModel, bill, token },
			isSuccess: true
		});
	} catch (error) {
		next(error);
	}
};

exports.signin = async (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	let user;
	if (!errors.isEmpty()) {
		return res.json({
			errors: errors.array(),
			isSuccess: false,
			message: 'failer'
		});
	}

	try {
		user = await User.findOne({
			where: { email: email },
			exclude: ['createdAt', 'updatedAt'],
			include: [{ model: Bill }]
		});
		console.log(user);
		if (!user) {
			return res.json({
				message: 'Пользователя с таким email не существует',
				isSuccess: false
			});
		}
		let result = await bcrypt.compare(password, user.password);
		if (!result) {
			return res.json({
				isSuccess: false,
				message: 'Не верный пароль'
			});
		}
		const token = jwt.sign(
			{ email: user.email, id: user.id },
			'superpupersecret',
			{
				expiresIn: '15min'
			}
		);
		const userModel = {
			avatar: user.avatar,
			id: user.id,
			name: user.name,
			secondname: user.secondname,
			email: user.email
		};
		return res.json({
			isSuccess: true,
			data: {
				token: token,
				user: userModel,
				bill: user.bill
			}
		});
	} catch (error) {
		next(error);
	}
};
