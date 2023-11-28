var elements = document.querySelectorAll('*');
elements.forEach((element) => {
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const replacedText = text.replace(/hate/gi, 'love');
      if (replacedText !== text) {
        node.textContent = replacedText;
      }
    }
  });
});

var pageScripts = document.getElementsByTagName('script');
let externalScripts = 0
for (let script of pageScripts){
    if (script.src){
      externalScripts++
    }
    else {
      let inlineScripts = script.innerHTML
      console.log(inlineScripts)
    }
}
