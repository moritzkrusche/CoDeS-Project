
//******************************** GRAPHICS & COMMON HELPER FUNCTIONS **************************************************

function canvasCenteredBitmap(ctx, useBitmap, atX,atY, width, height) {
    ctx.save();
    ctx.translate(atX, atY);
    ctx.drawImage(useBitmap, -width/2, -height/2, width, height);
    ctx.restore();
}

function canvasRect(ctx, topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function canvasFrame(ctx, topLeftX,topLeftY, boxWidth,boxHeight, border, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
    ctx.clearRect(topLeftX+border,topLeftY+border, boxWidth-2*border,boxHeight-2*border);
}

function canvasText(ctx, showWords, textX,textY, color) {
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
}

function getDateTime(){
    "use strict";
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var secondsTimer = round(today.getTime()/ 1000, 2);
    return [date, time, secondsTimer];
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
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

// adapted from https://codepen.io/ruigewaard/pen/JHDdF by Max Ruigewaard
var rainAnimationClass = function(intensity) {

    var ctx = canvas.effectContext;
    var w = canvas.effect.width;
    var h = canvas.effect.height;
    ctx.strokeStyle = 'rgba(174,194,224,0.8)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    var init = [];
    var maxParts = 1000*intensity;
    for(var a = 0; a < maxParts; a++) {
        init.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1.2,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
        })
    }

    var particles = [];
    for(var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for(var c = 0; c < particles.length; c++) {
            var p = particles[c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
        }
        move();
    }

    function move() {
        for(var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if(p.x > w || p.y > h) {
                p.x = Math.random() * w;
                p.y = -10;
            }
        }
    }

    var that = this;
    that.rainId = NaN;

    this.start = function(){
        "use strict";
        that.rainId = setInterval(draw, 30);
    };

    this.stop = function(){
        "use strict";
        clearInterval(that.rainId);
        ctx.clearRect(0,0, CANVAS_W,CANVAS_H+uiHeight)
    };
};

// From: http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html
// Draw arrow head
function drawHead (ctx, x0, y0, x1, y1, x2, y2, style, color, width) {
    if (typeof(x0) === 'string') {
        x0 = parseInt(x0);
    }
    if (typeof(y0) === 'string') {
        y0 = parseInt(y0);
    }
    if (typeof(x1) === 'string') {
        x1 = parseInt(x1);
    }
    if (typeof(y1) === 'string') {
        y1 = parseInt(y1);
    }
    if (typeof(x2) === 'string') {
        x2 = parseInt(x2);
    }
    if (typeof(y2) === 'string') {
        y2 = parseInt(y2);
    }

    var backDist;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);

    switch (style) {
        case 0:
            backDist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
            ctx.arcTo(x1, y1, x0, y0, .55 * backDist);
            ctx.fill();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x0, y0);
            ctx.fill();
            break;
        case 2:
            ctx.stroke();
            break;
        case 3:
            var cpx = (x0 + x1 + x2) / 3;
            var cpy = (y0 + y1 + y2) / 3;
            ctx.quadraticCurveTo(cpx, cpy, x0, y0);
            ctx.fill();
            break;
        case 4:
            var cp1x, cp1y, cp2x, cp2y;
            var shiftAmt = 5;
            if (x2 === x0) {
                backDist = y2 - y0;
                cp1x = (x1 + x0) / 2;
                cp2x = (x1 + x0) / 2;
                cp1y = y1 + backDist / shiftAmt;
                cp2y = y1 - backDist / shiftAmt;
            } else {
                backDist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
                var xback = (x0 + x2) / 2;
                var yback = (y0 + y2) / 2;
                var xmid = (xback + x1) / 2;
                var ymid = (yback + y1) / 2;
                var m = (y2 - y0) / (x2 - x0);
                var dx = (backDist / (2 * Math.sqrt(m * m + 1))) / shiftAmt;
                var dy = m * dx;
                cp1x = xmid - dx;
                cp1y = ymid - dy;
                cp2x = xmid + dx;
                cp2y = ymid + dy;
            }
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x0, y0);
            ctx.fill();
            break;
    }
    ctx.restore();
}

// draw arrow
function drawArrow(ctx, x1, y1, x2, y2, style, which, angle, d, color, width) {
    if (typeof(x1) === 'string') {
        x1 = parseInt(x1);
    }
    if (typeof(y1) === 'string') {
        y1 = parseInt(y1);
    }
    if (typeof(x2) === 'string') {
        x2 = parseInt(x2);
    }
    if (typeof(y2) === 'string') {
        y2 = parseInt(y2);
    }
    style = typeof(style) !== 'undefined' ? style : 3;
    which = typeof(which) !== 'undefined' ? which : 1;
    angle = typeof(angle) !== 'undefined' ? angle : Math.PI / 9;
    d = typeof(d) !== 'undefined' ? d : 10;
    color = typeof(color) !== 'undefined' ? color : '#000';
    width = typeof(width) !== 'undefined' ? width : 1;
    var toDrawHead = typeof(style) !== 'function' ? drawHead : style;
    var dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    var ratio = (dist - d / 3) / dist;
    var toX, toY, fromX, fromY;
    if (which === 1) {
        toX = Math.round(x1 + (x2 - x1) * ratio);
        toY = Math.round(y1 + (y2 - y1) * ratio);
    } else {
        toX = x2;
        toY = y2;
    }

    if (which === 2) {
        fromX = x1 + (x2 - x1) * (1 - ratio);
        fromY = y1 + (y2 - y1) * (1 - ratio);
    } else {
        fromX = x1;
        fromY = y1;
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    var angle1, topX, topY, angle2, botX, botY;

    var lineAngle = Math.atan2(y2 - y1, x2 - x1);
    var h = Math.abs(d / Math.cos(angle));
    if (which === 1) {
        angle1 = lineAngle + Math.PI + angle;
        topX = x2 + Math.cos(angle1) * h;
        topY = y2 + Math.sin(angle1) * h;
        angle2 = lineAngle + Math.PI - angle;
        botX = x2 + Math.cos(angle2) * h;
        botY = y2 + Math.sin(angle2) * h;
        toDrawHead(ctx, topX, topY, x2, y2, botX, botY, style, color, width);
    }

    if (which === 2) {
        angle1 = lineAngle + angle;
        topX = x1 + Math.cos(angle1) * h;
        topY = y1 + Math.sin(angle1) * h;
        angle2 = lineAngle - angle;
        botX = x1 + Math.cos(angle2) * h;
        botY = y1 + Math.sin(angle2) * h;
        toDrawHead(ctx, topX, topY, x1, y1, botX, botY, style, color, width);
    }
}

// draw arced arrow
function drawArcedArrow(ctx, x, y, r, startAngle, endAngle, anticlockwise, style, which, angle, d, color, width) {
    style = typeof(style) !== 'undefined' ? style : 3;
    which = typeof(which) !== 'undefined' ? which : 1;
    angle = typeof(angle) !== 'undefined' ? angle : Math.PI / 8;
    d = typeof (d) !== 'undefined' ? d : 10;
    color = typeof(color) !== 'undefined' ? color : '#000';
    width = typeof(width) !== 'undefined' ? width : 1;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
    ctx.stroke();
    var sourceX, sourceY, lineAngle, destX, destY;
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    if (which === 1) {
        sourceX = Math.cos(startAngle) * r + x;
        sourceY = Math.sin(startAngle) * r + y;
        lineAngle = Math.atan2(x - sourceX, sourceY - y);
        if (anticlockwise) {
            destX = sourceX + 10 * Math.cos(lineAngle);
            destY = sourceY + 10 * Math.sin(lineAngle);
        } else {
            destX = sourceX - 10 * Math.cos(lineAngle);
            destY = sourceY - 10 * Math.sin(lineAngle);
        }
        drawArrow(ctx, sourceX, sourceY, destX, destY, style, 2, angle, d, color, width);
    }

    if (which === 2) {
        sourceX = Math.cos(endAngle) * r + x;
        sourceY = Math.sin(endAngle) * r + y;
        lineAngle = Math.atan2(x - sourceX, sourceY - y);
        if (anticlockwise) {
            destX = sourceX - 10 * Math.cos(lineAngle);
            destY = sourceY - 10 * Math.sin(lineAngle);
        } else {
            destX = sourceX + 10 * Math.cos(lineAngle);
            destY = sourceY + 10 * Math.sin(lineAngle);
        }
        drawArrow(ctx, sourceX, sourceY, destX, destY, style, 2, angle, d, color, width);
    }
    ctx.restore();
}

//******************************** END OF GRAPHICS & COMMON HELPER FUNCTIONS *******************************************