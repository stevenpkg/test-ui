let ConversationService = (function() {


  // Publicly accessible methods defined
  return {
    //init: init,
    inputKeyDown: inputKeyDown,
    updateChatArea: updateChatArea
  };


  function updateChatArea(from, text) {

    let divObj = document.getElementById('chatScrollArea');

    let chatBubble = '';

    if(from === 'Bot') {
      chatBubble = '<div class="BotChat" >' + text + '</div>';
    } else {
      chatBubble = '<div class="YouChat" >' + text + '</div>';
    }

    divObj.innerHTML += chatBubble;
    divObj.scrollTop = divObj.scrollHeight;
  }

  function inputKeyDown(event, inputFld) {
    if (event.keyCode === 13 && inputFld.value) {

      updateChatArea('You', inputFld.value);

      Api.sendRequest(inputFld.value);

      inputFld.value = '';
    }
  }

}());