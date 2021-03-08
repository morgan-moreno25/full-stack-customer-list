const DB = (() => {
    const mongoose = require('mongoose');
    const config = require('./config');

    const url = config.MONGODB;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    const connect = async () => {
        try{
            await mongoose.connect(url, options);

            return 'DB Connected..';
        }catch(error){
            return error;
        };
    };

    return {
        connect,
    };
})();

module.exports = DB;