const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

/**
 * @description Authentication middleware for protected routes. Validates a JWT and provides the following middleware functions an object containing user information.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const auth = (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	// Check for token
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const decoded = jwt.verify(token, config.SECRET);

		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

module.exports = auth;
