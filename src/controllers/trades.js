const User = require('../models/user');
const Trade = require('../models/trade');
const io = require('../socket');

exports.tradeSell = async (req, res, next) => {
	try {
		const { etc, btc, usd } = req.body;
		await Trade.createTrade({ userId: req.user.id, btc: btc, etc: etc, usd: usd, operationType: 0 });
		res.json({
			isSuccess: true,
		});
	} catch (error) {
		next(error);
	}
};

exports.tradeBuy = async (req, res, next) => {
	try {
		const { etc, btc, usd } = req.body;
		await Trade.createTrade({ userId: req.user.id, btc: btc, etc: etc, usd: usd, operationType: 1 });
		res.json({
			isSuccess: true,
		});
	} catch (error) {
		next(error);
	}
};

exports.getTradeList = async (req, res, next) => {
	try {
		const { user } = req;
		const tradeList = await Trade.findAll({
			where: {
				userId: user.id,
			},
		});
		res.json({
			isSuccess: true,
			data: tradeList,
		});
	} catch (error) {
		next(error);
	}
};
