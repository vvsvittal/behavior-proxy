//listens for the event and fires a event to execute content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg){
    console.log(request.msg)
  }
   if (request.replace) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          files: ['scripts/proxy-script.js'],
        })
        .then(() => {
          console.log('Executed script');
        });
    });
  }
  if (request.backgroundLoad){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          files: ['scripts/background-script.js'],
        })
        .then(() => {
          console.log('Executed script');
        });
    });
  }
});