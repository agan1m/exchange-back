import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import config from './config.json';

const authRoute = require('./routes/auth');

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

// connect to db
initializeDb((db) => {
	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
