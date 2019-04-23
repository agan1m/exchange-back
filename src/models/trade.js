const Sequelize = require('sequelize');
const sequelize = require('../db');

const Trade = sequelize.define('trade', {
	operationType: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	btc: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	etc: {
		type: Sequelize.FLOAT,
		allowNull: true,
	},
	usd: {
		type: Sequelize.FLOAT,
	},
});

module.exports = Trade;
