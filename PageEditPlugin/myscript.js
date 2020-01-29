document,addEventListener("load",function(event){
    chrome.storage.sync.get(window.location.hostname,page=>{
        if(page.hasOwnProperty(window.location.hostname)){
            console.log(page);
        }
    });
   let namePage = window.location.hostname;
    let jsonToSave ="{"+'"'+namePage+'"'+":{}}";
    chrome.storage.sync.set(JSON.parse(jsonToSave));
},false);

document.addEventListener("mousemove",function(event){
    debugger;
    chrome.storage.sync.get("state",function(value){
        if(value.state=="on"){
            var elementClick = event.toElement;
            elementClick.style.backgroundColor = "rgba(144, 215, 249, 0.16)";
            elementClick.style.boxShadow="1px 2px #ccd5ff66";
            var menu = document.getElementById("u_0_a");
            console.log("holi");
        }
    });
},false);

