
function CharClass(spritePic, sheetWidth, sheetHeight, rows, cols, width, height) {
    'use strict';
    this.moving = false;
    this.animMove = false;

    this.sheetWidth = sheetWidth;
    this.sheetHeight = sheetHeight;
    this.sheetRows = rows;
    this.sheetCols = cols;

    this.trackRight = 2;
    this.trackLeft = 1;
    this.trackUp = 3;
    this.trackDown = 0;

    var spriteWidth = this.sheetWidth / this.sheetCols;
    var spriteHeight = this.sheetHeight / this.sheetRows;

    this.frames = cols;
    var curFrame = 0;
    var frameCount = this.frames;
    this.col = 0;
    this.row = 0;

    this.X = 0;
    this.Y = 0;
    this.currentDirection = 'down';

    this.moveFrames = function() {
        curFrame = ++curFrame % frameCount;
    };

    this.updateFrame = function(someDirection, someDelay) {
        this.col = curFrame * spriteWidth;

        if (this.moving) {
            setTimeout(this.moveFrames, someDelay);
        }
        if (someDirection === 'left') {
            this.row = this.trackLeft * spriteHeight;
        }
        else if (someDirection === 'right') {
            this.row = this.trackRight * spriteHeight;
        }
        else if (someDirection === 'up') {
            this.row = this.trackUp * spriteHeight;
        }
        else if (someDirection === 'down') {
            this.row = this.trackDown * spriteHeight;
        }
    };

    this.drawSprite = function(atX, atY) {
        this.updateFrame(this.currentDirection, 50);
        if (!this.moving) {
            curFrame = 0;
        }
        canvas.gameContext.drawImage(spritePic, this.col, this.row, spriteWidth, spriteHeight, atX, atY, width, height);
    };

}


function AnimationClass(animPic, width, height) {
    'use strict';
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

    this.show = function() {
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

    this.drawAnimation = function() {

        if (animMe1) {
            gameCenteredBitmap(animPic, meX1, meY1, width, height);
            //console.log('PAYOFF AT: ', meX1, meY1);
        }

        if (animMe2) {
            gameCenteredBitmap(animPic, meX2, meY2, width, height);
            //console.log('PAYOFF AT: ', meX2, meY2);
        }

        if (animMe3) {
            gameCenteredBitmap(animPic, meX3, meY3, width, height);
            //console.log('PAYOFF AT: ', meX3, meY3);
        }

    };

    this.placeAnimation = function(atX, atY) {

        if (!animateMe) {

            if (!animMe1) {
                meX1 = atX;
                meY1 = atY - height;
                animY1 = meY1
            }

            if (!animMe2) {
                meX2 = atX;
                meY2 = atY - height;
                animY2 = meY2
            }

            if (!animMe3) {
                meX3 = atX;
                meY3 = atY - height;
                animY3 = meY3
            }
        }

    };

    this.moveAnimation = function() {

        if (animateMe) {
            if (!animMe1) {
                animateMe = false;
                animMe1 = true;
                var animPos1 = 0;

                var frameAnim1 = function() {
                    if (animPos1 > 310) {
                        clearInterval(animId1);
                        animMe1 = false;

                    } else {
                        animY1 -= 15;
                        meY1 = animY1;
                        animPos1 += 15;
                    }
                };
                var animId1 = setInterval(frameAnim1, 57);
            }

            else if (!animMe2) {
                animateMe = false;
                animMe2 = true;
                var animPos2 = 0;

                var frameAnim2 = function() {
                    if (animPos2 > 330) {
                        clearInterval(animId2);
                        animMe2 = false;

                    } else {
                        animY2 -= 15;
                        meY2 = animY2;
                        animPos2 += 15;
                    }
                };
                var animId2 = setInterval(frameAnim2, 59);
            }

            else if (!animMe3) {
                animateMe = false;
                animMe3 = true;
                var animPos3 = 0;

                var frameAnim3 = function() {
                    if (animPos3 > 320) {
                        clearInterval(animId3);
                        animMe3 = false;

                    } else {
                        animY3 -= 15;
                        meY3 = animY3;
                        animPos3 += 15;
                    }
                };
                var animId3 = setInterval(frameAnim3, 58);
            }
        }
    };

    this.animate = function(someX, someY) {
        this.placeAnimation(someX, someY);
        this.drawAnimation();
        this.moveAnimation();
    };
}
