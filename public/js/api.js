let Api = (function() {

  let messageEndpoint = '/api/msg';

  // store context for current chat session
  let context = {};

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest
  };

  function displayResponse(json) {
    let outMsg = '';

    if (json.output.action) {
      console.log("Action: " + JSON.stringify(json.output.action));
    }

    // add text array to response message
    if (json.output.text) {
      outMsg = getText(json.output.text);
      if(json.output.generic && json.output.generic[0].text) {
        if(outMsg.length > 0) {
          outMsg += "<br>";
        }
        outMsg += json.output.generic[0].text;
        if (json.output.generic[1].options) {
          outMsg += "<ul>";

          for (let i = 0; i < json.output.generic[1].options.length; i++) {
            if(json.output.generic[1].options[i].value ) {
              outMsg += "<li>" + json.output.generic[1].options[i].value + "</li>";
            }
          }
          outMsg += "</ul>";
        }
      }
    } else {
      outMsg = 'No response';
    }

    AssistantService.updateChatArea('Bot', outMsg);
    AssistantService.updateJsonArea(json);
  }

  function getText(text) {
    let outMsg = '';
    for (let i = 0; i < text.length; i++) {
      outMsg += text[i];
      if (i < text.length - 1) {
        outMsg += '<br>';
      }
    }
    return outMsg;
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

        displayResponse(jsonRes);

      } else if(http.status !== 200) {
        alert(http.responseText);
      }
    };

    let params = JSON.stringify(payloadToWatson);

    http.send(params);
  }
})();