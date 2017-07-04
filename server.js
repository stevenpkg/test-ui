
'use strict';

// read .env
let dotenv = require('dotenv');

dotenv.config({silent: true});

let server = require('./app');


let PORT = 3000;


console.log("Chat Bot Application");


server.listen(PORT, function() {
	console.log('Server running on port: %d', PORT);
});