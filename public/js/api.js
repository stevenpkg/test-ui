let Api = (function() {

  let messageEndpoint = '/api/msg';

  // store context for current chat session
  let context = {};

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest
  };


  function displayResponse(output) {
    let outMsg = '';

    if (output.action) {
      console.log("Action: " + JSON.stringify(output.action));
    }

    // add text array to response message
    if (output.text) {
      for (let i = 0; i < output.text.length; i++) {
        outMsg += output.text[i];
        if (i < output.text.length - 1) {
          outMsg += '<br>';
        }
      }
    } else {
      outMsg = 'No response';
    }

    ConversationService.updateChatArea('Bot', outMsg);
  }

  // Send a message request to the server
  function sendRequest(text) {
    // Build request payload
    let payloadToWatson = {};

    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }

    payloadToWatson.context = context;

    // Built http request
    let http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {

        let jsonRes = JSON.parse(http.responseText);

        // save context
        context = jsonRes.context;

        displayResponse(jsonRes.output);

      } else if(http.status !== 200) {
        alert(http.responseText);
      }
    };

    let params = JSON.stringify(payloadToWatson);

    http.send(params);
  }
})();