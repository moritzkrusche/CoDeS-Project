
//********************************move within Init function*************************************************************

function settings(){




}

// potato count etc. per map


var potatoCount = 0;
var potatoPrice = 0.05;
var payoffCount = 0;
const discountFactor = 0.985;
var STEPS = 10;
var PRICE = 0.05;



var farmerChar = new CharClass(assets.charSprite, 240, 360, 4, 4, 0.6 * TILE_W, 0.9 * TILE_H);
farmerChar.stepsLeft = STEPS;
var potatoAnim = new AnimationClass(assets.potato, 0.5 * TILE_W, 0.32 * TILE_H);







function getStart() {
    // add + 1 because array index starts at 0
    var startCol = Math.floor(tileGrid[0].length/2)+1;
    var startRow = Math.floor(tileGrid.length/2)+1;
	return [startCol, startRow];
}

// load when last finished; 5 * new map; 8* test map
function experiment(){


}
// logs per game; sends to firebase at the end
function logData(){

}



function trackerReset(char, anim) {
	// center tracker on screen
    char.X = (getStart()[0]) * TILE_W - TILE_W/2;
	trackerX = char.X;
    char.Y = (getStart()[1]) * TILE_H - TILE_H/2;
	trackerY = char.Y;
    anim.resetStart(char.X, char.Y);
    anim.animate(char.X, char.Y);
	//console.log("TRACKER X, Y : ", trackerX, trackerY);
    updateInfo();
    //potatoCount = 0;
    //payoffCount = 0;

    measureWorld();
}


function assetLoadingDoneSoStartGame() {
	var framesPerSecond = 10;
    //loadLevel(newGrid);
    //loadLevel(testMap1);
    var levelChoice = confirm("Load Test Map?");
    if (levelChoice === true) {
        trainingPhase = false;
        loadLevel(testMaps.testMap1);
    }
    else {
        trainingPhase = true;
        STEPS = 100;
        farmerChar.stepsLeft = STEPS;
        loadLevel(newGrid);
    }
	setInterval(updateAll, 1000/framesPerSecond);
    if (!isMobile){
        initInput();
    }
    else {
        // wait to load time on iOS;
        sleep(500);
        initInput();
    }
}

function loadLevel(whichLevel) {
	tileGrid = whichLevel.slice();
    trackerReset(farmerChar, potatoAnim);
    if (!isMobile) {
        assets.backgroundSound.play();
    }
}

function updateAll() {
	moveEverything();
	drawEverything();
}

function moveEverything() {
	trackerMove(farmerChar);
	camera.instantFollow();
}




//******************************** UI Setup ****************************************************************************

function drawUI(char){
    var currentX = round((trackerX - char.X)/TILE_W, 0);
    var currentY = round((trackerY - char.Y)/TILE_H, 0) * -1;
    var propMovesLeft = farmerChar.stepsLeft/STEPS;
    var movesLeft = Math.round(propMovesLeft * STEPS);
    var propPotatoePrice = potatoPrice/PRICE;

    canvasContext.drawImage(assets.uiPic,0,0,CANVAS_W,100);
    colorRect(260,10, 100,30, 'red');
    colorRect(260,10, propMovesLeft * 100,30, 'green');

    colorRect(475,10, 100,30, 'red');
    colorRect(475,10, propPotatoePrice * 100,30, 'green');

    canvasContext.font = 'italic 18pt "COMIC SANS MS"';
    colorText("X: " + currentX, 50,35, "#DAA520");
    colorText("Y: " + currentY, 130,35, "#DAA520");

    canvasContext.font = 'italic 20pt "COMIC SANS MS"';
    colorText(potatoCount,635,35, "#DAA520");
    colorText(movesLeft, 285,35, "#DAA520");
    colorText(round(potatoPrice*100, 2) + " ‎¢", 485,35, "#DAA520");
    canvasContext.font = 'italic 28pt "COMIC SANS MS"';
    colorText(round(payoffCount, 2) + " $", 310,85, "#DAA520");
}

//******************************** Main Game Loop **********************************************************************

function drawEverything() {
	// drawing black to erase previous frame, doing before .translate() since
	// its coordinates are not supposed to scroll when the camera view does
	colorRect(0, 0, CANVAS_W, CANVAS_H, 'black');

	canvasContext.save(); // needed to undo this .translate() used for scroll

	// this next line is like subtracting camPanX and camPanY from every
	// canvasContext draw operation up until we call canvasContext.restore
	// this way we can just draw them at their "actual" position coordinates
	canvasContext.translate(-camera.panX,-camera.panY+uiHeight);

	drawOnlyTilesOnScreen();
	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

    var centreX = CANVAS_W/2 +camera.panX;
    var centreY = CANVAS_H/2 +camera.panY;
    farmerChar.drawSprite(centreX - 30, centreY - 35);
    potatoAnim.animate(centreX, centreY);

	canvasContext.restore(); // undoes the .translate() used for cam scroll
	// doing this after .restore() so it won't scroll with the camera pan
    drawUI(farmerChar);
}

