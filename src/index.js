const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const initializeDb = require('./db');
const middleware = require('./middleware');
const config = require('./config.json');
const debug = require('debug')('express-sequelize');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

let app = express();
app.server = http.createServer(app);

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

app.use('/auth', authRoute);

app.use('/profile', middleware.verifyJWTToken, profileRoute);

// connect to db
initializeDb.sync().then((result) => {
	app.server.listen(process.env.PORT || config.port, () => {
		debug(`Started on port ${app.server.address().port}`);
	});
});

module.exports = app;
