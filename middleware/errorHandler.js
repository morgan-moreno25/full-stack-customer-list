import { Request, Response, NextFunction } from 'express';

/**
 * @description Error Handler. Catch all for errors in this express application.
 * @param {any} err The error that is to be handled
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const errorHandler = (err, req, res) => {
	res.status(err.statusCode || 500).json({
		message: err.message || 'Server Error',
	});
};

module.exports = errorHandler;
