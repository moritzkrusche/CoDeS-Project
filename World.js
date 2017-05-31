const TILE_W = 100;
const TILE_H = 100;
const TILE_COLS = 20;
const TILE_ROWS = 20;

var levelThree;
levelThree = [[["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1]],
    [["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1]],
    [["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1], ["S1C", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 2, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1]]];

levelX_OLD = [[["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3], ["S1A", "P1A", 3, 3]],
    [["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 1, 1], ["S1A", "P1D", 3, 3]],
    [["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 1, 1], ["S1B", "P1A", 3, 3]],
    [["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 1], ["S1C", "P1A", 3, 3]],
    [["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 3]],
    [["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 1], ["S1A", "P1A", 3, 3]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 3, 3]],
    [["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 1, 1], ["S1A", "P1A", 3, 3]]];

levelX = [ [ [ 'B', 'D', 3, 3, 1 ],
    [ 'C', 'A', 3, 3, 1 ],
    [ 'A', 'A', 3, 3, 1 ],
    [ 'A', 'A', 3, 3, 1 ],
    [ 'B', 'A', 3, 3, 1 ],
    [ 'A', 'C', 3, 3, 1 ],
    [ 'D', 'C', 3, 3, 1 ],
    [ 'B', 'A', 3, 3, 1 ] ],
    [ [ 'C', 'A', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'C', 'A', 3, 3, 1 ],
        [ 'D', 'D', 3, 3, 1 ],
        [ 'B', 'B', 3, 3, 1 ],
        [ 'D', 'C', 3, 3, 1 ],
        [ 'C', 'C', 3, 3, 1 ] ],
    [ [ 'A', 'B', 3, 3, 1 ],
        [ 'B', 'A', 3, 3, 1 ],
        [ 'C', 'B', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'C', 'D', 3, 3, 1 ],
        [ 'C', 'D', 3, 3, 1 ],
        [ 'B', 'B', 3, 3, 1 ],
        [ 'D', 'C', 3, 3, 1 ] ],
    [ [ 'C', 'D', 3, 3, 1 ],
        [ 'C', 'D', 3, 3, 1 ],
        [ 'A', 'D', 3, 3, 1 ],
        [ 'B', 'A', 3, 3, 1 ],
        [ 'C', 'C', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'C', 'A', 3, 3, 1 ],
        [ 'B', 'A', 3, 3, 1 ] ],
    [ [ 'D', 'C', 3, 3, 1 ],
        [ 'C', 'D', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'B', 'C', 3, 3, 1 ],
        [ 'C', 'C', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'D', 'C', 3, 3, 1 ],
        [ 'D', 'B', 3, 3, 1 ] ],
    [ [ 'A', 'A', 3, 3, 1 ],
        [ 'D', 'D', 3, 3, 1 ],
        [ 'B', 'D', 3, 3, 1 ],
        [ 'A', 'D', 3, 3, 1 ],
        [ 'D', 'C', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'C', 'D', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ] ],
    [ [ 'B', 'B', 3, 3, 1 ],
        [ 'C', 'C', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'B', 'A', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'A', 'C', 3, 3, 1 ],
        [ 'B', 'D', 3, 3, 1 ] ],
    [ [ 'B', 'D', 3, 3, 1 ],
        [ 'A', 'C', 3, 3, 1 ],
        [ 'A', 'D', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'A', 'A', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ],
        [ 'C', 'C', 3, 3, 1 ],
        [ 'D', 'A', 3, 3, 1 ] ] ];

/*

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var soilTypes = ['A', 'B', 'C', 'D', 'E'];
var plantTypes = ['A', 'B', 'C', 'D', 'E'];

function setToDefault(level) {
	for(var i = 0; i < level.length; i++) {
        for(var j = 0; j < level[i].length; j++) {
            level[i][j][0] = soilTypes[getRandomIntInclusive(0, 4)];
            level[i][j][1] = plantTypes[getRandomIntInclusive(0, 4)];
            level[i][j][2] = 3;
            level[i][j][3] = 3;
            // level[i][j].push(1)

        }
	}

}


setToDefault(levelX);
console.log(levelX);

*/

function updateInfo() {

	posX = Math.floor((trackerX + shiftedLeft)/TILE_W);
	posY = Math.floor((trackerY + shiftedUp)/TILE_H);

	console.log("POS X, Y: ", posX, posY);
    // console.log("TILEGRID Y, X: ", tileGrid[posY][posX]);


    tileGrid[posY][posX] = tileGrid[posY][posX].slice();

    // tileGrid[posY][posX][2] = 1;

    for (i = posX -3; i <= posX + 3; i++ ) {
        tileGrid[posY][i][3] = 1;
	}
    for (j = posY -3; j <= posY + 3; j++ ) {
        tileGrid[j][posX][2] = 1;
    }

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

var Tile_Types = [TILE_PLANT1a, TILE_PLANT1b, TILE_PLANT1c, TILE_PLANT1d, TILE_PLANT1e, TILE_SOIL1a, TILE_SOIL1b, TILE_SOIL1c, TILE_SOIL1d, TILE_SOIL1e]

//************************************************
function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / TILE_W);
	var warriorWorldRow = Math.floor(atY / TILE_H);
	var tileIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < TILE_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < TILE_ROWS) {
		return tileIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func
//************************************************

function isTileAtCoord(TileCol, TileRow) {
    if (tileGrid[TileRow] != undefined) {
        if (tileGrid[TileRow][TileCol] != undefined) {
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
    var colsThatFitOnScreen = Math.floor(canvas.width/2 / TILE_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height/2 / TILE_H);

    // finding the rightmost and bottommost tiles to draw.
    // the +1 on each pushes the new tile popping in off visible area
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

    // var arrayIndex = 0;

    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {
        for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {

			if (isTileAtCoord(eachCol, eachRow)) {
                var arrayIndex = tileGrid[eachRow][eachCol];


				var soilType = "S" + arrayIndex[2] + arrayIndex[0];
				//console.log("SOIL TYPE", soilType);
                var plantType = "P" + arrayIndex[3] + arrayIndex[1];

                var soilImg = tilePics[soilType];
                var plantImg = tilePics[plantType];
                //var soilImg = tilePics[arrayIndex[0]];
                //var plantImg = tilePics[arrayIndex[1]];

				var drawX = eachCol * TILE_W;
				var drawY = eachRow * TILE_H;
                canvasContext.drawImage(soilImg, drawX, drawY, TILE_W, TILE_H);
                canvasContext.drawImage(plantImg, drawX, drawY, TILE_W, TILE_H);
            }
        } // end of for each col
    } // end of for each row
} // end of drawBricks()



function updatePos(posX, posY) {


}