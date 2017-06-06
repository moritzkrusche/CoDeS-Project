

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var tileTypes = ['A', 'B', 'C', 'D', "E", "0", "X"];


function unshiftArray (array, item) {
    var len=array.length;
    while (len) { array[len] = array[len-1]; len--}
    array[0] = item;
}



function setToDefault(level) {
    for(var i = 0; i < level.length; i++) {
        for(var j = 0; j < level[i].length; j++) {
            level[i][j][0] = getRandomIntInclusive(0, 4);
            level[i][j][1] = getRandomIntInclusive(0, 4);
            level[i][j][2] = 3;
            level[i][j][3] = 3;
            // level[i][j].push(1)

        }
    }

}


function createColumn() {
	var column = [];

    column[column.length] = getRandomIntInclusive(0, 4);
    column[column.length] = getRandomIntInclusive(0, 4);
    // column.push(getRandomIntInclusive(0, 4));
    // column.push(getRandomIntInclusive(0, 4));
    column.push(3, 3, 0);
    //column.push(3);
	return column

}

function createRow(rowLength) {

	row = [];
    for(var i = 0; i < rowLength; i++) {
    	column = createColumn();
		// row.push(column);
        row[row.length] = column;
    }
    return row

}



columnParameters = [];
rowParameters = [];

plantColumn = [];
soilRow = [];




function instantCamFollow() {
	camPanX = trackerX - canvas.width/2 + shiftedLeft;
	camPanY = trackerY - canvas.height/2 + shiftedUp;
    var numRows = tileGrid.length;
    var numCols = tileGrid[0].length;
    var newRow = tileGrid[0].slice();
    var newCol = tileGrid[0][0].slice();

    var newColumnParameter = jStat.beta.sample(1,2);
    var newRowParameter = jStat.beta.sample(2,1);
    var newSoilSeed = Math.floor(newRowParameter * 5);
    var newPlantSeed = Math.floor(newColumnParameter * 5);

    if(camPanX <= TILE_W) {
        shiftedLeft += TILE_W;
        // console.log("ADD LEFT");
        for (var eachRow=0; eachRow < numRows; eachRow++) {
            if (tileGrid[eachRow] !== undefined) {
                // tileGrid[eachRow].unshift(createColumn());
                unshiftArray(tileGrid[eachRow], createColumn());
            }
        }
        unshiftArray(columnParameters, newColumnParameter);
        unshiftArray(plantColumn, newPlantSeed);
    }
    if(camPanY <= TILE_H) {
        shiftedUp += TILE_H;
        // console.log("ADD TOP");
        //tileGrid.unshift(createRow(numCols));
        unshiftArray(tileGrid, createRow(numCols));
        unshiftArray(rowParameters, newRowParameter);
        unshiftArray(soilRow, newSoilSeed);
    }
    var maxPanRight = numCols * TILE_W - canvas.width;
    // console.log("MAX PAN RIGHT : ", maxPanRight);

    var maxPanTop = numRows * TILE_H - canvas.height;
    // console.log("MAX PAN TOP : ", maxPanTop);

    if(camPanX >= maxPanRight) {
    	// console.log("ADD RIGHT");
		for (var eachRow=0; eachRow < numRows; eachRow++) {
    		if (tileGrid[eachRow] !== undefined) {
                tileGrid[eachRow].push(createColumn());
                // tileGrid[eachRow][tileGrid[eachRow].length] = createColumn();
            }
		}
        columnParameters.push(newColumnParameter);
        plantColumn.push(newPlantSeed);
    }
    if(camPanY >= maxPanTop) {
        // console.log("ADD BOTTOM");
        // tileGrid.push(createRow(numCols));
        tileGrid[tileGrid.length] = createRow(numCols);
        rowParameters.push(newRowParameter);
        soilRow.push(newSoilSeed);
    }
}


