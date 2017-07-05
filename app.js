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

// watson conversation service sdk
let Conversation = require('watson-developer-cloud/conversation/v1');

let convService = new Conversation({
  'username': process.env.CONVERSATION_USERNAME,
  'password': process.env.CONVERSATION_PASSWORD,
  'version_date': Conversation.VERSION_DATE_2017_04_21
});

app.post('/api/msg', function(req, res) {

  let payload = {
    'workspace_id': process.env.CONVERSATION_WORKSPACE,
    'context': req.body.context || {},
    'input': req.body.input || {}
  };

  // Send the input to the conversation service
  convService.message(payload, function(err, response) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }

    return res.json(response);
  });
});

module.exports = app;