let ConversationService = (function() {


  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown,
    updateChatArea: updateChatArea
  };

  function init() {
    Api.sendRequest('hi');
  }


  function updateChatArea(from, text) {

    let divObj = document.getElementById('chatScrollArea');

    let chatBubble = '';

    if(from === 'Bot') {
      chatBubble = '<div class="BotChat ChatFont" >' + text + '</div>';
    } else {
      chatBubble = '<div class="YouChat ChatFont" >' + text + '</div>';
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