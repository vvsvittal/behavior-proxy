document.addEventListener('DOMContentLoaded', function () {
  var replaceButton = document.getElementById('replace-button');
  replaceButton.addEventListener('click', function () {
    chrome.runtime.sendMessage({ replace: true });
  });
});