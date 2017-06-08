const TILE_W = 100;
const TILE_H = 100;
const TILE_COLS = 220;
const TILE_ROWS = 220;

var posX = 0;
var posY = 0;

var potato = false;

var levelThree;
levelThree =
    [ [ [ 4, 2, 3, 3, 0 ],
    [ 4, 1, 3, 3, 0 ],
    [ 2, 2, 3, 3, 0 ],
    [ 3, 1, 3, 3, 0 ],
    [ 1, 2, 3, 3, 0 ],
    [ 3, 3, 3, 3, 0 ],
    [ 0, 4, 3, 3, 0 ],
    [ 1, 1, 3, 3, 0 ],
    [ 3, 2, 3, 3, 0 ],
    [ 1, 0, 3, 3, 0 ],
    [ 3, 0, 3, 3, 0 ],
    [ 2, 4, 3, 3, 0 ],
    [ 4, 1, 3, 3, 0 ],
    [ 4, 3, 3, 3, 0 ],
    [ 4, 3, 3, 3, 0 ],
    [ 1, 1, 3, 3, 0 ],
    [ 2, 3, 3, 3, 0 ],
    [ 0, 3, 3, 3, 0 ],
    [ 3, 3, 3, 3, 0 ],
    [ 0, 0, 3, 3, 0 ] ],
    [ [ 1, 4, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ] ],
    [ [ 4, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ],
    [ [ 3, 0, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ] ],
    [ [ 2, 0, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ] ],
    [ [ 3, 1, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ] ],
    [ [ 2, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ],
    [ [ 2, 1, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ],
    [ [ 4, 4, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ] ],
    [ [ 4, 0, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ] ],
    [ [ 3, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ] ],
    [ [ 1, 4, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ] ],
    [ [ 0, 0, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ] ],
    [ [ 3, 3, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ] ],
    [ [ 2, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ] ],
    [ [ 3, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ] ],
    [ [ 2, 3, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ] ],
    [ [ 1, 2, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ] ],
    [ [ 2, 3, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ] ],
    [ [ 2, 3, 3, 3, 0 ],
        [ 1, 1, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 3, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ] ];



levelX = [ [ [ 1, 2, 3, 3, 0 ],
    [ 1, 4, 3, 3, 0 ],
    [ 1, 1, 3, 3, 0 ],
    [ 0, 0, 3, 3, 0 ],
    [ 0, 0, 3, 3, 0 ],
    [ 2, 0, 3, 3, 0 ],
    [ 0, 3, 3, 3, 0 ],
    [ 2, 1, 3, 3, 0 ] ],
    [ [ 4, 3, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 2, 1, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ] ],
    [ [ 3, 0, 3, 3, 0 ],
        [ 0, 4, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 0, 2, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ] ],
    [ [ 1, 1, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 2, 0, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 1, 2, 3, 3, 0 ],
        [ 0, 0, 3, 3, 0 ],
        [ 3, 4, 3, 3, 0 ] ],
    [ [ 4, 1, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 1, 0, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ] ],
    [ [ 2, 0, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 4, 2, 3, 3, 0 ],
        [ 2, 4, 3, 3, 0 ],
        [ 1, 4, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ],
    [ [ 3, 2, 3, 3, 0 ],
        [ 3, 0, 3, 3, 0 ],
        [ 1, 3, 3, 3, 0 ],
        [ 4, 1, 3, 3, 0 ],
        [ 4, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ],
        [ 3, 3, 3, 3, 0 ],
        [ 0, 1, 3, 3, 0 ] ],
    [ [ 2, 1, 3, 3, 0 ],
        [ 4, 0, 3, 3, 0 ],
        [ 2, 3, 3, 3, 0 ],
        [ 3, 1, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ],
        [ 3, 2, 3, 3, 0 ],
        [ 4, 4, 3, 3, 0 ],
        [ 2, 2, 3, 3, 0 ] ] ];


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function setToDefault(level) {
	for(var i = 0; i < level.length; i++) {
        for(var j = 0; j < level[i].length; j++) {
            level[i][j][0] = getRandomIntInclusive(0, 4);
            level[i][j][1] = getRandomIntInclusive(0, 4);
            level[i][j][2] = 3;
            level[i][j][3] = 3;
            level[i][j][4] = 0;
            //level[i][j].push(0)

        }
	}

}

//setToDefault(levelX);
//console.log(levelX);

rowParameters = new Array(TILE_ROWS);
columnParameters = new Array(TILE_COLS);

plantRow = new Array(TILE_ROWS);
soilColumn = new Array(TILE_COLS);

payoffRow = new Array(TILE_ROWS);
payoffColumn = new Array(TILE_COLS);

exploredRow = new Array(TILE_ROWS);
exploredColumn = new Array(TILE_COLS);

expectedPayoff = new Array(TILE_COLS);
randomColumn = new Array(TILE_COLS);

function generateParameters() {
    for (var i=0; i<TILE_COLS; i++) {
        columnParameters[i] = jStat.beta.sample(1,2);
    }
    for (var j=0; j<TILE_ROWS; j++) {
        rowParameters[j] = jStat.beta.sample(2,1);
    }
}

generateParameters();

// for(var i = 0, value = 1234, size = 1000, array = new Array(1000); i < size; i++) array[i] = value;


//console.log("rowParameters", rowParameters);
//console.log("columnParameters", columnParameters);

function generateWorld() {
    for (var i=0; i<TILE_COLS; i++) {
        var soilSeed = columnParameters[i] * 5;
        soilColumn[i] = Math.floor(soilSeed);
        payoffColumn[i] = 0;
        exploredColumn[i] = 0;
    }
    for (var j=0; j<TILE_ROWS; j++) {
        var plantSeed = rowParameters[j] * 5;
        plantRow[j] = Math.floor(plantSeed);
        payoffRow[j] = 0;
        exploredRow[j] = 0;
    }
}

function measureWorld() {

    for (var i=0; i<TILE_COLS; i++) {
        randomColumn[i] = Math.random();
        expectedPayoff[i] = columnParameters[i] * rowParameters[i];
    }
    var totalPayoff = jStat.sum(expectedPayoff);
    var meanPayoff = totalPayoff / expectedPayoff.length;

    var totalRandom = jStat.sum(randomColumn);
    var meanRandom = totalRandom / randomColumn.length;

    console.log("MEAN PAYOFF :", meanPayoff);
    console.log("MEAN RANDOM :", meanRandom);
}


generateWorld();


//console.log("plantRow", plantRow);
//console.log("soilColumn", soilColumn);


function getParameters() {
    posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
    posY = Math.floor((trackerY + shiftedUp)/TILE_H);
}


function checkPayoff(colPar, rowPar) {
    var draw = Math.random();
    var check = colPar * rowPar;
    console.log("CHECK", check, "DRAW", draw);
    if (draw <= check) {
        return 1
    }
    else {
        return 0
    }
}



function updateInfo(callback) {
	posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
	posY = Math.floor((trackerY + shiftedUp)/TILE_H);

	console.log("POS X, Y: ", posX, posY);
    // console.log("TILEGRID Y, X: ", tileGrid[posY][posX]);
    tileGrid[posX][posY] = tileGrid[posX][posY].slice();


    if (tileGrid[posX][posY][0] === 0) {

        exploredRow[posY] += 1;
        exploredColumn[posX] += 1;

        var getPayoff = checkPayoff(columnParameters[posX], rowParameters[posY]);

        if (getPayoff === 0) {
            // thisGrid[0] = 5;
            console.log("NONE");
            payoffTracker.push(0);

            tileGrid[posX][posY][0] = 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
        else if (getPayoff === 1) {
            // thisGrid[0] = 6;
            potato = true;

            console.log("POTATOE");
            payoffTracker.push(1);
            potatoeCount += 1;
            payoffCount += (potatoeCount * potatoePrice);

            tileGrid[posX][posY][0] = 3;

            payoffRow[posY] += 1;
            payoffColumn[posX] += 1;

            //console.log("PAYOFFROW ", payoffRow);
            //console.log("PAYOFFCOLUMN ", payoffColumn);
        }
    }

    /*
    for (var i = posX -3; i <= posX + 3; i++ ) {
        tileGrid[posY][i][3] = 1;

	}
    for (var j = posY -3; j <= posY + 3; j++ ) {
        tileGrid[j][posX][2] = 1;
    }

    */
    return callback
}

function createGrid() {
    var newRow = new Array(TILE_COLS);

    for (j=0; j<newRow.length; j++) {
        var newCol = new Array(TILE_ROWS);
        for (i=0; i<newCol.length; i++) {
            newCol[i] = [0];
        }
        newRow[j] = newCol
    }
    return newRow;

}

var newGrid = createGrid();


var tileGrid = [];

const TILE_PLANT1a = "P1A";
const TILE_PLANT1b = "P1B";
const TILE_PLANT1c = "P1C";
const TILE_PLANT1d = "P1D";
const TILE_PLANT1e = "P1E";

const TILE_PLANT2a = "P2A";
const TILE_PLANT2b = "P2B";
const TILE_PLANT2c = "P2C";
const TILE_PLANT2d = "P2D";
const TILE_PLANT2e = "P2E";

const TILE_PLANT3a = "P3A";
const TILE_PLANT3b = "P3B";
const TILE_PLANT3c = "P3C";
const TILE_PLANT3d = "P3D";
const TILE_PLANT3e = "P3E";

const TILE_SOIL1a = "S1A";
const TILE_SOIL1b = "S1B";
const TILE_SOIL1c = "S1C";
const TILE_SOIL1d = "S1D";
const TILE_SOIL1e = "S1E";

const TILE_SOIL2a = "S2A";
const TILE_SOIL2b = "S2B";
const TILE_SOIL2c = "S2C";
const TILE_SOIL2d = "S2D";
const TILE_SOIL2e = "S2E";

const TILE_SOIL3a = "S3A";
const TILE_SOIL3b = "S3B";
const TILE_SOIL3c = "S3C";
const TILE_SOIL3d = "S3D";
const TILE_SOIL3e = "S3E";

const TILE_EMPTY = "S00";
const TILE_EXPLOITED = "SXX";

var Tile_Types = [TILE_PLANT1a, TILE_PLANT1b, TILE_PLANT1c, TILE_PLANT1d, TILE_PLANT1e, TILE_SOIL1a, TILE_SOIL1b, TILE_SOIL1c, TILE_SOIL1d, TILE_SOIL1e];

function isTileAtCoord(TileRow, TileCol) {
    if (tileGrid[TileRow] !== undefined) {
        if (tileGrid[TileRow][TileCol] !== undefined) {
            return true;
        }
    }
    return false;
}


function isExplored(TileRow, TileCol) {

    if (exploredRow[TileRow] === 1){

        return 0;
    }
    else if (payoffRow[TileRow] * payoffColumn[TileCol] === 1){
        return 0;
    }
    else {
        return 0;
    }
}

function getInfo(TileRow, TileCol) {
    var infoCol = exploredColumn[TileCol];
    var infoRow = exploredRow[TileRow];

    var infoLevelCol = getInfoLevel(infoCol);
    var infoLevelRow = getInfoLevel(infoRow);


    var qualityCol = getQuality(payoffColumn[TileCol], infoCol);
    var qualityRow = getQuality(payoffRow[TileRow], infoRow);


    return [infoLevelCol, infoLevelRow, qualityCol, qualityRow];
}


function getInfoLevel(rowOrCol) {
    if (rowOrCol === 0) {
        return 3;
    }
    else if (rowOrCol < 4) {
        return 2;
    }
    else if (rowOrCol >= 4) {
        return 1;
    }
}


function getQuality(payoffCount, exploredCount) {
    var fraction = payoffCount / exploredCount;

    if (exploredCount === 0){
        return 2;
    }
    else if (fraction <= 0.2) {
        return 0;
    }
    else if (fraction <= 0.4) {
        return 1;
    }
    else if (fraction <= 0.6) {
        return 2;
    }
    else if (fraction <= 0.8) {
        return 3;
    }
    else  {
        return 4;
    }
}

var training = true;


function drawOnlyTilesOnScreen() {
    // what are the top-left most row and col visible on canvas?
    var cameraLeftMostCol = Math.floor(camPanX / TILE_W);
    var cameraTopMostRow = Math.floor(camPanY / TILE_H);
    // how many rows and columns of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(canvas.width / TILE_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 on each pushes the new tile popping in off visible area
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    //console.log("cameraLeftMostCol: " , cameraLeftMostCol);
    //console.log("cameraTopMostRow: " ,cameraTopMostRow);
    //console.log("cameraRightMostCol: " ,cameraRightMostCol);
    //console.log("cameraBottomMostRow: ", cameraBottomMostRow);

    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {

        for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

			//if (isTileAtCoord(eachRow, eachCol)) {
            if (training) {
                var arrayIndex = tileGrid[eachCol][eachRow];

                // console.log("COL", eachCol);
                // console.log("ROW", eachRow);

                var drawX = eachCol * TILE_W;
                var drawY = eachRow * TILE_H;

                //var visitedTile = tileGrid[eachCol][eachRow];

                if (arrayIndex[0] < 1) {

                    var infoType = getInfo(eachRow, eachCol);

                    var soilParameter = infoType[2];
                    var plantParameter = infoType[3];

                    //var qualityType = getQuality();

                    //var soilType = "S" + arrayIndex[2] + tileTypes[arrayIndex[0]];
                    var soilType = "S"+ infoType[0] + tileTypes[soilParameter];

                    //console.log("SOIL TYPE", soilType);
                    // var plantType = "P" + arrayIndex[3] + tileTypes[arrayIndex[1]];

                    var plantType = "P" + infoType[1] + tileTypes[plantParameter];

                    var soilImg = tilePics[soilType];
                    var plantImg = tilePics[plantType];
                    //var soilImg = tilePics[arrayIndex[0]];
                    //var plantImg = tilePics[arrayIndex[1]];

                    canvasContext.drawImage(soilImg, drawX, drawY, TILE_W, TILE_H);
                    canvasContext.drawImage(plantImg, drawX + 20, drawY + 20, TILE_W*0.6, TILE_H*0.6);

                }
                else {
                    if (arrayIndex[0] === 1) {
                        canvasContext.drawImage(tilePics["S00"], drawX, drawY, TILE_W, TILE_H);
                    }
                    else if (arrayIndex[0] === 3) {
                        canvasContext.drawImage(tilePics["SXX"], drawX, drawY, TILE_W, TILE_H);
                    }
                }

            }
        } // end of for each col
    } // end of for each row
} // end of drawBricks()


function updatePos(posX, posY) {


}