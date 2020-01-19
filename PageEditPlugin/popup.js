var styles=["size=200"];

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        console.log("content")
    }
  });

  document.getElementById("edit").addEventListener("click",function(event){
    chrome.storage.sync.set({"state":"on"});
},false);
document.getElementById("editOff").addEventListener("click",function(event){
    chrome.storage.sync.set({"state":"off"});
},false);
;