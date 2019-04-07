const express = require('express');

const profileController = require('../controllers/profile');

const router = express.Router();

router.post('/change', profileController.change);

module.exports = router;
