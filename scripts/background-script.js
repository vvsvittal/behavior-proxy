var pageScripts = document.getElementsByTagName('script');
var externalScripts = 0
var usesGoogleAnalytics = false;
for (let script of pageScripts){
    if (script.src){
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
chrome.runtime.sendMessage({usesGA: usesGoogleAnalytics})

var clickCount;
var scrollCount;
var mouseMoveCount;

loadProtectedState(['clickCount', 'scrollCount', 'mouseMoveCount'])

document.addEventListener('scroll', () => {
    scrollCount++
    saveProtectedState('scrollCount', scrollCount)
  })

document.addEventListener('click', () => {
    clickCount++
    saveProtectedState('clickCount', clickCount)
  })

document.addEventListener('mousemove', () => {
    mouseMoveCount++
    saveProtectedState('mouseMoveCount', mouseMoveCount)
  })


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
      clickCount = results.clickCount > 0 ? results.clickCount : 0
      scrollCount = results.scrollCount > 0 ? results.scrollCount : 0
      sessionCount = results.mouseMoveCount > 0 ? results.mouseMoveCount : 0
    })
  }

