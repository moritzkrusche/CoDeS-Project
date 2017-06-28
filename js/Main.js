
var devMode = false;

/*
var condition = 0;

(function(){
    "use strict";

    var test1 = [];
    var test2 = [];
    var test3 = [];
    var test4 = [];


    for (var i=0; i<100; i++){

        var getCondition = getRandomInt(1,4);

        if (getCondition === 1 )test1.push(getCondition);
        else if (getCondition === 2 )test2.push(getCondition);
        else if (getCondition === 3 )test3.push(getCondition);
        else if (getCondition === 4 )test4.push(getCondition)

    }

    console.log("CONDITION 1 :", test1.length);
    console.log("CONDITION 2 :", test2.length);
    console.log("CONDITION 3 :", test3.length);
    console.log("CONDITION 4 :", test4.length)

    //condition = getCondition;

})();

*/




// 5 * new map; 8* test maps
var experiment = new function(){
    "use strict";

    this.levelKeys = ["map1", "map2", "map3", "map4", "map5", "map6", "map7", "map8", "map9", "map10"];

    // start at zero for array index "levelKeys"
    this.currentOpenLevel = 0;
    this.maxOpenLevels = 4;

    this.currentTestLevel = 0;
    this.maxTestLevels = 7;

    this.testPhase = false;

    var that = this;

    /*
    that.openLevel1 = new OpenLevelClass(220, 220, 100, 1, 2, 2, 1, 0.05, 0.985);
    that.openLevel2 = new OpenLevelClass(220, 220, 100, 1, 2, 2, 1, 0.05, 0.985);
    that.openLevel3 = new OpenLevelClass(220, 220, 100, 1, 2, 2, 1, 0.05, 0.985);
    that.openLevel4 = new OpenLevelClass(220, 220, 100, 1, 2, 2, 1, 0.05, 0.985);
    that.openLevel5 = new OpenLevelClass(220, 220, 100, 1, 2, 2, 1, 0.05, 0.985);
    */

    that.openLevel1 = new OpenLevelClass(220, 220, 100, 0.5, 0.5, 0.5, 0.5, 0.05, 0.985);
    that.openLevel2 = new OpenLevelClass(220, 220, 100, 0.5, 0.5, 0.5, 0.5, 0.05, 0.985);
    that.openLevel3 = new OpenLevelClass(220, 220, 100, 0.5, 0.5, 0.5, 0.5, 0.05, 0.985);
    that.openLevel4 = new OpenLevelClass(220, 220, 100, 0.5, 0.5, 0.5, 0.5, 0.05, 0.985);
    that.openLevel5 = new OpenLevelClass(220, 220, 100, 0.5, 0.5, 0.5, 0.5, 0.05, 0.985);


    this.openMaps = mergeLevels(this.levelKeys, that.openLevel1, that.openLevel2, that.openLevel3, that.openLevel4, that.openLevel5);

    this.farmerChar = new CharClass(assets.charSprite, 240, 360, 4, 4, 0.6 * TILE_W, 0.9 * TILE_H);
    this.potatoAnim = new AnimationClass(assets.potato, 0.5 * TILE_W, 0.32 * TILE_H)
};


// this definition requires that the appropriately sized tilesheet is delivered
curMapConst.soilSheet = new TileSheetClass(assets.soilSheetPic, 5*TILE_W, 5*TILE_H, 5, 5, 0, 0, TILE_W, TILE_H);
curMapConst.plantSheet = new TileSheetClass(assets.plantSheetPic, 5*PLANT_W, 5*PLANT_H, 5, 5, ((TILE_W-PLANT_W)/2), ((TILE_H-PLANT_H)/2), PLANT_W, PLANT_H);


function getStartPos() {
    "use strict";
    // add + 1 because array index starts at 0
    var startCol = Math.floor(curMapVar.tileGrid[0].length/2)+1;
    var startRow = Math.floor(curMapVar.tileGrid.length/2)+1;
	return [startCol, startRow];
}


function trackerReset(char, anim) {
    "use strict";
    killInput();
    char.currentDirection = "down";
	// centers tracker on start position in the center of the map
    char.X = (getStartPos()[0]) * TILE_W - TILE_W/2;
	camera.centerX = char.X;
    char.Y = (getStartPos()[1]) * TILE_H - TILE_H/2;
	camera.centerY = char.Y;
    anim.resetStart(char.X, char.Y);
    anim.animate(char.X, char.Y);
    updateInfo();
    initInput();
}


function startGame() {
    "use strict";
	var framesPerSecond = 10;

    loadLevel(experiment.openMaps.map1);

    //loadLevel(testMaps.map1);
    if (isMobile){
        // wait to adjust for occasionally lagging audio load time on mobile, esp iOS;
        sleep(500);
    }

	setInterval(gameLoop, 1000/framesPerSecond);

}


// logs per game; sends to firebase at the end
function logData(){
    "use strict";
}


function loadLevel(whichLevel) {
    "use strict";
    curMapConst.columnParameters = whichLevel[2].slice();
    curMapConst.rowParameters = whichLevel[5].slice();

    curMapVar.tileGrid = whichLevel[0].slice();
    curMapVar.exploredColumn = whichLevel[1].slice();
    curMapVar.payoffColumn = whichLevel[3].slice();
    curMapVar.exploredRow = whichLevel[4].slice();
    curMapVar.payoffRow = whichLevel[6].slice();

    var moves = whichLevel[7];
    curMapConst.maxMoves = moves;
    curMapVar.movesLeft = moves;

    curMapConst.alpha1 = whichLevel[8];
    curMapConst.beta1 = whichLevel[9];
    curMapConst.alpha2 = whichLevel[10];
    curMapConst.beta2 = whichLevel[11];

    var potPrice = whichLevel[12];
    curMapConst.potatoPrice = potPrice;
    curMapVar.potatoPrice = potPrice;
    curMapConst.discountFactor = whichLevel[13];

    curMapVar.potatoCount = 0;
    curMapVar.movementTracker = [];
    curMapVar.payoffTracker = [];

    trackerReset(experiment.farmerChar, experiment.potatoAnim);
    if (!isMobile) {
        assets.backgroundSound.play();
    }
}


function nextLevel() {
    "use strict";
    var e = experiment;
    var showCurLevel = 0;
    var showMaxLevel = 0;

    if (!e.testPhase){
        e.currentOpenLevel++;
        if (e.currentOpenLevel > e.maxOpenLevels){
            e.testPhase = true;
            showMaxLevel = e.maxTestLevels+1;
            loadLevel(testMaps.map1);
            alert("THIS IS THE START OF THE TEST PHASE OF THIS EXPERIMENT. THIS IS TEST LEVEL 1 OUT OF " + showMaxLevel)
        }
        else {
            var openLevelKey = e.levelKeys[e.currentOpenLevel];
            showCurLevel = e.currentOpenLevel+1;
            showMaxLevel = e.maxOpenLevels+1;
            loadLevel(e.openMaps[openLevelKey]);
            alert("NEXT LEVEL LOADED. THIS IS OPEN LEVEL " + showCurLevel + " OUT OF " + showMaxLevel);
        }
    }

    else {
        e.currentTestLevel++;
        if (e.currentTestLevel > e.maxTestLevels) {
            alert("CONGRATULATIONS! YOU HAVE FINISHED THE EXPERIMENT!!!")
        }
        else {
            var testLevelKey = e.levelKeys[e.currentTestLevel];
            showCurLevel= e.currentTestLevel+1;
            showMaxLevel = e.maxTestLevels+1;
            loadLevel(testMaps[testLevelKey]);
            alert("NEXT LEVEL LOADED. THIS IS TEST LEVEL " + showCurLevel + " OUT OF " + showMaxLevel);
        }
    }

}


//******************************** UI Setup ****************************************************************************

function drawUI(char){
    "use strict";
    var currentX = round((camera.centerX - char.X)/TILE_W, 0);
    var currentY = round((camera.centerY - char.Y)/TILE_H, 0) * -1;
    var propMovesLeft = curMapVar.movesLeft/curMapConst.maxMoves;
    var movesLeft = Math.round(propMovesLeft * curMapConst.maxMoves);
    var propPotatoPrice = curMapVar.potatoPrice/curMapConst.potatoPrice;

    canvas.gameContext.drawImage(assets.uiPic,0,0,CANVAS_W,100);
    colorRect(260,10, 100,30, 'red');
    colorRect(260,10, propMovesLeft * 100,30, 'green');

    colorRect(475,10, 100,30, 'red');
    colorRect(475,10, propPotatoPrice * 100,30, 'green');

    canvas.gameContext.font = 'italic 18pt "COMIC SANS MS"';
    colorText("X: " + currentX, 50,35, "#DAA520");
    colorText("Y: " + currentY, 130,35, "#DAA520");

    canvas.gameContext.font = 'italic 20pt "COMIC SANS MS"';
    colorText(curMapVar.potatoCount,635,35, "#DAA520");
    colorText(movesLeft, 285,35, "#DAA520");
    colorText(round(curMapVar.potatoPrice*100, 2) + " ‎¢", 485,35, "#DAA520");
    canvas.gameContext.font = 'italic 28pt "COMIC SANS MS"';
    colorText(round(curMapVar.payoffCount, 2) + " $", 310,85, "#DAA520");
}

//******************************** Main Game Loop **********************************************************************

function gameLoop() {
    "use strict";
    // move pointer and follow with camera
    trackerMove(experiment.farmerChar);
    camera.instantFollow();

	// drawing black to erase previous frame before .translate()
	colorRect(0, 0, CANVAS_W, CANVAS_H, 'black');

	canvas.gameContext.save(); // needed to undo this .translate() used for scroll

	// subtracting camPanX and camPanY from every draw operation up until restore()
	canvas.gameContext.translate(-camera.panX,-camera.panY+uiHeight);

	// this bit of code brings the true soil (X), or plant (Y) parameter on the screen at the mouse cursor
    var pointerX = (camera.centerX - 350 + userInputStatus.mousePosX);
    var pointerY = (camera.centerY - 400 + userInputStatus.mousePosY);
    var mousePayoffX = round(curMapConst.columnParameters[Math.floor(pointerX/TILE_W)], 2);
    var mousePayoffY = round(curMapConst.rowParameters[Math.floor(pointerY/TILE_H)], 2);
    var payoff = [mousePayoffX, mousePayoffY];

    // rendering everything
    drawVisibleTiles();

    // render farmer Sprite and potato Animation
    var centreX = CANVAS_W/2 +camera.panX;
    var centreY = CANVAS_H/2 +camera.panY;
    experiment.farmerChar.drawSprite(centreX - 30, centreY - 35);
    experiment.potatoAnim.animate(centreX, centreY);

	canvas.gameContext.restore(); // undoes the .translate()
    drawUI(experiment.farmerChar); // UI on top

    // drawing parameters to screen AFTER restore() on mouse position
    if (devMode){
        canvas.gameContext.font = '14pt "COMIC SANS MS"';
        colorText(payoff, userInputStatus.mousePosX, userInputStatus.mousePosY, 'white');
    }

}



