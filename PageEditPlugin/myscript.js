this.elementSelected={};
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
    generarMenu();
})();

function generarMenu() {
    let styleLi = "background-color:#cccccc;cursor:pointer;";
    let li = Object.assign(document.createElement("li"),{textContent: "Static",style:styleLi,id:"darkStatic"});
    li.addEventListener("click",eventClick,false);
    let li2 = Object.assign(document.createElement("li"),{textContent: "NoT Static",style:styleLi,id:"darkNotStatic"});
    li2.addEventListener("click",eventClick,false);
    let li3 = Object.assign(document.createElement("li"),{style:styleLi,id:"darkColor"});
    let divColor = Object.assign(document.createElement("div"));
    divColor.appendChild(Object.assign(document.createElement("p"),{innerText:"change Color",id:"darkColor"}));
    divColor.appendChild(Object.assign(document.createElement("input"),{type:"color",id:"setColor"}));
    li3.appendChild(divColor);
    //li3.addEventListener("click",eventClick,false);
    let ul = Object.assign(document.createElement("ul").appendChild(li),{style:"list-style: none;"});    
    ul.appendChild(li2);
    ul.appendChild(li3);
    let menu = document.createElement("nav").appendChild(ul);
    
    let divMenu = Object.assign(document.createElement("div"),{id:"contentMenuDark",
    style:("background-color: #9c9c9c; position: absolute;width:100px;height:50px;display:none;z-index:4")
    });
    divMenu.appendChild(menu);
    document.body.appendChild(divMenu);
}

function eventClick(event) {
    let div = window.elementSelected;
    switch (event.target.id) {
        case "darkStatic":
             div.target.style.position="fixed";
             div.target.style.top= div.clientY+"px";
             div.target.style.left= div.clientX+"px"; 
             document.getElementById("contentMenuDark").style.display="none";
            break;
        case "darkNotStatic":
             div.target.style.position="initial";
             document.getElementById("contentMenuDark").style.display="none";
            break;
        case "darkColor":
             div.target.style.backgroundColor = ""+document.getElementById("setColor").value+"";
             document.getElementById("contentMenuDark").style.display="none";
            break;
    
        default:
            break;
    }
    
}

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
    let element= event.target;
  //  element.style.height= (element.clientHeight+10)+"px";
   // element.style.width= (element.clientWidth+10)+"px";
    
}

function mouseleave (event){
    let element= event.target;
  //  element.style.height= (element.clientHeight-10)+"px";
    //element.style.width= (element.clientWidth-10)+"px";
    
}

document.addEventListener("mousemove",function(event){
    chrome.storage.sync.get("state",function(value){
        if(value.state=="on"){
            var elementClick = event.toElement;
           // elementClick.style.backgroundColor = "rgba(144, 215, 249, 0.16)";
           // elementClick.style.boxShadow="1px 2px #ccd5ff66";
        }
    });
},false);


document.addEventListener("contextmenu",(event)=>{
    window.event.returnValue = false;
    chrome.storage.sync.get("state",value=>{
        if(value.state=="on"){
            let divMenu = document.getElementById("contentMenuDark");
            divMenu.style.top = (event.clientY+40)+"px";
            divMenu.style.left = event.clientX+"px";
            divMenu.style.display = "inline";
            this.elementSelected = event;
            
        }
    });
    
},false);