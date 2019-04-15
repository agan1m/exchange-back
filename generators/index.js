const mysql = require('mysql2');
const faker = require('faker/locale/ru');

function twoDigits(d) {
	if (0 <= d && d < 10) return '0' + d.toString();
	if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
	return d.toString();
}

Date.prototype.toMysqlFormat = function() {
	return (
		this.getUTCFullYear() +
		'-' +
		twoDigits(1 + this.getUTCMonth()) +
		'-' +
		twoDigits(this.getUTCDate()) +
		' ' +
		twoDigits(this.getUTCHours()) +
		':' +
		twoDigits(this.getUTCMinutes()) +
		':' +
		twoDigits(this.getUTCSeconds())
	);
};

let countsArray = [];
countsArray.length = 10;
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'vitalik',
	database: 'test'
});

connection.query('SELECT `id` FROM users', (err, res, fields) => {
	if (err) throw err;
	let ids = [...res];

	for (let i = 0; i < countsArray.length; i++) {
		const date = new Date(faker.date.past()).toMysqlFormat();
		countsArray[i] = `('${faker.lorem.words(5)}', '${faker.lorem.words(
			60
		)}', '${date}', '${date}', ${ids[Math.round(Math.random() * (ids.length - 1))].id})`;
    }

	connection.query(
		`INSERT INTO posts (title, content, createdAt, updatedAt, userId) VALUES ${countsArray.join(', ')}`,
		(err, res) => {
			if (err) throw err;
			console.log(res);
		}
	);
});

console.log('POSTS CREATED!!!');


