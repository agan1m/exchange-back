const http = require('http');
const path = require('path');
const childProcess = require('child_process');
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
const User = require('./models/user');
const Bill = require('./models/bill');

let app = express();
app.server = http.createServer(app);
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '-' + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
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
		credentials: true
	})
);

app.use(bodyParser.json());
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('file')
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', authRoute);

app.use('/profile', middleware.verifyJWT_MW, profileRoute);

User.hasOne(Bill);
Bill.belongsTo(User);

initializeDb.sync().then((result) => {
	app.server.listen(process.env.PORT || config.port, () => {
		debug(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
