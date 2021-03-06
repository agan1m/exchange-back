const http = require('http');
const path = require('path');
const uuidv4 = require('uuid/v4');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const initializeDb = require('./db');
const middleware = require('./middleware');
const config = require('./config.json');
const debug = require('debug')('express-sequelize');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const imagesRoute = require('./routes/image');
const postsRoute = require('./routes/posts');
const tradesRoute = require('./routes/trades');
const User = require('./models/user');
const Bill = require('./models/bill');
const Post = require('./models/post');
const Trade = require('./models/trade');

let app = express();
app.server = http.createServer(app);
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '-' + file.originalname);
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(
	cors({
		allowedHeaders: ['Content-Type', 'Token'],
		origin: 'http://localhost:3333',
		credentials: true,
	})
);

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', authRoute);
app.use('/profile', middleware.verifyJWT_MW, profileRoute);
app.use('/images', imagesRoute);
app.use('/posts', middleware.verifyJWT_MW, postsRoute);
app.use('/trades', middleware.verifyJWT_MW, tradesRoute);

app.use((err, req, res, next) => {
	console.error(err);
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		isSuccess: false,
		message: err.message,
	});
});

User.belongsTo(Bill);
Bill.hasOne(User);

User.hasMany(Post);
Post.belongsTo(User);

Trade.belongsTo(User);
User.hasOne(Trade);

initializeDb.sync().then((result) => {
	const io = require('./socket').init(app.server);
	app.server.listen(process.env.PORT || config.port, () => {
		io.on('connection', (socket) => {
			console.log('Client connection');
		});
		debug(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
