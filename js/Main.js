
//******************************** MAIN: GAME CREATION, LEVELS AND LOOP ************************************************

// when testing the programme, we can use a cheat mode
var devMode = false;
var condition;

// These 4 conditions are tested:
// 1: "1221/soilCol" -> alpha, beta parameters (1,2) for cols & (2,1) for rows; soil for col exploration
// 2: "1221/plantCol"
// 3: 05050505/soilCol
// 4: 05050505/plantCol

/*
// fully random assignment
(function(){
    condition = getRandomInt(1,4);
    loggedData.condition = condition;
})();
*/

condition = 1;
loggedData.condition = condition;

/*
var settings = {
    showInstructions: true,
    playBackgroundSound: false,
    devMode: false

};
*/

// 5 * new map; 8* test maps
var experiment = new function(){
    'use strict';

    // start at zero for array index 'levelKeys'
    this.currentOpenLevel = 0;
    this.maxOpenLevels = 4;
    this.currentTestLevel = 0;
    this.maxTestLevels = 7;
    this.testPhase = false;

    var that = this;
    that.openLevelKeys = ['map1', 'map2', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8'];
    that.testLevelKeys = shuffleArray(that.openLevelKeys.slice());
    loggedData.testMapOrder = that.testLevelKeys;

    if (condition === 1 || condition === 2){
        that.openLevel1 = new OpenLevelClass(210, 210, 100, 1, 2, 2, 1, 0.02, 0.985);
        that.openLevel2 = new OpenLevelClass(210, 210, 100, 1, 2, 2, 1, 0.02, 0.985);
        that.openLevel3 = new OpenLevelClass(210, 210, 100, 1, 2, 2, 1, 0.02, 0.985);
        that.openLevel4 = new OpenLevelClass(210, 210, 100, 1, 2, 2, 1, 0.02, 0.985);
        that.openLevel5 = new OpenLevelClass(210, 210, 100, 1, 2, 2, 1, 0.02, 0.985);
    }
    else if  (condition === 3 || condition === 4){
        that.openLevel1 = new OpenLevelClass(210, 210, 100, 0.5, 0.5, 0.5, 0.5, 0.02, 0.985);
        that.openLevel2 = new OpenLevelClass(210, 210, 100, 0.5, 0.5, 0.5, 0.5, 0.02, 0.985);
        that.openLevel3 = new OpenLevelClass(210, 210, 100, 0.5, 0.5, 0.5, 0.5, 0.02, 0.985);
        that.openLevel4 = new OpenLevelClass(210, 210, 100, 0.5, 0.5, 0.5, 0.5, 0.02, 0.985);
        that.openLevel5 = new OpenLevelClass(210, 210, 100, 0.5, 0.5, 0.5, 0.5, 0.02, 0.985);
    } else {
        alert("WARNING: COULD NOT ASSIGN CONDITION!")
    }
    this.openMaps = mergeLevels(that.openLevelKeys, that.openLevel1, that.openLevel2, that.openLevel3, that.openLevel4,
        that.openLevel5);
    this.farmerChar = new CharClass(assets.charSprite, 1920, 320, 4, 16, 1.2 * TILE_W, 0.8 * TILE_H);
    this.potatoAnim = new AnimationClass(assets.potato, 0.5 * TILE_W, 0.32 * TILE_H)
};


function getStartPos() {
    'use strict';
    // add + 1 because array index starts at 0
    var startCol = Math.floor(curMapVar.tileGrid[0].length/2)+1;
    var startRow = Math.floor(curMapVar.tileGrid.length/2)+1;
	return [startCol, startRow];
}


function trackerReset(char, obj) {
    'use strict';
    char.currentDirection = 'down';
	// centers tracker on start position in the center of the map
    char.X = (getStartPos()[0]) * TILE_W - TILE_W/2;
	camera.centerX = char.X;
    char.Y = (getStartPos()[1]) * TILE_H - TILE_H/2;
	camera.centerY = char.Y;
    obj.resetStart(char.X, char.Y);
    obj.animate(char.X, char.Y);

    // update tile and row/col info at starting position
    var currentCol = Math.floor(camera.centerX/TILE_W);
    var currentRow = Math.floor(camera.centerY/TILE_H);
    curMapVar.tileGrid[currentRow][currentCol] = 1;
    curMapVar.exploredRow[currentRow] += 1;
    curMapVar.exploredColumn[currentCol] += 1;

    // Logging starting positions
    curMapVar.colPositions[0] = currentCol;
    curMapVar.rowPositions[0] = currentRow;
    var XYPos = getXY(char);
    curMapVar.XPositions[0] = XYPos[0];
    curMapVar.YPositions[0] = XYPos[1];

    // set input immediately to false -> if key held
    buttonFalse();
}


function startGame() {
    'use strict';
	var framesPerSecond = 20;
    loadLevel(experiment.openMaps.map1);
    loggedData.browserIsMobile = isMobile;
    loggedData.timeZoneDiff = getTimeZone();
	setInterval(gameLoop, 1000/framesPerSecond);
}

// logging all variable level-like information at the end of each level; sending to firebase at the end
function logData(lvlKey){
    'use strict';
    loggedData.allStartTimes[lvlKey] = curMapVar.startMapTime;
    loggedData.allEndTimes[lvlKey] = curMapVar.endMapTime;
    loggedData.allAlphaBetas[lvlKey] = [curMapConst.alpha1, curMapConst.beta1, curMapConst.alpha2, curMapConst.beta2];

    loggedData.allColPositions[lvlKey] = curMapVar.colPositions.slice();
    loggedData.allRowPositions[lvlKey] = curMapVar.rowPositions.slice();
    loggedData.allColParameters[lvlKey] = curMapConst.columnParameters.slice();
    loggedData.allRowParameters[lvlKey] = curMapConst.rowParameters.slice();

    loggedData.allExploredCols[lvlKey] = curMapVar.exploredColumn.slice();
    loggedData.allExploredRows[lvlKey] = curMapVar.exploredRow.slice();
    loggedData.allPayoffCols[lvlKey] = curMapVar.payoffColumn.slice();
    loggedData.allPayoffRows[lvlKey] = curMapVar.payoffRow.slice();
    loggedData.allPotatoCounts[lvlKey] = curMapVar.potatoCount;

    loggedData.payoffCount = round(curMapVar.payoffCount, 2); // always updated anyway
    loggedData.allPayoffCounts[lvlKey] = round(curMapVar.payoffCount, 2);
    loggedData.allMovementTrackers[lvlKey] = curMapVar.movementTracker.slice();

    loggedData.allXPositions[lvlKey] = curMapVar.XPositions.slice();
    loggedData.allYPositions[lvlKey] = curMapVar.YPositions.slice();
    loggedData.allXProbabilities[lvlKey] = curMapVar.XProbabilities.slice();
    loggedData.allYProbabilities[lvlKey] = curMapVar.YProbabilities.slice();
    loggedData.allProbTrackers[lvlKey] = curMapVar.probTracker.slice();

    loggedData.allMoveTimes[lvlKey] = curMapVar.timeTracker.slice();
    loggedData.allPayoffTrackers[lvlKey] = curMapVar.payoffTracker.slice();
}


function getLogLevelKey(){
    "use strict";
    var curLevel = NaN;
    var logLevelKey = NaN;

    if (experiment.currentTestLevel > 0){
        // increment by one for readability;
        curLevel = experiment.currentTestLevel;
        logLevelKey = "testMap" + curLevel;

    } else if (experiment.currentOpenLevel > 0){

        curLevel = experiment.currentOpenLevel;
        logLevelKey = "openMap" + curLevel;
    }
    return logLevelKey;
}


function loadLevel(whichLevel) {
    'use strict';

    curMapVar.startMapTime = getDateTime()[0];
    curMapVar.nextTime = curMapVar.lastTime = getDateTime()[1]; // seconds when level starts

    curMapVar.tileGrid = whichLevel[0].slice();
    curMapConst.columnParameters = whichLevel[1].slice();
    curMapVar.payoffColumn = whichLevel[2].slice();
    curMapVar.exploredColumn = whichLevel[3].slice();
    curMapConst.rowParameters = whichLevel[4].slice();
    curMapVar.payoffRow = whichLevel[5].slice();
    curMapVar.exploredRow = whichLevel[6].slice();

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

    //resetting counters
    curMapVar.potatoCount = 0;
    curMapVar.moveCount = 0;

    // initialising trackers to length
    var cols = whichLevel[1].length;
    var rows = whichLevel[4].length;
    curMapVar.colPositions = [cols];
    curMapVar.rowPositions = [rows];

    curMapVar.timeTracker = new Array(moves);
    curMapVar.movementTracker = new Array(moves);
    curMapVar.payoffTracker = new Array(moves);
    curMapVar.XPositions = new Array(moves);
    curMapVar.YPositions = new Array(moves);
    curMapVar.XProbabilities = new Array(moves);
    curMapVar.YProbabilities = new Array(moves);
    curMapVar.probTracker = new Array(moves);

    trackerReset(experiment.farmerChar, experiment.potatoAnim);
}


function nextLevelTestLevel(){
    "use strict";
    experiment.currentOpenLevel = 4;
    nextLevel()
}


function nextLevel() {
    'use strict';
    curMapVar.endMapTime = getDateTime()[0]; // seconds when level ends

    var e = experiment;
    // This key is for the old level, not the new one
    var logLevelKey = NaN;
    canvas.infoContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);

    if (!e.testPhase){
        e.currentOpenLevel++;
        if (e.currentOpenLevel > e.maxOpenLevels){
            killInput();
            e.testPhase = true; // first test map
            logLevelKey = getLogLevelKey();
            logData(logLevelKey);
            sendUpdateData();
            testInstructions.show();
        }
        else {
            killInput();
            var openLevelKey = e.openLevelKeys[e.currentOpenLevel];
            logLevelKey = getLogLevelKey();
            logData(logLevelKey);
            sendUpdateData();
            loadLevel(e.openMaps[openLevelKey]);
            nextOpenLevel.show();
        }
    }
    else {
        e.currentTestLevel++;
        if (e.currentTestLevel > e.maxTestLevels) {
            killInput();
            loggedData.endDateTime = getDateTime();
            logLevelKey = getLogLevelKey();
            logData(logLevelKey);
            sendUpdateData();
            sendAllData(); // sending all data to the database!
        }
        else {
            killInput();
            var testLevelKey = e.testLevelKeys[e.currentTestLevel];
            logLevelKey = getLogLevelKey();
            logData(logLevelKey);
            sendUpdateData();
            loadLevel(testMaps[testLevelKey]);
            nextTestLevel.show();
        }
    }
}


function sendFirstData(){
    "use strict";
    var userId = 'gameData' + '/' + loggedData.prolificId + '|' + loggedData.startDateTime[0];
    database.ref(userId).set(loggedData);
}

function sendUpdateData(){
    "use strict";
    var userId = 'gameData' + '/' + loggedData.prolificId + '|' + loggedData.startDateTime[0];
    database.ref(userId).update(loggedData);

}


function sendAllData(){
    "use strict";
    var textSendingData = 'Sending data to database. This may take a few moments. ' +
        'Check your internet connection and DO NOT CLOSE THE GAME! ' +
        'As soon as all data is sent, this page will update.';
    htmlPage.fullBox.style.display = 'block';
    boxScreen.wrapText(textSendingData, 80, 320, 540, 30, '18pt "Helvetica Neue"');
    database.ref('backupData').push(loggedData, finished);
    function finished(error) {
        if (error) {
            alert('WARNING: COULD NOT SEND TO DATABASE! CHECK YOUR INTERNET CONNECTION! DO NOT CLOSE THE GAME!');
        } else {
            htmlPage.fullBox.style.display = 'none';
            canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
            showDebriefPage();
            !isMobile ? assets.finishedSound.play() : assets.spriteSound.play('finished');
        }
    }
}

//******************************** UI Setup ****************************************************************************

function drawUI(char){
    'use strict';
    var ctx = canvas.uiContext;

    var currentX = round((camera.centerX - char.X)/TILE_W, 0);
    var currentY = round((camera.centerY - char.Y)/TILE_H, 0) * -1;
    var propMovesLeft = curMapVar.movesLeft/curMapConst.maxMoves;
    var movesLeft = Math.round(propMovesLeft * curMapConst.maxMoves);
    var propPotatoPrice = curMapVar.potatoPrice/curMapConst.potatoPrice;

    ctx.clearRect(0,0,CANVAS_W,100); //clear for transparent rect
    ctx.globalAlpha = 0.6;
    canvasRect(ctx, 250,50, 200,50, '#333d3f'); // transparent rect under payoff counter
    ctx.globalAlpha = 1.0;
    ctx.drawImage(assets.uiPic,0,0,CANVAS_W,100); // draw ui panel image after transparent rect

    canvasRect(ctx, 260,10, 100,30, 'red'); // moves left progress bar
    canvasRect(ctx, 260,10, propMovesLeft * 100,30, 'green');
    canvasRect(ctx, 475,10, 100,30, 'red'); // potato price progress bar
    canvasRect(ctx, 475,10, propPotatoPrice * 100,30, 'green');
    ctx.font = 'italic 18pt "COMIC SANS MS"'; // X/ Y coordinates
    canvasText(ctx, 'X: ' + currentX, 50,35, '#DAA520');
    canvasText(ctx, 'Y: ' + currentY, 130,35, '#DAA520');

    ctx.font = 'italic 20pt "COMIC SANS MS"';
    canvasText(ctx, curMapVar.potatoCount,635,35, '#DAA520'); // potato count
    canvasText(ctx, movesLeft, 285,35, '#DAA520'); // moves left
    canvasText(ctx, round(curMapVar.potatoPrice*100, 2) + ' ‎p', 485,35, '#DAA520'); // potato price
    ctx.font = 'italic 24pt "COMIC SANS MS"';
    canvasText(ctx, round(curMapVar.payoffCount, 2) + ' £', 310,85, '#DAA520'); // payoff counter (on transparent rect)
}

//******************************** Main Game Loop **********************************************************************


function getMousePayoff() {
    'use strict';

    var pointerX = (camera.centerX - 350 + userInputStatus.mousePosX);
    var pointerY = (camera.centerY - 400 + userInputStatus.mousePosY);
    var mousePayoffX = round(curMapConst.columnParameters[Math.floor(pointerX / TILE_W)], 2);
    var mousePayoffY = round(curMapConst.rowParameters[Math.floor(pointerY / TILE_H)], 2);
    return [mousePayoffX, mousePayoffY];
}


function showCheats(probs){
    "use strict";

    canvas.infoContext.font = '14pt "COMIC SANS MS"';
    exampleScreen.clear();// clear info canvas
    canvasText(canvas.infoContext, probs, userInputStatus.mousePosX, userInputStatus.mousePosY, 'white');

    if (document.getElementById('cheatNextButton').style.display === 'none'){
        document.getElementById('cheatNextButton').style.display = 'block';
        document.getElementById('cheatTestButton').style.display = 'block';
    }

}


function gameLoop() {
    'use strict';
    var ctx = canvas.gameContext;

    // move pointer and follow with camera
    trackerMove(experiment.farmerChar);
    camera.instantFollow();

	canvasRect(ctx, 0, 0, CANVAS_W, CANVAS_H, 'black'); // drawing black to erase previous frame before .translate()
    ctx.save(); // needed to undo this .translate() used for scroll
	// subtracting camPanX and camPanY from every draw operation up until restore()
    ctx.translate(-camera.panX,-camera.panY+uiHeight);

	// brings the true soil (X), or plant (Y) parameter on the screen at the mouse cursor for devMode
    if (devMode) {
        var payoff = getMousePayoff();
    }

    drawVisibleTiles(); // rendering everything

    // render farmer Sprite and potato Animation
    var centreX = CANVAS_W/2 +camera.panX;
    var centreY = CANVAS_H/2 +camera.panY;
    experiment.farmerChar.drawSprite(centreX - 30, centreY - 35);
    experiment.potatoAnim.animate(centreX, centreY - 60);

    ctx.restore(); // undoes the .translate()
    drawUI(experiment.farmerChar); // UI on top

    // drawing parameters to screen AFTER restore() on mouse position; showing cheat buttons if devMode
    if (devMode){
        showCheats(payoff)
    }
}

//******************************** END OF MAIN: GAME CREATION, LEVELS AND LOOP *****************************************