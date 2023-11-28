document.addEventListener('DOMContentLoaded', function () {
  var isTracked = setTracked(false) // True if the current site is tracking the user, else false
  var proxyOn = loadProtectedState('proxyOn')
  
 //Load the saved state of proxy
  

  var clickCount = 0
  var sessionCount = 0
  var scrollCount = 0

  let clickLabel = document.getElementById('click-count')
  let scrollLabel = document.getElementById('scroll-count')
  let sessionLabel = document.getElementById('session-count')
  let protectedLabel = document.getElementById('protected')

  clickLabel.innerHTML = clickCount
  scrollLabel.innerHTML = scrollCount
  sessionLabel.innerHTML = sessionCount

  function setTracked(value) {
    document.getElementById('isTracked').innerHTML = (isTracked ? "are" : "are not")
    document.getElementById('isTracked').className = (isTracked ? "text-red-500 font-bold" : "text-green-500 font-bold")
    return value
  }

  var powerButton = document.getElementById('proxyToggle');
  powerButton.addEventListener('click', function () {
    proxyOn = !proxyOn
    renderSavedValues()
    saveProtectedState('proxyOn', proxyOn)
    chrome.runtime.sendMessage({ replace: true });
  });


  function saveProtectedState(key, state) {
    let data = {}
    data[key] = state
    chrome.storage.local.set(data, () => {
      chrome.runtime.sendMessage({ msg: "save" });
       chrome.runtime.sendMessage({ msg: state });
    })
  }

  function loadProtectedState(key) {
    chrome.storage.local.get([key], (result) => {
      proxyOn = result.proxyOn || false;
      chrome.runtime.sendMessage({ msg: "load" });
      chrome.runtime.sendMessage({ msg: result.proxyOn });
      renderSavedValues();
    })
  }

  function renderSavedValues(){
    let path1 = document.getElementById('path1')
    let path2 = document.getElementById('path2')
    path1.style = proxyOn ? "fill:#16a34a" : "fill:#2563eb"
    path2.style = proxyOn ? "fill:#16a34a" : "fill:#2563eb"
    protectedLabel.innerHTML = (proxyOn ? "Protected" : "Not Protected")
  }
});




