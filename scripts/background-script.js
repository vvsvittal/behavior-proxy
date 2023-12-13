var pageScripts = document.getElementsByTagName('script');
var externalScripts = 0
var usesGoogleAnalytics = false;
for (let script of pageScripts) {
  if (script.src) {
    externalScripts++
    if (script.src.includes("www.google-analytics.com") || script.src.includes("googletagmanager.com")) {
      usesGoogleAnalytics = true;
      break;
    }
  }
  else {
    let inlineScripts = script.innerHTML
    if (inlineScripts.includes("ga('create',") || inlineScripts.includes("gtag('config',")) {
      usesGoogleAnalytics = true;
      break;
    }
  }
}
chrome.runtime.sendMessage({ usesGA: usesGoogleAnalytics })

var clickCount;
var scrollCount;
var keyPressCount;

var listenClick;
var listenScroll;
var listenKeyPress;
let scrollTimeout;

loadProtectedState(['clickCount', 'scrollCount', 'keyPressCount'])

if (typeof listenClick !== "undefined") {
  document.removeEventListener("click", listenClick);
}
else{
  listenClick = () => {
  clickCount++
  saveProtectedState('clickCount', clickCount)
}
}
if (typeof listenScroll !== "undefined") {
  document.removeEventListener("scroll", listenScroll);
}
else{
  listenScroll = () => {
  if (!scrollTimeout) {
      scrollCount++
      saveProtectedState('scrollCount', scrollCount)
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 1000); // 1s delay
    }
}
}
if (typeof listenKeyPress !== "undefined") {
  document.removeEventListener("keyPress", listenKeyPress);
}
else{
  listenKeyPress = () => {
  keyPressCount++
  saveProtectedState('keyPressCount', keyPressCount)
}
}

document.addEventListener('scroll', listenScroll)
document.addEventListener('click', listenClick)
document.addEventListener('keypress', listenKeyPress)


function saveProtectedState(key, state) {
  let data = {}
  data[key] = state
  chrome.storage.local.set(data, () => {
  })
}


function loadProtectedState(keys) {
  chrome.storage.local.get(keys, (results) => {
    clickCount = results.clickCount > 0 ? results.clickCount : 0
    scrollCount = results.scrollCount > 0 ? results.scrollCount : 0
    keyPressCount = results.keyPressCount > 0 ? results.keyPressCount : 0
  })
}