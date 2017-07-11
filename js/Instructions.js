

//******************************** INSTRUCTIONS ************************************************************************


var boxScreen = new function() {
    'use strict';

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


    this.hide = function(){

        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        canvas.infoContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        document.getElementById('gameBox').style.display = "none";
        document.getElementById('fullGameBox').style.display = "none";

        document.getElementById('nextButton').style.display = "none";
        document.getElementById('backButton').style.display = "none";

    };



    this.show = function(words){
        "use strict";

        document.getElementById('gameBox').style.display = "block";


        if (!isMobile){
            if (assets.backgroundSound.playing(curMapVar.backgroundId)){
                assets.backgroundSound.stop(curMapVar.backgroundId)
            }
        }


        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);

        that.wrapText(words, 80, 540, 540, 25);

    };

    this.showFull = function(){
        document.getElementById('fullGameBox').style.display = "block";


    }


};

function buttonNext() {
    "use strict";

    if (instructions.index < instructions.maxIndex){
        instructions.index++;
    }

    showExampleScreen()

}

function buttonBack() {
    "use strict";
    if (instructions.index > 0){
        instructions.index--;
    }
    document.getElementById('nextButton').style.display = "block";

    showExampleScreen()

}


function buttonStartLevel(){
    "use strict";
    boxScreen.hide();
    initInput();

    document.getElementById('startButton').style.display = "none";

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
    document.getElementById('startButton').style.display = "block";

}


var instructions = new function(){
    "use strict";

    this.index = 0;
    this.maxIndex = 12;

    this.highlightFarmer = function(){
        // farmer character on tile
        infoRect(300,350, 100, 100, 'red');
        canvas.infoContext.clearRect(305,355,90,90);
    };

    this.highlightTile = function(){
        // example tile
        infoRect(100,350, 100, 100, 'red');
        canvas.infoContext.clearRect(105,355,90,90);
    };

    this.highlightCol = function(){
        // example column
        infoRect(100,50, 100, 700, 'red');
        canvas.infoContext.clearRect(105,55,90,690);
    };

    this.highlightRow = function(){
        // example row
        infoRect(0,150, 700, 100, 'red');
        canvas.infoContext.clearRect(5,155,690,90);
    };

    this.highlightCenterCol = function(){
        // example column
        infoRect(300,100, 100, 650, 'red');
        canvas.infoContext.clearRect(305,105,90,640);
    };

    this.highlightCenterRow = function(){
        // example row
        infoRect(0,350, 700, 100, 'red');
        canvas.infoContext.clearRect(5,355,690,90);
    };

    this.highlightXY = function(){
        // XY coordinates
        infoRect(10,0, 180, 50, 'red');
        canvas.infoContext.clearRect(15,5,170,40);
    };

    this.highlightMovesLeft = function(){
        // moves left
        infoRect(200,0, 170, 50, 'red');
        canvas.infoContext.clearRect(205,5,160,40);
    };

    this.highlightPotatoPrice = function(){
        // potato price
        infoRect(390,0, 195, 50, 'red');
        canvas.infoContext.clearRect(395,5,185,40);
    };

    this.highlightPotatoCount = function(){
        // potato count
        infoRect(580,0, 100, 50, 'red');
        canvas.infoContext.clearRect(585,5,90,40);
    };

    this.highlightPayoff = function(){
        // payoff total
        infoRect(250,40, 170, 60, 'red');
        canvas.infoContext.clearRect(255,45,160,50);
    };

    this.highlightUi = function(){
        // entire UI
        infoRect(10,0, 670, 50, 'red');
        canvas.infoContext.clearRect(15,5,660,40);
        infoRect(250,45, 170, 55, 'red');
        canvas.infoContext.clearRect(255,45,160,50);
    };

    this.clear = function(){
        canvas.infoContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
    }

};



function showExampleScreen() {
    "use strict";



    var index = instructions.index;

    switch (index) {

        case 0:
            document.getElementById('nextButton').style.display = "block";
            document.getElementById('backButton').style.display = "none";
            boxScreen.show(getText(0));
            break;

        case 1:

            document.getElementById('backButton').style.display = "block";
            instructions.clear();
            instructions.highlightFarmer();
            boxScreen.show(getText(1));

            showExampleTiles();

            break;
        case 2:
            instructions.clear();
            instructions.highlightTile();
            boxScreen.show(getText(2));
            break;
        case 3:
            instructions.clear();
            instructions.highlightCenterCol();
            boxScreen.show(getText(3));
            break;
        case 4:
            instructions.clear();
            instructions.highlightCenterRow();
            boxScreen.show(getText(4));
            break;
        case 5:
            instructions.clear();
            instructions.highlightCol();
            boxScreen.show(getText(5));
            break;
        case 6:
            instructions.clear();
            instructions.highlightRow();
            boxScreen.show(getText(6));
            break;
        case 7:
            instructions.clear();
            instructions.highlightUi();
            boxScreen.show(getText(7));
            break;
        case 8:
            instructions.clear();
            instructions.highlightPotatoCount();
            boxScreen.show(getText(8));
            break;
        case 9:
            instructions.clear();
            instructions.highlightPotatoPrice();
            boxScreen.show(getText(9));
            break;
        case 10:
            instructions.clear();
            instructions.highlightPayoff();
            boxScreen.show(getText(10));
            break;
        case 11:
            instructions.clear();
            instructions.highlightMovesLeft();
            boxScreen.show(getText(11));
            break;
        case 12:
            instructions.clear();
            instructions.highlightXY();
            boxScreen.show(getText(12));



            document.getElementById('nextButton').style.display = "none";

            document.getElementById('startButton').style.display = "block";
            break;


    }

}

function showExampleTiles(){
    "use strict";

    //document.getElementById('fullGameBox').style.display = "block";

    //document.getElementById('fullGameBox').style.display = "none";




    // show example soil tiles
    //canvas.boxContext.drawImage(assets.soilSheetPic, 0, 0, TILE_W, TILE_H*5, 50, 110, TILE_W*0.8, TILE_H*5*0.8);

    //canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W, 0, TILE_W, TILE_H*5, 160, 110, TILE_W*0.8, TILE_H*5*0.8);

    //canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W*2, 0, TILE_W, TILE_H*5, 270, 110, TILE_W*0.8, TILE_H*5*0.8);

    // show example plant tiles
    //canvas.boxContext.drawImage(assets.plantSheetPic, 0, 0, PLANT_W, PLANT_H*5, 50+20, 110+20, TILE_W*0.8, TILE_H*5*0.8);
    //canvas.boxContext.drawImage(assets.plantSheetPic, PLANT_W, 0, PLANT_W, PLANT_H*5, 160+20, 110+20, TILE_W*0.8, TILE_H*5*0.8);
    //canvas.boxContext.drawImage(assets.plantSheetPic, 2*PLANT_W, 0, PLANT_W, PLANT_H*5, 270+20, 110+20, TILE_W*0.8, TILE_H*5*0.8);

    //canvas.boxContext.drawImage(assets.soilSheetPic, TILE_W*3, TILE_H*2, TILE_W, TILE_H, 270, 110, TILE_W, TILE_H);
}


function getText(whichText){
    "use strict";

    switch(whichText) {
        case 'open':
            return 'For every large map, you have 100 moves.';

            break;
        case 'instructions1':
            return 'In this task, you will be playing a web game where you control a farmer harvesting potatoes on a ' +
                'large field. Your goal is to collect as many potatoes as possible. \n ' +
                'Every potato that you earn is worth real money. Please pay careful attention to the following ' +
                'information, so that you can earn as many potatoes as possible.';

            break;
        case 'instructions2':
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