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
