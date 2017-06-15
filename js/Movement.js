
movementTracker = [];
payoffTracker = [];

function checkPayoff(colPar, rowPar) {
    var draw = Math.random();
    var check = colPar * rowPar;
    console.log("CHECK", check, "DRAW", draw);
    if (draw <= check) {
        return 1
    }
    else {
        return 0
    }
}

function getGridPos() {
    var gridX = Math.floor((trackerX + shiftedLeft)/TILE_W);
    var gridY = Math.floor((trackerY + shiftedUp)/TILE_H);
    return [gridX, gridY]
}

function updateInfo(callback) {
    var posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
    var posY = Math.floor((trackerY + shiftedUp)/TILE_H);

    console.log("POS X, Y: ", posX, posY);
    tileGrid[posX][posY] = tileGrid[posX][posY].slice();


    if (tileGrid[posX][posY][0] === 0) {

        exploredRow[posY] += 1;
        exploredColumn[posX] += 1;

        var getPayoff = checkPayoff(columnParameters[posX], rowParameters[posY]);

        if (getPayoff === 0) {
            console.log("NONE");
            payoffTracker.push(0);

            tileGrid[posX][posY][0] = 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
        else if (getPayoff === 1) {
            potatoShow.animate();
            //document.getElementById("potato").play();
            potatoSound.play();

            console.log("POTATOE");
            payoffTracker.push(1);
            potatoeCount += 1;
            payoffCount += potatoePrice;

            tileGrid[posX][posY][0] = 3;

            payoffRow[posY] += 1;
            payoffColumn[posX] += 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
    }

    return callback
}

function stepCounter(whichSprite) {
    if (whichSprite.maxSteps > 0) {
        whichSprite.maxSteps -=1;
        potatoePrice *= discountFactor;
    }
    whichSprite.animMove = false;
    whichSprite.moving = false;


}

function checkCollision(atTrackerX, atTrackerY) {
    var someX = Math.floor(atTrackerX/TILE_W);
    var someY = Math.floor(atTrackerY/TILE_H);
    var nextPos = tileGrid[someX][someY].slice();

    if (nextPos[0] === 5 || nextPos >= 7) {
        console.log("STOP MOVING");
        errorSound.play();
        //document.getElementById("error").play();
        return true;
    }
    else {
        return false;
    }
}



var pauseID;


function trackerMove(someSprite) {
    var nextX = trackerX;
    var nextY = trackerY;
    var directionX = 0;
    var directionY = 0;

    if (!someSprite.moving && someSprite.maxSteps > 0) {

        if (holdLeft) {
            if (checkCollision(nextX-TILE_W, nextY) !== true) {
                holdLeft = false;
                directionX = -5;
                someSprite.moving = true;
                someSprite.currentDirection = "left";

                movementTracker.push("left");
            }
        }
        else if (holdRight) {
            if (checkCollision(nextX+TILE_W, nextY) !== true) {
                holdRight = false;
                directionX = 5;
                someSprite.moving = true;
                someSprite.currentDirection = "right";

                movementTracker.push("right");
            }
        }
        else if (holdUp) {
            if (checkCollision(nextX, nextY-TILE_H) !== true) {
                holdUp = false;
                directionY = -5;
                someSprite.moving = true;
                someSprite.currentDirection = "up";

                movementTracker.push("up");
            }
        }
        else if (holdDown) {
            if (checkCollision(nextX, nextY+TILE_H) !== true) {
                holdDown = false;
                directionY = 5;
                someSprite.moving = true;
                someSprite.currentDirection = "down";

                movementTracker.push("down");
            }
        }
    }
    if(someSprite.moving && !someSprite.animMove) {
        clearTimeout(pauseID);
        if (walkingSound.pause()){
            walkingSound.play();
        }
        //document.getElementById("walking").play();
        someSprite.animMove = true;
        var stepsMoved = 0;

        var moveId = setInterval(frameMove, 30);
        function frameMove() {
            if (stepsMoved === 100) {
                clearInterval(moveId);
                updateInfo(stepCounter(someSprite));

                pauseID = setTimeout(function(){walkingSound.pause()}, 250);

            } else {
                nextX += directionX;
                nextY += directionY;
                trackerX = nextX;
                trackerY = nextY;
                stepsMoved+=5;
            }
        }
    }
}
