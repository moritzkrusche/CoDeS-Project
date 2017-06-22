


var camera = new function(){
    var camPanX = 0;
    var	camPanY = 0;





    this.instantFollow =  function () {
        camPanX = trackerX - CANVAS_W/2;
        camPanY = trackerY - CANVAS_H/2;
        this.panX = camPanX;
        this.panY = camPanY;
    }


};