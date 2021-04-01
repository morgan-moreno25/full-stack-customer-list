const { Request, Response, NextFunction } = require('express');

/**
 * @description Creates a new timestamp from the current time
 * @returns {String} The current time formatted as HH:MM
 */
function useTimestamp() {
	const date = new Date();

	const hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes}`;
}

/**
 * @description Logs a request and it's accompanying body when it is made
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
function requestLogger(req, res, next) {
	const timestamp = useTimestamp();

	console.log(`*[${timestamp}] - ${req.method} ${req.path}`);
	console.log(`*[${timestamp}] - BODY:`, req.body);
	next();
}

module.exports = requestLogger;
