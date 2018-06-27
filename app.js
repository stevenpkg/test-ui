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
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// watson assistant service sdk
let AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistantService;

if (process.env.ASSISTANT_IAM_APIKEY !== undefined && process.env.ASSISTANT_IAM_APIKEY.length > 0) {
  console.log('using iam api key');
  assistantService = new AssistantV1({
    'version': '2018-02-16',
    'url': process.env.ASSISTANT_IAM_URL,
    'iam_apikey': process.env.ASSISTANT_IAM_APIKEY,
    'iam_url': 'https://iam.bluemix.net/identity/token'
  });
} else {
  console.log('using username and password');
  assistantService = new AssistantV1({
    'version': '2018-02-16',
    'username': process.env.ASSISTANT_USERNAME,
    'password': process.env.ASSISTANT_PASSWORD
  });
}

app.post('/api/msg', function (req, res) {

  let payload = {
    'workspace_id': process.env.ASSISTANT_WORKSPACE,
    'context': req.body.context || {},
    'input': req.body.input || {}
  };

  // Send the input to the assistant service
  assistantService.message(payload, function (err, response) {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
      return res.status(err.code || 500).json(err);
    }

    return res.json(response);
  });
});

module.exports = app;