
var keyStatus = {
    holdLeft: false,
    holdRight: false,
    holdUp: false,
    holdDown: false
};

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

    document.getElementById("pbLeft").addEventListener("touchstart",  buttonLeft);
    document.getElementById("pbRight").addEventListener("touchstart",  buttonRight);
    document.getElementById("pbUp").addEventListener("touchstart",  buttonUp);
    document.getElementById("pbDown").addEventListener("touchstart",  buttonDown);

    document.getElementById("pbLeft").addEventListener("touchend", buttonFalse);
    document.getElementById("pbRight").addEventListener("touchend", buttonFalse);
    document.getElementById("pbUp").addEventListener("touchend", buttonFalse);
    document.getElementById("pbDown").addEventListener("touchend", buttonFalse);
}

function setKeyHoldState(thisKey, setTo) {
	if(thisKey === KEY_LEFT_ARROW) {
        keyStatus.holdLeft = setTo;
	}
	else if(thisKey === KEY_RIGHT_ARROW) {
        keyStatus.holdRight = setTo;
	}
	else if(thisKey === KEY_UP_ARROW) {
        keyStatus.holdUp = setTo;
	}
	else if(thisKey === KEY_DOWN_ARROW) {
        keyStatus.holdDown = setTo;
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}

function buttonLeft() {
    keyStatus.holdLeft = true;
    keyStatus.holdRight = keyStatus.holdUp = keyStatus.holdDown = false;
}

function buttonRight() {
    keyStatus.holdRight = true;
    keyStatus.holdLeft = keyStatus.holdUp = keyStatus.holdDown = false;
}

function buttonUp() {
    keyStatus.holdUp = true;
    keyStatus.holdRight = keyStatus.holdLeft = keyStatus.holdDown = false;
}

function buttonDown() {
    keyStatus.holdDown = true;
    keyStatus.holdRight = keyStatus.holdUp = keyStatus.holdLeft = false;
}

function buttonFalse() {
    keyStatus.holdLeft = keyStatus.holdRight = keyStatus.holdUp = keyStatus.holdDown = false;
}