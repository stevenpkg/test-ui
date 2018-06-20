'use strict';

let dotenv = require('dotenv');

dotenv.config({silent: true});

let server = require('./app');

let PORT = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(PORT, function() {
	console.log('Server running on port: %d', PORT);
});