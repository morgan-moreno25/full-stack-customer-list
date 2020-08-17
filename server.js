const express = require('express');
const DB = require('./config/DB');

const app = express();

// Connect MongoDB
DB.connect();

// Middleware
app.use(express.json());

// Routing
app.use('/api', baseRouter);

// Connect app to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});