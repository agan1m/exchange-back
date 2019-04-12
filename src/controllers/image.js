const fileHelper = require('../lib/file');
const path = require('path');

exports.getImage = (req, res, next) => {
	const { file } = req.params;
	const options = {
		root: path.join(__dirname, '..', '..', 'images')
	};
	const reg = new RegExp('(?:jpg|jpeg|png)$');
	if (reg.test(req.originalUrl)) {
		res.sendFile(file, options);
	} else {
		next();
	}
};
