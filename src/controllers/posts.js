const Post = require('../models/post');
const User = require('../models/user');
const io = require('../socket');

exports.getPosts = async (req, res, next) => {
	try {
		const posts = await Post.findAll({ include: [{ model: User }] });
		res.json({
			isSuccess: true,
			data: posts,
		});
	} catch (error) {
		next(error);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { body, user } = req;
		const currentUser = await User.findByPk(user.id);
		await currentUser.createPost({ ...body });
		io.getIO().emit('newPost', { newPost: true });
		res.json({
			isSuccess: true,
		});
	} catch (error) {
		next(error);
	}
};
