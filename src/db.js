const Sequelize = require('sequelize');

/* export default (callback) => {
	// connect to a database if needed, then pass it to `callback`:
	const sequelize = new Sequelize('mysql://root:vitalik@localhost:3306/test');
	sequelize
		.sync()
		.then(() => {
			console.log('db connection');
		})
		.then(() => callback())
		.catch((err) => console.log('Error:' + err));
}; */

const sequelize = new Sequelize('mysql://root:vitalik@localhost:3306/test');

module.exports = sequelize;
