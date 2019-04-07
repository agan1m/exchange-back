const jwt = require('jsonwebtoken');

exports.verifyJWTToken = (req, res, next) => {
	const token = req.get('Token');
	return new Promise((resolve, reject) => {
		jwt.verify(token, 'superpupersecret', (err, decodedToken) => {
			if (err || !decodedToken) {
				return reject(err);
			}

			resolve(decodedToken);
		});
	});
};
