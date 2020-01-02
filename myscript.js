document.addEventListener("click",function(event){
    debugger;
    chrome.storage.sync.get("state",function(value){
        if(value.state=="on"){
            var elementClick = event.toElement;
            elementClick.style.backgroundColor = "red";
            var menu = document.getElementById("u_0_a");
            console.log("holi");
        }
    });
},false);