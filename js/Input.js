
//******************************** INPUT BUTTONS & KEYS ****************************************************************

var userInputStatus = {
    holdLeft: false,
    holdRight: false,
    holdUp: false,
    holdDown: false,
    mousePosX: 0,
    mousePosY: 0
};

// arrow key constants
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

//******************************** Init only when called ***************************************************************

function initInput() {
    'use strict';
    canvas.box.addEventListener('mousemove', updateMousePos); // canvas with highest z-index

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

    if (isMobile) {
        var buttons = document.getElementsByClassName('playButton');
        for (var i=0; i<buttons.length; i++){
            buttons[i].style.visibility = 'visible'
        }
    }
}

function killInput(){
    'use strict';
    canvas.box.removeEventListener('mousemove', updateMousePos);

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

    if (isMobile) {
        var buttons = document.getElementsByClassName('playButton');
        for (var i=0; i<buttons.length; i++){
            buttons[i].style.visibility = 'hidden'
        }
    }
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

//******************************** BUTTON FUNCTIONS ********************************************************************

htmlPage.demoForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var form = htmlPage.demoForm;

    loggedData.prolificId = form.prolificId.value;
    loggedData.partAge = form.age.value;
    loggedData.partGender = form.gender.value;

    htmlPage.demoBox.style.display = 'none';
    instructions.show();
});

htmlPage.debriefForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var form = htmlPage.debriefForm;
    feedbackDatabase.push(form.comment.value); // send feedback to separate database for anonymity

    document.getElementById('debriefButton').style.display = 'none';
    document.getElementById('comment').style.display = 'none';
    canvas.boxContext.font = 'italic 22pt "COMIC SANS MS"';
    canvasText(canvas.boxContext, 'Many thanks for your feedback!',30 , 600, '#DAA520');
});

function buttonNext() {
    "use strict";

    if (!experiment.testPhase){
        if (experiment.currentOpenLevel === 0 && instructions.index < instructions.maxIndex){
            instructions.index++;
            instructions.show()
        }
        else {
            nextOpenLevel.index++;
            nextOpenLevel.show()
        }
    }
    else if (experiment.testPhase){
        if (experiment.currentTestLevel === 0 && testInstructions.index < testInstructions.maxIndex) {
            testInstructions.index++;
            testInstructions.show();
        } else {
            nextTestLevel.index++;
            nextTestLevel.show()
        }
    }
}

function buttonBack() {
    "use strict";
    if (!experiment.testPhase){
        if (instructions.index > 0){
            instructions.index--;
        }
        instructions.show();
    }
    else if (experiment.testPhase){
        if (testInstructions.index > 3){ // do not allow going back to rain animation
            testInstructions.index--;
        }
        testInstructions.show();
    }

    htmlPage.nextButton.style.display = 'block';
}

function buttonStartLevel(){
    "use strict";
    boxScreen.hideAll();
    initInput();
    htmlPage.startButton.style.display = 'none';
    nextTestLevel.index = 0;
    nextOpenLevel.index = 0;

    if (!isMobile) {
        if (assets.backgroundSound.playing(curMapVar.backgroundId)){
            assets.backgroundSound.stop(curMapVar.backgroundId)
        }
        curMapVar.backgroundId = assets.backgroundSound.play();
    }
    else {
        if (!curMapVar.mobileSoundUnlocked){
            try {
                assets.unlockIOSAudioPlayback()
            }
            catch(err) {
                alert('Could not unlock sound!')
            }
        }
    }
}

function buttonGoProlific(){
    "use strict";
    window.open('https://www.prolific.ac/submissions/complete/demo?','_blank');
    document.getElementById('goProlific').style.display = 'none';
    canvas.boxContext.font = 'italic 22pt "COMIC SANS MS"';
    canvasText(canvas.boxContext, 'Thanks! You can close this page now.',30 , 480, '#DAA520');
}

//******************************** END OF INPUT BUTTONS & KEYS *********************************************************