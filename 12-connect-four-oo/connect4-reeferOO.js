class Game {
    constructor(player1, player2, height = 6, width = 7) {
        this.height = height;
        this.width = width;
        // this.color1 = player1.color;
        // this.color2 = player2.color;
        this.players = [player1, player2];
        this.currPlayer = player1;
        // this.currColor = color1;
        this.makeBoard();
        this.makeHtmlBoard();
        this.gameOver = false;
    }


    makeBoard() {
        this.board = [];
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    makeHtmlBoard() {
        const boardHtml = document.getElementById('board');
        boardHtml.innerHTML = '';
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');

        this.handleGameClick = this.handleClick.bind(this);

        top.addEventListener('click', this.handleGameClick);

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }

        boardHtml.append(top);

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }

            boardHtml.append(row);
        }
    }

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
        const top = document.querySelector('#column-top');
        top.removeEventListener('click', this.handleGameClick);
        // setTimeout(location.reload(), 400);
    }

    handleClick(evt) {
        const x = +evt.target.id;
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }

        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        if (this.checkForWin()) {
            this.gameOver = true;
            return this.endGame(`${this.currPlayer.color} won!`);
        }

        if (this.board.every(row => row.every(cell => cell))) {
            this.gameOver = true;
            return this.endGame('Tie!');
        }
        // debugger;
        this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }

    checkForWin() {

        const _win = (cells) => {

            return cells.every(
                ([y, x]) =>
                y >= 0 &&
                y < this.height &&
                x >= 0 &&
                x < this.width &&
                this.board[y][x] === this.currPlayer
            );
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
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

class Player {
    constructor(color) {
        this.color = color;
    }
}


function colors(color1, color2) {
    const colorField1 = document.querySelector('#color1');
    const colorField2 = document.querySelector('#color2');
    colorField1.style.backgroundColor = color1;
    colorField2.style.backgroundColor = color2;
}


const start = document.querySelector('#start');
start.addEventListener('click', () => {
    const p1color = document.querySelector('#color1').value;
    const p2color = document.querySelector('#color2').value;
    colors(p1color, p2color);
    const player1 = new Player(p1color);
    const player2 = new Player(p2color);
    new Game(player1, player2);
});

// this muthafukka changed 20210304-0027mst