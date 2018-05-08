function setupWorkArea(ui){
    var workAreaDiv = document.getElementsByClassName("workzone")[0];
    var canvas = workAreaDiv.getElementsByTagName("canvas")[0];
    var ctx = canvas.getContext("2d");

    canvas.oncontextmenu = function(){return false;};

    var isMouseDown = false;
    var mouseX = 0;
    var mouseY = 0;

    function fitCanvasToScreen(){
        canvas.width = workAreaDiv.clientWidth;
        canvas.height = workAreaDiv.clientHeight;
    }

    function mouseHandler(e){
        var ev = e ? e : window.event;
        if(ev.target !== canvas){
            isMouseDown = false;
            return;
        }
        mouseX = ev.offsetX;
        mouseY = ev.offsetY;
        switch(ev.type){
            case 'mousedown':
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY);
                ctx.strokeStyle=colorToHex[ui.getColorName()];
                isMouseDown = true;
                break;
            case 'mouseup':
                isMouseDown = false;
                break;
            case 'mousemove':
                if(isMouseDown){
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
                break;
        }
        return false;
    }

    fitCanvasToScreen();
    window.onresize = fitCanvasToScreen;
    canvas.onmousemove = mouseHandler;
    canvas.onmousedown = mouseHandler;
    canvas.onmouseup = mouseHandler;

}