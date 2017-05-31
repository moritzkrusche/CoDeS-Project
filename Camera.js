

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var soilTypes = ['A', 'B', 'C', 'D', "E"];
var plantTypes = ['A', 'B', 'C', 'D', "E"];

function setToDefault(level) {
    for(var i = 0; i < level.length; i++) {
        for(var j = 0; j < level[i].length; j++) {
            level[i][j][0] = soilTypes[getRandomIntInclusive(0, 4)];
            level[i][j][1] = plantTypes[getRandomIntInclusive(0, 4)];
            level[i][j][2] = 3;
            level[i][j][3] = 3;
            // level[i][j].push(1)

        }
    }

}


function createColumn() {
	var column = [];

    column.push(soilTypes[getRandomIntInclusive(0, 4)]);
    column.push(plantTypes[getRandomIntInclusive(0, 4)]);
    column.push(3, 3, 1);
    //column.push(3);
	return column

}

function createRow(rowLength) {

	row = [];

    for(var i = 0; i < rowLength; i++) {
    	column = createColumn();
		row.push(column);
    }
    return row

}

function instantCamFollow() {
	camPanX = trackerX - canvas.width/4 + shiftedLeft;
	camPanY = trackerY - canvas.height/4 + shiftedUp;
    var numRows = tileGrid.length;
    var numCols = tileGrid[0].length;
    var newRow = tileGrid[0].slice();
    var newCol = tileGrid[0][0].slice();

    if(camPanX < TILE_W) {
        shiftedLeft += TILE_W;
        // console.log("ADD LEFT");
        for (var eachRow=0; eachRow < numRows; eachRow++) {
            if (tileGrid[eachRow] != undefined) {
                tileGrid[eachRow].unshift(createColumn());
                //tileGrid[eachRow] = tileGrid[eachRow].slice()
                // console.log("EACHROW: ", eachRow)
            }
        }
    }
    if(camPanY < TILE_H) {
        shiftedUp += TILE_H;
        // console.log("ADD TOP");
        tileGrid.unshift(createRow(numCols));
        // tileGrid[0] = tileGrid[0].slice()
    }
    var maxPanRight = numCols * TILE_W - canvas.width;
    // console.log("MAX PAN RIGHT : ", maxPanRight);

    var maxPanTop = numRows * TILE_H - canvas.height;
    // console.log("MAX PAN TOP : ", maxPanTop);

    if(camPanX > maxPanRight) {
    	// console.log("ADD RIGHT");
		for (var eachRow=0; eachRow < numRows; eachRow++) {
    		if (tileGrid[eachRow] != undefined) {
                tileGrid[eachRow].push(createColumn());
                // tileGrid[eachRow] = tileGrid[eachRow].slice()
                // console.log("EACHROW: ", eachRow)
            }
		}
    }
    if(camPanY > maxPanTop) {
        // console.log("ADD BOTTOM");
        tileGrid.push(createRow(numCols));
        // tileGrid[tileGrid.length-1] = tileGrid[tileGrid.length-1].slice()
    }
}


