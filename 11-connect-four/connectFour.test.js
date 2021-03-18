describe('building board', () => {

    const emptyBoard6h7w = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"]
    ];
    const emptyBoard9h13w = [
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
    ];

    it('should create an empty board array with <height> arrays of <width> "space"s', () => {
        expect(makeBoard(6, 7)).toEqual(emptyBoard6h7w);
        expect(makeBoard(9, 13)).toEqual(emptyBoard9h13w);
    });

    afterAll(() => {
        spaceId = "";
        playerX = 0;
        clicked = false;
        boardArray = [
            ["space", "space", "space", "space", "space", "space", "space"],
            ["space", "space", "space", "space", "space", "space", "space"],
            ["space", "space", "space", "space", "space", "space", "space"],
            ["space", "space", "space", "space", "space", "space", "space"],
            ["space", "space", "space", "space", "space", "space", "space"],
            ["space", "space", "space", "space", "space", "space", "space"]
        ];
    });
})


describe('win, tie, or play on', () => {
    const testTie = [
        ["blue", "red", "blue", "red", "blue", "red", "blue"],
        ["red", "blue", "red", "blue", "red", "blue", "red"],
        ["blue", "red", "blue", "red", "blue", "red", "blue"],
        ["red", "blue", "red", "blue", "red", "blue", "red"],
        ["blue", "red", "blue", "red", "blue", "red", "blue"],
        ["red", "blue", "red", "blue", "red", "blue", "red"]
    ];
    const testHorizontalWin = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["red", "red", "red", "space", "space", "space", "space"],
        ["blue", "blue", "blue", "blue", "space", "space", "space"]
    ];
    const testVerticalWin = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["blue", "space", "space", "space", "space", "space", "space"],
        ["blue", "red", "space", "space", "space", "space", "space"],
        ["blue", "red", "space", "space", "space", "space", "space"],
        ["blue", "red", "space", "space", "space", "space", "space"]
    ];
    const testDiagonalWinRight = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "blue", "space", "space", "space"],
        ["blue", "red", "blue", "red", "space", "space", "space"],
        ["red", "blue", "red", "red", "space", "space", "space"],
        ["blue", "blue", "blue", "red", "space", "space", "space"]
    ];
    const testDiagonalWinLeft = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["red", "space", "space", "space", "space", "space", "space"],
        ["blue", "red", "blue", "red", "space", "space", "space"],
        ["red", "blue", "red", "red", "space", "space", "space"],
        ["blue", "blue", "blue", "red", "blue", "space", "space"]
    ];
    const testPlayOn = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["blue", "red", "blue", "space", "space", "space", "space"],
        ["red", "blue", "red", "red", "space", "space", "space"],
        ["blue", "blue", "blue", "red", "space", "space", "space"]
    ];
    const testWrapparaoundHorizontal = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "blue", "red", "space", "space", "space", "space"],
        ["red", "red", "red", "space", "space", "blue", "space"],
        ["blue", "red", "blue", "space", "space", "red", "red"],
        ["blue", "red", "blue", "blue", "blue", "red", "blue"]
    ];
    const testWrapparoundVertical = [
        ["blue", "space", "space", "space", "space", "space", "space"],
        ["blue", "space", "space", "space", "space", "space", "space"],
        ["space", "blue", "red", "space", "space", "space", "space"],
        ["red", "red", "red", "space", "space", "blue", "space"],
        ["blue", "red", "blue", "space", "space", "red", "space"],
        ["blue", "red", "blue", "blue", "blue", "red", "blue"]
    ]
    const testWrapparoundDiagonal = [
        ["blue", "space", "space", "space", "space", "space", "space"],
        ["red", "space", "space", "space", "space", "red", "space"],
        ["blue", "blue", "red", "space", "space", "space", "red"],
        ["red", "red", "red", "space", "space", "blue", "space"],
        ["blue", "red", "blue", "space", "space", "red", "space"],
        ["blue", "red", "blue", "blue", "blue", "red", "blue"]
    ]

    // the following show a diagonal win for blue:
    const testBeta1 = [
        ["space", "space", "space", "space", "space", "space", "space"],
        ["space", "space", "space", "space", "space", "space", "space"],
        ["red", "blue", "red", "blue", "space", "space", "space"],
        ["blue", "red", "blue", "blue", "space", "space", "space"],
        ["red", "red", "blue", "red", "space", "space", "space"],
        ["blue", "blue", "blue", "red", "red", "space", "space"]
    ];

    it('should return a tie if all squares are full', () => {
        expect(checkForWin(testTie, 1)).toEqual("tie");
        expect(itsATie(testTie)).toEqual(true);
        expect(itsATie(testPlayOn)).toEqual(false);
    });
    it('should return a win if there are 4 in a row horizontally', () => {
        expect(checkForWin(testHorizontalWin, 1)).toEqual("win");
        expect(winHorizontal(testHorizontalWin, 1)).toEqual(true);
    });
    it('should return a win if there are 4 in a row vertically', () => {
        expect(checkForWin(testVerticalWin, 1)).toEqual("win");
        expect(winVertical(testVerticalWin, 1)).toEqual(true);
    });
    it('should return a win if there are 4 in a row diagonally', () => {
        expect(checkForWin(testDiagonalWinLeft, 1)).toEqual("win");
        expect(winDiagonal(testDiagonalWinLeft, 1)).toEqual(true);
        expect(checkForWin(testDiagonalWinRight, 1)).toEqual("win");
        expect(winDiagonal(testDiagonalWinRight, 1)).toEqual(true);
    });
    it('should keep playing if there is no win or tie', () => {
        expect(checkForWin(testPlayOn, 1)).toEqual("play on");
        expect(itsATie(testPlayOn, 1)).toEqual(false);
        expect(winHorizontal(testPlayOn, 1)).toEqual(false);
        expect(winVertical(testPlayOn, 1)).toEqual(false);
        expect(winDiagonal(testPlayOn, 1)).toEqual(false);
        expect(winDiagonal(testPlayOn, 1)).toEqual(false);
    });
    it('should not accept "wrapparound" wins', () => {
        expect(checkForWin(testWrapparaoundHorizontal, 1)).toEqual("play on");
        expect(itsATie(testWrapparaoundHorizontal, 1)).toEqual(false);
        expect(winHorizontal(testWrapparaoundHorizontal, 1)).toEqual(false);
        expect(winVertical(testWrapparaoundHorizontal, 1)).toEqual(false);
        expect(winDiagonal(testWrapparaoundHorizontal, 1)).toEqual(false);
        expect(winDiagonal(testWrapparaoundHorizontal, 1)).toEqual(false);
        expect(checkForWin(testWrapparoundVertical, 1)).toEqual("play on");
        expect(itsATie(testWrapparoundVertical, 1)).toEqual(false);
        expect(winHorizontal(testWrapparoundVertical, 1)).toEqual(false);
        expect(winVertical(testWrapparoundVertical, 1)).toEqual(false);
        expect(winDiagonal(testWrapparoundVertical, 1)).toEqual(false);
        expect(winDiagonal(testWrapparoundVertical, 1)).toEqual(false);
        expect(checkForWin(testWrapparoundDiagonal, 1)).toEqual("play on");
        expect(itsATie(testWrapparoundDiagonal, 1)).toEqual(false);
        expect(winHorizontal(testWrapparoundDiagonal, 1)).toEqual(false);
        expect(winVertical(testWrapparoundDiagonal, 1)).toEqual(false);
        expect(winDiagonal(testWrapparoundDiagonal, 1)).toEqual(false);
        expect(winDiagonal(testWrapparoundDiagonal, 1)).toEqual(false);
    });

    it('should not accept this game tested case as a win', () => {
        expect(checkForWin(testBeta1, 1)).toEqual("play on");
        expect(itsATie(testBeta1, 1)).toEqual(false);
        expect(winHorizontal(testBeta1, 1)).toEqual(false);
        expect(winVertical(testBeta1, 1)).toEqual(false);
        expect(winDiagonal(testBeta1, 1)).toEqual(false);
        expect(winDiagonal(testBeta1, 1)).toEqual(false);
    });

    afterAll(() => {
        spaceId = "";
        playerX = 0;
        clicked = false;
        gameResult = undefined;
        columnWorking = undefined;
    });
})