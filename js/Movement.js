
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
    var draw = Math.random();
    var check = colPar * rowPar;
    if (devMode){
        console.log('CHECK', check, 'DRAW', draw);
    }
    return draw <= check;
}

//******************************** UPDATES COLLISION GRID AND LOGGERS AFTER TILE VISITED *******************************

function updateInfo() {
    'use strict';
    var posX = Math.floor(camera.centerX/TILE_W);
    var posY = Math.floor(camera.centerY/TILE_H);

    if (devMode){
        console.log('POS X, Y: ', posX, posY);
        console.log('SOIL PAR AT POS X: ', curMapConst.columnParameters[posX]);
        console.log('PLANT PAR AT POS Y: ', curMapConst.rowParameters[posY]);
    }
    curMapVar.tileGrid = curMapVar.tileGrid.slice();

    if (curMapVar.tileGrid[posY][posX] === 0) {

        curMapVar.exploredRow[posY] += 1;
        curMapVar.exploredColumn[posX] += 1;
        var getPayoff = checkPayoff(curMapConst.columnParameters[posX], curMapConst.rowParameters[posY]);

        if (!getPayoff) {

            if (devMode) console.log('NONE');
            curMapVar.payoffTracker[curMapVar.moveCount-1] = 0;
            curMapVar.tileGrid[posY][posX] = 1;
        }
        else if (getPayoff) {

            if (devMode) console.log('POTATO');
            experiment.potatoAnim.show();
            !isMobile ? assets.potatoSound.play() : assets.spriteSound.play('potato');

            curMapVar.payoffTracker[curMapVar.moveCount-1] = 1;
            curMapVar.potatoCount += 1;
            curMapVar.payoffCount += curMapVar.potatoPrice;
            curMapVar.tileGrid[posY][posX] = 3;
            curMapVar.payoffRow[posY] += 1;
            curMapVar.payoffColumn[posX] += 1;
        }
    }
}

//******************************** COUNTS STEPS LEFT; LOADS NEXT LEVEL *************************************************

function stepCounter(char) {
    'use strict';
    char.animMove = false;
    char.moving = false;
    curMapVar.potatoPrice *= curMapConst.discountFactor;
    curMapVar.movesLeft -=1;
    curMapVar.moveCount +=1;
    timeCounter(); // logging seconds since last tile visited (decision time)
    if (curMapVar.movesLeft === 0) {
        curMapVar.loadId = setTimeout(function () {nextLevel()}, 1250);
    }
}

// logs seconds passed since last time called
function timeCounter() {
    "use strict";
    curMapVar.lastTime = curMapVar.nextTime;
    curMapVar.nextTime = getDateTime()[2];
    curMapVar.timeTracker[curMapVar.moveCount-1] = curMapVar.nextTime - curMapVar.lastTime;
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
                curMapVar.movementTracker[curMapVar.moveCount-1] = 'left';
            }
        }
        else if (userInputStatus.holdRight) {

            if (!checkCollision(nextX + TILE_W, nextY)) {
                directionX = 5;
                char.moving = true;
                char.currentDirection = 'right';
                curMapVar.movementTracker[curMapVar.moveCount-1] = 'right';
            }
        }
        else if (userInputStatus.holdUp) {

            if (!checkCollision(nextX, nextY - TILE_H)) {
                directionY = -5;
                char.moving = true;
                char.currentDirection = 'up';
                curMapVar.movementTracker[curMapVar.moveCount-1] = 'up';
            }
        }
        else if (userInputStatus.holdDown) {

            if (!checkCollision(nextX, nextY + TILE_H)) {
                directionY = 5;
                char.moving = true;
                char.currentDirection = 'down';
                curMapVar.movementTracker[curMapVar.moveCount-1] = 'down';
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
                updateInfo();
                stepCounter(char);

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