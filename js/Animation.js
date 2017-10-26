
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

    let spriteWidth = this.sheetWidth / this.sheetCols;
    let spriteHeight = this.sheetHeight / this.sheetRows;

    this.frames = cols;
    let curFrame = 0;
    let frameCount = this.frames;
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
            curFrame = this.sheetCols-1;
        }
        canvas.gameContext.drawImage(spritePic, this.col, this.row, spriteWidth, spriteHeight, atX-65, atY-10, width, height);
    };
}

//******************************** ANIMATING UP TO THREE PAYOFF/ POTATOES **********************************************

function AnimationClass(animPic, width, height) {
    'use strict';
    let ctx = canvas.gameContext;

    let obj1X = 0;
    let obj1Y = 0;
    let obj1NewY = 0;
    let obj2X = 0;
    let obj2Y = 0;
    let obj2NewY = 0;
    let obj3X = 0;
    let obj3Y = 0;
    let obj3NewY = 0;

    let animObj1 = false;
    let animObj2 = false;
    let animObj3 = false;
    let animAnyObj = false;

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

        let animId1, animId2, animId3;

        if (animAnyObj) {
            if (!animObj1) {
                animAnyObj = false;
                animObj1 = true;
                let animPos1 = 0;

                let frameAnim1 = function() {
                    if (animPos1 > 250) {
                        clearInterval(animId1);
                        animObj1 = false;
                    }
                    else {
                        obj1NewY -= 15;
                        obj1Y = obj1NewY;
                        animPos1 += 15;
                    }
                };
                animId1 = setInterval(frameAnim1, 57);
            }
            else if (!animObj2) {
                animAnyObj = false;
                animObj2 = true;
                let animPos2 = 0;

                let frameAnim2 = function() {
                    if (animPos2 > 270) {
                        clearInterval(animId2);
                        animObj2 = false;
                    }
                    else {
                        obj2NewY -= 15;
                        obj2Y = obj2NewY;
                        animPos2 += 15;
                    }
                };
                animId2 = setInterval(frameAnim2, 59);
            }
            else if (!animObj3) {
                animAnyObj = false;
                animObj3 = true;
                let animPos3 = 0;

                let frameAnim3 = function() {
                    if (animPos3 > 260) {
                        clearInterval(animId3);
                        animObj3 = false;
                    }
                    else {
                        obj3NewY -= 15;
                        obj3Y = obj3NewY;
                        animPos3 += 15;
                    }
                };
                animId3 = setInterval(frameAnim3, 58);
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