const express = require('express');

const imageController = require('../controllers/image');

const router = express.Router();

router.get(
	'/:file',
	imageController.getImage
);

module.exports = router;
