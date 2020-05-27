
var general_attributes = {
    size: "{padding:0 0 0 0, margin:0 0 0 0}",
};

var styles = ["size=100%,100%", "align=center center", "color=#cccccc"];
var elements = [
    { id: "save", text: "Guardar" },
    { id: "edit", text: "Editar" },
    { id: "editOff", text: "Desactivar" }
]
this.functs.clicked = [
    {
        element: {
            name: "div",
            className: "clicked",
            functions: {
                onmousedown: event => {
                    event.target.style.backgroundColor = "#e6e6e6"
                },
                onmouseup: event => {
                    event.target.style.backgroundColor = "#cccccc"
                }
            }
        }
    }
]

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        console.log("content");
    }
});
window.addEventListener("load",event=>{
    let edit = document.getElementById("edit");
    let cancel = document.getElementById("editOff");
    let guardar = document.getElementById("save");
    if (edit.addEventListener && cancel.addEventListener && guardar) {
        edit.addEventListener("click", event => {
            chrome.storage.sync.set({ "state": "on" });
        }, false);
        cancel.addEventListener("click", event => {
            chrome.storage.sync.set({ "state": "off" });
        }, false);
        guardar.addEventListener("click", event => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tab = tabs[0];
                var url = new URL(tab.url)
                chrome.storage.sync.get(url.hostname, page => {
                    localStorage.setItem({...page});
                });
            });
        });
    }
},false);

