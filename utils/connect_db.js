const mongoose = require('mongoose');
const config = require('./config');

const url = config.MONGODB;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
};

/**
 * @description Establishes a connection to the database
 * @returns {Promise<String>}
 */
const connect_db = async () => {
	try {
		await mongoose.connect(url, options);

		return 'DB Connected..';
	} catch (error) {
		return error;
	}
};

module.exports = connect_db;
