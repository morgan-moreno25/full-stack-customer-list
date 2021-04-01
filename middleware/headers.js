const { Request, Response, NextFunction } = require('express');

/**
 * @description Sets Access-Control Headers
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
const requestHeaders = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

module.exports = requestHeaders;
