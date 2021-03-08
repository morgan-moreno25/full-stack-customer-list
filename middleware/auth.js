const jwt = require('jsonwebtoken');
const config = require('../utils/config');

function auth(req, res, next) {
	const token = req.header('x-auth-token');

	// Check for token
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const decoded = jwt.verify(token, config.SECRET);

		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;
