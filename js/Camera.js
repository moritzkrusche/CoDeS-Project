var camPanX = 0.0;
var camPanY = 0.0;
var shiftedLeft = 0;
var shiftedUp = 0;


function instantCamFollow() {
	camPanX = trackerX - CANVAS_W/2 + shiftedLeft;
	camPanY = trackerY - CANVAS_H/2 + shiftedUp;
}


