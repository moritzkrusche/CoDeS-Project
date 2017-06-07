var spriteSheetWidth = 512;
var spriteSheetHeight = 768;

var spriteRows = 4;
var spriteCols = 4;

var spriteTrackRight = 2;
var spriteTrackLeft = 1;
var spriteTrackUp = 3;
var spriteTrackDown = 0;

var spriteWidth = spriteSheetWidth/spriteCols;
var spriteHeight = spriteSheetHeight/spriteRows;

var curFrame = 0;
var frameCount = 4;

var srcX;
var srcY;

var currentDirection = "down";

/*
var character = new Image();
character.src = "images/farmerSprite.png";
*/

function moveFrames() {
    curFrame = ++curFrame % frameCount;
}


function updateFrame(someDirection, someDelay){
    srcX = curFrame * spriteWidth;

    if (moving) {
        setTimeout(moveFrames, someDelay);
    }

    if(someDirection === "left"){
        srcY = spriteTrackLeft * spriteHeight;
    }
    else if(someDirection === "right"){
        srcY = spriteTrackRight * spriteHeight;
    }
    else if(someDirection === "up"){
        srcY = spriteTrackUp * spriteHeight;
    }
    else if(someDirection === "down" ){
        srcY = spriteTrackDown * spriteHeight;
    }
}

function drawSprite(x,y,width,height){
    updateFrame(currentDirection, 50);
    if (!moving) {
        curFrame = 0;
    }
    canvasContext.drawImage(charSprite,srcX,srcY,spriteWidth,spriteHeight,x,y,width,height);
}


function intervalTimer(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
}

