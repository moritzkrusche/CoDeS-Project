
//******************************** MOVEMENT HANDLING & UPDATING ********************************************************

// CAMERA OBJECT USED FOR DRAWING CURRENT TILES AND MOVEMENT
let camera = new function(){
    'use strict';
    this.centerX = 0;
    this.centerY = 0;
    let camPanX = 0;
    let	camPanY = 0;

    this.instantFollow =  function () {
        camPanX = this.centerX - CANVAS_W/2;
        camPanY = this.centerY - CANVAS_H/2;
        this.panX = camPanX;
        this.panY = camPanY;
    };
};


function getXY(char) {
    'use strict';

    let currentX = round((camera.centerX - char.X)/TILE_W, 0);
    let currentY = round((camera.centerY - char.Y)/TILE_H, 0) * -1;
    let probX = round(curMapConst.columnParameters[Math.floor(camera.centerX / TILE_W)], 2);
    let probY = round(curMapConst.rowParameters[Math.floor(camera.centerY / TILE_H)], 2);
    return [currentX, currentY, probX, probY]
}

//RANDOMLY DRAWING FOR PAYOFF BASED ON PARAMETERS
function checkPayoff(colPar, rowPar) {
    'use strict';
    let draw = round(Math.random(), 2);
    let check = round((colPar * rowPar), 2);
    if (devMode){
        console.log('CHECK', check, 'DRAW', draw);
    }
    return draw <= check;
}

//******************************** UPDATES COLLISION GRID AND LOGGERS AFTER TILE VISITED *******************************


function updateInfo(then, someChar) {
    'use strict';
    let currentCol = Math.floor(camera.centerX/TILE_W);
    let currentRow = Math.floor(camera.centerY/TILE_H);
    let columnPar = curMapConst.columnParameters[currentCol];
    let rowPar = curMapConst.rowParameters[currentRow];
    let XYPos = getXY(someChar);

    // Note that these arrays are 101 in length because the starting position is also logged
    let posIndex = curMapVar.moveCount + 1;
    let drawIndex = curMapVar.moveCount;

    // col/row positions
    curMapVar.colPositions[posIndex] = currentCol;
    curMapVar.rowPositions[posIndex] = currentRow;

    // Logging XY Positions
    curMapVar.XPositions[posIndex] = XYPos[0];
    curMapVar.YPositions[posIndex] = XYPos[1];

    curMapVar.XProbabilities[drawIndex] = XYPos[2];
    curMapVar.YProbabilities[drawIndex] = XYPos[3];
    curMapVar.probTracker[drawIndex] = round((XYPos[2] * XYPos[3]), 2);
    curMapVar.payoffTracker[drawIndex] = 99; // in case a person walks back on previously visited tiles

    if (devMode){
        console.log('POS Col, Row: ', currentCol, currentRow);
        console.log('PAR @ Col Pos: ', curMapConst.columnParameters[currentCol]);
        console.log('PAR @ ROW Pos: ', curMapConst.rowParameters[currentRow]);
    }
    // only allow payoff if not previously visited
    if (curMapVar.tileGrid[currentRow][currentCol] === 0) {

        let getPayoff = checkPayoff(columnPar, rowPar);
        curMapVar.exploredRow[currentRow] += 1;
        curMapVar.exploredColumn[currentCol] += 1;

        if (getPayoff) {

            if (devMode) console.log('POTATO');
            experiment.potatoAnim.show();
            !isMobile ? assets.potatoSound.play() : assets.spriteSound.play('potato');

            curMapVar.payoffTracker[drawIndex] = 1; // got a potato
            curMapVar.potatoCount += 1;
            curMapVar.payoffCount += curMapVar.potatoPrice;
            curMapVar.tileGrid[currentRow][currentCol] = 3; // exploited soil with hole
            curMapVar.payoffRow[currentRow] += 1;
            curMapVar.payoffColumn[currentCol] += 1;
        }
        else {

            if (devMode) console.log('NONE');
            curMapVar.payoffTracker[drawIndex] = 0; // put earlier in code to avoid null bug when going back
            curMapVar.tileGrid[currentRow][currentCol] = 1; // exploited soil w/o hole
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
    curMapVar.movesLeft -= 1;
    curMapVar.moveCount += 1;
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
    let someX = Math.floor(atTrackerX/TILE_W);
    let someY = Math.floor(atTrackerY/TILE_H);

    curMapVar.tileGrid = curMapVar.tileGrid.slice();
    let nextPos = curMapVar.tileGrid[someY][someX];

    if (nextPos >= 5) {

        // show X on water tiles temporarily
        if (nextPos === 5){
            curMapVar.tileGrid[someY][someX] = 6;

            let resetTile = function() {
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
    let nextX = camera.centerX;
    let nextY = camera.centerY;

    let directionX = 0;
    let directionY = 0;
    let moveId;

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
        let stepsMoved = 0;

        let frameMove = function () {
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
        moveId = setInterval(frameMove, 30);
    }
}

//******************************** END OF MOVEMENT HANDLING & UPDATING *************************************************