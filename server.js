const express = require('express');
const requestHeaders = require('./middleware/headers');
const requestLogger = require('./middleware/requestLogger');
const cors = require('cors');
const path = require('path');
const connect_db = require('./utils/connect_db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect MongoDB
connect_db()
	.then(msg => console.log(msg))
	.catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(requestHeaders);
app.use(requestLogger);
app.use(cors());

// Routing
app.use('/', require('./routes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.use(errorHandler);

// Connect app to server
var server = app.listen(process.env.PORT || 5000, () => {
	var port = server.address().port;
	console.log('Server listening on port ' + port);
});
