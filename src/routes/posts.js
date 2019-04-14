const express = require('express');

const postsController = require('../controllers/posts');

const router = express.Router();

router.get(
	'/',
	postsController.getPosts
);

module.exports = router;
