
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
    tileGrid = tileGrid.slice();


    if (tileGrid[posY][posX] === 0) {

        exploredRow[posY] += 1;
        exploredColumn[posX] += 1;

        var getPayoff = checkPayoff(columnParameters[posX], rowParameters[posY]);

        if (getPayoff === 0) {
            console.log("NONE");
            payoffTracker.push(0);

            tileGrid[posY][posX] = 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
        else if (getPayoff === 1) {
            potatoShow.animate();

            if (!isMobile) {
                assets.potatoSound.play();
            } else {
                assets.spriteSound.play('potato');
            }

            console.log("POTATOE");
            payoffTracker.push(1);
            potatoCount += 1;
            payoffCount += potatoPrice;

            tileGrid[posY][posX] = 3;

            payoffRow[posY] += 1;
            payoffColumn[posX] += 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
    }

    return callback
}

function stepCounter(whichSprite) {
    if (whichSprite.stepsLeft > 0) {
        whichSprite.stepsLeft -=1;
        potatoPrice *= discountFactor;
    }
    whichSprite.animMove = false;
    whichSprite.moving = false;
}



function checkCollision(atTrackerX, atTrackerY) {
    var someX = Math.floor(atTrackerX/TILE_W);
    var someY = Math.floor(atTrackerY/TILE_H);
    var nextPos = tileGrid[someY][someX];

    if (nextPos === 5 || nextPos >= 7) {
        //console.log("STOP MOVING");
        if (!isMobile) {
            if (!assets.errorSound.playing(id) && !assets.errorSound.playing(id2)) {
                var id = assets.errorSound.play();
                var id2 = setTimeout(function () {
                    assets.errorSound.play()
                }, 170);
                assets.errorSound.rate(1.5, id2);
            }
        }

        else {
            if (!assets.spriteSound.playing()) {
                var id3 = assets.spriteSound.play('error');
                setTimeout(function () {
                    var id4 = assets.spriteSound.play('error');
                }, 170);
            }
        }

        return true;
    }
    else {
        return false;
    }
}


function trackerMove(someSprite) {
    var nextX = trackerX;
    var nextY = trackerY;
    var directionX = 0;
    var directionY = 0;

    if (!someSprite.moving && someSprite.stepsLeft > 0) {

        if (holdLeft) {
            if (checkCollision(nextX-TILE_W, nextY) !== true) {
                directionX = -5;
                someSprite.moving = true;
                someSprite.currentDirection = "left";

                movementTracker.push("left");
            }
        }
        else if (holdRight) {
            if (checkCollision(nextX+TILE_W, nextY) !== true) {
                directionX = 5;
                someSprite.moving = true;
                someSprite.currentDirection = "right";

                movementTracker.push("right");
            }
        }
        else if (holdUp) {
            if (checkCollision(nextX, nextY-TILE_H) !== true) {
                directionY = -5;
                someSprite.moving = true;
                someSprite.currentDirection = "up";

                movementTracker.push("up");
            }
        }
        else if (holdDown) {
            if (checkCollision(nextX, nextY+TILE_H) !== true) {
                directionY = 5;
                someSprite.moving = true;
                someSprite.currentDirection = "down";

                movementTracker.push("down");
            }
        }
    }
    if(someSprite.moving && !someSprite.animMove) {


        if (!isMobile) {
            if (assets.walkingSound.playing(walkId)) {
                clearTimeout(pauseId);
            }
            else {
                var walkId = assets.walkingSound.play();
            }
        } else {
            if (assets.spriteSound.playing(walkId2)) {
                try{
                    clearTimeout(pauseId);
                }
                catch(err) {
                    var walkId2 = assets.spriteSound.play('walking');
                }
            }
            else {
                var walkId2 = assets.spriteSound.play('walking');
            }
        }


        someSprite.animMove = true;
        var stepsMoved = 0;

        var moveId = setInterval(frameMove, 30);
        function frameMove() {
            if (stepsMoved === 100) {
                clearInterval(moveId);
                updateInfo(stepCounter(someSprite));

                if (!isMobile) {
                    pauseId = setTimeout(function () {
                        assets.walkingSound.pause(walkId)
                    }, 250);
                } else {
                    pauseId = setTimeout(function () {
                        assets.spriteSound.pause(walkId2)
                    }, 350);
                }

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
