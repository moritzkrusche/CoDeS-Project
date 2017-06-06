var farmerPic = document.createElement("img");
var tilePics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad === 0) {
		imageLoadingDoneSoStartGame();
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
		{varName: farmerPic, theFile: "farmer.png"},

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
		{tileType: TILE_EXPLOITED, theFile: "soil_exploited.png"}
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
