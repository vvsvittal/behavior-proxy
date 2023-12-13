chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg) {
    console.log(request.msg)
  }
  if (request.proxyOn) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

      fetch(chrome.runtime.getURL('scripts/rules.json'))
        .then(response => response.json())
        .then(data => {
          let rules = [];

          for (let key in data) {
            rules.push(data[key]);
          }

          chrome.declarativeNetRequest.updateDynamicRules({
            addRules: rules,
          });
          console.log("Blocking requests")

        })
        .catch(error => console.error('Error:', error));
    });
  }
  if (request.proxyOff) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      fetch(chrome.runtime.getURL('scripts/rules.json'))
        .then(response => response.json())
        .then(data => {
          let ruleIDs = [];
          for (let key in data) {
            ruleIDs.push(data[key].id);
          }
          chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIDs,
          });
          console.log("Unblocked requests")
        })
        .catch(error => console.error('Error:', error));
    });
  }
  if (request.attach) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          files: ['scripts/background-script.js'],
        })
        .then(() => {
          console.log('Executed background script');
        });
    });
  }
});