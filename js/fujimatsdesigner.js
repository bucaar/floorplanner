var workzonediv;
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var mouseX = 0;
var mouseY = 0;
var isMouseDown = false;

var colorDefinitions = {
    "Red": {"color": "#E72731"},
    "Blue": {"color": "#1457a8"},
    "Gray": {"color": "#8f9087"},
    "Black": {"color": "#000000"},
    "Apple": {"color": "#3db05e"},
    "Green": {"color": "#949578"},
    "Brown": {"color": "#a45d39"},
    "Orange": {"color": "#f0502a"},
    "Yellow": {"color": "#efb13f"}
};

function ready(){
    canvas = document.getElementById("paper");
    workzonediv = document.getElementsByClassName("workzone")[0];
    canvas.width = workzonediv.clientWidth;
    canvas.height = workzonediv.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    if(canvas.getContext){
        setupCanvas();
    }

    setupUI();
}

function toggleSelect(){
    console.log(this);
    var select = this.parentElement;
    if(select.classList.contains("closed")){
        select.classList.remove("closed");
    }
    else{
        select.classList.add("closed");
    }
}

function submitSelect(){
    console.log(this);

    var optionsList = this.parentElement;
    var customSelect = optionsList.parentElement;
    var selectedContainer = customSelect.getElementsByClassName("custom-selected")[0];
    var selectedOption = selectedContainer.getElementsByClassName("custom-select-option")[0];
    
    if(selectedOption.classList.contains("custom-select-placeholder")){
        selectedOption.classList.remove("custom-select-placeholder");
    }
    selectedOption.innerHTML = this.innerHTML;
    if(!customSelect.classList.contains("closed")){
        customSelect.classList.add("closed");
    }
}

function setupUI(){
    //click listener for the drop down expansion
    var customSelects = document.getElementsByClassName("custom-selected");
    for (var i = 0; i < customSelects.length; i++) {
        customSelects[i].onclick=toggleSelect;
    }

    //click listener for the drop down selection changed
    var customSelectOptions = document.getElementsByClassName("custom-select-options");
    for (var i = 0; i < customSelectOptions.length; i++) {
        var options = customSelectOptions[i].getElementsByClassName("custom-select-option");
        for (var j = 0; j < options.length; j++) {
            options[j].onclick=submitSelect
        }
    }

    //set up color displays
    var colorBoxes = document.getElementsByClassName("color-box");
    for (var i = 0; i < colorBoxes.length; i++) {
        var cb = colorBoxes[i];
        var colorName = cb.parentElement.textContent;
        var colorCSS = colorDefinitions[colorName]["color"];
        cb.style.backgroundColor = colorCSS;
    }
}

function setupCanvas(){
    ctx = canvas.getContext("2d");

    document.onmousedown = onDocMouse;
    document.onmouseup = onDocMouse;
    document.onmousemove = onDocMouse;
    window.onresize = onDocResize;
}

function onDocMouse(e){
    var ev = e ? e : window.event;
    if(ev.target !== canvas){
        isMouseDown = false;
        return;
    }
    mouseX = ev.offsetX;
    mouseY = ev.offsetY;

    switch(ev.type){
        case 'mousedown':
            console.log(ev);
            isMouseDown = true;
            return false;
            break;
        case 'mouseup':
            isMouseDown = false;
            return false;
            break;
        case 'mousemove':
            if(isMouseDown){
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
            else{
                ctx.moveTo(mouseX, mouseY);
            }
            break;
    }
}

function onDocResize( e ){
    var ev = e ? e : window.event;
    //console.log(ev);

    canvas.width = workzonediv.clientWidth;
    canvas.height = workzonediv.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}