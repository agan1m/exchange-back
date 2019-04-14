const Post = require('../models/post');
const User = require('../models/user');

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
