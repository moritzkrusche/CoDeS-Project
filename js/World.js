var TILE_W = 100;
var TILE_H = 100;

var PLANT_W = 60;
var PLANT_H = 60;

var TILE_COLS = 220;
var TILE_ROWS = 220;

var trainingPhase = false;

var alpha1= 2;
var alpha2 = 1;
var beta1 = 1;
var beta2 = 2;



rowParameters = new Array(TILE_ROWS);
columnParameters = new Array(TILE_COLS);

plantRow = new Array(TILE_ROWS);
soilColumn = new Array(TILE_COLS);

payoffRow = new Array(TILE_ROWS);
payoffColumn = new Array(TILE_COLS);

exploredRow = new Array(TILE_ROWS);
exploredColumn = new Array(TILE_COLS);

expectedPayoff = new Array(TILE_COLS);
randomColumn = new Array(TILE_COLS);

function generateParameters() {
    for (var i=0; i<TILE_COLS; i++) {
        columnParameters[i] = jStat.beta.sample(1,2);
    }
    for (var j=0; j<TILE_ROWS; j++) {
        rowParameters[j] = jStat.beta.sample(2,1);
    }
}

generateParameters();

//console.log("rowParameters", rowParameters);
//console.log("columnParameters", columnParameters);

function generateWorld() {
    for (var i=0; i<TILE_COLS; i++) {
        var soilSeed = columnParameters[i] * 6.5;
        if (soilSeed > 4 ) {
            soilSeed = 4
        }
        soilColumn[i] = round(soilSeed, 0);
        payoffColumn[i] = 0;
        exploredColumn[i] = 0;
    }
    for (var j=0; j<TILE_ROWS; j++) {
        var plantSeed = rowParameters[j] * 3.25;
        if (plantSeed > 3 ) {
            plantSeed = 4
        }
        plantRow[j] = round(plantSeed, 0);
        payoffRow[j] = 0;
        exploredRow[j] = 0;
    }
}

function measureWorld() {

    for (var i=0; i<TILE_COLS; i++) {
        expectedPayoff[i] = columnParameters[i] * rowParameters[i];
    }
    var totalPayoff = jStat.sum(expectedPayoff);
    var meanPayoff = totalPayoff / expectedPayoff.length;
    console.log("MEAN PAYOFF :", meanPayoff);
}


generateWorld();



function getParameters() {
    var posX = Math.floor(trackerX/TILE_W);
    var posY = Math.floor(trackerY/TILE_H);

    return [posX, posY]
}



function createGrid() {
    var newRow = new Array(TILE_COLS);

    for (j=0; j<newRow.length; j++) {
        var newCol = new Array(TILE_ROWS);
        for (i=0; i<newCol.length; i++) {
            newCol[i] = 0;
        }
        newRow[j] = newCol
    }
    return newRow;

}

var newGrid = createGrid();

var tileGrid = [];


function isTileAtCoord(TileRow, TileCol) {
    if (tileGrid[TileRow] !== undefined) {
        if (tileGrid[TileRow][TileCol] !== undefined) {
            return true;
        }
    }
    return false;
}




function getType(TileRow, TileCol) {

    if (trainingPhase) {

        //Maarten: add sum of alpha and beta parameters to explored count
        var infoCol = exploredColumn[TileCol]+alpha1+beta1;
        var infoRow = exploredRow[TileRow]+alpha2+beta2;

        var infoLevelCol = getInfoLevel(infoCol, (alpha1+beta1));
        var infoLevelRow = getInfoLevel(infoRow, (alpha2+beta2));

        // Maarten: alpha success rate; beta failure rate
        var qualityCol = getQuality((payoffColumn[TileCol]+alpha1), infoCol, (alpha1+beta1));
        var qualityRow = getQuality((payoffRow[TileRow]+alpha2), infoRow, (alpha2+beta2));

        return [infoLevelCol, infoLevelRow, qualityCol, qualityRow];
    }
    else {
        return [0, 0, soilColumn[TileRow], plantRow[TileCol]]
    }
}



function getInfoLevel(rowOrCol, parameters) {
    if (rowOrCol <= parameters) {
        return 2;
    }
    else if (rowOrCol < 4+parameters) {
        return 1;
    }
    else if (rowOrCol >= 4+parameters) {
        return 0;
    }
}


function getQuality(timesPotato, timesExplored, parameters) {
    var fraction = timesPotato / timesExplored;

    if (timesExplored === parameters){
        return 2;
    }
    else if (fraction <= 0.20) {
        return 0;
    }
    else if (fraction <= 0.35) {
        return 1;
    }
    else if (fraction <= 0.50) {
        return 2;
    }
    else if (fraction <= 0.65) {
        return 3;
    }
    else  {
        return 4;
    }
}


/*
 Tilesheet Soil 100px

 Column 0 1 2 --> Info 1,2,3

 Column 3 --> path (0: no, 1: payoff) + water (3)

 Row 0, 1, 2, 3, 4 --> Soil Quality 1,2,3,4,5

Tilesheet Plants 60px

Column 0 1 2 --> Info 1,2,3

Column 3 --> path (0: no, 1: payoff) + water (3)

Row 0, 1, 2, 3, 4 --> Soil Quality 1,2,3,4,5
*/

// universal class for drawing (static) tiles from a tilesheet
function TileSheetClass(image, sheetWidth, sheetHeight, rows, cols, offsetX, offsetY, drawWidth, drawHeight) {

    this.SheetWidth = sheetWidth;
    this.SheetHeight = sheetHeight;
    this.SheetRows = rows;
    this.SheetCols = cols;

    var imageWidth = this.SheetWidth/this.SheetCols;
    var imageHeight = this.SheetHeight/this.SheetRows;

    // centers relatively smaller pictures, e.g. plants or rocks, on relatively larger tiles
    this.offSetX = offsetX;
    this.offSetY = offsetY;

    this.draw = function(x, y, whichCol, whichRow) {

        var sheetCol = imageHeight * whichCol;
        var sheetRow = imageWidth * whichRow;

        canvasContext.drawImage(image, sheetCol, sheetRow, imageWidth, imageHeight, x+this.offSetX, y+this.offSetY, drawWidth, drawHeight);
    };
}

// this variable-heavy definition requires that the appropriately sized tilesheet is delivered
var soilSheet = new TileSheetClass(assets.soilSheetPic, 5*TILE_W, 5*TILE_H, 5, 5, 0, 0, TILE_W, TILE_H);
var plantSheet = new TileSheetClass(assets.plantSheetPic, 5*PLANT_W, 5*PLANT_H, 5, 5, ((TILE_W-PLANT_W)/2), ((TILE_H-PLANT_H)/2), PLANT_W, PLANT_H);


function drawOnlyTilesOnScreen() {
    // what are the top-left most row and col visible on canvas?
    var cameraLeftMostCol = Math.floor(camera.panX / TILE_W);
    var cameraTopMostRow = Math.floor(camera.panY / TILE_H);
    // how many rows and columns of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(CANVAS_W / TILE_W);
    var rowsThatFitOnScreen = Math.floor(CANVAS_H / TILE_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 on each pushes the new tile popping in off visible area
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

        for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
            var drawX = eachCol * TILE_W;
            var drawY = eachRow * TILE_H;

			if (isTileAtCoord(eachRow, eachCol)) {
                var arrayIndex = tileGrid[eachRow][eachCol];

                var type = getType(eachRow, eachCol);
                var soilParameter = type[2];
                var plantParameter = type[3];
                var soilInfo = type[0];
                var plantInfo = type[1];
                //console.log(plantInfo, plantParameter);

                switch(arrayIndex) {
                    case 0:
                        soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        plantSheet.draw(drawX, drawY, plantInfo, plantParameter);
                        break;
                    case 1: soilSheet.draw(drawX, drawY, 3, 0);
                        break;
                    case 3: soilSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 5: soilSheet.draw(drawX, drawY, 3, 2);
                        plantSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 7: soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        plantSheet.draw(drawX, drawY, 3, 2);
                        break;
                    case 8: soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        plantSheet.draw(drawX, drawY, 3, 3);
                        break;
                    case 9: soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        plantSheet.draw(drawX, drawY, 3, 4);
                        break;
                    default: soilSheet.draw(drawX, drawY, 3, 2);
                        plantSheet.draw(drawX, drawY, 3, 1);
                        break;
                }
            }
            else {
			    soilSheet.draw(drawX, drawY, 3, 2);
                plantSheet.draw(drawX, drawY, 3, 1);
            }
        }
    }
}


