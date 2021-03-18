// all code copyright Tor Kingdon except as noted

const body = document.querySelector('body');
const board = document.querySelector('#board');


// constants and variables that will be used to manage game play
const columnLetters = `abcdefghijklmnopqurstuvwxyz`;
let boardArray;
// let activeColor = "";
let spaceId = "";
// can starting player be user-definable? I mean, yes, but do you want to code it?
let playerX = 0;
let clicked = false;
let gameResult;
let columnWorking;

// potentially user-definable items
let connect = 4;
// # of chips in a row required to win. Default is (ob) 4.
let height = 6;
let width = 7;
// # of spaces per board, default is 7x6, which seems like a minimum size for connect 4
// connect 3 could work on 4x4, which should be the minimum size allowed
let players = 2;
const playerColors = ['#0000ff', '#ff0000', '#ffff00', '#800080', '#FFC0CB', '#87CEEB'];
const colorClasses = ['blue', 'red', 'yellow', 'purple', 'pink', 'skyblue']

// reset button clears all and starts over
const reset = document.querySelector('#reset');
reset.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

// FUNCTIONS: 
// make array for board piece tracking:
function makeBoard(height, width) {
    boardArray = [];
    for (let i = 0; i < height; i++) {
        boardArray.push([]);
        for (let j = 0; j < width; j++) {
            boardArray[i].push("space");
        }
    }
    return boardArray;
}

// lay out board in the DOM
function makeDOMBoard(height, width) {
    const boardHeader = document.querySelector('#board-header');
    boardHeader.innerText += ` ${connect}`;
    for (r = 0; r <= height; r++) {
        const newTr = document.createElement('tr');
        const newTrId = `row${r}`;
        newTr.setAttribute("id", newTrId)
        board.appendChild(newTr);
        for (c = 0; c < width; c++) {
            const newTd = document.createElement('td');
            const newTdId = columnLetters[c] + r;
            newTd.setAttribute("id", newTdId);
            newTd.classList.add(`row-${r}`)
            newTr.appendChild(newTd);
            if (r === 0) {
                const newButton = document.createElement('button');
                const newButtonId = `button-${columnLetters[c]}`
                newButton.setAttribute("id", newButtonId);
                newButton.classList.add("play-butts");
                newTd.appendChild(newButton);
            } else {
                const newDiv = document.createElement('div');
                newDiv.classList.add("space")
                newTd.appendChild(newDiv);
            }
        }
    }
}

function updateBoard(spaceId, playerId) {
    const colAlpha = spaceId[0];
    const col = columnLetters.indexOf(colAlpha);
    const rowInArr = spaceId[1] - 1;
    const colArr = boardArray[rowInArr];
    colArr.splice(col, 1, colorClasses[playerX]);
}

function loadSavedGame(board) {
    for (r = 0; r < board.length; r++) {
        const rowArr = board[r];
        for (c = 0; c < rowArr.length; c++) {
            // debugger;
            const idDuLoupe = `${columnLetters[c]}${(r + 1)}`;
            const tdDuLoupe = document.getElementById(`idDuLoupe`);
            const divDuLoupe = tdDuLoupe.children[0];
            divDuLoupe.classList.add(rowArr[c]);
        }
    }
    return board;
}

function readyPlayerX(x) {
    spaceId = "";
    clicked = false;
    gameResult = undefined;
    columnWorking = undefined;
    // debugger;
    for (c = 0; c < width; c++) {
        const button = document.getElementById(`button-${columnLetters[c]}`);
        button.style.backgroundColor = `${playerColors[x]}65`;
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = `${playerColors[x]}aa`;
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = `${playerColors[x]}65`;
        });
    }
    return;
}


function playTurn() {
    for (c = 0; c < width; c++) {
        const button = document.getElementById(`button-${columnLetters[c]}`);
        // const button = buttons[c];
        button.addEventListener('click', (e) => {
            clicked = true;
            columnWorking = e.toElement.id[7];
        });
    }
    // debugger;
    const interval = setInterval(() => {
        console.log('waiting for play');
        if (!!clicked) {
            clearInterval(interval);
            findSpace(columnWorking);
            dropTo(spaceId);
            checkForWin(boardArray, gameResult);
            if (gameResult === 'tie' || gameResult === 'win') {
                displayResult(gameResult, playerX);
            } else {
                readyPlayerX(playerX);
                playTurn();
            }
        }
    }, 1000);

}

function findSpace(columnWorking) {
    for (let r = height; r > 0; r--) {
        spaceId = `${columnWorking}${r}`;
        const tdDuJour = document.getElementById(spaceId);
        const tdChildren = tdDuJour.children;
        const divDuJour = tdChildren[0];
        if (divDuJour.className === 'space') {
            return spaceId;
        }
    }
}

function dropTo(spaceId) {
    const divToDrop = document.createElement('div');
    divToDrop.classList.add(colorClasses[playerX]);
    divToDrop.style.color = playerColors[playerX];
    const droppingTo = document.getElementById(spaceId);
    const divToBeReplaced = droppingTo.querySelector('div');
    // got the dropping part commented out until I can find the div and finish the dropping animation        
    // divToDrop.style.top = (-1 * 40 * spaceId[1]) + 'px';
    // setTimeout((divToDrop.style.top = '0px'), 350);
    droppingTo.removeChild(divToBeReplaced);
    droppingTo.appendChild(divToDrop);
    // that timeout is maybe important after the animation;
    // setTimeout(droppingTo.removeChild(divToBeReplaced), 400);
    updateBoard(spaceId, playerX);
    localStorage.setItem('gameInProgress', JSON.stringify(boardArray));
    return;
}

// TODO: these funciton still doesn't work, and I haven't even started to code the diagonal
// logic to look for 4-in-a-row
// or for a full board
// console.log(`checking for win`);
// console.log(boardArr);
function itsATie(boardArr) {
    // console.log(boardArr);
    for (let r = 0; r < boardArr.length; r++) {
        const thisRowArr = boardArr[r];
        for (let c = 0; c < thisRowArr.length; c++) {
            if (thisRowArr[c] === "space") {
                return false;
            }
        }
    }
    return true;
}

function winHorizontal(boardArr) {
    for (let r = (boardArr.length - 1); r >= 0; r--) {
        const thisRowArr = boardArr[r];
        let inARow = 1;
        for (let c = 0; c < boardArr.length; c++) {
            if (thisRowArr[c] !== "space" && (thisRowArr[c] === thisRowArr[c + 1])) {
                inARow++;
            } else {
                inARow = 1;
            };
            if (inARow >= connect) {
                return true;
            }
        }
    }
    return false;
}

function winVertical(boardArr) {
    for (let c = 0; c < height; c++) {
        let inAColumn = 1;
        for (let r = 0; r < boardArr.length - 1; r++) {
            const thisRowArr = boardArr[r];
            const nextRowArr = boardArr[r + 1];
            // console.log(`column check loops ${c}-${r}: ${inAColumn} in a column`);
            if (thisRowArr[c] !== "space" && (thisRowArr[c] === nextRowArr[c])) {
                inAColumn++;
            } else {
                inAColumn = 1;
            }
            if (inAColumn >= connect) {
                return true;
            }
        }
    }
    return false;
}

function winDiagonal(boardArr) {
    // note: this assumes the board is wider than it is high
    // when user-definable board is implemented, 
    // that should be a requirement for their boards
    // debugger;
    // diagonalRight goes ++ on both loops
    const diagRightBoard = [];
    for (r = 0; r < ((width - 1) * 2); r++) {
        const diagRow = [];
        for (c = 0; c < width; c++) {
            if ((r - c) < height) {
                const thisRow = boardArr[(r - c)];
                if (thisRow) {
                    const thisSpace = thisRow[c];
                    diagRow.push(thisSpace);
                }
            }
        }
        if (diagRow.length >= connect) {
            diagRightBoard.push(diagRow);
        }
    }
    if (!!winHorizontal(diagRightBoard)) { return true };

    // diagonalLeft not working yet
    const diagLeftBoard = [];
    for (r = ((width - 1) * 2); r >= 0; r--) {
        const diagRow = [];
        for (c = 0; c < width; c++) {
            if ((r - c) < height) {
                const thisRow = boardArr[(r - c)];
                if (thisRow) {
                    const thisSpace = thisRow[width - 1 - c];
                    if (thisSpace) {
                        diagRow.push(thisSpace);
                    }
                }
            }
        }
        if (diagRow.length >= connect) {
            diagLeftBoard.push(diagRow);
        }
    }
    if (!!winHorizontal(diagLeftBoard)) { return true };
    return false;
}


function checkForWin(boardArr, result) {
    if (itsATie(boardArr)) {
        result = 'tie'
    } else if (winHorizontal(boardArr)) {
        result = 'win'
    } else if (winVertical(boardArr)) {
        result = 'win'
    } else if (winDiagonal(boardArr)) {
        result = 'win'
    } else {
        result = 'play on'
    };
    if (result !== 'tie' && result !== 'win') {
        playerX++;
        if (playerX === players) { playerX = 0 };
        localStorage.setItem('ready player', playerX);
        spaceId = undefined;
        clicked = false;
    };
    gameResult = result;
    return result;
}

function displayResult(result, x) {
    // TODO make and style an alert, or make it a DIV that overlays everything....?
    const resultDiv = document.createElement('div');
    const restartButton = document.createElement('button');
    restartButton.id = "restart"
    restartButton.innerText = 'start a new game';

    let error;
    if (result === "win") {
        message = `Congratulations player ${x+1} (${colorClasses[x]}). You won!`;
    } else if (result === "tie") {
        // future maybe: find a way to restart the game with the person 
        // whose turn it should be after the tie starting?
        message = `No more spaces left. This game is a tie.`;
    } else {
        message = `I'm not sure why you're reading this. Sorry.`;
        resultDiv.classList.add('error');
    }
    resultDiv.innerText = message;
    resultDiv.classList.add('game-over');
    body.appendChild(resultDiv);
    setTimeout(() => {
        resultDiv.innerHTML += '<br>'
        resultDiv.appendChild(restartButton);
        restartButton.addEventListener('click', () => {
            body.removeChild(resultDiv);
            localStorage.clear();
            location.reload();
        });
    }, 500);
}



// if not, make an empty board

// commented out until I troubleshoot localStorage problem
makeBoard(height, width);
// DOM definitions of board items
// const buttons = document.querySelectorAll('button');
const spaces = document.querySelectorAll('.space');
const boardRows = document.querySelectorAll('tr');
const boardSpaces = document.querySelectorAll('td');

// now make it appear on screen
makeDOMBoard(height, width);

// restoring game from localStorage for future development:
// if (localStorage.getItem('gameInProgress')) {
//     // debugger;
//     boardArr = JSON.parse(localStorage.getItem('gameInProgress'));
//     playerX = localStorage.getItem('ready player');
//     loadSavedGame(boardArr);
// }


// finally, let's play!
// TODO? I think it's done in function waitForPlay, but if it isn't, it was: 
// I think there's a way to loop this until !!gameResult, it's a while loop, but that was when my freezing problems started
// loop set for 20 turns for now to troubleshoot loop causing freeze
// for (let turn = 1; !gameResult || turn > 20; turn++) {
readyPlayerX(playerX);
playTurn();