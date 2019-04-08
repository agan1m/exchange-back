const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.post('/', profileController.change);

router.post('/upload', profileController.uploadImage);

module.exports = router;
