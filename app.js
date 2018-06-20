/**
 * Chat Bot Application
 */

'use strict';

// app server
let express = require('express');
// parser for post requests
let bodyParser = require('body-parser');

// server
let app = express();

// client UI files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// watson assistant service sdk
let AssistantV1 = require('watson-developer-cloud/assistant/v1');

let assistantService = new AssistantV1({
  'username': process.env.ASSISTANT_USERNAME,
  'password': process.env.ASSISTANT_PASSWORD,
  'version': '2018-02-16'
});

app.post('/api/msg', function(req, res) {

  let payload = {
    'workspace_id': process.env.ASSISTANT_WORKSPACE,
    'context': req.body.context || {},
    'input': req.body.input || {}
  };

  // Send the input to the assistant service
  assistantService.message(payload, function(err, response) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }

    return res.json(response);
  });
});

module.exports = app;