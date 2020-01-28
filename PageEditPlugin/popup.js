chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        console.log("content");
    }
});

let edit = document.getElementById("edit");
let cancel = document.getElementById("editOff");
if (edit.addEventListener && cancel.addEventListener) {
    edit.addEventListener("click", event => {
        chrome.storage.sync.set({ "state": "on" });
    }, false);
    cancel.addEventListener("click", event => {
        chrome.storage.sync.set({ "state": "off" });
    }, false);
}