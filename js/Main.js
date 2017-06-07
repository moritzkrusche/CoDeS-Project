var canvas, canvasContext;

var moving = false;
var animating = false;
var maxSteps = 100;
// var moved = false;

var startX = 0;
var startY = 0;

const CHAR_W = 70;
const CHAR_H = 100;

var potatoeCount = 0;
var potatoePrice = 100;
var payoffCount = 0;
const discountFactor = 0.97;


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
    animating = false;
    moving = false;
    //moved = true;
}

function stopAnimating () {
    animating = false;
    moving = false;
}


function myMove() {
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
            directionX = -1;
            holdLeft = false;
            moving = true;
            currentDirection = "left";

            movementTracker.push("left");

        }
        else if (holdRight) {
            directionX = 1;

            holdRight = false;
            moving = true;
            currentDirection = "right";

            movementTracker.push("right");

        }
        else if (holdUp) {
            directionY = -1;

            holdUp = false;
            moving = true;
            currentDirection = "up";

            movementTracker.push("up");


        }
        else if (holdDown) {
            directionY = 1;
            holdDown = false;
            moving = true;
            currentDirection = "down";

            movementTracker.push("down");

        }
    }
	if(moving && !animating) {

        animating = true;
        var pos = 0;
        var id = setInterval(frame, 3);
        function frame() {
            if (pos === 100) {
                clearInterval(id);
                updateInfo(stepCounter())

            } else {
                nextX += directionX;
                nextY += directionY;
                trackerX = nextX;
                trackerY = nextY;
                pos++;
            }
        }
	}
}


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2-100, canvas.height/2-10, 'white');
    // loadLevel(levelX);

    loadLevel(newGrid);
	loadImages();
};

function trackerReset() {
	// center tracker on screen
	startX = (getStart()[0] * TILE_W - canvas.width)/2;
	trackerX = startX;
	startY = (getStart()[1] * TILE_H - canvas.height)/2;
	trackerY = startY;
	console.log("TRACKER X, Y : ", trackerX, trackerY);
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


function drawEverything() {
	// drawing black to erase previous frame, doing before .translate() since
	// its coordinates are not supposed to scroll when the camera view does
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	canvasContext.save(); // needed to undo this .translate() used for scroll

	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates
	canvasContext.translate(-camPanX,-camPanY);

	drawOnlyTilesOnScreen();
    var centreX = camPanX + canvas.height/2;
    var centreY = camPanY + canvas.width/2;

    drawSprite(centreX - 35, centreY - 40, CHAR_W, CHAR_H);
    // drawBitmapCenteredWithRotation(farmerPic, centreX, centreY, rotate, TILE_W * 0.7, TILE_H);

	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

	canvasContext.restore(); // undoes the .translate() used for cam scroll

	// doing this after .restore() so it won't scroll with the camera pan
    colorText("POTATOES COLLECTED : " + potatoeCount,10,20, "white");

    var currentX = ((trackerX - startX)/TILE_W);
    var currentY = ((trackerY - startY)/TILE_H);

    colorText("X : " + currentX, 250,20, "white");
    colorText("Y : " + currentY, 300,20, "white");
    colorText("STEPS LEFT: " + maxSteps, 400,20, "white");

    colorText("POTATOE PRICE : " + Math.floor(potatoePrice), 500,20, "white");

    colorText("$ : " + Math.floor(payoffCount), 10,50, "white");
}

