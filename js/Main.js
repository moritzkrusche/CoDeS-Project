var canvas, canvasContext;

var moving = true;
var maxSteps = 70;

var startX = 0;
var startY = 0;

var rotate = 0;

var potatoeCount = 0;

var potatoePrice = 100;

var payoffCount = 0;

const discountFactor = 0.97;


function getStart() {
    var mapWidth = tileGrid[0].length * TILE_W;
    var mapHeight = tileGrid.length * TILE_H;
    console.log("MAP WIDTH; HEIGHT : ", mapWidth, mapHeight);
	return [mapWidth, mapHeight];
}

function stepCounter() {
    // sleep(500);
	if (maxSteps > 0) {
        maxSteps -=1;
        potatoePrice *= discountFactor;
	}
}


/*
function myMove() {
    var elem = document.getElementById("animate");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

*/

movementTracker = [];
payoffTracker = [];

function trackerMove() {
	var nextX = trackerX;
	var nextY = trackerY;

	if(holdLeft) {
        stepCounter();
        rotate = 90 * Math.PI / 180;
        //animateMove(left)
        nextX += - RUN_SPEED;
		holdLeft = false;
        moving = true;
        // moveLeft()
        movementTracker.push("left")
	}
	if(holdRight) {
        stepCounter();
        rotate = 270 * Math.PI / 180;
        //animateMove(right)
        nextX += RUN_SPEED;
		holdRight = false;
        moving = true;
        // moveRight()
        movementTracker.push("right")
	}
	if(holdUp) {
        stepCounter();
        rotate = 180 * Math.PI / 180;
        //animateMove(up)
        nextY += -RUN_SPEED;
		holdUp = false;
        moving = true;
        // moveUp()
        movementTracker.push("up")
	}
	if(holdDown) {
        stepCounter();
        rotate = 0;
        //animateMove(down)
        nextY += RUN_SPEED;
		holdDown = false;
        moving = true;
        // moveDown()
        movementTracker.push("down")
	}

	if(moving && maxSteps > 0) {
		trackerX = nextX;
		trackerY = nextY;
        console.log("TRACKER X, Y : ", trackerX, trackerY);
        updateInfo();
        moving = false;
	}
}


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2-100, canvas.height/2-10, 'white');
    // loadLevel(levelX);
    loadLevel(levelThree);
	loadImages();

};

function trackerReset() {
	// center tracker on screen
	startX = getStart()[0] - canvas.width/2;
	trackerX = startX;
	startY = getStart()[1] - canvas.height/2;
	trackerY = startY;
	console.log("TRACKER X, Y : ", trackerX, trackerY);
    updateInfo();
    potatoeCount = 0;
    payoffCount = 0;
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

    drawBitmapCenteredWithRotation(farmerPic, centreX, centreY, rotate, TILE_W * 0.7, TILE_H);

	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

	// console.log(jStat.beta.sample(1,2));

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
