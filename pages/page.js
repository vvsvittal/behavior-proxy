document.addEventListener('DOMContentLoaded', function () {
  var isTracked; // True if the current site is tracking the user, else false
  var clickCount;
  var keyPressCount;
  var scrollCount;
  var proxyOn = loadProtectedState(['proxyOn', 'clickCount', 'scrollCount', 'keyPressCount'])
  chrome.runtime.sendMessage({ attach: true });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.usesGA != null) {
      isTracked = setTracked(request.usesGA || false)
    }
  })

  let clickLabel = document.getElementById('click-count')
  let scrollLabel = document.getElementById('scroll-count')
  let mouseMoveLabel = document.getElementById('session-count')
  let protectedLabel = document.getElementById('protected')

  function setTracked(value) {
    document.getElementById('isTracked').innerHTML = (value ? "are" : "are not")
    document.getElementById('isTracked').className = (value ? "text-red-500 font-bold" : "text-green-500 font-bold")
    return value
  }

  var powerButton = document.getElementById('proxyToggle');
  powerButton.addEventListener('click', function () {
    proxyOn = !proxyOn
    renderSavedValues()
    saveProtectedState('proxyOn', proxyOn)
    proxyOn ? chrome.runtime.sendMessage({ proxyOn: true }) : chrome.runtime.sendMessage({ proxyOff: true }) ;
  });


  function saveProtectedState(key, state) {
    let data = {}
    data[key] = state
    chrome.storage.local.set(data, () => {
      chrome.runtime.sendMessage({ msg: "save" });
      chrome.runtime.sendMessage({ msg: state });
    })
  }

  function loadProtectedState(keys) {
    chrome.storage.local.get(keys, (results) => {
      proxyOn = results.proxyOn || false;
      proxyOn ? chrome.runtime.sendMessage({ proxyOn: true }) : chrome.runtime.sendMessage({ proxyOff: true }) ;
      clickCount = results.clickCount > 0 ? results.clickCount : 0
      scrollCount = results.scrollCount > 0 ? results.scrollCount : 0
      keyPressCount = results.keyPressCount > 0 ? results.keyPressCount : 0
      renderSavedValues();
    })
  }

  function renderSavedValues() {
    let path1 = document.getElementById('path1')
    let path2 = document.getElementById('path2')
    path1.style = proxyOn ? "fill:#16a34a" : "fill:#2563eb"
    path2.style = proxyOn ? "fill:#16a34a" : "fill:#2563eb"
    protectedLabel.innerHTML = (proxyOn ? "Protected" : "Not Protected")
    clickLabel.innerHTML = clickCount
    scrollLabel.innerHTML = scrollCount
    mouseMoveLabel.innerHTML = keyPressCount
  }
});




