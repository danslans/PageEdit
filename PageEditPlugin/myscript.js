(()=> {
    this.state= {idEdit:0};
    chrome.storage.sync.get(window.location.hostname,page=>{
        if(page.hasOwnProperty(window.location.hostname)){
            console.log(page);
        }else{
            let namePage = window.location.hostname;
            let jsonToSave ="{"+'"'+namePage+'"'+":{}}";
            chrome.storage.sync.set(JSON.parse(jsonToSave));
        }
    });
    for (const element of document.body.children) {
        addEvents(element);
    }
})();

function addEvents(element) {
    element.addEventListener("mouseenter",mouseenter,false);
    element.addEventListener("mouseleave",mouseleave,false);
    let idEdit = document.createAttribute("idEdit");
    idEdit.value = "darkcode"+(this.state.idEdit += 1);
    element.setAttributeNode(idEdit);
    for (const elementChild of element.children) {
        addEvents(elementChild);
    }
}

function mouseenter (event){
    if(event.target.getAttribute("idedit")==="darkcode46"){
        console.log(event.target.getAttribute("idedit"));
    }
    
}

function mouseleave (event){
    if(event.target.getAttribute("idedit")==="darkcode46"){
        console.log(event.target.getAttribute("idedit"));
    }
}

document.addEventListener("mousemove",function(event){
    chrome.storage.sync.get("state",function(value){
        if(value.state=="on"){
            var elementClick = event.toElement;
            elementClick.style.backgroundColor = "rgba(144, 215, 249, 0.16)";
            elementClick.style.boxShadow="1px 2px #ccd5ff66";
        }
    });
},false);


document.addEventListener("contextmenu",function(event){

},false);