
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

    setFormat();

    potatoSound = new Howl({volume: 0.6, preload: true, src: ["audio/potato" + audioFormat]});
    walkingSound = new Howl({volume: 0.4, preload: true, src: ["audio/walking" + audioFormat], loop: true});
    errorSound = new Howl({volume: 0.6, preload: true, src: ["audio/error" + audioFormat]});
    backgroundSound = new Howl({volume: 0.4, preload: true, src: ["audio/background" + audioFormat], loop: true});

    var audioId = setInterval(frameAudio, 30);
    function frameAudio() {
        if (potatoSound.state() === 'loaded' && walkingSound.state() === 'loaded' && errorSound.state() === 'loaded'
            && backgroundSound.state() === 'loaded') {
            clearInterval(audioId);
            imageLoadingDoneSoStartGame();
        }
    }
}





