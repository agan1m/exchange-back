const express = require('express');

const postsController = require('../controllers/posts');

const router = express.Router();

router.get('/', postsController.getPosts);

router.post('/', postsController.createPost);

module.exports = router;
