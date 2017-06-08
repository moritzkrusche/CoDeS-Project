var canvas, canvasContext;

var moving = false;
var animMove = false;
var maxSteps = 100;
// var moved = false;

const CANVAS_H = 700;
const CANVAS_W = 700;

var startX = 0;
var startY = 0;

const CHAR_W = 60;
const CHAR_H = 90;

var potatoeCount = 0;
var potatoePrice = 0.1;
var payoffCount = 0;
const discountFactor = 0.97;

const POTATO_W = 60;
const POTATO_H = 30;

function getStart() {
    var mapCols = tileGrid[0].length;
    var mapRows = tileGrid.length;
    console.log("MAP COL; ROWS : ", mapCols, mapRows);
	return [mapCols, mapRows];
}

function stepCounter() {
	if (maxSteps > 0) {
        maxSteps -=1;
        potatoePrice *= discountFactor;
	}
    animMove = false;
    moving = false;
    //moved = true;
}

function stopAnimating () {
    animMove = false;
    moving = false;
}



function elementMove() {
    var elem = document.getElementById("animate");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos === 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}


movementTracker = [];
payoffTracker = [];

function trackerMove() {
	var nextX = trackerX;
	var nextY = trackerY;
    var directionX = 0;
    var directionY = 0;

    if (!moving && maxSteps > 0) {

        if (holdLeft) {
            directionX = -5;
            holdLeft = false;
            moving = true;
            currentDirection = "left";

            movementTracker.push("left");

        }
        else if (holdRight) {
            directionX = 5;

            holdRight = false;
            moving = true;
            currentDirection = "right";

            movementTracker.push("right");

        }
        else if (holdUp) {
            directionY = -5;

            holdUp = false;
            moving = true;
            currentDirection = "up";

            movementTracker.push("up");


        }
        else if (holdDown) {
            directionY = 5;
            holdDown = false;
            moving = true;
            currentDirection = "down";

            movementTracker.push("down");

        }
    }
	if(moving && !animMove) {

        animMove = true;
        var stepsMoved = 0;
        var moveId = setInterval(frameMove, 30);
        function frameMove() {
            if (stepsMoved === 100) {
                clearInterval(moveId);
                updateInfo(stepCounter())

            } else {
                nextX += directionX;
                nextY += directionY;
                trackerX = nextX;
                trackerY = nextY;
                stepsMoved+=5;
            }
        }
	}
}


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0, CANVAS_W,CANVAS_H, 'black');
	colorText("LOADING IMAGES", CANVAS_W/2-50, CANVAS_H/2-10, 'white');
    // loadLevel(levelX);

    loadLevel(newGrid);
	loadImages();
};

function trackerReset() {
	// center tracker on screen
	startX = (getStart()[0] * TILE_W - CANVAS_W)/2;
	trackerX = startX;
	startY = (getStart()[1] * TILE_H - CANVAS_H)/2;
	trackerY = startY;

    potatoX1= startX;
    potatoY1 = startY;
    animY1 = startY;

	//console.log("TRACKER X, Y : ", trackerX, trackerY);
    updateInfo();
    //potatoeCount = 0;
    //payoffCount = 0;

    measureWorld();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 10;
	setInterval(updateAll, 1000/framesPerSecond);
	initInput();

}

function loadLevel(whichLevel) {
	tileGrid = whichLevel.slice();
    trackerReset();
}

function updateAll() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	trackerMove();
	instantCamFollow();
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

var potatoX1 = 0;
var potatoY1 = 0;
var animY1 = 0;

var potatoX2 = 0;
var potatoY2 = 0;
var animY2 = 0;

var potatoX3 = 0;
var potatoY3 = 0;
var animY3 = 0;

var payoffAnimCount = 0;

var animPotato1 = false;
var animPotato2 = false;
var animPotato3 = false;

function drawPayoff() {

    if (animPotato1) {
        drawBitmapCenteredWithRotation(potato1, potatoX1, potatoY1, 0, POTATO_W, POTATO_H);
    }

    if (animPotato2) {
        drawBitmapCenteredWithRotation(potato2, potatoX2, potatoY2, 0, POTATO_W, POTATO_H);
    }

    if (animPotato3) {
        drawBitmapCenteredWithRotation(potato3, potatoX3, potatoY3, 0, POTATO_W, POTATO_H);
    }

}

function placePayoff(atX, atY) {

    if (!potato) {

        if (!animPotato1) {
            potatoX1 = atX;
            potatoY1 = atY - POTATO_H;
            animY1 = potatoY1
        }

        if (!animPotato2) {
            potatoX2 = atX;
            potatoY2 = atY - POTATO_H;
            animY2 = potatoY2
        }

        if (!animPotato3) {
            potatoX3 = atX;
            potatoY3 = atY - POTATO_H;
            animY3 = potatoY3
        }
    }

}

function animatePayoff() {

    if (potato) {
        if (!animPotato1) {
            potato = false;
            animPotato1 = true;
            payoffAnimCount += 1;
            var animPos1 = 0;
            var animId1 = setInterval(frameAnim1, 37);

            function frameAnim1() {
                if (animPos1 === 280) {
                    clearInterval(animId1);
                    animPotato1 = false;
                    //console.log("INTERVAL POTATO ONE CLEARED");

                } else {
                    animY1 -= 10;
                    potatoY1 = animY1;
                    animPos1+=10;
                }
            }
        }

        else if (!animPotato2) {
            potato = false;
            animPotato2 = true;
            payoffAnimCount += 1;
            var animPos2 = 0;
            var animId2 = setInterval(frameAnim2, 39);

            function frameAnim2() {
                if (animPos2 === 280) {
                    clearInterval(animId2);
                    animPotato2 = false;
                    //console.log("INTERVAL POTATO TWO CLEARED");

                } else {
                    animY2 -= 10;
                    potatoY2 = animY2;
                    animPos2+=10;
                }
            }
        }

        else if (!animPotato3) {
            potato = false;
            animPotato3 = true;
            payoffAnimCount += 1;
            var animPos3 = 0;
            var animId3 = setInterval(frameAnim3, 38);

            function frameAnim3() {
                if (animPos3 === 280) {
                    clearInterval(animId3);
                    animPotato3 = false;
                    //console.log("INTERVAL POTATO THREE CLEARED");

                } else {
                    animY3 -= 10;
                    potatoY3 = animY3;
                    animPos3+=10;
                }
            }
        }
    }
}

function drawEverything() {
	// drawing black to erase previous frame, doing before .translate() since
	// its coordinates are not supposed to scroll when the camera view does
	colorRect(0, 0, CANVAS_W, CANVAS_H, 'black');

	canvasContext.save(); // needed to undo this .translate() used for scroll

	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates
	canvasContext.translate(-camPanX,-camPanY+100);

	drawOnlyTilesOnScreen();
    var centreX = camPanX + CANVAS_H/2;
    var centreY = camPanY + CANVAS_W/2;

    drawSprite(centreX - 30, centreY - 35, CHAR_W, CHAR_H);
    //drawBitmapCenteredWithRotation(potatoAnim, centreX, centreY - 150, 0, TILE_W*0.7, TILE_H * 0.46);

    placePayoff(centreX, centreY);
    drawPayoff();
    animatePayoff();
	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

	canvasContext.restore(); // undoes the .translate() used for cam scroll

    canvasContext.drawImage(uiPic,0,0,CANVAS_W,100);
    //colorRect(0,0, CANVAS_W,100, '#ff00ff');
	// doing this after .restore() so it won't scroll with the camera pan


    var currentX = round((trackerX - startX)/TILE_W, 0);
    var currentY = round((trackerY - startY)/TILE_H, 0) * -1;

    canvasContext.font = 'italic 12pt Calibri';
    colorText("POTATOES COLLECTED : " + potatoeCount,100,20, "white");
    colorText("X : " + currentX, 10,20, "white");
    colorText("Y : " + currentY, 60,20, "white");
    colorText("STEPS LEFT: " + maxSteps, 550,20, "white");

    colorText("POTATOE PRICE : " + round(potatoePrice, 2) + "$", 330,20, "white");
    canvasContext.font = 'italic 20pt Calibri';
    colorText("$ : " + round(payoffCount, 2), 300,60, "white");
}

