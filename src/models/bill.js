const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Bill = sequelize.define('bill', {
	btc: {
		type: Sequelize.DOUBLE,
		defaultValue: 0
	},
	etc: {
		type: Sequelize.DOUBLE,
		defaultValue: 0
	},
	dollars: {
		type: Sequelize.DOUBLE,
		defaultValue: 0
	}
});

module.exports = Bill;
