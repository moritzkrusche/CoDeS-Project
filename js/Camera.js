var camPanX = 0.0;
var camPanY = 0.0;
var shiftedLeft = 0;
var shiftedUp = 0;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function unshiftArray (array, item) {
    var len=array.length;
    while (len) { array[len] = array[len-1]; len--}
    array[0] = item;
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



function instantCamFollow() {
	camPanX = trackerX - CANVAS_W/2 + shiftedLeft;
	camPanY = trackerY - CANVAS_H/2 + shiftedUp;
    var numRows = tileGrid.length;
    var numCols = tileGrid[0].length;
    var newRow = tileGrid[0].slice();
    var newCol = tileGrid[0][0].slice();

    var newRowParameter = jStat.beta.sample(2,1);
    var newColumnParameter = jStat.beta.sample(1,2);
    var newPlantSeed = Math.floor(newRowParameter * 5);
    var newSoilSeed = Math.floor(newColumnParameter * 5);

    var maxPanRight = numCols * TILE_W - CANVAS_W;
    // console.log("MAX PAN RIGHT : ", maxPanRight);

    var maxPanTop = numRows * TILE_H - CANVAS_H;
    // console.log("MAX PAN TOP : ", maxPanTop);

    if(camPanX <= TILE_W) {
        shiftedLeft += TILE_W;
        console.log("ADD LEFT");
        for (var eachRow=0; eachRow < numRows; eachRow++) {
            if (tileGrid[eachRow] !== undefined) {
                // tileGrid[eachRow].unshift(createColumn());
                unshiftArray(tileGrid[eachRow], newCol);
            }
        }
        unshiftArray(columnParameters, newColumnParameter);
        unshiftArray(soilColumn, newSoilSeed);
    }
    else if(camPanY <= TILE_H) {
        shiftedUp += TILE_H;
        console.log("ADD TOP");
        //tileGrid.unshift(createRow(numCols));
        unshiftArray(tileGrid, newRow);
        unshiftArray(rowParameters, newRowParameter);
        unshiftArray(plantRow, newPlantSeed);
    }

    else if(camPanX >= maxPanRight) {
    	console.log("ADD RIGHT");
		for (var everyRow=0; everyRow < numRows; everyRow++) {
    		if (tileGrid[everyRow] !== undefined) {
                tileGrid[everyRow].push(newCol);
                // tileGrid[eachRow][tileGrid[eachRow].length] = createColumn();
            }
		}
        columnParameters.push(newColumnParameter);
        soilColumn.push(newSoilSeed);
    }
    else if(camPanY >= maxPanTop) {
        console.log("ADD BOTTOM");
        // tileGrid.push(createRow(numCols));
        tileGrid[tileGrid.length] = newRow;
        rowParameters.push(newRowParameter);
        plantRow.push(newPlantSeed);
    }
}


