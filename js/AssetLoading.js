
// where the game is drawn; optionally multiple for UI, animations etc.
var canvas = {

    game: document.getElementById('gameCanvas'),
    effect: document.getElementById('effectCanvas'),
    ui: document.getElementById('uiCanvas'),
    info: document.getElementById('infoCanvas'),
    box: document.getElementById('boxCanvas'),

    gameContext: document.getElementById('gameCanvas').getContext('2d'),
    effectContext: document.getElementById('effectCanvas').getContext('2d'),
    uiContext: document.getElementById('uiCanvas').getContext('2d'),
    infoContext: document.getElementById('infoCanvas').getContext('2d'),
    boxContext: document.getElementById('boxCanvas').getContext('2d')

};

// changing any const would break the graphics
const CANVAS_H = 700;
const CANVAS_W = 700;
const uiHeight = 50;

//******************************** FIRST CHECK IF MOBILE BROWSER *******************************************************

var isMobile = false; //initiate as false

(function(){
    // device detection
    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

    //isMobile = true;

    if (isMobile) {
        var buttons = document.getElementsByClassName('playButton');
        for (var i=0; i<buttons.length; i++){
            buttons[i].style.visibility = 'visible'
        }
    }

})();

// Tiles supplied by Arthur Guez and modified
// Sprite modified from https://otland.net/threads/damons-thread.215668/

//******************************** SHOW LOAD SCREEN WHILE LOADING ******************************************************

function loadScreen() {
    'use strict';

    // ensures that the lower part of the canvas is not cut out on small laptops etc.
    if (!isMobile && window.screen.height <850){

        var newMaxWidth = '580px';
        if(window.screen.height <720) {
            newMaxWidth = '420px';
        }

        document.getElementById('canvasContainer').style.maxWidth = newMaxWidth;
        var buttonContainers = (document.getElementsByClassName('button-container'));
        for (var i=0; i<buttonContainers.length; i++){
            buttonContainers[i].style.maxWidth = newMaxWidth;
        }

    }

    gameRect(0,0, CANVAS_W,CANVAS_H+uiHeight, 'black');
    canvas.gameContext.font = 'italic 20pt "COMIC SANS MS"';
    gameText('LOADING', CANVAS_W/2-70, CANVAS_H/2+uiHeight, 'white');

}

//******************************** INFO SCREEN INSTEAD OF ALERT ********************************************************




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
            var testWidth = metrics.width;
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

        document.getElementById('nextButton').style.display = "none";
        document.getElementById('backButton').style.display = "none";

    };



    this.show = function(words){
        "use strict";

        document.getElementById('gameBox').style.display = "block";



        if (assets.backgroundSound.playing(curMapVar.backgroundId)){
            assets.backgroundSound.stop(curMapVar.backgroundId)
        }

        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);

        that.wrapText(words, 80, 540, 540, 25);

    };


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


//******************************** INIT OBJECT TO HOLD ALL ASSETS; LAUNCH IF LOADED  ***********************************

var assets = new function() {
    'use strict';
    loadScreen();
    var checkReady = 0;
    function assetLoaded() {
        checkReady++;
        if (checkReady === 2) {
            startGame()
        }
    }

    //******************************** LOADING IMAGES ******************************************************************

    // Define images
    this.charSprite = document.createElement('img');
    this.potato = document.createElement('img');
    this.uiPic = document.createElement('img');
    this.soilSheetPic = document.createElement('img');
    this.plantSheetPic = document.createElement('img');

    // Check if all images have loaded
    var numImages = 5;
    var numImagesLoaded = 0;
    function imageLoaded() {
        numImagesLoaded++;
        if (numImagesLoaded === numImages) {
            assetLoaded();
        }
    }
    this.charSprite.onload = function() {
        imageLoaded();
    };
    this.potato.onload = function() {
        imageLoaded();
    };
    this.uiPic.onload = function() {
        imageLoaded();
    };
    this.soilSheetPic.onload = function() {
        imageLoaded();
    };
    this.plantSheetPic.onload = function() {
        imageLoaded();
    };

    // Set images src
    this.charSprite.src = 'images/farmerSprite240px.png';
    this.potato.src = 'images/potato50px.png';
    this.uiPic.src = 'images/uiPanel.png';
    this.soilSheetPic.src = 'images/soilSheet100px.png';
    this.plantSheetPic.src = 'images/plantSheet60px.png';

    //******************************** LOADING AUDIO *******************************************************************

    var audioFormat = '.ogg';

    (function() {
        var audio = new Audio();
        if (audio.canPlayType('audio/mp3')) {
            audioFormat = '.mp3';
        }
    })();

    this.unlockIOSAudioPlayback = function () {
        var context = Howler.ctx;
        var oscillator = context.createOscillator();
        oscillator.frequency.value = 200;
        oscillator.connect(context.destination);
        oscillator.start(0);
        oscillator.stop(0);
    };

    if (!isMobile) {

        var numSounds = 4;
        var numSoundsLoaded = 0;
        var soundLoaded = function() {
            numSoundsLoaded++;
            if (numSoundsLoaded === numSounds) {
                assetLoaded();
            }
        };

        this.potatoSound = new Howl({src: ['audio/potato' + audioFormat], volume: 0.6, onload: function() {
            soundLoaded();
            }
        });
        this.walkingSound = new Howl({src: ['audio/walking' + audioFormat], volume: 0.3, loop: true, onload: function() {
            soundLoaded();
            }
        });
        this.errorSound = new Howl({src: ['audio/error' + audioFormat], volume: 0.6, onload: function() {
            soundLoaded();
            }
        });
        this.backgroundSound = new Howl({src: ['audio/background' + audioFormat], volume: 0.6, loop: true, onload: function() {
            soundLoaded();
            }
        });

    } else {

        var soundSpriteLoaded = function() {

            assetLoaded();
        };

        this.spriteSound = new Howl({
            src: ['audio/audioSprite.mp3'],
            sprite: {
                walking: [0, 5500, true],
                potato: [7000, 500],
                error: [8500, 500]
            }, onload: function() {
                soundSpriteLoaded();
            }
        });

    }
}();

