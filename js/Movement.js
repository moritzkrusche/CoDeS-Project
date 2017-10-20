
//******************************** MOVEMENT HANDLING & UPDATING ********************************************************

// CAMERA OBJECT USED FOR DRAWING CURRENT TILES AND MOVEMENT
var camera = new function(){
    'use strict';
    this.centerX = 0;
    this.centerY = 0;
    var camPanX = 0;
    var	camPanY = 0;

    this.instantFollow =  function () {
        camPanX = this.centerX - CANVAS_W/2;
        camPanY = this.centerY - CANVAS_H/2;
        this.panX = camPanX;
        this.panY = camPanY;
    };
};

//RANDOMLY DRAWING PAYOFF BASED ON PARAMETERS
function checkPayoff(colPar, rowPar) {
    'use strict';
    var draw = round(Math.random(), 2);
    var check = round((colPar * rowPar), 2);
    if (devMode){
        console.log('CHECK', check, 'DRAW', draw);
    }
    return draw <= check;
}

//******************************** UPDATES COLLISION GRID AND LOGGERS AFTER TILE VISITED *******************************

// TODO: delete curmapvar col + row positions after open map phase!
function updateInfo(then, someChar) {
    'use strict';
    var currentCol = Math.floor(camera.centerX/TILE_W);
    var currentRow = Math.floor(camera.centerY/TILE_H);
    var columnPar = curMapConst.columnParameters[currentCol];
    var rowPar = curMapConst.rowParameters[currentRow];

    // Note that these arrays are 101 in length because the starting position is also logged.
    var posIndex = curMapVar.moveCount+1;
    var drawIndex = curMapVar.moveCount;

    curMapVar.colPositions[posIndex] = currentCol;
    curMapVar.rowPositions[posIndex] = currentRow;

    // Logging XY Positions
    var XYPos = getXY(someChar);
    curMapVar.XPositions[posIndex] = XYPos[0];
    curMapVar.YPositions[posIndex] = XYPos[1];
    curMapVar.XProbabilities[drawIndex] = XYPos[2];
    curMapVar.YProbabilities[drawIndex] = XYPos[3];
    curMapVar.probTracker[drawIndex] = round((XYPos[2] * XYPos[3]), 2);

    if (devMode){
        console.log('POS Col, Row: ', currentCol, currentRow);
        console.log('PAR @ Col Pos: ', curMapConst.columnParameters[currentCol]);
        console.log('PAR @ ROW Pos: ', curMapConst.rowParameters[currentRow]);
    }

    if (curMapVar.tileGrid[currentRow][currentCol] === 0) {

        curMapVar.exploredRow[currentRow] += 1;
        curMapVar.exploredColumn[currentCol] += 1;
        var getPayoff = checkPayoff(columnPar, rowPar);

        if (getPayoff) {

            if (devMode) console.log('POTATO');
            experiment.potatoAnim.show();
            !isMobile ? assets.potatoSound.play() : assets.spriteSound.play('potato');

            curMapVar.payoffTracker[drawIndex] = 1;
            curMapVar.potatoCount += 1;
            curMapVar.payoffCount += curMapVar.potatoPrice;
            curMapVar.tileGrid[currentRow][currentCol] = 3;
            curMapVar.payoffRow[currentRow] += 1;
            curMapVar.payoffColumn[currentCol] += 1;
        }
        else {

            if (devMode) console.log('NONE');
            curMapVar.payoffTracker[drawIndex] = 0;
            curMapVar.tileGrid[currentRow][currentCol] = 1;
        }
    }
    then();
}

//******************************** COUNTS STEPS LEFT; LOADS NEXT LEVEL *************************************************

function stepCounter(char) {
    'use strict';
    char.animMove = false;
    char.moving = false;
    timeCounter(); // logging seconds since last tile visited (decision time)
    curMapVar.potatoPrice *= curMapConst.discountFactor;
    curMapVar.movesLeft -=1;
    curMapVar.moveCount +=1;
    if (curMapVar.movesLeft === 0) {
        curMapVar.loadId = setTimeout(function () {nextLevel()}, 1250);
    }
}


// logs seconds passed since last time called
function timeCounter() {
    "use strict";
    curMapVar.lastTime = curMapVar.nextTime;
    curMapVar.nextTime = getDateTime()[1];
    curMapVar.timeTracker[curMapVar.moveCount] = round((curMapVar.nextTime - curMapVar.lastTime), 2);
}


function buttonTimer(stringButton) {
    "use strict";
    curMapVar.lastTime = curMapVar.nextTime;
    curMapVar.nextTime = getDateTime()[1];
    loggedData.buttonsClicked.push(stringButton);
    loggedData.buttonTimes.push(round((curMapVar.nextTime - curMapVar.lastTime), 2));
}

//******************************** COLLISION HANDLING ON TEST MAPS INCL SOUND AND CROSSES ******************************

function checkCollision(atTrackerX, atTrackerY) {
    'use strict';
    var someX = Math.floor(atTrackerX/TILE_W);
    var someY = Math.floor(atTrackerY/TILE_H);

    curMapVar.tileGrid = curMapVar.tileGrid.slice();
    var nextPos = curMapVar.tileGrid[someY][someX];

    if (nextPos >= 5) {

        // show X on water tiles temporarily
        if (nextPos === 5){
            curMapVar.tileGrid[someY][someX] = 6;

            var resetTile = function() {
                curMapVar.tileGrid[someY][someX] = 5;
            };
            setTimeout(resetTile, 750);
        }
        if (!isMobile) {
            if (!assets.errorSound.playing(curMapVar.errorId1) && !assets.errorSound.playing(curMapVar.errorId2)) {
                curMapVar.errorId1 = assets.errorSound.play();
                curMapVar.errorId2 = setTimeout(function () {
                    assets.errorSound.play();
                }, 170);
            }
        }
        else {
            if (!assets.spriteSound.playing(curMapVar.errorId1) && !assets.spriteSound.playing(curMapVar.errorId2)) {
                curMapVar.errorId1 = assets.spriteSound.play('error');
                curMapVar.errorId2 = setTimeout(function () {
                    assets.spriteSound.play('error');
                }, 170);
            }
        }
        return true;
    }
    else {
        return false;
    }
}

//******************************** MOVEMENT HANDLING CALLING SOUND & ANIMATION FUNCTIONS *******************************

function trackerMove(char) {
    'use strict';
    var nextX = camera.centerX;
    var nextY = camera.centerY;

    var directionX = 0;
    var directionY = 0;

    if (!char.moving && curMapVar.movesLeft > 0) {

        if (userInputStatus.holdLeft) {

            if (!checkCollision(nextX - TILE_W, nextY)) {
                directionX = -5;
                char.moving = true;
                char.currentDirection = 'left';
                curMapVar.movementTracker[curMapVar.moveCount] = 'left';
            }
        }
        else if (userInputStatus.holdRight) {

            if (!checkCollision(nextX + TILE_W, nextY)) {
                directionX = 5;
                char.moving = true;
                char.currentDirection = 'right';
                curMapVar.movementTracker[curMapVar.moveCount] = 'right';
            }
        }
        else if (userInputStatus.holdUp) {

            if (!checkCollision(nextX, nextY - TILE_H)) {
                directionY = -5;
                char.moving = true;
                char.currentDirection = 'up';
                curMapVar.movementTracker[curMapVar.moveCount] = 'up';
            }
        }
        else if (userInputStatus.holdDown) {

            if (!checkCollision(nextX, nextY + TILE_H)) {
                directionY = 5;
                char.moving = true;
                char.currentDirection = 'down';
                curMapVar.movementTracker[curMapVar.moveCount] = 'down';
            }
        }
    }
    if (char.moving && !char.animMove) {

        if (!isMobile) {

            if (assets.walkingSound.playing(curMapVar.walkId)) {
                clearTimeout(curMapVar.pauseId);
            }
            else {
                curMapVar.walkId = assets.walkingSound.play();
            }
        }
        else {
            if (assets.spriteSound.playing(curMapVar.walkId)) {
                try {
                    clearTimeout(curMapVar.pauseId);
                }
                catch (err) {
                    curMapVar.walkId = assets.spriteSound.play('walking');
                }
            }
            else {
                curMapVar.walkId = assets.spriteSound.play('walking');
            }
        }
        char.animMove = true;
        var stepsMoved = 0;

        var frameMove = function () {
            if (stepsMoved === 100) {
                clearInterval(moveId);
                updateInfo(stepCounter.bind(this,char), char);

                if (!isMobile) {
                    curMapVar.pauseId = setTimeout(function () {
                        assets.walkingSound.pause(curMapVar.walkId)
                    }, 250);
                } else {
                    curMapVar.pauseId = setTimeout(function () {
                        assets.spriteSound.pause(curMapVar.walkId)
                    }, 350);
                }

            } else {
                nextX += directionX;
                nextY += directionY;
                camera.centerX = nextX;
                camera.centerY = nextY;
                stepsMoved += 5;
            }
        };
        var moveId = setInterval(frameMove, 30);
    }
}

//******************************** END OF MOVEMENT HANDLING & UPDATING *************************************************