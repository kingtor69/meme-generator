class Game {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = [];
        this.currPlayer = 1;
    }

    makeBoard() {
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const board = document.getElementById('board');

        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick);

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }

        board.append(top);

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }

            board.append(row);
        }
    }

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!thisGame.board[y][x]) {
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
    }

    handleClick(evt) {
        const x = +evt.target.id;
        // debugger;
        // console.log(`this is ${this}`);
        // console.log(`thisGame is ${thisGame}`);
        // console.log(`Game is ${Game}`);
        // console.log(`Game.findSpotForCol is ${Game.findSpotForCol}`);
        // console.log(`thisGame.findSpotForCol is ${thisGame.findSpotForCol}`);
        const y = thisGame.findSpotForCol(x);
        if (y === null) {
            return;
        }

        thisGame.board[y][x] = this.currPlayer;
        thisGame.placeInTable(y, x);

        if (thisGame.checkForWin()) {
            return thisGame.endGame(`Player ${thisGame.currPlayer} won!`);
        }

        if (thisGame.board.every(row => row.every(cell => cell))) {
            return thisGame.endGame('Tie!');
        }

        thisGame.currPlayer = thisGame.currPlayer === 1 ? 2 : 1;
    }

    checkForWin() {
        function _win(cells) {

            return cells.every(
                ([y, x]) =>
                y >= 0 &&
                y < thisGame.height &&
                x >= 0 &&
                x < thisGame.width &&
                thisGame.board[y][x] === thisGame.currPlayer
            );
        }

        for (let y = 0; y < thisGame.height; y++) {
            for (let x = 0; x < thisGame.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [
                    [y, x],
                    [y, x + 1],
                    [y, x + 2],
                    [y, x + 3]
                ];
                const vert = [
                    [y, x],
                    [y + 1, x],
                    [y + 2, x],
                    [y + 3, x]
                ];
                const diagDR = [
                    [y, x],
                    [y + 1, x + 1],
                    [y + 2, x + 2],
                    [y + 3, x + 3]
                ];
                const diagDL = [
                    [y, x],
                    [y + 1, x - 1],
                    [y + 2, x - 2],
                    [y + 3, x - 3]
                ];

                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }
}

let thisGame = new Game(6, 7);
const newGameBtn = document.querySelector('#new-game');
newGameBtn.addEventListener('click', startNewGame());

function startNewGame() {
    thisGame = new Game(6, 7);
    // debugger;
    thisGame.makeBoard();
    thisGame.makeHtmlBoard();
}