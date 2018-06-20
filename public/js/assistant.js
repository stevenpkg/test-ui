let AssistantService = (function () {

  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown,
    updateChatArea: updateChatArea,
    updateJsonArea: updateJsonArea
  };

  function init() {
    Api.sendRequest('');
  }

  function updateChatArea(from, text) {

    let divObj = document.getElementById('chatScrollArea');

    let chatBubble = '';

    if (from === 'Bot') {
      chatBubble = '<div class="BotChat ChatFont" >' + text + '</div>';
    } else {
      chatBubble = '<div class="YouChat ChatFont" >' + text + '</div>';
    }

    divObj.innerHTML += chatBubble;
    divObj.scrollTop = divObj.scrollHeight;
  }


  function updateJsonArea(json) {

    let divObj = document.getElementById('jsonSourceArea');
    let jsonStr = JSON.stringify(json, undefined, 2);

    divObj.innerHTML = jsonStr;
  }

  function inputKeyDown(event, inputFld) {
    if (event.keyCode === 13 && inputFld.value) {

      updateChatArea('You', inputFld.value);

      Api.sendRequest(inputFld.value);

      inputFld.value = '';
    }
  }
}());