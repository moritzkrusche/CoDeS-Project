
function gameCenteredBitmap(useBitmap, atX,atY, width, height) {
	canvas.gameContext.save();
	canvas.gameContext.translate(atX, atY);
	canvas.gameContext.drawImage(useBitmap, -width/2, -height/2, width, height);
	canvas.gameContext.restore();
}

function gameRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvas.gameContext.fillStyle = fillColor;
	canvas.gameContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function gameCircle(centerX,centerY, radius, fillColor) {
	canvas.gameContext.fillStyle = fillColor;
	canvas.gameContext.beginPath();
	canvas.gameContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvas.gameContext.fill();
}

function gameText(showWords, textX,textY, fillColor) {
	canvas.gameContext.fillStyle = fillColor;
	canvas.gameContext.fillText(showWords, textX, textY);
}

function infoText(showWords, textX,textY, fillColor) {
    canvas.infoContext.fillStyle = fillColor;
    canvas.infoContext.fillText(showWords, textX, textY);
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function elementMove() {
    var elem = document.getElementById('animate');
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos === 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

function intervalTimer(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === 'undefined' || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandomInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// From here: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}