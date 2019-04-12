const Sequelize = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('post', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
    }
});

module.exports = Post;
