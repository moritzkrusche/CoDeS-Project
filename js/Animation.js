
function SpriteClass(spritePic) {

    const CHAR_W = 0.6 * TILE_W;
    const CHAR_H = 0.9 * TILE_H;

    this.sheetWidth = 240;
    this.sheetHeight = 360;

    this.sheetRows = 4;
    this.sheetCols = 4;

    this.trackRight = 2;
    this.trackLeft = 1;
    this.trackUp = 3;
    this.trackDown = 0;

    var spriteWidth = this.sheetWidth / this.sheetCols;
    var spriteHeight = this.sheetHeight / this.sheetRows;

    this.frames = 4;

    var curFrame = 0;
    var frameCount = this.frames;

    this.col = 0;
    this.row = 0;

    this.moving = false;
    this.animMove = false;

    this.stepsLeft = 100;
    this.startX = 0;
    this.startY = 0;

    this.currentDirection = "down";

    this.moveFrames = function() {
        curFrame = ++curFrame % frameCount;
    };


    this.updateFrame = function(someDirection, someDelay) {
        this.col = curFrame * spriteWidth;

        if (this.moving) {
            setTimeout(this.moveFrames, someDelay);
        }

        if (someDirection === "left") {
            this.row = this.trackLeft * spriteHeight;
        }
        else if (someDirection === "right") {
            this.row = this.trackRight * spriteHeight;
        }
        else if (someDirection === "up") {
            this.row = this.trackUp * spriteHeight;
        }
        else if (someDirection === "down") {
            this.row = this.trackDown * spriteHeight;
        }
    };

    this.drawSprite = function(x, y) {
        this.updateFrame(this.currentDirection, 50);
        if (!this.moving) {
            curFrame = 0;
        }
        canvasContext.drawImage(spritePic, this.col, this.row, spriteWidth, spriteHeight, x, y, CHAR_W, CHAR_H);
    };

}


function AnimationClass(animPic1, animPic2, animPic3) {

    this.width = 0.5 * TILE_W;
    this.height = 0.32 *  TILE_H;

    var meX1 = 0;
    var meY1 = 0;
    var animY1 = 0;

    var meX2 = 0;
    var meY2 = 0;
    var animY2 = 0;

    var meX3 = 0;
    var meY3 = 0;
    var animY3 = 0;

    var animateMe = false;

    this.animate = function() {
        animateMe = true;
    };

    var animMe1 = false;
    var animMe2 = false;
    var animMe3 = false;

    this.resetStart = function(someX, someY){
        meX1 = someX;
        meY1 = someY;
        animY1 = someY;
    };

    this.drawPayoff = function() {

        if (animMe1) {
            drawBitmapCenteredWithRotation(animPic1, meX1, meY1, 0, this.width, this.height);
            //console.log("PAYOFF AT: ", meX1, meY1);
        }

        if (animMe2) {
            drawBitmapCenteredWithRotation(animPic2, meX2, meY2, 0, this.width, this.height);
            //console.log("PAYOFF AT: ", meX2, meY2);
        }

        if (animMe3) {
            drawBitmapCenteredWithRotation(animPic3, meX3, meY3, 0, this.width, this.height);
            //console.log("PAYOFF AT: ", meX3, meY3);
        }

    };

    this.placePayoff = function(atX, atY) {

        if (!animateMe) {

            if (!animMe1) {
                meX1 = atX;
                meY1 = atY - this.height;
                animY1 = meY1
            }

            if (!animMe2) {
                meX2 = atX;
                meY2 = atY - this.height;
                animY2 = meY2
            }

            if (!animMe3) {
                meX3 = atX;
                meY3 = atY - this.height;
                animY3 = meY3
            }
        }

    };

    this.movePayoff = function() {

        if (animateMe) {
            if (!animMe1) {
                animateMe = false;
                animMe1 = true;
                var animPos1 = 0;
                var animId1 = setInterval(frameAnim1, 37);

                function frameAnim1() {
                    if (animPos1 === 280) {
                        clearInterval(animId1);
                        animMe1 = false;

                    } else {
                        animY1 -= 10;
                        meY1 = animY1;
                        animPos1 += 10;
                    }
                }
            }

            else if (!animMe2) {
                animateMe = false;
                animMe2 = true;
                var animPos2 = 0;
                var animId2 = setInterval(frameAnim2, 39);

                function frameAnim2() {
                    if (animPos2 === 280) {
                        clearInterval(animId2);
                        animMe2 = false;

                    } else {
                        animY2 -= 10;
                        meY2 = animY2;
                        animPos2 += 10;
                    }
                }
            }

            else if (!animMe3) {
                animateMe = false;
                animMe3 = true;
                var animPos3 = 0;
                var animId3 = setInterval(frameAnim3, 38);

                function frameAnim3() {
                    if (animPos3 === 280) {
                        clearInterval(animId3);
                        animMe3 = false;

                    } else {
                        animY3 -= 10;
                        meY3 = animY3;
                        animPos3 += 10;
                    }
                }
            }
        }
    };

    this.animatePayoff = function(someX, someY) {
        this.placePayoff(someX, someY);
        this.drawPayoff();
        this.movePayoff();
    };
}