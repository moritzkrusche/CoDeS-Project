//var canvasWidth = 700;
//var canvasHeight = 700;

var spriteWidth = 512;
var spriteHeight = 768;

var rows = 4;
var cols = 4;

var trackRight = 2;
var trackLeft = 1;
var trackUp = 3;
var trackDown = 0;

var width = spriteWidth/cols;
var height = spriteHeight/rows;

var curFrame = 0;
var frameCount = 4;

var centreX = canvas.height/4;
var centreY = canvas.width/4;

var srcX;
var srcY;

var left = false;
var right = true;
var up = false;
var down = false;


//var canvas = document.getElementById('canvas');
//canvas.width = canvasWidth;
//canvas.height = canvasHeight;

//var ctx = canvas.getContext("2d");

var character = new Image();
character.src = "images/farmerSprite.png";


function updateFrame(){
    curFrame = ++curFrame % frameCount;
    srcX = curFrame * width;
    // canvasContext.clearRect(centreX,centreY,width,height);

    if(left){
        srcY = trackLeft * height;
    }
    if(right){
        srcY = trackRight * height;
    }
    if(up){
        srcY = trackUp * height;
    }
    if(down ){
        srcY = trackDown * height;
    }

}

function draw(){
    updateFrame();

    var centreX = camPanX + canvas.height/4;
    var centreY = camPanY + canvas.width/4;
    canvasContext.drawImage(character,srcX,srcY,width*1,height*1,centreX,centreY,TILE_W*0.7,TILE_H);

}


function moveLeft(){
    left = true;
    right = up = down = false;
    animate()
}

function moveRight(){
    right = true;
    left = up = down = false;
    animate()
}

function moveUp(){
    up = true;
    right = left = down = false;
    animate()
}

function moveDown(){
    down = true;
    right = up = left = false;
    animate()
}

function start() {
    var refreshIntervalId = setInterval(draw, 150);
    setTimeout(clearInterval(refreshIntervalId), 3000);
}


function interval(func, wait, times){
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

function animate() {
    interval(function(){
        draw()
    }, 150, 6);
}
