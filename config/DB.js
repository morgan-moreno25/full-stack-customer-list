const mongoose = require('mongoose');
const config = require('config');

class DB {
    constructor(){
        this.uri = config.get('mongoURI');
    }

    connect(){
        mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
            if(err) throw err;
            console.log('MongoDB Connected');
        });
    };
};

module.exports = new DB();