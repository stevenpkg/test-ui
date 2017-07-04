let ConversationService = (function() {


  // Publicly accessible methods defined
  return {
    //init: init,
    inputKeyDown: inputKeyDown,
    updateChatArea: updateChatArea
  };


  function updateChatArea(from, text) {
    let divObj = document.getElementById('chatScrollArea');

    //var size = divObj.innerText.length;

    //var line = ((size > 0)?"<br>":"") + from + ': ' + text;

    let chatFld = "";

    if(from === 'Bot') {
      chatFld = "<div class=\"BotChat\" >" + text + "</div>";
    } else {
      chatFld = "<div class=\"YouChat\" >" + text + "</div>";
    }

    //line = "<font color=\"" + colour + "\">" + line + "</font>";

    divObj.innerHTML += chatFld;
    divObj.scrollTop = divObj.scrollHeight;
  }

  function inputKeyDown(event, inputFld) {
    if (event.keyCode === 13 && inputFld.value) {

      updateChatArea('You', inputFld.value);

      Api.sendRequest(inputFld.value);

      inputFld.value = "";
    }
  }

}());