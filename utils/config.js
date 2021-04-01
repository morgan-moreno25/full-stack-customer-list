require('dotenv').config();

const MONGODB = process.env.MONGODB;
const SECRET = process.env.SECRET;

module.exports = {
	MONGODB,
	SECRET,
};
