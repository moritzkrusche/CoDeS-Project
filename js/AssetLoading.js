

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;





// Tiles from Arthur Guez
// Sprite modified from https://otland.net/threads/damons-thread.215668/

//********************************Images********************************************************************************

var charSprite = document.createElement("img");
var potato1 = document.createElement("img");
var potato2 = document.createElement("img");
var potato3 = document.createElement("img");
var uiPic = document.createElement("img");

var tilePics = [];
var picsToLoad = 0; // set automatically based on imageList in loadImages()

const TILE_PLANT1a = "P1A";
const TILE_PLANT1b = "P1B";
const TILE_PLANT1c = "P1C";
const TILE_PLANT1d = "P1D";
const TILE_PLANT1e = "P1E";

const TILE_PLANT2a = "P2A";
const TILE_PLANT2b = "P2B";
const TILE_PLANT2c = "P2C";
const TILE_PLANT2d = "P2D";
const TILE_PLANT2e = "P2E";

const TILE_PLANT3a = "P3A";
const TILE_PLANT3b = "P3B";
const TILE_PLANT3c = "P3C";
const TILE_PLANT3d = "P3D";
const TILE_PLANT3e = "P3E";

const TILE_SOIL1a = "S1A";
const TILE_SOIL1b = "S1B";
const TILE_SOIL1c = "S1C";
const TILE_SOIL1d = "S1D";
const TILE_SOIL1e = "S1E";

const TILE_SOIL2a = "S2A";
const TILE_SOIL2b = "S2B";
const TILE_SOIL2c = "S2C";
const TILE_SOIL2d = "S2D";
const TILE_SOIL2e = "S2E";

const TILE_SOIL3a = "S3A";
const TILE_SOIL3b = "S3B";
const TILE_SOIL3c = "S3C";
const TILE_SOIL3d = "S3D";
const TILE_SOIL3e = "S3E";

const TILE_EMPTY = "S00";
const TILE_EXPLOITED = "SXX";
const TILE_WATER = "W";
const TILE_NOGO = "N";

const TILE_ROCK1 = "R1";
const TILE_ROCK2= "R2";
const TILE_ROCK3 = "R3";

var tileTypes = ['A', 'B', 'C', 'D', "E", "0", "X"];

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	// console.log(picsToLoad);
	if(picsToLoad === 0) {
        loadSounds();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
	// console.log(imgVar.style.width, imgVar.style.height)
}

function loadImageForWorldCode(tileCode, fileName) {
	tilePics[tileCode] = document.createElement("img");

	beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: charSprite, theFile: "farmerSprite.png"},
        {varName: potato1, theFile: "potato.png"},
        {varName: potato2, theFile: "potato.png"},
        {varName: potato3, theFile: "potato.png"},
        {varName: uiPic, theFile: "uiPanel.png"},

		{tileType: TILE_PLANT1a, theFile: "plant1a.png"},
		{tileType: TILE_PLANT1b, theFile: "plant1b.png"},
		{tileType: TILE_PLANT1c, theFile: "plant1c.png"},
		{tileType: TILE_PLANT1d, theFile: "plant1d.png"},
		{tileType: TILE_PLANT1e, theFile: "plant1e.png"},

		{tileType: TILE_PLANT2a, theFile: "plant2a.png"},
		{tileType: TILE_PLANT2b, theFile: "plant2b.png"},
		{tileType: TILE_PLANT2c, theFile: "plant2c.png"},
		{tileType: TILE_PLANT2d, theFile: "plant2d.png"},
		{tileType: TILE_PLANT2e, theFile: "plant2e.png"},

		{tileType: TILE_PLANT3a, theFile: "plant3a.png"},
		{tileType: TILE_PLANT3b, theFile: "plant3b.png"},
		{tileType: TILE_PLANT3c, theFile: "plant3c.png"},
		{tileType: TILE_PLANT3d, theFile: "plant3d.png"},
		{tileType: TILE_PLANT3e, theFile: "plant3e.png"},

		{tileType: TILE_SOIL1a, theFile: "soil1a.png"},
		{tileType: TILE_SOIL1b, theFile: "soil1b.png"},
		{tileType: TILE_SOIL1c, theFile: "soil1c.png"},
		{tileType: TILE_SOIL1d, theFile: "soil1d.png"},
		{tileType: TILE_SOIL1e, theFile: "soil1e.png"},

		{tileType: TILE_SOIL2a, theFile: "soil2a.png"},
		{tileType: TILE_SOIL2b, theFile: "soil2b.png"},
		{tileType: TILE_SOIL2c, theFile: "soil2c.png"},
		{tileType: TILE_SOIL2d, theFile: "soil2d.png"},
		{tileType: TILE_SOIL2e, theFile: "soil2e.png"},

		{tileType: TILE_SOIL3a, theFile: "soil3a.png"},
		{tileType: TILE_SOIL3b, theFile: "soil3b.png"},
		{tileType: TILE_SOIL3c, theFile: "soil3c.png"},
		{tileType: TILE_SOIL3d, theFile: "soil3d.png"},
		{tileType: TILE_SOIL3e, theFile: "soil3e.png"},

		{tileType: TILE_EMPTY, theFile: "soil_empty.png"},
		{tileType: TILE_EXPLOITED, theFile: "soil_exploited.png"},
        {tileType: TILE_WATER, theFile: "water.png"},
        {tileType: TILE_NOGO, theFile: "noGo.png"},

        {tileType: TILE_ROCK1, theFile: "rock1.png"},
        {tileType: TILE_ROCK2, theFile: "rock2.png"},
        {tileType: TILE_ROCK3, theFile: "rock3.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName !== undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].tileType, imageList[i].theFile);
		}
	}
}



//********************************AUDIO********************************************************************************

var potatoSound;
var walkingSound;
var backgroundSound;
var errorSound;

var audioFormat;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function loadSounds() {

	if (!isMobile) {
        setFormat();

        potatoSound = new Howl({volume: 0.6, src: ["audio/potato" + audioFormat]});
        walkingSound = new Howl({volume: 0.4, src: ["audio/walking" + audioFormat], loop: true});
        errorSound = new Howl({volume: 0.6, src: ["audio/error" + audioFormat]});
        backgroundSound = new Howl({volume: 0.4, src: ["audio/background" + audioFormat], loop: true});

        var audioId = setInterval(frameAudio, 30);

        function frameAudio() {
            if (potatoSound.state() === 'loaded' && walkingSound.state() === 'loaded' && errorSound.state() === 'loaded'
                && backgroundSound.state() === 'loaded') {
                clearInterval(audioId);
                imageLoadingDoneSoStartGame();
            }
        }
    }
    else {
        imageLoadingDoneSoStartGame();
	}
}


var unlockIOSAudioPlayback = function () {
    var context = Howler.ctx;
    var oscillator = context.createOscillator();
    oscillator.frequency.value = 200;
    oscillator.connect(context.destination);
    oscillator.start(0);
    oscillator.stop(0);
};



function loadSoundsMobile() {
    setFormat();
    potatoSound = new Howl({volume: 0.6, src: ["audio/potato" + audioFormat]});
    walkingSound = new Howl({volume: 0.4, src: ["audio/walking" + audioFormat], loop: true});
    errorSound = new Howl({volume: 0.6, src: ["audio/error" + audioFormat]});

    var audioId = setInterval(frameAudio, 30);
    function frameAudio() {
        if (potatoSound.state() === 'loaded' && walkingSound.state() === 'loaded' && errorSound.state() === 'loaded'
            && backgroundSound.state() === 'loaded') {
            clearInterval(audioId);
            initInput();
        }
    }

}

