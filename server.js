const express = require('express');
const DB = require('./config/DB');
const requestHeaders = require('./middleware/headers');
const cors = require('cors');

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

// Connect app to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});