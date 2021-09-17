class CustomError extends Error {
	constructor(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = CustomError;
