
//******************************** LOADING ASSETS & ADJUSTING SCREEN ***************************************************

// where the game is drawn; multiple for UI, animations etc. and with different z-levels
var canvas = {

    game: document.getElementById('gameCanvas'), // z-level -4
    effect: document.getElementById('effectCanvas'), // z-level -3
    ui: document.getElementById('uiCanvas'), // z-level -2
    info: document.getElementById('infoCanvas'), // z-level -1
    box: document.getElementById('boxCanvas'), // z-level 0

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

// Initialize Firebase
var database, gameDatabase, feedbackDatabase;

(function(){
    "use strict";
    // pilot database
    var config = {
        apiKey: 'AIzaSyDp7KeZVXhpaaryW-sPQZmXZYobouqecO0',
        authDomain: 'pilot-farming-task.firebaseapp.com',
        databaseURL: 'https://pilot-farming-task.firebaseio.com',
        projectId: 'pilot-farming-task',
        storageBucket: 'pilot-farming-task.appspot.com',
        messagingSenderId: '768805606623'
    };

    // test database
    /*
    var config = {
        apiKey: "AIzaSyBQ9J87IOwA_XdQxhAVpgKHbvnaFoylbRM",
        authDomain: "test-farming-game.firebaseapp.com",
        databaseURL: "https://test-farming-game.firebaseio.com",
        projectId: "test-farming-game",
        storageBucket: "test-farming-game.appspot.com",
        messagingSenderId: "628927613302"
    };
    */
    firebase.initializeApp(config);
    database = firebase.database();
    gameDatabase = database.ref('gameData');
    feedbackDatabase = database.ref('feedback');
})();

//******************************** CHECK IF MOBILE BROWSER *************************************************************

var isMobile = false; //initiate as false

(function(){
    // device detection
    // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

    //isMobile = true;

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
        var buttonContainers = (document.getElementsByClassName('buttonContainer'));
        for (var i=0; i<buttonContainers.length; i++){
            buttonContainers[i].style.maxWidth = newMaxWidth;
        }

    } else if (isMobile){

        document.getElementById('demographics').style.fontSize = '0.9em';
        document.getElementById('debriefing').style.fontSize = '0.9em';
        document.getElementById('comment').style.fontSize = '0.9em';
        document.getElementById('prolificId').style.width = '70%';
        document.getElementById('age').style.width = '50%';
        document.getElementById('gender').style.width = '50%';
    }

    var ctx = canvas.gameContext;
    canvasRect(ctx, 0,0, CANVAS_W,CANVAS_H+uiHeight, 'black');
    ctx.font = 'italic 20pt "COMIC SANS MS"';
    canvasText(ctx, 'LOADING', CANVAS_W/2-70, CANVAS_H/2+uiHeight, 'white');

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

        var numSounds = 8;
        var numSoundsLoaded = 0;
        var soundLoaded = function() {
            numSoundsLoaded++;
            if (numSoundsLoaded === numSounds) {
                assetLoaded();
            }
        };
        this.potatoSound = new Howl({src: ['audio/potato' + audioFormat], volume: 0.6,
            onload: function() {
            soundLoaded();
            }
        });
        this.walkingSound = new Howl({src: ['audio/walking' + audioFormat], volume: 0.3, loop: true,
            onload: function() {
            soundLoaded();
            }
        });
        this.errorSound = new Howl({src: ['audio/error' + audioFormat], volume: 0.6,
            onload: function() {
            soundLoaded();
            }
        });
        this.backgroundSound = new Howl({src: ['audio/background' + audioFormat], volume: 0.6, loop: true,
            onload: function() {
            soundLoaded();
            }
        });
        this.normalRainSound = new Howl({src: ['audio/normalRain' + audioFormat], volume: 0.6, loop: true,
            onload: function() {
            soundLoaded();
            }
        });
        this.strongRainSound = new Howl({src: ['audio/strongRain' + audioFormat], volume: 0.6, loop: true,
            onload: function() {
            soundLoaded();
            }
        });
        this.strongestRainSound = new Howl({src: ['audio/strongestRain' + audioFormat], volume: 0.6, loop: true,
            onload: function() {
            soundLoaded();
            }
        });
        this.finishedSound = new Howl({src: ['audio/finished' + audioFormat], volume: 0.6,
            onload: function() {
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
                error: [8500, 500],
                finished: [10000, 4000],
                normalRain: [15000, 10000, true],
                strongRain: [26000, 10000, true],
                strongestRain: [37000, 10000, true]
            }, onload: function() {
                soundSpriteLoaded();
            }
        });
    }
};

//******************************** END OF LOADING ASSETS & ADJUSTING SCREEN ********************************************