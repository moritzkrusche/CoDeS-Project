
//******************************** ANIMATION ***************************************************************************


//******************************** DRAWING AND ANIMATING CHARACTER SPRITE **********************************************

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

//******************************** ANIMATING UP TO THREE PAYOFF/ POTATOES **********************************************

function AnimationClass(animPic, width, height) {
    'use strict';
    var ctx = canvas.gameContext;

    var obj1X = 0;
    var obj1Y = 0;
    var obj1NewY = 0;
    var obj2X = 0;
    var obj2Y = 0;
    var obj2NewY = 0;
    var obj3X = 0;
    var obj3Y = 0;
    var obj3NewY = 0;

    var animObj1 = false;
    var animObj2 = false;
    var animObj3 = false;
    var animAnyObj = false;

    this.show = function() {
        animAnyObj = true;
    };
    this.resetStart = function(someX, someY){
        obj1X = someX;
        obj1Y = someY;
        obj1NewY = someY;
    };
    this.drawAnimation = function() {

        if (animObj1) {
            canvasCenteredBitmap(ctx, animPic, obj1X, obj1Y, width, height);
        }
        if (animObj2) {
            canvasCenteredBitmap(ctx, animPic, obj2X, obj2Y, width, height);
        }
        if (animObj3) {
            canvasCenteredBitmap(ctx, animPic, obj3X, obj3Y, width, height);
        }
    };
    this.placeAnimation = function(atX, atY) {

        if (!animAnyObj) {

            if (!animObj1) {
                obj1X = atX;
                obj1Y = atY - height;
                obj1NewY = obj1Y
            }
            if (!animObj2) {
                obj2X = atX;
                obj2Y = atY - height;
                obj2NewY = obj2Y
            }
            if (!animObj3) {
                obj3X = atX;
                obj3Y = atY - height;
                obj3NewY = obj3Y
            }
        }
    };
    this.moveAnimation = function() {

        if (animAnyObj) {
            if (!animObj1) {
                animAnyObj = false;
                animObj1 = true;
                var animPos1 = 0;

                var frameAnim1 = function() {
                    if (animPos1 > 310) {
                        clearInterval(animId1);
                        animObj1 = false;
                    }
                    else {
                        obj1NewY -= 15;
                        obj1Y = obj1NewY;
                        animPos1 += 15;
                    }
                };
                var animId1 = setInterval(frameAnim1, 57);
            }
            else if (!animObj2) {
                animAnyObj = false;
                animObj2 = true;
                var animPos2 = 0;

                var frameAnim2 = function() {
                    if (animPos2 > 330) {
                        clearInterval(animId2);
                        animObj2 = false;
                    }
                    else {
                        obj2NewY -= 15;
                        obj2Y = obj2NewY;
                        animPos2 += 15;
                    }
                };
                var animId2 = setInterval(frameAnim2, 59);
            }
            else if (!animObj3) {
                animAnyObj = false;
                animObj3 = true;
                var animPos3 = 0;

                var frameAnim3 = function() {
                    if (animPos3 > 320) {
                        clearInterval(animId3);
                        animObj3 = false;
                    }
                    else {
                        obj3NewY -= 15;
                        obj3Y = obj3NewY;
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

//******************************** END OF ANIMATION ********************************************************************