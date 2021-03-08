const Config = (() => {
    require('dotenv').config();

    const MONGODB = process.env.MONGODB;
    const SECRET = process.env.SECRET;

    return {
        MONGODB,
        SECRET,
    };
})();

module.exports = Config;