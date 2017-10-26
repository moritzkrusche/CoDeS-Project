
//******************************** WORLD CREATION & RENDERING **********************************************************

// changing any const would break the graphics
const TILE_W = 100;
const TILE_H = 100;
const PLANT_W = 60;
const PLANT_H = 60;

// keeps track of everything that stays the same on a given map
// for minQual and tilesheets: same on all maps atm
let curMapConst = {
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
    minQuality2: 0.4,
    minQuality3: 0.6,
    minQuality4: 0.8,

    soilSheet: NaN,
    plantSheet: NaN,
    firebaseKey: ""
};

// keeps track of everything that is updated on a given map, and compares with static
// loadNext --> load next lvl upon key input
let curMapVar = {

    tileGrid:[],

    movesLeft: 0,
    moveCount: 0,
    potatoCount: 0,
    potatoPrice: 0,
    // payoffcount gets only added and never overwritten; how much $ part made in the game so far
    payoffCount: 0,

    XPositions: [],
    YPositions: [],
    XProbabilities : [],
    YProbabilities: [],
    movementTracker: [],
    probTracker: [],
    payoffTracker: [],

    colPositions: [],
    rowPositions: [],
    exploredColumn: [],
    payoffColumn: [],
    exploredRow: [],
    payoffRow: [],

    timeTracker: [],
    lastTime: "",
    nextTime: "",
    startMapTime: "",
    endMapTime: "",

    loadId: NaN,
    walkId: NaN,
    pauseId: NaN,
    errorId1: NaN,
    errorId2: NaN,
    backgroundId: NaN,
    mobileSoundUnlocked: false
};

// holds the data logged at the end of every level, gets send to firebase at the end
let loggedData = {

    // over entire experiment
    prolificId: "",
    condition: "",
    partAge: "",
    partGender: "",
    startDateTime: "",
    endDateTime: "",
    timeZoneDiff: "",
    browserIsMobile: false,
    testMapOrder: [],
    // payoffcount gets only added and never overwritten; how much $ part made in the game so far
    payoffCount: 0,

    // buttons & times
    buttonsClicked: [],
    buttonTimes: [],
    allStartTimes: {},
    allEndTimes: {},
    allMoveTimes: {},

    // per level
    allColParameters: {},
    allRowParameters: {},
    allAlphaBetas: {},
    allPotatoCounts: {},
    allPayoffCounts: {},

    // Col/ Row starts at 105,105
    allColPositions: {},
    allRowPositions: {},
    allExploredCols: {},
    allPayoffCols: {},
    allExploredRows:  {},
    allPayoffRows: {},

    // X / Y starts at 0,0
    allXPositions: {},
    allYPositions: {},
    allXProbabilities: {},
    allYProbabilities: {},
    allMovementTrackers: {},
    allProbTrackers: {},
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

    let levelList = [lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, lvl7, lvl8, lvl9, lvl10];
    let levelKeys = lvlKeys;

    let levelHolder = {};

    for (let eachLevel=0; eachLevel<levelList.length; eachLevel++){
        if (levelList[eachLevel]!== 0) {
            let levelDetails = [];
            let each = levelList[eachLevel];

            levelDetails.push(each.tileGrid);
            levelDetails.push(each.columnParameters);
            levelDetails.push(each.payoffColumn);
            levelDetails.push(each.exploredColumn);
            levelDetails.push(each.rowParameters);
            levelDetails.push(each.payoffRow);
            levelDetails.push(each.exploredRow);
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

    let that = this;

    // init arrays first to save memory vs. push()
    that.tileGrid = new Array(numCols);
    that.columnParameters = new Array(numCols);
    that.rowParameters = new Array(numRows);
    that.exploredColumn = new Array(numCols);
    that.exploredRow = new Array(numRows);
    that.payoffColumn = new Array(numCols);
    that.payoffRow = new Array(numRows);

    (function () {
        'use strict';
        for (let eachCol=0; eachCol<numCols; eachCol++) {
            that.exploredColumn[eachCol] = 0;
            that.payoffColumn[eachCol] = 0;
        }

        for (let eachRow=0; eachRow<numRows; eachRow++) {
            that.exploredRow[eachRow] = 0;
            that.payoffRow[eachRow] = 0;
        }
    })();

    (function () {
        'use strict';
        for (let eachRow=0; eachRow<numRows; eachRow++) {
            let newRow = new Array(numCols);
            for (let eachCol=0; eachCol<numCols; eachCol++) {
                newRow[eachCol] = 0;
            }
            that.tileGrid[eachRow] = newRow
        }
    })();

    (function() {
        'use strict';
        for (let eachCol = 0; eachCol < numCols; eachCol++) {
            that.columnParameters[eachCol] = round(jStat.beta.sample(alpha1, beta1), 2);
        }

        for (let eachRow = 0; eachRow < numRows; eachRow++) {
            that.rowParameters[eachRow] = round(jStat.beta.sample(alpha2, beta2), 2);
        }
    })();
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
    let alpha1 = curMapConst.alpha1;
    let beta1 = curMapConst.beta1;
    let alpha2 = curMapConst.alpha2;
    let beta2 = curMapConst.beta2;

    //Maarten: add sum of alpha and beta parameters to explored count
    let infoCol = curMapVar.exploredColumn[TileCol]+alpha1+beta1;
    let infoRow = curMapVar.exploredRow[TileRow]+alpha2+beta2;

    let infoLevelCol = getInfoLevel(infoCol, (alpha1+beta1));
    let infoLevelRow = getInfoLevel(infoRow, (alpha2+beta2));

    let qualityColRow = getQuality(TileCol, TileRow);

    return [infoLevelCol, infoLevelRow, qualityColRow[0], qualityColRow[1]];
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


function getQualityLevel(fraction){

    if (fraction < curMapConst.minQuality1) {
        return 0;
    }
    else if (fraction < curMapConst.minQuality2) {
        return 1;
    }
    else if (fraction < curMapConst.minQuality3) {
        return 2;
    }
    else if (fraction < curMapConst.minQuality4) {
        return 3;
    }
    else  {
        return 4;
    }
}


function getQuality(whichCol, whichRow){
    "use strict";
    let alpha1 = curMapConst.alpha1;
    let beta1 = curMapConst.beta1;
    let alpha2 = curMapConst.alpha2;
    let beta2 = curMapConst.beta2;

    let alphaP = Math.sqrt((alpha1 / (alpha1 + beta1)) * (alpha2 / (alpha2 + beta2)));
    let betaP = 1 - alphaP;

    // Bayesian estimation that assumes average values for the corresponding row/ col parameter in the grid.
    //let qualCol = ((alpha1+curMapVar.payoffColumn[whichCol])/(alpha1+beta1+curMapVar.exploredColumn[whichCol])) / (alpha2/(alpha2+beta2));
    //let qualRow = ((alpha2+curMapVar.payoffRow[whichRow])/(alpha2+beta2+curMapVar.exploredRow[whichRow])) / (alpha1/(alpha1+beta1));

    let qualCol = ((alphaP+curMapVar.payoffColumn[whichCol])/(alphaP+betaP+curMapVar.exploredColumn[whichCol])) / (alphaP/(alphaP+betaP));
    let qualRow = ((alphaP+curMapVar.payoffRow[whichRow])/(alphaP+betaP+curMapVar.exploredRow[whichRow])) / (alphaP/(alphaP+betaP));

    let qualLevelCol = getQualityLevel(qualCol);
    let qualLevelRow = getQualityLevel(qualRow);

    return [qualLevelCol, qualLevelRow]
}

// universal class for drawing (static) tiles from a tile-sheet
function TileSheetClass(image, sheetWidth, sheetHeight, rows, cols, offsetX, offsetY, drawWidth, drawHeight) {
    'use strict';
    this.SheetWidth = sheetWidth;
    this.SheetHeight = sheetHeight;
    this.SheetRows = rows;
    this.SheetCols = cols;

    let imageWidth = this.SheetWidth/this.SheetCols;
    let imageHeight = this.SheetHeight/this.SheetRows;

    // centers relatively smaller pictures, e.g. plants or rocks, on relatively larger tiles
    this.offSetX = offsetX;
    this.offSetY = offsetY;

    this.draw = function(x, y, whichCol, whichRow) {

        let sheetCol = imageHeight * whichCol;
        let sheetRow = imageWidth * whichRow;

        canvas.gameContext.drawImage(image, sheetCol, sheetRow, imageWidth, imageHeight, x+this.offSetX, y+this.offSetY,
            drawWidth, drawHeight);
    };
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

// this definition requires that the appropriately sized tile-sheet is delivered
curMapConst.soilSheet = new TileSheetClass(assets.soilSheetPic, 5*TILE_W, 5*TILE_H, 5, 5, 0, 0, TILE_W, TILE_H);
curMapConst.plantSheet = new TileSheetClass(assets.plantSheetPic, 5*PLANT_W, 5*PLANT_H, 5, 5, ((TILE_W-PLANT_W)/2), ((TILE_H-PLANT_H)/2), PLANT_W, PLANT_H);

//******************************** DRAWING TILES WITHIN VISIBLE AREA DEPENDING ON COND & GAME STATUS *******************

function drawVisibleTiles() {
    'use strict';
    // what are the top-left most row and col visible on canvas?
    let cameraTopMostRow = Math.floor(camera.panY / TILE_H);
    let cameraLeftMostCol = Math.floor(camera.panX / TILE_W);
    // how many rows and columns of tiles fit on the canvas?
    let colsThatFitOnScreen = Math.floor(CANVAS_W / TILE_W);
    let rowsThatFitOnScreen = Math.floor(CANVAS_H / TILE_H);

    // finding the rightmost and bottommost tiles to draw + 1 on the side
    let cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
    let cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;

    for(let eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
        for(let eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

            let drawX = eachCol * TILE_W;
            let drawY = eachRow * TILE_H;

			if (isTileAtCoord(eachRow, eachCol)) {

                let tilePos = curMapVar.tileGrid[eachRow][eachCol];

                // Col/ Row is correct with respect to parameters and X/ Y; Row/ Col necessary due to JS Rows[Cols]
                let type = getType(eachCol, eachRow);

                let soilParameter = type[2];
                let plantParameter = type[3];
                let soilInfo = type[0];
                let plantInfo = type[1];

                // condition 2 & 4 invert the mapping of soil/ plant to row/ col (was col/ row in condition 1 & 2)
                if (condition === 2 || condition === 4) {
                    soilInfo = type[1];
                    plantInfo = type[0];
                    soilParameter = type[3];
                    plantParameter = type[2];
                }

                switch(tilePos) {
                    case 0: // standard tile that has not been explored/ exploited
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, plantInfo, plantParameter);
                        break;
                    case 1: // explored tile (i.e. no potato)
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 0);
                        break;
                    case 3: // exploited tile (i.e. potato found)
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 5: // water tile
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                        break;
                    case 6: // water tile with red X
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 1);
                        break;
                    case 7: // rock type 1 on top of normal soil
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 2);
                        break;
                    case 8: // rock type 2 on top of normal soil
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 3);
                        break;
                    case 9: // rock type 2 on top of normal soil
                        curMapConst.soilSheet.draw(drawX, drawY, soilInfo, soilParameter);
                        curMapConst.plantSheet.draw(drawX, drawY, 3, 4);
                        break;
                    default: // water tile
                        curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
                        break;
                }
            }
            else { // water tile
                curMapConst.soilSheet.draw(drawX, drawY, 3, 2);
            }
        }
    }
}

//******************************** END OF WORLD CREATION & RENDERING ***************************************************