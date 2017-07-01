// changing any const would break the graphics
const TILE_W = 100;
const TILE_H = 100;
const PLANT_W = 60;
const PLANT_H = 60;

// keeps track of everything that stays the same on a given map
// for minQual and tilesheets: same on all maps atm
var curMapConst = {
    columnParameters: [],
    rowParameters: [],

    maxMoves: 0,
    potatoPrice: 0,
    discountFactor: 0,

    alpha1: 0,
    beta1: 0,
    alpha2: 0,
    beta2: 0,

    minQuality1: 0.2,
    minQuality2: 0.35,
    minQuality3: 0.5,
    minQuality4: 0.65,

    soilSheet: NaN,
    plantSheet: NaN

};

// keeps track of everything that is updated on a given map, and compares with static
// loadNext --> load next lvl upon key input
var curMapVar = {

    tileGrid:[],
    exploredColumn: [],
    payoffColumn: [],
    exploredRow: [],
    payoffRow: [],
    movesLeft: 0,
    potatoCount: 0,
    potatoPrice: 0,
    // payoffcount gets only added and never overwritten; how much $ part made in the game so far
    payoffCount: 0,

    movementTracker: [],
    payoffTracker: [],

    loadId: NaN,
    walkId: NaN,
    pauseId: NaN,
    errorId1: NaN,
    errorId2: NaN

};

// condition in clear text; e.g "1221/soilCol" or 05050505/plantCol etc.

var loggedData = {
    condition: "",
    partAge: "",
    partGender: "",
    dateTime: "",

    browserIsMobile: false,

    allColParameters: {},
    allRowParameters: {},

    allAphaBetas: {},

    allExploredCols: {},
    allPayoffCols: {},
    allExploredRows:  {},
    allPayoffRows: {},

    allPotatoCounts: {},
    // payoffcount gets only added and never overwritten; how much $ part made in the game so far
    payoffCount: 0,
    allPayoffCounts: {},

    allMovementTrackers: {},
    allPayoffTrackers: {}

};

// MERGED LEVELS HAVE FORMAT DICT{ KEY: ARRAY[GRID, COL INFO, COL QUAL, COL PAYOFF, ROW INFO, ROW QUAL, ROW PAYOFF, MOVES ALLOWED etc.], KEY: ...}

// lvlKeys should be array of strings; e.g. ['map1', 'map2', 'map3', 'map4', 'map5', 'map6', 'map7', 'map8'];

function mergeLevels(lvlKeys, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, lvl7, lvl8, lvl9, lvl10){
    'use strict';
    lvl1 = lvl1 || 0;
    lvl2 = lvl2 || 0;
    lvl3 = lvl3 || 0;
    lvl4 = lvl4 || 0;
    lvl5 = lvl5 || 0;
    lvl6 = lvl6 || 0;
    lvl7 = lvl7 || 0;
    lvl8 = lvl8 || 0;
    lvl9 = lvl9 || 0;
    lvl10 = lvl10 || 0;

    var levelList = [lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, lvl7, lvl8, lvl9, lvl10];
    var levelKeys = lvlKeys;

    var levelHolder = {};

    for (var eachLevel=0; eachLevel<levelList.length; eachLevel++){
        if (levelList[eachLevel]!== 0) {

            var levelDetails = [];
            var each = levelList[eachLevel];

            levelDetails.push(each.tileGrid);
            levelDetails.push(each.exploredColumn);
            levelDetails.push(each.columnParameters);
            levelDetails.push(each.payoffColumn);
            levelDetails.push(each.exploredRow);
            levelDetails.push(each.rowParameters);
            levelDetails.push(each.payoffRow);
            levelDetails.push(each.maxMoves);
            levelDetails.push(each.alpha1);
            levelDetails.push(each.beta1);
            levelDetails.push(each.alpha2);
            levelDetails.push(each.beta2);
            levelDetails.push(each.potatoPrice);
            levelDetails.push(each.discountFactor);

            levelHolder[levelKeys[eachLevel]] = levelDetails;

        }

    }
    return levelHolder
}


function OpenLevelClass(numCols, numRows, maxMoves, alpha1, beta1, alpha2, beta2, potPrice, disFactor) {
    'use strict';
    this.maxMoves = maxMoves;

    this.alpha1 = alpha1;
    this.beta1 = beta1;
    this.alpha2 = alpha2;
    this.beta2 = beta2;

    this.potatoPrice = potPrice;
    this.discountFactor = disFactor;

    var that = this;

    // init arrays first to save memory vs. push()
    that.tileGrid = new Array(numCols);

    that.columnParameters = new Array(numCols);
    that.rowParameters = new Array(numRows);

    that.exploredColumn = new Array(numCols);
    that.exploredRow = new Array(numRows);

    that.payoffColumn = new Array(numCols);
    that.payoffRow = new Array(numRows);

    // only filled when functions called
    that.meanPayoff = 0;
    that.sdPayoff = 0;
    that.skewPayoff = 0;
    that.kurtPayoff = 0;

    (function () {
        'use strict';
        for (var eachCol=0; eachCol<numCols; eachCol++) {
            that.exploredColumn[eachCol] = 0;
            that.payoffColumn[eachCol] = 0;
        }

        for (var eachRow=0; eachRow<numRows; eachRow++) {
            that.exploredRow[eachRow] = 0;
            that.payoffRow[eachRow] = 0;
        }
    })();

    (function () {
        'use strict';
        for (var eachRow=0; eachRow<numRows; eachRow++) {
            var newRow = new Array(numCols);
            for (var eachCol=0; eachCol<numCols; eachCol++) {
                newRow[eachCol] = 0;
            }
            that.tileGrid[eachRow] = newRow
        }
    })();

    (function() {
        'use strict';
        for (var eachCol = 0; eachCol < numCols; eachCol++) {
            that.columnParameters[eachCol] = jStat.beta.sample(alpha1, beta1);
        }

        for (var eachRow = 0; eachRow < numRows; eachRow++) {
            that.rowParameters[eachRow] = jStat.beta.sample(alpha2, beta2);
        }
    })();

    (function() {
        'use strict';
        var rowColPairs = numCols;
        if (numCols > numRows){
            rowColPairs = numRows
        }
        // This is like a diagonal across the grid, assuming that parameters are independent it suffices
        var expectedPayoff = new Array(rowColPairs);

        for (var i=0; i<rowColPairs; i++) {
            expectedPayoff[i] = that.rowParameters[i] * that.columnParameters[i];
        }
        that.meanPayoff = jStat.mean(expectedPayoff);
        // sample SD
        that.sdPayoff = jStat.stdev(expectedPayoff,true);
        that.skewPayoff = jStat.skewness(expectedPayoff);
        that.kurtPayoff = jStat.kurtosis(expectedPayoff);
    })()
}


function isTileAtCoord(TileRow, TileCol) {
    'use strict';
    if (curMapVar.tileGrid[TileRow] !== undefined) {
        if (curMapVar.tileGrid[TileRow][TileCol] !== undefined) {
            return true;
        }
    }
    return false;
}


function getType(TileCol, TileRow) {
    'use strict';
    var alpha1 = curMapConst.alpha1;
    var beta1 = curMapConst.beta1;
    var alpha2 = curMapConst.alpha2;
    var beta2 = curMapConst.beta2;

    //Maarten: add sum of alpha and beta parameters to explored count
    var infoCol = curMapVar.exploredColumn[TileCol]+alpha1+beta1;
    var infoRow = curMapVar.exploredRow[TileRow]+alpha2+beta2;

    var infoLevelCol = getInfoLevel(infoCol, (alpha1+beta1));
    var infoLevelRow = getInfoLevel(infoRow, (alpha2+beta2));

    // Maarten: alpha success rate; beta failure rate
    var qualityCol = getQuality((curMapVar.payoffColumn[TileCol]+alpha1), infoCol, (alpha1+beta1));
    var qualityRow = getQuality((curMapVar.payoffRow[TileRow]+alpha2), infoRow, (alpha2+beta2));

    return [infoLevelCol, infoLevelRow, qualityCol, qualityRow];

}


function getInfoLevel(rowOrCol, parameters) {
    'use strict';
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
    'use strict';
    var fraction = timesPotato / timesExplored;

    if (timesExplored === parameters){
        return 2;
    }
    else if (fraction <= curMapConst.minQuality1) {
        return 0;
    }
    else if (fraction <= curMapConst.minQuality2) {
        return 1;
    }
    else if (fraction <= curMapConst.minQuality3) {
        return 2;
    }
    else if (fraction <= curMapConst.minQuality4) {
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
    'use strict';
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

        canvas.gameContext.drawImage(image, sheetCol, sheetRow, imageWidth, imageHeight, x+this.offSetX, y+this.offSetY, drawWidth, drawHeight);
    };
}

function drawVisibleTiles() {
    'use strict';
    // what are the top-left most row and col visible on canvas?
    var cameraTopMostRow = Math.floor(camera.panY / TILE_H);
    var cameraLeftMostCol = Math.floor(camera.panX / TILE_W);
    // how many rows and columns of tiles fit on the canvas?
    var colsThatFitOnScreen = Math.floor(CANVAS_W / TILE_W);
    var rowsThatFitOnScreen = Math.floor(CANVAS_H / TILE_H);

    // finding the rightmost and bottommost tiles to draw + 1 on the side
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;

    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
        for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

            var drawX = eachCol * TILE_W;
            var drawY = eachRow * TILE_H;

			if (isTileAtCoord(eachRow, eachCol)) {

                var tilePos = curMapVar.tileGrid[eachRow][eachCol];

                // Col/ Row ia correct with respect to parameters and X/ Y; Row/ Col necessary due to JS Rows[Cols]
                var type = getType(eachCol, eachRow);

                var soilParameter = type[2];
                var plantParameter = type[3];
                var soilInfo = type[0];
                var plantInfo = type[1];

                // condition 2 & 4 invert the mapping of soil/ plant to row/ col (was col/ row in condition 1 & 2)
                if (condition === 2 || condition === 4) {
                    soilInfo = type[1];
                    plantInfo = type[0];
                    soilParameter = type[3];
                    plantParameter = type[2];
                }

                switch(tilePos) {
                    case 0:
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, plantInfo, plantParameter);
                        break;
                    case 1:
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 0);
                        break;
                    case 3:
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 5:
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 7:
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 2);
                        break;
                    case 8:
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 3);
                        break;
                    case 9:
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 4);
                        break;
                    default:
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 1);
                        break;
                }
            }
            else {
                curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                curMapConst.plantSheet.draw(drawX, drawY, 3, 1);
            }
        }
    }
}


