const express = require('express');

const tradesController = require('../controllers/trades');

const router = express.Router();

router.get('/', tradesController.getTradeList);

router.post('/buy', tradesController.tradeBuy);

router.post('/sell', tradesController.tradeSell);

module.exports = router;
