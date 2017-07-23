

//******************************** INSTRUCTIONS PAGE *******************************************************************

var htmlPage = {
    demoForm: document.getElementById('demographics'),
    demoBox: document.getElementById('demoBox'),
    gameBox: document.getElementById('gameBox'),
    fullBox: document.getElementById('fullGameBox'),
    debriefForm: document.getElementById('debriefing'),
    debriefBox: document.getElementById('debriefBox'),
    nextButton: document.getElementById('nextButton'),
    backButton: document.getElementById('backButton'),
    startButton: document.getElementById('startButton'),
    prolificButton: document.getElementById('goProlific')
};

var rainEffects = {
    normal: new rainAnimationClass(1),
    strong: new rainAnimationClass(5),
    strongest: new rainAnimationClass(15)
};

//******************************** SHOWS TWO SIZES OF POP-UP SCREENS FOR INSTRUCTIONS **********************************

var boxScreen = new function() {
    "use strict";

    this.wrapText = function(text, x, y, maxWidth, lineHeight, font, color) {

        font = font || '18pt "Helvetica Neue';
        color = color || '#DAA520';
        canvas.boxContext.font = font;
        canvas.boxContext.fillStyle = color;
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = canvas.boxContext.measureText(testLine);
            var testWidth = Math.floor(metrics.width);
            if (testWidth > maxWidth && n > 0) {
                canvas.boxContext.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        canvas.boxContext.fillText(line, x, y);
    };
    this.hideAll = function(){

        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        canvas.infoContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        htmlPage.gameBox.style.display = 'none';
        htmlPage.fullBox.style.display = 'none';
        htmlPage.nextButton.style.display = 'none';
        htmlPage.backButton.style.display = 'none';
    };
    this.showText = function(words){
        "use strict";
        canvas.boxContext.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
        this.wrapText(words, 80, 540, 540, 30);
    };
};


function showDebriefPage(){
    "use strict";
    htmlPage.debriefBox.style.display = 'block';
    htmlPage.prolificButton.style.display = 'block';
    canvas.boxContext.font = '24pt "Helvetica Neue"';
    canvasText(canvas.boxContext, 'Debriefing',30 , 50, '#DAA520');

    var payTotal = round(curMapVar.payoffCount, 2);
    var bonus = round((payTotal - 2),2);
    if (bonus <= 0) {
        payTotal = 2;
        bonus = 0;
    }
    var timeTotal = round((loggedData.endDateTime[2] - loggedData.startDateTime[2])/60, 2);
    var textPay = 'Congratulations, you have reached the end of this experiment. You have earned £' + payTotal +
        ' in ' + timeTotal + ' minutes.';
    var textProcedure = 'You will be paid the minimum amount of £2 for completing the study plus your bonus of £' +
        bonus + ' within one week.';
    var textDone = 'IMPORTANT: click on the button below to prove that you have completed the study. This will ' +
        'open a new tab.';

    boxScreen.wrapText(textPay, 30, 120, 640, 30);
    boxScreen.wrapText(textProcedure, 30, 220, 640, 30);
    boxScreen.wrapText(textDone, 30, 320, 640, 30);
}


function stopBackgroundSound(){
    "use strict";
    if (!isMobile){
        if (assets.backgroundSound.playing(curMapVar.backgroundId)){
            assets.backgroundSound.stop(curMapVar.backgroundId)
        }
    }
}

//******************************** INITIAL INSTRUCTIONS AT START *******************************************************

var instructions = new function() {
    "use strict";

    this.index = 0;
    this.maxIndex = 25;

    this.show = function(){

        var index = this.index;
        var maxLevel = experiment.maxOpenLevels+1;
        switch (index) {

            case 0:
                // text intro etc.
                exampleScreen.clear();
                boxScreen.showText('In this task, you will play a web game where you control a farmer ' +
                    'harvesting potatoes on a large field. Your goal is to collect as many potatoes as possible.');
                // show/ hide some buttons & boxes
                htmlPage.nextButton.style.display = 'block';
                htmlPage.backButton.style.display = 'none';
                htmlPage.gameBox.style.display = 'block';
                htmlPage.fullBox.style.display = 'none';
                break;

            case 1:
                // text intro etc. contd
                exampleScreen.clear();
                boxScreen.showText('Every potato that you collect is worth real money. Please pay careful attention ' +
                    'to the following information, so that you can harvest as many potatoes as possible.');
                // show back button as now one step to go back to
                htmlPage.backButton.style.display = 'block';
                break;

            case 2:
                // moving using arrow keys or buttons
                exampleScreen.highlightFarmerMoves();
                if (!isMobile){
                    boxScreen.showText("Once the game starts, you will be able to control your farmer with the " +
                        "arrow keys on your keyboard.");
                } else {
                    boxScreen.showText("Once the game starts, you will be able to control your farmer with the " +
                        "touch buttons that will display below the screen.");
                }
                break;

            case 3:
                exampleScreen.highlightFarmer();
                boxScreen.showText("There are 7 x 7 potato plots (tiles) visible on the screen at any time. " +
                    "Every plot may or may not yield a potato when you visit it.");
                break;

            case 4:
                exampleScreen.highlightTile();
                boxScreen.showText("You do not know for sure on which plots will deliver a potato, but you can use a " +
                    "number of cues to find out.");
                break;

            case 5:
                exampleScreen.highlightCenterCol();
                // condition 1 & 3 soil in col, plant row
                if (condition === 1 || condition === 3){
                    boxScreen.showText("Every column in the field has been treated with a different soil fertilizer. " +
                        "The better the soil fertilizer for a column, the richer the soil will be " +
                        "in that column.");
                } else {
                    boxScreen.showText("Every column in the field has been treated with a different plant " +
                        "fertilizer. The better the plant fertilizer for a column, the better the plants will grow " +
                        "in that column.");
                }
                break;

            case 6:
                exampleScreen.highlightCenterRow();
                // condition 1 & 3 soil in col, plant row
                if (condition === 1 || condition === 3){
                    boxScreen.showText("Every row in the field has been treated with a different plant fertilizer. " +
                        "The better the plant fertilizer for a row, the better the plants will grow " +
                        "in that row.");
                } else {
                    boxScreen.showText("Every row in the field has been treated with a different soil fertilizer. " +
                        "The better the soil fertilizer for a row, the richer the soil will be " +
                        "in that row.");
                }
                htmlPage.fullBox.style.display = 'none';
                break;

            case 7:
                // show soil quality
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText('There are 5 different qualities of soil fertilizer used. Darker soil will ' +
                    'always be richer than lighter soil.');
                exampleScreen.clear();
                showExampleTiles('soil');
                break;

            case 8:
                // show plant quality
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText('There are also 5 different qualities of plant fertilizer used. Larger plants ' +
                    'will always be of higher quality than smaller plants.');
                exampleScreen.clear();
                showExampleTiles('plant');
                break;

            case 9:
                // text
                htmlPage.fullBox.style.display = 'none';
                boxScreen.showText('Your chance of collecting a potato in a plot depends on BOTH the plant and ' +
                    'soil quality.');
                break;

            case 10:
                // text
                exampleScreen.clear();
                boxScreen.showText("As you can see, most of the plots around you are greyed out, because you have " +
                    "not explored the area yet.");
                break;

            case 11:
                // text
                exampleScreen.highlightCenterCol();
                if (condition === 1 || condition === 3){
                    boxScreen.showText("Every time that you move within a given column, you obtain more information " +
                        "about the soil quality in that column.");
                } else {
                    boxScreen.showText("Every time that you move within a given column, you obtain more information " +
                        "about the plant quality in that column.");
                }
                break;

            case 12:
                // text
                exampleScreen.highlightCenterRow();
                htmlPage.fullBox.style.display = 'none';
                if (condition === 1 || condition === 3){
                    boxScreen.showText("And every time that you move within a given row, you obtain more information " +
                        "about the plant quality in that row.");
                } else {
                    boxScreen.showText("And every time that you move within a given row, you obtain more information " +
                        "about the soil quality in that row.");
                }
                break;

            case 13:
                // show soil quality + info
                exampleScreen.clear();
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText("There are 3 information levels, which are indicated by different levels of " +
                    "colour saturation. This is how they look for soil.");
                showExampleTiles('soilInfo');
                break;

            case 14:
                // show plant quality + info
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText("And this is how they look for plants. The higher the information level, the more " +
                    "accurate the displayed indication of the quality of plants and soil.");
                showExampleTiles('plantInfo');
                break;

            case 15:
                // text
                htmlPage.fullBox.style.display = 'none';
                boxScreen.showText("Note: the quality of the soil and plants shown on the map does NOT reveal the " +
                    "true value of the respective row or column.");
                break;

            case 16:
                // text
                boxScreen.showText("Instead, it is based on your previous success in that row or column as well as " +
                    "the average expected quality of any row or column.");
                break;

            case 17:
                // text
                exampleScreen.clear();
                boxScreen.showText("It is possible that plant quality is a better predictor of whether you will " +
                    "collect a potato than soil quality, or that soil quality is a better predictor than plant " +
                    "quality. You will have to find out.");
                break;

            case 18:
                // show moves left
                exampleScreen.highlightMovesLeft();
                boxScreen.showText("Every time you move, you lose one movement point. You can always see how many " +
                    "you have left here.");
                break;

            case 19:
                // show potato count
                exampleScreen.highlightPotatoCount();
                boxScreen.showText("You can see how many potatoes you have found so far during the current level " +
                    "here.");
                break;

            case 20:
                // show potato price
                exampleScreen.highlightPotatoPrice();
                boxScreen.showText("However, the value you get for collecting a potato also decreases with every " +
                    "move that you make.");
                break;

            case 21:
                // show potato price
                exampleScreen.highlightPotatoPrice();
                boxScreen.showText("In other words: potatoes found at the beginning of a level are worth more than " +
                    "potatoes found at the end.");
                break;

            case 22:
                // show payoff total
                exampleScreen.highlightPayoff();
                boxScreen.showText('Your total reward for all the potatoes you have earned is shown here. It will ' +
                    'increase with every potato you find, and be carried over to the next level.');
                break;

            case 23:
                // show payoff total
                exampleScreen.highlightPayoff();
                boxScreen.showText('At the end of the experiment, this is your compensation. If you perform well, it ' +
                    'will exceed the minimum amount of £2, and the difference will be paid as a bonus.');
                break;

            case 24:
                // show XY
                exampleScreen.highlightXY();
                boxScreen.showText("You can always see where you are in comparison with your starting " +
                    "point here. X for column, and Y for row positions. " +
                    "Moving up and right is coded as '+', down and left as '-'.");
                break;

            case 25:
                // level start text
                exampleScreen.clear();
                boxScreen.showText('This is large level 1 out of ' + maxLevel +
                    '. On every large level, you have ' + curMapVar.movesLeft + ' moves.');
                htmlPage.nextButton.style.display = 'none';
                htmlPage.startButton.style.display = 'block';
                break;

            default:
                // should never execute
                alert("ERROR: instructions() in instructions.js fell through cases!");
                break;
        }
    }
};

//******************************** INSTRUCTIONS AT FIRST TEST LEVEL ****************************************************

var testInstructions = new function () {
    "use strict";

    this.index = 0;
    this.maxIndex = 6;

    this.show = function() {

        stopBackgroundSound();
        var index = this.index;
        var maxLevel = experiment.maxTestLevels+1;

        switch (index) {

            case 0:
                htmlPage.nextButton.style.display = 'block';
                htmlPage.backButton.style.display = 'none';
                boxScreen.showText('Look, it starts to rain...');
                htmlPage.gameBox.style.display = 'block';
                rainEffects.normal.start();
                if (!isMobile) {
                    assets.normalRainSound.play();
                }else {
                    assets.spriteSound.stop();
                    assets.spriteSound.play('normalRain');
                }
                break;

            case 1:
                boxScreen.showText('The rain is getting too heavy... let\'s hope it stops soon!');
                rainEffects.normal.stop();
                rainEffects.strong.start();
                if (!isMobile){
                    assets.normalRainSound.stop();
                    assets.strongRainSound.play();
                }
                else {
                    assets.spriteSound.stop();
                    assets.spriteSound.play('strongRain');
                }
                break;

            case 2:
                boxScreen.showText('Oh dear! It looks like a monsoon! The field will not go undamaged!');
                rainEffects.strong.stop();
                rainEffects.strongest.start();
                if (!isMobile){
                    assets.strongRainSound.stop();
                    assets.strongestRainSound.play();
                }
                else {
                    assets.spriteSound.stop();
                    assets.spriteSound.play('strongestRain');
                }
                break;

            case 3:
                rainEffects.strongest.stop();
                if (!isMobile){
                    assets.strongestRainSound.stop();
                }
                else {
                    assets.spriteSound.stop();
                }
                loadLevel(testMaps[experiment.testLevelKeys[0]]); // load first test map

                htmlPage.fullBox.style.display = 'none';
                boxScreen.showText('Unfortunately, the heavy rain has soaked parts of the field with water and you ' +
                    'will not be able to move to the flooded plots. You will also not be able to move very far on ' +
                    'the other plots because of the muddy ground.');
                htmlPage.backButton.style.display = 'none';
                break;

            case 4:
                htmlPage.fullBox.style.display = 'none';
                boxScreen.showText('However the value of potatoes has also risen sharply, because there is now less ' +
                    'supply. You also know the potato field better than on the previous maps. ');
                htmlPage.backButton.style.display = 'block';
                break;

            case 5:
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText('As a reminder: dark soil and large plants are better. Note: you cannot move ' +
                    'to water tiles.');
                showExampleTiles('both');
                showExampleTiles('water');
                break;

            case 6:
                htmlPage.fullBox.style.display = 'none';
                boxScreen.showText('This is small level 1 out of ' + maxLevel + '. On every small level, ' +
                    'you have ' + curMapVar.movesLeft + ' moves, but potatoes are worth much more.');
                htmlPage.nextButton.style.display = 'none';
                htmlPage.startButton.style.display = 'block';
                break;

            default:
                // should never execute
                alert("ERROR: testInstructions() in instructions.js fell through cases!");
                break;
        }
    }
};

//******************************** INSTRUCTIONS NEXT OPEN LEVEL ********************************************************

var nextOpenLevel = new function () {
    this.index = 0;
    this.maxIndex = 1;

    this.show = function() {

        stopBackgroundSound();
        var index = this.index;
        var curLevel = experiment.currentOpenLevel+1;
        var maxLevel = experiment.maxOpenLevels+1;

        switch (index) {

            case 0:
                htmlPage.nextButton.style.display = 'block';
                htmlPage.backButton.style.display = 'none';
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText('Next level loaded. As a reminder: dark soil and large plants are better.');
                showExampleTiles('both');
                break;

            case 1:
                htmlPage.fullBox.style.display = 'none';
                htmlPage.gameBox.style.display = 'block';
                htmlPage.nextButton.style.display = 'none';
                htmlPage.startButton.style.display = 'block';
                boxScreen.showText('This is large level ' + curLevel + ' out of ' + maxLevel +
                    '. On every large level, you have '  + curMapVar.movesLeft + ' moves.');
                break;

            default:
                // should never execute
                alert("ERROR: nextOpenLevel() in instructions.js fell through cases!");
                break;
        }
    }
};

//******************************** INSTRUCTIONS NEXT TEST LEVEL ********************************************************

var nextTestLevel = new function () {
    this.index = 0;
    this.maxIndex = 1;

    this.show = function() {

        stopBackgroundSound();
        var index = this.index;
        var curLevel = experiment.currentTestLevel+1;
        var maxLevel = experiment.maxTestLevels+1;
        switch (index) {

            case 0:
                htmlPage.nextButton.style.display = 'block';
                htmlPage.backButton.style.display = 'none';
                htmlPage.fullBox.style.display = 'block';
                boxScreen.showText('Next level loaded. As a reminder: dark soil and large plants are better. ' +
                    'Note: you cannot move to flooded plots.');
                showExampleTiles('both');
                showExampleTiles('water');
                break;

            case 1:
                htmlPage.fullBox.style.display = 'none';
                htmlPage.gameBox.style.display = 'block';
                htmlPage.nextButton.style.display = 'none';
                htmlPage.startButton.style.display = 'block';
                boxScreen.showText('This is small level ' + curLevel + ' out of ' + maxLevel +
                    '. On every small level, you have ' + curMapVar.movesLeft + ' moves, but potatoes are ' +
                    'worth much more.');
                break;

            default:
                // should never execute
                alert("ERROR: nextTestLevel() in instructions.js fell through cases!");
                break;
        }
    }
};

//******************************** SHOWING INFO AND QUALITY FOR EXAMPLE TILE ROWS AND COLS *****************************

function showExampleTiles(whichTiles){
    "use strict";

    var redWidth = TILE_W*0.8;
    var redHeight = TILE_H*0.8;
    var redColHeight = TILE_H*0.8*5;

    var ctx = canvas.boxContext;
    ctx.font = '18pt "Helvetica Neue"';

    switch (whichTiles){
        case 'soil':
            ctx.drawImage(assets.soilSheetPic, 0, 0, TILE_W, TILE_H*5, 270, 110, redWidth, redColHeight);
            drawArrow(ctx, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 5);
            drawArrow(ctx, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 5);
            canvasText(ctx, 'worst soil type', 440,155, '#DAA520');
            canvasText(ctx, 'best soil type', 440,475, '#DAA520');
            break;

        case 'plant':
            ctx.drawImage(assets.plantSheetPic, 0, 0, PLANT_W, PLANT_H*5, 270, 110, redWidth, redColHeight);
            drawArrow(ctx, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 5);
            drawArrow(ctx, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 5);
            canvasText(ctx, 'worst plant type', 440,155, '#DAA520');
            canvasText(ctx, 'best plant type', 440,475, '#DAA520');
            break;

        case 'soilInfo': // show example soil tiles info level 1 - 3
            ctx.drawImage(assets.soilSheetPic, 0, 0, TILE_W, TILE_H*5, 270, 110, redWidth, redColHeight);
            ctx.drawImage(assets.soilSheetPic, TILE_W, 0, TILE_W, TILE_H*5, 160, 110, redWidth, redColHeight);
            ctx.drawImage(assets.soilSheetPic, TILE_W*2, 0, TILE_W, TILE_H*5, 50, 110, redWidth, redColHeight);
            drawArrow(ctx, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 5);
            drawArrow(ctx, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 5);
            canvasText(ctx, 'worst soil type', 440,155, '#DAA520');
            canvasText(ctx, 'best soil type', 440,475, '#DAA520');

            drawArrow(ctx, 130, 260, 420, 260, 1, 2, 20, 8, 'red', 2);
            drawArrow(ctx, 240, 310, 420, 310, 1, 2, 20, 8, 'red', 2);
            drawArrow(ctx, 350, 360, 420, 360, 1, 2, 20, 8, 'red', 2);
            canvasText(ctx, 'not explored', 440,265, '#DAA520');
            canvasText(ctx, 'briefly explored', 440,315, '#DAA520');
            canvasText(ctx, 'well explored', 440,365, '#DAA520');
            break;

        case 'plantInfo': // show example plant tiles info level 1 - 3
            ctx.drawImage(assets.plantSheetPic, 0, 0, PLANT_W, PLANT_H*5, 270, 110, redWidth, redColHeight);
            ctx.drawImage(assets.plantSheetPic, PLANT_W, 0, PLANT_W, PLANT_H*5, 160, 110, redWidth, redColHeight);
            ctx.drawImage(assets.plantSheetPic, PLANT_W*2, 0, PLANT_W, PLANT_H*5, 50, 110, redWidth, redColHeight);

            drawArrow(ctx, 360, 150, 420, 150, 1, 2, 20, 10, 'red', 5);
            drawArrow(ctx, 360, 470, 420, 470, 1, 2, 20, 10, 'red', 5);
            canvasText(ctx, 'worst plant type', 440,155, '#DAA520');
            canvasText(ctx, 'best plant type', 440,475, '#DAA520');

            drawArrow(ctx, 130, 260, 420, 260, 1, 2, 20, 8, 'red', 2);
            drawArrow(ctx, 240, 310, 420, 310, 1, 2, 20, 8, 'red', 2);
            drawArrow(ctx, 350, 360, 420, 360, 1, 2, 20, 8, 'red', 2);
            canvasText(ctx, 'not explored', 440,265, '#DAA520');
            canvasText(ctx, 'briefly explored', 440,315, '#DAA520');
            canvasText(ctx, 'well explored', 440,365, '#DAA520');
            break;

        case 'both': // show example plant & soil tiles info level 3
            ctx.drawImage(assets.plantSheetPic, 0, 0, PLANT_W, PLANT_H*5, 160, 110, redWidth, redColHeight);
            ctx.drawImage(assets.soilSheetPic, 0, 0, TILE_W, TILE_H*5, 270, 110, redWidth, redColHeight);

            drawArrow(ctx, 360, 150, 410, 150, 1, 2, 20, 10, 'red', 5);
            drawArrow(ctx, 360, 470, 410, 470, 1, 2, 20, 10, 'red', 5);
            canvasText(ctx, 'worst plant/ soil type', 425,155, '#DAA520');
            canvasText(ctx, 'best plant/ soil type', 425,475, '#DAA520');
            break;

        case 'water': // example water tile
            ctx.drawImage(assets.soilSheetPic, TILE_W*3, TILE_H*2, TILE_W, TILE_H, 380, 270, redWidth, redHeight);
            drawArrow(ctx, 470, 310, 530, 310, 1, 2, 20, 10, 'red', 5);
            //ctx.font = '18pt "Helvetica Neue"';
            canvasText(ctx, 'inaccessible', 500,345, '#DAA520');
            break;

        default:
            // should never execute
            alert("ERROR: showExampleTiles() in instructions.js fell through cases!");
            break;
    }
}

//******************************** HIGHLIGHTING UI AREAS WITH BOXES AND ARROWS *****************************************

var exampleScreen = new function(){
    "use strict";
    var ctx = canvas.infoContext;

    this.clear = function(){
        ctx.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight);
    };
    this.highlightFarmer = function(){
        // farmer character on tile
        this.clear();
        canvasFrame(ctx, 300,350, 100, 100, 5, 'red');
    };
    this.highlightFarmerMoves = function(){
        // Show arrows for all directions (left, right, top, down) that farmer can walk
        this.clear();
        drawArrow(ctx, 270, 400, 300, 400, 1, 2, 20, 10, 'red', 10);
        drawArrow(ctx, 430, 400, 400, 400, 1, 2, 20, 10, 'red', 10);
        drawArrow(ctx, 350, 320, 350, 350, 1, 2, 20, 10, 'red', 10);
        drawArrow(ctx, 350, 480, 350, 450, 1, 2, 20, 10, 'red', 10);
    };
    this.highlightTile = function(){
        // example tile
        this.clear();
        canvasFrame(ctx, 100,350, 100, 100, 5, 'red');
    };
    this.highlightCenterCol = function(){
        // example column
        this.clear();
        canvasFrame(ctx, 300,100, 100, 650, 5, 'red');
    };
    this.highlightCenterRow = function(){
        // example row
        this.clear();
        canvasFrame(ctx, 0,350, 700, 100, 5, 'red');
    };
    this.highlightXY = function(){
        // XY coordinates
        this.clear();
        canvasFrame(ctx, 10,0, 180, 50, 5, 'red');
        drawArrow(ctx, 100, 60, 100, 140, 1, 2, 20, 10, 'red', 5);
    };
    this.highlightMovesLeft = function(){
        // moves left
        this.clear();
        canvasFrame(ctx, 200,0, 170, 50, 5, 'red');
        drawArrow(ctx, 250, 60, 250, 140, 1, 2, 20, 10, 'red', 5);
    };
    this.highlightPotatoPrice = function(){
        // potato price
        this.clear();
        canvasFrame(ctx, 390,0, 195, 50, 5, 'red');
        drawArrow(ctx, 520, 60, 520, 140, 1, 2, 20, 10, 'red', 5);
    };
    this.highlightPotatoCount = function(){
        // potato count
        this.clear();
        canvasFrame(ctx, 580,0, 100, 50, 5, 'red');
        drawArrow(ctx, 640, 60, 640, 140, 1, 2, 20, 10, 'red', 5);
    };
    this.highlightPayoff = function(){
        // payoff total
        this.clear();
        canvasFrame(ctx, 250,40, 170, 60, 5, 'red');
        drawArrow(ctx, 350, 110, 350, 190, 1, 2, 20, 10, 'red', 5);
    };
};

//******************************** END INSTRUCTIONS PAGE ***************************************************************