const jwt = require('jsonwebtoken');
/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param {express.Response} res	Express HTTP Response
 *	@param {number} [status=200]	Status code to send on success
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res));
 *		}
 */
/* export function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
} */

exports.verifyJWTToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, 'superpupersecret', (err, decodedToken) => {
			if (err || !decodedToken) {
				return reject(err);
			}
			resolve(decodedToken);
		});
	});
};
