const { Request, Response, NextFunction } = require('express');
const { useTimestamp } = require('../utils/timestamp');

/**
 * @description Logs a request and it's accompanying body when it is made
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const requestLogger = (req, res, next) => {
	const timestamp = useTimestamp();

	console.log('********** REQUEST **********');
	console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
	console.log(`${req.method} ${req.path}`);
	console.log('Body: ', req.body);
	console.log('Query: ', req.query);
	res.on('finish', function () {
		console.log(timestamp, this.statusCode);
		console.log('********* REQUEST END **********');
	});
	next();
};

module.exports = requestLogger;
