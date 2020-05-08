const threshold = 100;
let startX, startY, endX, endY;

canvas.addEventListener("mousedown", lock);
canvas.addEventListener("touchstart", lock);

canvas.addEventListener("mouseup", release);
canvas.addEventListener("touchend", release);

function lock(event) {
    if(event.type == "mousedown") {
        startX = event.screenX;
        startY = event.screenY;
    }
    else {
        startX = event.changedTouches[0].screenX;
        startY = event.changedTouches[0].screenY;
    }
}

function release(event) {
    if(event.type == "mouseup") {
        endX = event.screenX;
        endY = event.screenY;
    }
    else {
        endX = event.changedTouches[0].screenX;
        endY = event.changedTouches[0].screenY;
    }
    swipe();
}

function swipe() {
    if(Math.abs(endX-startX) > Math.abs(endY-startY) && Math.abs(endX-startX) > threshold) {
        if(endX-startX > 0) {
            right();
        }
        else {
            left();
        }
    }
    else if(Math.abs(endY-startY) > Math.abs(endX-startX) && Math.abs(endY-startY) > threshold) {
        if(endY-startY > 0) {
            down();
        }
        else {
            up();
        }
    }
}