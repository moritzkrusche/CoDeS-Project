const TILE_W = 100;
const TILE_H = 100;
const TILE_COLS = 20;
const TILE_ROWS = 20;

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

rowParameters = [];
columnParameters = [];

plantRow = [];
soilColumn = [];

infoRow = [];
infoColumn = [];

payoffRow = [];
payoffColumn = [];

function generateParameters() {
    for (var i=0; i<100; i++) {
        columnParameters.push(jStat.beta.sample(1,2));
        rowParameters.push(jStat.beta.sample(2,1));
    }
}

generateParameters();

console.log("rowParameters", rowParameters);
console.log("columnParameters", columnParameters);

function generateWorld() {
    for (var i=0; i<100; i++) {
        var soilSeed = columnParameters[i] * 5;
        var plantSeed = rowParameters[i] * 5;
        var plant = Math.floor(plantSeed);
        var soil = Math.floor(soilSeed);
        plantRow.push(plant);
        soilColumn.push(soil);
    }
}

generateWorld();

console.log("plantRow", plantRow);
console.log("soilColumn", soilColumn);

function getParameters() {
    var posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
    var posY = Math.floor((trackerY + shiftedUp)/TILE_H);
}


function checkPayoff(rowPar, colPar) {
    var draw = Math.random();
    var check = rowPar * colPar;
    console.log("CHECK", check, "DRAW", draw);
    if (check < draw) {
        return 0
    }
    else {
        return 1
    }
}



function updateInfo(callback) {

	posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
	posY = Math.floor((trackerY + shiftedUp)/TILE_H);

	console.log("POS X, Y: ", posX, posY);
    // console.log("TILEGRID Y, X: ", tileGrid[posY][posX]);
    tileGrid[posY][posX] = tileGrid[posY][posX].slice();

    var getPayoff = checkPayoff(columnParameters[posX], rowParameters[posY]);

    if (getPayoff === 0) {
        tileGrid[posY][posX][0] = 5;
        console.log("NONE");
        payoffTracker.push(1);
    }
    else if (getPayoff === 1) {
        tileGrid[posY][posX][0] = 6;
        console.log("POTATOE");
        payoffTracker.push(0);
        potatoeCount += 1;
        payoffCount += (potatoeCount * potatoePrice);
    }

    // tileGrid[posY][posX][0] = 5;

    for (var i = posX -3; i <= posX + 3; i++ ) {
        tileGrid[posY][i][3] = 1;

	}
    for (var j = posY -3; j <= posY + 3; j++ ) {
        tileGrid[j][posX][2] = 1;
    }
/*
    for (var i = posX -3; i <= posX + 3; i++ ) {
        for (var j = posY -3; j <= posY + 3; j++ ) {
            tileGrid[j][i][4] += 1;

        }
    }

    */
    return callback
}


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

function drawOnlyTilesOnScreen() {
    // what are the top-left most col and row visible on canvas?
    var cameraLeftMostCol = Math.floor(camPanX / TILE_W);
    var cameraTopMostRow = Math.floor(camPanY / TILE_H);
    // how many columns and rows of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(canvas.width / TILE_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 on each pushes the new tile popping in off visible area
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    if (moving) {
        console.log("cameraLeftMostCol: " , cameraLeftMostCol);
        console.log("cameraTopMostRow: " ,cameraTopMostRow);
        console.log("cameraRightMostCol: " ,cameraRightMostCol);
        console.log("cameraBottomMostRow: ", cameraBottomMostRow);
    }


    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {

        for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

			if (isTileAtCoord(eachRow, eachCol)) {
                var arrayIndex = tileGrid[eachRow][eachCol];

                var plantParameter = plantRow[eachRow];
                // console.log("COL", eachCol);
                var soilParameter = soilColumn[eachCol];
                // console.log("ROW", eachRow);

                var drawX = eachCol * TILE_W;
                var drawY = eachRow * TILE_H;

                if (arrayIndex[0] < 5) {
                    //var soilType = "S" + arrayIndex[2] + tileTypes[arrayIndex[0]];
                    var soilType = "S" + arrayIndex[2] + tileTypes[soilParameter];

                    //console.log("SOIL TYPE", soilType);
                    // var plantType = "P" + arrayIndex[3] + tileTypes[arrayIndex[1]];

                    var plantType = "P" + arrayIndex[3] + tileTypes[plantParameter];

                    var soilImg = tilePics[soilType];
                    var plantImg = tilePics[plantType];
                    //var soilImg = tilePics[arrayIndex[0]];
                    //var plantImg = tilePics[arrayIndex[1]];

                    canvasContext.drawImage(soilImg, drawX, drawY, TILE_W, TILE_H);
                    canvasContext.drawImage(plantImg, drawX + 20, drawY + 20, TILE_W*0.6, TILE_H*0.6);

                }
                else {
                    if (arrayIndex[0] === 5) {
                        canvasContext.drawImage(tilePics["S00"], drawX, drawY, TILE_W, TILE_H);
                    }
                    else if (arrayIndex[0] === 6) {
                        canvasContext.drawImage(tilePics["SXX"], drawX, drawY, TILE_W, TILE_H);
                    }

                }
            }
        } // end of for each col
    } // end of for each row
} // end of drawBricks()



function updatePos(posX, posY) {


}