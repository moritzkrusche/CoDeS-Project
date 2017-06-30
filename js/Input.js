
var userInputStatus = {
    holdLeft: false,
    holdRight: false,
    holdUp: false,
    holdDown: false,
    mousePosX: 0,
    mousePosY: 0
};

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

//******************************** Init only when called ***************************************************************

function initInput() {
    'use strict';
    canvas.info.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

    document.getElementById('pbLeft').addEventListener('touchstart',  buttonLeft);
    document.getElementById('pbRight').addEventListener('touchstart',  buttonRight);
    document.getElementById('pbUp').addEventListener('touchstart',  buttonUp);
    document.getElementById('pbDown').addEventListener('touchstart',  buttonDown);

    document.getElementById('pbLeft').addEventListener('touchend', buttonFalse);
    document.getElementById('pbRight').addEventListener('touchend', buttonFalse);
    document.getElementById('pbUp').addEventListener('touchend', buttonFalse);
    document.getElementById('pbDown').addEventListener('touchend', buttonFalse);

}

function killInput(){
    'use strict';
    document.removeEventListener('keydown', keyPressed);
    document.removeEventListener('keyup', keyReleased);

    document.getElementById('pbLeft').removeEventListener('touchstart',  buttonLeft);
    document.getElementById('pbRight').removeEventListener('touchstart',  buttonRight);
    document.getElementById('pbUp').removeEventListener('touchstart',  buttonUp);
    document.getElementById('pbDown').removeEventListener('touchstart',  buttonDown);

    document.getElementById('pbLeft').removeEventListener('touchend', buttonFalse);
    document.getElementById('pbRight').removeEventListener('touchend', buttonFalse);
    document.getElementById('pbUp').removeEventListener('touchend', buttonFalse);
    document.getElementById('pbDown').removeEventListener('touchend', buttonFalse);

}


function updateMousePos(evt) {
    'use strict';
    var rect = canvas.info.getBoundingClientRect();
    var root = document.documentElement;

    userInputStatus.mousePosX = evt.clientX - rect.left - root.scrollLeft;
    userInputStatus.mousePosY = evt.clientY - rect.top - root.scrollTop;
}


function setKeyHoldState(thisKey, setTo) {
    'use strict';
	if(thisKey === KEY_LEFT_ARROW) {
        userInputStatus.holdLeft = setTo;
	}
	else if(thisKey === KEY_RIGHT_ARROW) {
        userInputStatus.holdRight = setTo;
	}
	else if(thisKey === KEY_UP_ARROW) {
        userInputStatus.holdUp = setTo;
	}
	else if(thisKey === KEY_DOWN_ARROW) {
        userInputStatus.holdDown = setTo;
	}
}

function keyPressed(evt) {
    'use strict';
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
    'use strict';
	setKeyHoldState(evt.keyCode, false);
}

function buttonLeft() {
    'use strict';
    userInputStatus.holdLeft = true;
    userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdDown = false;
}

function buttonRight() {
    'use strict';
    userInputStatus.holdRight = true;
    userInputStatus.holdLeft = userInputStatus.holdUp = userInputStatus.holdDown = false;
}

function buttonUp() {
    'use strict';
    userInputStatus.holdUp = true;
    userInputStatus.holdRight = userInputStatus.holdLeft = userInputStatus.holdDown = false;
}

function buttonDown() {
    'use strict';
    userInputStatus.holdDown = true;
    userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdLeft = false;
}

function buttonFalse() {
    'use strict';
    userInputStatus.holdLeft = userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdDown = false;
}