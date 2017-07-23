
//******************************** 8 TEST MAPS PICKED BY HAND **********************************************************
// these are the test maps that will be used in the second stage of the experiment
// formatted to be (relatively!) easy to edit by hand without a map editor (would be overkill)
// the start position (central) is marked as an octal integer ('00')

var testMaps = {

    map1:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  16 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 1   /  20 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  16 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  0,  0, 00,  0,  0,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  16 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.2 /  4 /  20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  10 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  10 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  095 05  01  01  1   01  04  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   19  10  2   2   20  2   8   0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   20  20  20  20  20  20  20  0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.95,0.5,0.1,0.1,1 ,0.1,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  19,  10, 2,  2,  20,2,  8,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20,  20, 20, 20, 20,20, 20, 0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.8, 1 ,0.8,0.8,0.2,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  16,  20,16, 16, 4,  10, 10, 0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20,  20,20, 20, 20, 20, 20, 0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR



    map2:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  2 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  2 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.2 /  1 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  0,  0, 00,  0,  0,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  3 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  3 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 1   /  4 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.8 /  3 /  4
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  04  01  1   01  01  05  095 05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   8   2   20  2   0   1   2   0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   20  20  20  20  2   2   2   0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.1,1 ,0.1,0.1,0.5,0.95,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  8,  2,  20,2,  0,  1,  2,   0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20,20, 2,  2,  2,   0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.2,0.8,0.8, 1 ,0.8,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,  2,  1,  3,  3,   4, 3,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,   4, 4,  0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR


    map3:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  10 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  10 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.2 /  4 /  20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 00,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  16 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  16 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 1   /  20 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  16 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  04  01  1   01  01  05  095 05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   8   2   20  2   2   10  19  0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   20  20  20  20  20  20  20  0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.1,1 ,0.1,0.1,0.5,0.95,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  8,  2,  20,2,  2,  10, 19,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20,20, 20, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.2,0.8,0.8, 1 ,0.8,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  10, 10, 4,  16, 16,  20,16, 0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20, 20, 20,  20,20, 0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR

    map4:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  3 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 1   /  4 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  3 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 00,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.8 /  3 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.2 /  1 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  2 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  2 /  4
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  095 05  01  01  1   01  04  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   2   1   0   2   20  2   8   0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   2   2   2   20  20  20  20  0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.95,0.5,0.1,0.1,1 ,0.1,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,   1,  0,  2,  20,2,  8,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,   2,  2,  20, 20,20, 20, 0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.8, 1 ,0.8,0.8,0.2,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  3,   4, 3,  3,  1,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  4,   4, 4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR


    map5:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.95/  19 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  10 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1 /  2  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 00,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1 /  2  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 1   /  20 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1 /  2  / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.4 /  8  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  08  1   08  08  02  05  05  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   16  20  16  16  4   10  10  0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   20  20  20  20  20  20  20  0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.8, 1 ,0.8,0.8,0.2,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  16,  20,16, 16, 4,  10, 10, 0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20,  20,20, 20, 20, 20, 20, 0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.95,0.5,0.1,0.1,1 ,0.1,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  19,  10, 2,  2,  20,2,  8,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20,  20, 20, 20, 20,20, 20, 0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR


    map6:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.4 /  8  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1  / 2  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 1  /   20 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 00,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1 /  2  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.1 /  2  / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  10 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.95 / 19 / 20
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  05  05  02  08  08  1   08  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   2   2   1   3   3   4   3   0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   4   4   4   4   4   4   4   0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.2,0.8,0.8, 1 ,0.8,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,  2,  1,  3,  3,   4, 3,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,   4, 4,  0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.1,1 ,0.1,0.1,0.5,0.95,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  8,  2,  20,2,  0,  1,  2,   0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20,20, 2,  2,  2,   0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR


    map7:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.4 /  8  / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.1 /  2  / 20
            [5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5], // 1   /  20 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 00,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.1 /  2  / 20
            [5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5], // 0.1 /  2 /  20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  10 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.95 / 19 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  05  05  02  08  08  1   08  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   10  10  4   16  16  20  16  0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   20  20  20  20  20  20  20  0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.2,0.8,0.8, 1 ,0.8,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  10, 10, 4,  16, 16,  20,16, 0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20, 20, 20,  20,20, 0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.1,1 ,0.1,0.1,0.5,0.95,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  8,  2,  20,2,  2,  10, 19,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  20, 20, 20,20, 20, 20, 20,  0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985], //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR

    map8:                                                                                            //ROW QUAL/PAYOFF/EXPL
        [[  [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], // 0   /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.95 / 19 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5  / 10 / 20
            [5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5], // 0.1 /  2  / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 00,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.1 /  2  / 20
            [5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5,  5,  5,  5,  5,  5,  5,  5,  5,  0,  5], // 1   /  20 / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.1 /  2  / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.4 /  8  / 20
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5], // 0.5 /  0 /  0
            [5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5]],// 0   /  0 /  0

            //   05  05  05  05  05  05  05  08  1   08  08  02  05  05  05  05  05  05  05  05  05  0
            //   0   0   0   0   0   0   0   3   4   3   3   1   2   2   0   0   0   0   0   0   0   0
            //   0   0   0   0   0   0   0   4   4   4   4   4   4   4   0   0   0   0   0   0   0   0

            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.8, 1 ,0.8,0.8,0.2,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  3,   4, 3,  3,  1,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  4,   4, 4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0],
            //ABOVE: COL QUAL/PAYOFF/EXPL BELOW: ROW QUAL/PAYOFF/EXPL FROM TOP --> BOTTOM
            [0, 0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.95,0.5,0.1,0.1,1 ,0.1,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,   1,  0,  2,  20,2,  8,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  2,   2,  2,  20, 20,20, 20, 0,  0,  0,  0,  0,  0,  0,  0],

            8, 0, 0, 0, 0, 0.04, 0.985] //NUM MOVES ALLOWED/ALPHA1/BETA1/ALPHA2/BETA2/POTATO PRICE/ DISCOUNT FACTOR

};

//******************************** END OF 8 TEST MAPS PICKED BY HAND ***************************************************