const util = require('../lib/util');



exports.verifyJWT_MW = (req, res, next) => {
	const token = req.get('Token');

	util.verifyJWTToken(token)
		.then((decodedToken) => {
			req.user = decodedToken;
			next();
		})
		.catch((err) => {
			res.status(401).json({ message: 'Invalid auth token provided.' });
		});
};
