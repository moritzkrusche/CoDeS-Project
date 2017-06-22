
//********************************move within Init function*************************************************************

var potatoCount = 0;
var potatoPrice = 0.05;
var payoffCount = 0;
const discountFactor = 0.985;
var STEPS = 10;
var PRICE = 0.05;



var farmerChar = new SpriteClass(assets.charSprite);
farmerChar.stepsLeft = STEPS;
var potatoShow = new AnimationClass(assets.potato);

var buttonList = ["pbUp", "pbDown", "pbLeft", "pbRight"];

if (!isMobile) {
    for (var i = 0; i< buttonList.length; i++) {
        document.getElementById(buttonList[i]).style.visibility = "hidden";
    }
}
//document.getElementById(buttonList[i]).style.visibility = "visible";


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




function trackerReset(whichSprite, whichAnim) {
	// center tracker on screen
    whichSprite.startX = (getStart()[0]) * TILE_W - TILE_W/2;
	trackerX = whichSprite.startX;
    whichSprite.startY = (getStart()[1]) * TILE_H - TILE_H/2;
	trackerY = whichSprite.startY;
    whichAnim.resetStart(whichSprite.startX, whichSprite.startY);
    whichAnim.animatePayoff(whichSprite.startX, whichSprite.startY);
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
        loadLevel(testMap1);
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
    trackerReset(farmerChar, potatoShow);
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
	instantCamFollow();
}




//******************************** UI Setup ****************************************************************************

function drawUI(whichSprite){
    var currentX = round((trackerX - whichSprite.startX)/TILE_W, 0);
    var currentY = round((trackerY - whichSprite.startY)/TILE_H, 0) * -1;
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
	canvasContext.translate(-camPanX,-camPanY+uiHeight);

	drawOnlyTilesOnScreen();
	// console.log("TRACKER X: ", trackerX, "TRACKER Y : ", trackerY);
    // console.log("CAM PAN X: ", camPanX, "CAM PAN Y : ", camPanY);

    var centreX = CANVAS_W/2 +camPanX;
    var centreY = CANVAS_H/2 +camPanY;
    farmerChar.drawSprite(centreX - 30, centreY - 35);
    potatoShow.animatePayoff(centreX, centreY);

	canvasContext.restore(); // undoes the .translate() used for cam scroll
	// doing this after .restore() so it won't scroll with the camera pan
    drawUI(farmerChar);
}

