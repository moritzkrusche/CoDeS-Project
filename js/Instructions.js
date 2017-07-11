

//******************************** INSTRUCTIONS ************************************************************************

function buttonSubmit() {
    "use strict";


    document.getElementById('submitButton').style.display = 'none';
    document.getElementById('demoBox').style.display = 'none';

    instructions.show();
}


var normalRain = new rainAnimationClass(1);
var strongRain = new rainAnimationClass(5);
var strongestRain = new rainAnimationClass(15);

var boxScreen = new function() {
    "use strict";

    var that = this;

    that.wrapText = function(text, x, y, maxWidth, lineHeight, font, color) {
        font = font || 'italic 16pt "COMIC SANS MS"';
        color = color || '#DAA520';

        canvas.boxContext.font = font;
        canvas.boxContext.fillStyle = color;

        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = canvas.boxContext.measureText(testLine);
            var testWidth = Math.floor(metrics.width);
            if (testWidth > maxWidth && n > 0) {
                canvas.boxContext.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        canvas.boxContext.fillText(line, x, y);
    };

    this.hideAll = function(){

        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        canvas.infoContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        document.getElementById('gameBox').style.display = 'none';
        document.getElementById('fullGameBox').style.display = 'none';

        document.getElementById('nextButton').style.display = 'none';
        document.getElementById('backButton').style.display = 'none';

    };

    this.show = function(words){
        "use strict";

        if (!isMobile){
            if (assets.backgroundSound.playing(curMapVar.backgroundId)){
                assets.backgroundSound.stop(curMapVar.backgroundId)
            }
        }
        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);

        that.wrapText(words, 80, 540, 540, 25);
    };

    this.showBox = function(){
        document.getElementById('gameBox').style.display = 'block';
    };
    this.hideBox = function(){
        document.getElementById('gameBox').style.display = 'none';
    };
    this.showFull = function(){
        document.getElementById('fullGameBox').style.display = 'block';
    };
    this.hideFull = function(){
        document.getElementById('fullGameBox').style.display = 'none';
    }
};

function buttonNext() {
    "use strict";

    if (!experiment.testPhase){
        if (instructions.index < instructions.maxIndex){
            instructions.index++;
        }
        instructions.show()
    }
    else if (experiment.testPhase){
        if (testInstructions.index < testInstructions.maxIndex){
            testInstructions.index++;
        }
        testInstructions.show();
    }
}

function buttonBack() {
    "use strict";
    if (!experiment.testPhase){
        if (instructions.index > 0){
            instructions.index--;
        }
        instructions.show();
    }
    else if (experiment.testPhase){
        if (testInstructions.index > 3){ // do not allow going back to rain animation
            testInstructions.index--;
        }
        testInstructions.show();
    }

    document.getElementById('nextButton').style.display = 'block';
}


function buttonStartLevel(){
    "use strict";
    boxScreen.hideAll();
    initInput();

    document.getElementById('startButton').style.display = 'none';

    if (!isMobile) {
        if (assets.backgroundSound.playing(curMapVar.backgroundId)){
            assets.backgroundSound.stop(curMapVar.backgroundId)
        }
        curMapVar.backgroundId = assets.backgroundSound.play();
    } else {
        if (!curMapVar.mobileSoundUnlocked){
            try {
                assets.unlockIOSAudioPlayback()
            }
            catch(err) {
                alert('Could not unlock sound!')
            }
        }

    }
}

function showStartButton(){
    "use strict";
    document.getElementById('startButton').style.display = 'block';
}

var testInstructions = new function () {
    "use strict";

    this.index = 0;
    this.maxIndex = 6;

    this.show = function() {

        var index = this.index;
        switch (index) {
            case 0:
                document.getElementById('nextButton').style.display = 'block';
                document.getElementById('backButton').style.display = 'none';
                boxScreen.show('Look, it starts to rain...');
                boxScreen.showBox();
                normalRain.start();
                break;
            case 1:
                boxScreen.show('This rain is getting too strong... Let us hope that the potatoes survive.');
                normalRain.stop();
                strongRain.start();
                break;
            case 2:
                boxScreen.show('Oh dear! It looks as if this is a monsoon! The field will not go undamaged!');
                strongRain.stop();
                strongestRain.start();
                break;
            case 3:
                strongestRain.stop();
                boxScreen.hideFull();
                boxScreen.show('text3');
                document.getElementById('backButton').style.display = 'none';
                break;
            case 4:
                boxScreen.show('text4');
                boxScreen.showFull();
                showExampleTiles(6);
                document.getElementById('backButton').style.display = 'block';
                break;
            case 5:
                boxScreen.hideFull();
                boxScreen.show('text5');
                break;
            case 6:
                boxScreen.show('text6');
                document.getElementById('nextButton').style.display = 'none';
                document.getElementById('startButton').style.display = 'block';

                break;

        }
    }
};

var instructions = new function() {
    "use strict";

    this.index = 0;
    this.maxIndex = 12;

    this.show = function(){

        var index = this.index;
        switch (index) {

            case 0:
                document.getElementById('nextButton').style.display = 'block';
                document.getElementById('backButton').style.display = 'none';
                boxScreen.show(getText(0));
                boxScreen.showBox();
                boxScreen.hideFull();
                break;

            case 1:

                document.getElementById('backButton').style.display = 'block';
                exampleScreen.clear();
                exampleScreen.highlightFarmer();
                boxScreen.show(getText(1));

                boxScreen.showFull();
                showExampleTiles(0);
                showExampleTiles(1);
                showExampleTiles(2);

                drawArrow(canvas.boxContext, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 4);
                canvasText(canvas.boxContext, 'worst', 440,150, 'red');
                drawArrow(canvas.boxContext, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 4);
                canvasText(canvas.boxContext, 'best', 440,470, 'red');
                //showExampleTiles(6);

                break;
            case 2:
                exampleScreen.clear();
                exampleScreen.highlightTile();
                boxScreen.show(getText(2));

                boxScreen.showFull();
                showExampleTiles(3);
                showExampleTiles(4);
                showExampleTiles(5);

                drawArrow(canvas.boxContext, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 4);

                drawArrow(canvas.boxContext, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 4);

                break;
            case 3:
                exampleScreen.clear();
                exampleScreen.highlightCenterCol();
                boxScreen.show(getText(3));

                boxScreen.hideFull();
                break;
            case 4:
                exampleScreen.clear();
                exampleScreen.highlightCenterRow();
                boxScreen.show(getText(4));
                break;
            case 5:
                exampleScreen.clear();
                exampleScreen.highlightCol();
                boxScreen.show(getText(5));
                break;
            case 6:
                exampleScreen.clear();
                exampleScreen.highlightRow();
                boxScreen.show(getText(6));
                break;
            case 7:
                exampleScreen.clear();
                exampleScreen.highlightUi();
                boxScreen.show(getText(7));
                break;
            case 8:
                exampleScreen.clear();
                exampleScreen.highlightPotatoCount();
                boxScreen.show(getText(8));
                break;
            case 9:
                exampleScreen.clear();
                exampleScreen.highlightPotatoPrice();
                boxScreen.show(getText(9));
                break;
            case 10:
                exampleScreen.clear();
                exampleScreen.highlightPayoff();
                boxScreen.show(getText(10));
                break;
            case 11:
                exampleScreen.clear();
                exampleScreen.highlightMovesLeft();
                boxScreen.show(getText(11));
                break;
            case 12:
                exampleScreen.clear();
                exampleScreen.highlightXY();
                boxScreen.show(getText(12));



                document.getElementById('nextButton').style.display = 'none';

                document.getElementById('startButton').style.display = 'block';
                break;
        }
    }
};

function showExampleTiles(whichTiles){
    "use strict";

    var redWidth = TILE_W*0.8;
    var redHeight = TILE_H*0.8;
    var redColHeight = TILE_H*0.8*5;

    switch (whichTiles){
        case 0: // show example soil tiles info level 3
            canvas.boxContext.drawImage(assets.soilSheetPic, 0, 0, TILE_W, TILE_H*5, 270, 110, redWidth, redColHeight);
            break;
        case 1: // show example soil tiles info level 2
            canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W, 0, TILE_W, TILE_H*5, 160, 110, redWidth, redColHeight);
            break;
        case 2: // show example soil tiles info level 1
            canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W*2, 0, TILE_W, TILE_H*5, 50, 110, redWidth, redColHeight);
            break;
        case 3: // show example plant tiles info level 3
            canvas.boxContext.drawImage(assets.plantSheetPic, 0, 0, PLANT_W, PLANT_H*5, 270, 110, redWidth, redColHeight);
            break;
        case 4: // show example plant tiles info level 2
            canvas.boxContext.drawImage(assets.plantSheetPic, PLANT_W, 0, PLANT_W, PLANT_H*5, 160, 110, redWidth, redColHeight);
            break;
        case 5: // show example plant tiles info level 1
            canvas.boxContext.drawImage(assets.plantSheetPic, PLANT_W*2, 0, PLANT_W, PLANT_H*5, 50, 110, redWidth, redColHeight);
            break;
        case 6: // example water tile
            canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W*3, TILE_H*2, TILE_W, TILE_H, 380, 430, redWidth, redHeight);
            break;

    }
}

var exampleScreen = new function(){
    "use strict";
    var ctx = canvas.infoContext;

    this.highlightFarmer = function(){
        // farmer character on tile
        canvasFrame(ctx, 300,350, 100, 100, 5, 'red');
    };

    this.highlightTile = function(){
        // example tile
        canvasFrame(ctx, 100,350, 100, 100, 5, 'red');
    };

    this.highlightCol = function(){
        // example column
        canvasFrame(ctx, 100,50, 100, 700, 5, 'red');
    };

    this.highlightRow = function(){
        // example row
        canvasFrame(ctx, 0,150, 700, 100, 5, 'red');
    };

    this.highlightCenterCol = function(){
        // example column
        canvasFrame(ctx, 300,100, 100, 650, 5, 'red');
    };

    this.highlightCenterRow = function(){
        // example row
        canvasFrame(ctx, 0,350, 700, 100, 5, 'red');
    };

    this.highlightXY = function(){
        // XY coordinates
        canvasFrame(ctx, 10,0, 180, 50, 5, 'red');
    };

    this.highlightMovesLeft = function(){
        // moves left
        canvasFrame(ctx, 200,0, 170, 50, 5, 'red');
    };

    this.highlightPotatoPrice = function(){
        // potato price
        canvasFrame(ctx, 390,0, 195, 50, 5, 'red');
    };

    this.highlightPotatoCount = function(){
        // potato count
        canvasFrame(ctx, 580,0, 100, 50, 5, 'red');
    };

    this.highlightPayoff = function(){
        // payoff total
        canvasFrame(ctx, 250,40, 170, 60, 5, 'red');
    };

    this.highlightUi = function(){
        // entire UI
        canvasFrame(ctx, 10,0, 670, 50, 5, 'red');
        canvasFrame(ctx, 250,45, 170, 55, 5, 'red');
    };

    this.clear = function(){
        ctx.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
    }
};

function getText(whichText){
    "use strict";

    switch(whichText) {
        case 'open':
            return 'For every large map, you have 100 moves.';

            break;
        case 'exampleScreen1':
            return 'In this task, you will be playing a web game where you control a farmer harvesting potatoes on a ' +
                'large field. Your goal is to collect as many potatoes as possible. \n ' +
                'Every potato that you earn is worth real money. Please pay careful attention to the following ' +
                'information, so that you can earn as many potatoes as possible.';

            break;
        case 'exampleScreen2':
            return 'Every potato that you earn is worth real money. Please pay careful attention to the following ' +
                'information, so that you can earn as many potatoes as possible.';

            break;
        case 'open1':
            return '';

            break;
        case 0:
            return 'Once the game starts, you will be able to control your farmer with the arrow keys on your keyboard (show!).';

            break;
        case 1:
            return 'text 1';

            break;
        case 2:
            return 'text 2';

            break;
        case 3:
            return 'text 3';

            break;
        case 4:
            return 'text 4';

            break;
        case 5:
            return 'text 5';

            break;
        case 6:
            return 'text 6';

            break;
        case 7:
            return 'text 7';

            break;
        case 8:
            return 'text 8';

            break;
        case 9:
            return 'text 9';

            break;
        case 10:
            return 'text 10';

            break;
        case 11:
            return 'text 11';

            break;
        case 12:
            return 'text 12';

            break;
        default:

            break;
    }
}