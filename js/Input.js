
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

    canvas.addEventListener("mousemove", updateMousePos);

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


function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    userInputStatus.mousePosX = evt.clientX - rect.left - root.scrollLeft;
    userInputStatus.mousePosY = evt.clientY - rect.top - root.scrollTop;
}


function setKeyHoldState(thisKey, setTo) {
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
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}

function buttonLeft() {
    userInputStatus.holdLeft = true;
    userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdDown = false;
}

function buttonRight() {
    userInputStatus.holdRight = true;
    userInputStatus.holdLeft = userInputStatus.holdUp = userInputStatus.holdDown = false;
}

function buttonUp() {
    userInputStatus.holdUp = true;
    userInputStatus.holdRight = userInputStatus.holdLeft = userInputStatus.holdDown = false;
}

function buttonDown() {
    userInputStatus.holdDown = true;
    userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdLeft = false;
}

function buttonFalse() {
    userInputStatus.holdLeft = userInputStatus.holdRight = userInputStatus.holdUp = userInputStatus.holdDown = false;
}