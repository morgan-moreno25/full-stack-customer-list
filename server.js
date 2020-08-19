const express = require('express');
const DB = require('./config/DB');
const requestHeaders = require('./middleware/headers');
const cors = require('cors');
const path = require('path');

const baseRouter = require('./routes/api');

const app = express();

// Connect MongoDB
DB.connect();

// Middleware
app.use(express.json());
app.use(requestHeaders);
app.use(cors());

// Routing
app.use('/api', baseRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

// Connect app to server
var server = app.listen(process.env.PORT || 5000, () => {
    var port = server.address().port;
    console.log("Server listening on port " + port);
});