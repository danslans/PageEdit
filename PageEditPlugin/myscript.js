this.elementSelected={};
this.showMenuBrowser=true;
this.listOfModifiedElements = new Map();
(()=> {
    this.state= {idEdit:0};    
    chrome.storage.sync.get(window.location.hostname,page=>{
        if(page.hasOwnProperty(window.location.hostname)){
            console.log(page);
            setIdElements(true,page);
        }else{
            let namePage = window.location.hostname;
            let jsonToSave ="{"+'"'+namePage+'"'+":{}}";
            chrome.storage.sync.set(JSON.parse(jsonToSave));
            setIdElements(false);
        }
    });
    generarMenu();
})();



function setIdElements(loadStyles,page) {
    for (const element of document.body.children) {
        addEvents(element);
    }
    if (loadStyles) {
        page[window.location.hostname].forEach(styleElement => {
            for (const key in styleElement) {
                let elementSearched = document.querySelector("[idedit="+key+ "]");
                elementSearched.style.cssText = styleElement[key].css;
            }
        });
    }
}

function createElement(children,nameElement) {
    let element = document.createElement(nameElement);
    if (children) {
        element.appendChild(children);    
    }
    return element;
}

function generarMenu() {
    let styleLi = "background-color:#cccccc;cursor:pointer;";
    let li = Object.assign(document.createElement("li"),{style:styleLi,id:"darkStatic"});
    li.appendChild(createElement((Object.assign(createElement(null, "p"), { textContent: "Static", id: "darkStatic" })),"div"));
    li.addEventListener("click",eventClick,false);
    li.addEventListener("touchstart", eventClick, false);


    let li2 = Object.assign(document.createElement("li"),{style:styleLi,id:"darkNotStatic"});
    li2.appendChild(createElement((Object.assign(createElement(null, "p"), { textContent: "No Static", id: "darkNotStatic" })), "div"));
    li2.addEventListener("click",eventClick,false); 
    li2.addEventListener("touchstart", eventClick, false);

    let li3 = Object.assign(document.createElement("li"),{style:styleLi,id:"darkColor"});
    let divColor = Object.assign(document.createElement("div"));
    divColor.appendChild(Object.assign(document.createElement("p"), { innerText: "change Color", id: "darkColor"}));
    divColor.appendChild(Object.assign(document.createElement("input"),{type:"color",id:"setColor"}));
    li3.addEventListener("click", eventClick, false);
    li3.addEventListener("touchstart", eventClick, false);
    li3.appendChild(divColor);

    let li4 = Object.assign(document.createElement("li"),{style:styleLi,id:"darkColorText"});
    let divColorText = Object.assign(document.createElement("div"));
    divColorText.appendChild(Object.assign(document.createElement("p"), { innerText: "change Color Text",id: "darkColorText"}));
    divColorText.appendChild(Object.assign(document.createElement("input"),{type:"color",id:"setColorText"}));
    li4.addEventListener("click", eventClick, false);
    li4.addEventListener("touchstart", eventClick, false);
    li4.appendChild(divColorText);

    let li5 = Object.assign(document.createElement("li"),{style:styleLi,id:"darkDelete"});
    li5.appendChild(createElement((Object.assign(createElement(null, "p"), { textContent: "Eliminar" })), "div"));
    li5.addEventListener("click", eventDelete,false);
    li5.addEventListener("touchstart", eventDelete, false);

    //li3.addEventListener("click",eventClick,false);
    let ul = Object.assign(document.createElement("ul"),{style:"list-style: none;"});    
    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    let menu = document.createElement("nav").appendChild(ul);
    
    let divMenu = Object.assign(document.createElement("div"),{id:"contentMenuDark",
        style: ("background-color: #9c9c9c; position: fixed;width:100px;height:50px;display:none;z-index:4000")
    });
    divMenu.appendChild(menu);
    document.body.appendChild(divMenu);
}

function eventDelete(event) {
    let div = window.elementSelected.target;
    div.remove();
    document.getElementById("contentMenuDark").style.display = "none";
}

function eventClick(event) {
    let div = window.elementSelected;
    listOfModifiedElements.set(div.target.getAttribute("idedit"),{});
    switch (event.target.id) {
        case "darkStatic":
             div.target.style.position="fixed";
             div.target.style.top= div.clientY+"px";
             div.target.style.left= div.clientX+"px"; 
            saveConfig(div);
             document.getElementById("contentMenuDark").style.display="none";
            break;
        case "darkNotStatic":
             div.target.style.position="initial";
            saveConfig(div);
             document.getElementById("contentMenuDark").style.display="none";
            break;
        case "darkColor":
             div.target.style.backgroundColor = ""+document.getElementById("setColor").value+"";
            saveConfig(div);
             document.getElementById("contentMenuDark").style.display="none";
            break;
        case "darkColorText":
             div.target.style.color = ""+document.getElementById("setColorText").value+"";
            saveConfig(div);
             document.getElementById("contentMenuDark").style.display="none";
            break;
    
        default:
            break;
    }
    saveOnChrome();
}



function saveOnChrome() {
    let json = [];
    listOfModifiedElements.forEach((value, key, map) => {
        json.push(JSON.parse("{" + '"' + key + '"' + ":" + JSON.stringify(value) +"}"));
    });
    
    let namePage = window.location.hostname;
    let jsonToSave = "{" + '"' + namePage + '"' + ":" + JSON.stringify(json)+"}";
    chrome.storage.sync.set(JSON.parse(jsonToSave));
}

function saveConfig(div) {
    let object2 = Object.assign(listOfModifiedElements.get(div.target.getAttribute("idedit")), { css: div.target.style.cssText });
    listOfModifiedElements.set(div.target.getAttribute("idedit"), object2);
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


document.addEventListener("touchend",init,false);

document.addEventListener("contextmenu",init,false);


async function init(event) {
    window.event.returnValue = window.showMenuBrowser;
    await chrome.storage.sync.get("state", value => {
        let divMenu = document.getElementById("contentMenuDark");
        if (value.state == "on") {
            divMenu.style.top = (event.clientY + 40) + "px";
            divMenu.style.left = event.clientX + "px";
            divMenu.style.display = "inline";
            window.elementSelected = event;
            window.showMenuBrowser = false;
        } else {
            divMenu.style.display = "none";
            window.showMenuBrowser = true;
        }
    });
}