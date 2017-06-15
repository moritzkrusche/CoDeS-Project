
//********************************move within Init function*************************************************************
var canvas, canvasContext;

const CANVAS_H = 700;
const CANVAS_W = 700;

var potatoeCount = 0;
var potatoePrice = 0.1;
var payoffCount = 0;
const discountFactor = 0.97;

var farmerChar = new SpriteClass(charSprite);

var potatoShow = new AnimationClass(potato1, potato2, potato3);

function getStart() {
    // add + 1 because array index starts at 0
    var startCol = Math.floor(tileGrid[0].length/2)+1;
    var startRow = Math.floor(tileGrid.length/2)+1;
	return [startCol, startRow];
}


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0, CANVAS_W,CANVAS_H, 'black');
	colorText("LOADING IMAGES", CANVAS_W/2-50, CANVAS_H/2-10, 'white');

	loadImages();
};

function trackerReset(whichSprite, whichAnim) {
	// center tracker on screen
    whichSprite.startX = (getStart()[0]) * TILE_W - TILE_W/2;
	trackerX = whichSprite.startX;
    whichSprite.startY = (getStart()[1]) * TILE_H - TILE_H/2;
	trackerY = whichSprite.startY;

    whichAnim.resetStart(whichSprite.startX, whichSprite.startY);

	//console.log("TRACKER X, Y : ", trackerX, trackerY);
    updateInfo();
    //potatoeCount = 0;
    //payoffCount = 0;

    measureWorld();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 10;
    loadLevel(newGrid);
    //loadLevel(testMap2);
	setInterval(updateAll, 1000/framesPerSecond);
    initInput();
}

function loadLevel(whichLevel) {
	tileGrid = whichLevel.slice();
    trackerReset(farmerChar, potatoShow);

    backgroundSound.play();
}

function updateAll() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	trackerMove(farmerChar);
	instantCamFollow();
}




//********************************UI********************************************************************************

function drawUI(whichSprite){
    canvasContext.drawImage(uiPic,0,0,CANVAS_W,100);
    colorRect(260,10, 100,30, 'red');
    colorRect(260,10, farmerChar.maxSteps,30, 'green');

    var currentX = round((trackerX - whichSprite.startX)/TILE_W, 0);
    var currentY = round((trackerY - whichSprite.startY)/TILE_H, 0) * -1;
    var movesLeft = Math.round((farmerChar.maxSteps/100) * 100);

    canvasContext.font = 'italic 18pt "Comic Sans MS", cursive, sans-serif';
    colorText("X: " + currentX, 50,35, "#DAA520");
    colorText("Y: " + currentY, 130,35, "#DAA520");

    canvasContext.font = 'italic 20pt "Comic Sans MS", cursive, sans-serif';
    colorText(potatoeCount,635,35, "#DAA520");
    colorText(movesLeft, 285,35, "#DAA520");
    colorText(round(potatoePrice, 2) + " $", 475,35, "#DAA520");
    canvasContext.font = 'italic 28pt "Comic Sans MS", cursive, sans-serif';
    colorText(round(payoffCount, 2) + " $", 315,85, "#DAA520");
}

//********************************draw********************************************************************************

function drawEverything() {
	// drawing black to erase previous frame, doing before .translate() since
	// its coordinates are not supposed to scroll when the camera view does
	colorRect(0, 0, CANVAS_W, CANVAS_H, 'black');

	canvasContext.save(); // needed to undo this .translate() used for scroll

	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates
	canvasContext.translate(-camPanX,-camPanY+50);

	drawOnlyTilesOnScreen();
	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

	canvasContext.restore(); // undoes the .translate() used for cam scroll
	// doing this after .restore() so it won't scroll with the camera pan
    var centreX = CANVAS_W/2;
    var centreY = CANVAS_H/2 +50;
    farmerChar.drawSprite(centreX - 30, centreY - 35);
    potatoShow.animatePayoff(centreX, centreY);
    drawUI(farmerChar);

}

