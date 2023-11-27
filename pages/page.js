document.addEventListener('DOMContentLoaded', function () {
  var isTracked = false // True if the current site is tracking the user, else false
  var proxyOn = false
  var clickCount = 0
  var sessionCount = 0
  var scrollCount = 0

  let clickLabel = document.getElementById('click-count')
  let scrollLabel = document.getElementById('scroll-count')
  let sessionLabel = document.getElementById('session-count')
  let protectedLabel = document.getElementById('protected')

  protectedLabel.innerHTML = (proxyOn ? "Protected" : "Not Protected")
  clickLabel.innerHTML = clickCount
  scrollLabel.innerHTML = scrollCount
  sessionLabel.innerHTML = sessionCount

  document.getElementById('isTracked').innerHTML = (isTracked ? "are" : "are not")
  document.getElementById('isTracked').className = (isTracked ? "font-bold text-red-500" : "font-bold text-green-500")

  function setTracked(value) {
    isTracked = value
    document.getElementById('isTracked').innerHTML = (isTracked ? "are" : "are not")
    document.getElementById('isTracked').style = (isTracked ? "text-red-500" : "text-green-500")
  }

  var powerButton = document.getElementById('proxyToggle');
  powerButton.addEventListener('click', function () {
    proxyOn = !proxyOn

    let path1 = document.getElementById('path1')
    let path2 = document.getElementById('path2')
    
    // Change both path colors
    path1.style= proxyOn ? "fill:#16a34a" : "fill:#2563eb" // green-500 and orange-400 in Tailwind
    path2.style = proxyOn ? "fill:#16a34a" : "fill:#2563eb" // green-600 and orange-500 in Tailwind
    protectedLabel.innerHTML = (proxyOn ? "Protected" : "Not Protected")
    //Change text


    chrome.runtime.sendMessage({ replace: !proxyOn });
  });
});