var granted = false

document.getElementById('perms').addEventListener('click', (e) => {
    chrome.permissions.request({
        permissions: ['activeTab']
    }, (isGranted) => {
        granted = isGranted
    });
});

console.log("BACKGROUND SCRIPT RUNNING")
console.log(granted)