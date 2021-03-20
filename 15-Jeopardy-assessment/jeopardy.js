class Game {

    // categories is the main data structure for the app; it looks like this:

    //  [
    //    { title: "Math",
    //      clues: [
    //        {question: "2+2", answer: 4, showing: null},
    //        {question: "1+1", answer: 2, showing: null}
    //        ...
    //      ],
    //    },
    //    { title: "Literature",
    //      clues: [
    //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
    //        {question: "Bell Jar Author", answer: "Plath", showing: null},
    //        ...
    //      ],
    //    },
    //    ...
    //  ]

    constructor() {
        this.categories = [];
        this.board = [];
    }

    playGame() {
        console.log('well, here we are. now what?');
        this.createHtmlBoard();
        this.categories = getCategoryIds();
    }

    /** Get NUM_CATEGORIES random category from API.
     *
     * Returns array of category ids
     */



    getCategoryIds() {}

    /** Return object with data about a category:
     *
     *  Returns { title: "Math", clues: clue-array }
     *
     * Where clue-array is:
     *   [
     *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
     *      {question: "Bell Jar Author", answer: "Plath", showing: null},
     *      ...
     *   ]
     */

    async getCategory(catId) {}

    /** Fill the HTML table#jeopardy with the categories & cells for questions.
     *
     * - The <thead> should be filled w/a <tr>, and a <td> for each category
     * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
     *   each with a question for each category in a <td>
     *   (initally, just show a "?" where the question/answer would go.)
     */

    async fillTable() {}

    /** Handle clicking on a clue: show the question or answer.
     *
     * Uses .showing property on clue to determine what to show:
     * - if currently null, show question & set .showing to "question"
     * - if currently "question", show answer & set .showing to "answer"
     * - if currently "answer", ignore click
     * */

    handleClick(evt) {
        const clickedId = evt.path[0].id;

    }

    /** Wipe the current Jeopardy board, show the loading spinner,
     * and update the button used to fetch data.
     */

    showLoadingView() {}

    /** Remove the loading spinner and update the button used to fetch data. */

    hideLoadingView() {}

    /** Start game:
     *
     * - get random category Ids
     * - get data for each category
     * - create HTML table
     * */

    async setupAndStart() {}

    /** On click of start / restart button, set up game. */

    // TODO

    /** On page load, add event handler for clicking clues */

    // TODO
};


function start() {
    const body = document.querySelector('body');
    const h1 = document.createElement('h1');
    h1.innerText = "Jeopardy!";
    const gameSection = document.createElement('section');
    gameSection.id = "game-container";
    const gameBoardDiv = document.createElement('div');
    gameBoardDiv.id = "game-board-div";
    const newGameButton = document.createElement('button');
    newGameButton.id = "new-game-button";
    newGameButton.innerText = "Start New Game";
    body.appendChild(h1);
    body.appendChild(gameSection);
    gameSection.appendChild(gameBoardDiv);
    gameSection.appendChild(newGameButton);
    createHtmlBoard();
};

function createHtmlBoard() {
    const gameBoardDiv = document.querySelector('#game-board-div');
    const gameTable = document.createElement('table');
    gameTable.id = "game-table"
    gameTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th id="1"></th>
                    <th id="2"></th>
                    <th id="3"></th>
                    <th id="4"></th>
                    <th id="5"></th>
                    <th id="6"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="1-1"></td>
                    <td id="1-2"></td>
                    <td id="1-3"></td>
                    <td id="1-4"></td>
                    <td id="1-5"></td>
                    <td id="1-6"></td>
                </tr>
                <tr>
                    <td id="2-1"></td>
                    <td id="2-2"></td>
                    <td id="2-3"></td>
                    <td id="2-4"></td>
                    <td id="2-5"></td>
                    <td id="2-6"></td>
                </tr>
                <tr>
                    <td id="3-1"></td>
                    <td id="3-2"></td>
                    <td id="3-3"></td>
                    <td id="3-4"></td>
                    <td id="3-5"></td>
                    <td id="3-6"></td>
                </tr>
                <tr>
                    <td id="4-1"></td>
                    <td id="4-2"></td>
                    <td id="4-3"></td>
                    <td id="4-4"></td>
                    <td id="4-5"></td>
                    <td id="4-6"></td>
                </tr>
                <tr>
                    <td id="5-1"></td>
                    <td id="5-2"></td>
                    <td id="5-3"></td>
                    <td id="5-4"></td>
                    <td id="5-5"></td>
                    <td id="5-6"></td>
                </tr>
            </tbody>
        </table>
    `;
    gameBoardDiv.appendChild(gameTable);
};

start();

const catBtns = document.querySelectorAll('th');
const gameBtns = document.querySelectorAll('td');
const newGameButton = document.querySelector('#new-game-button');
for (let button of catBtns) {
    button.addEventListener('click', function(evt) {
        gameObj.handleClick(evt);
    })
}
for (let button of gameBtns) {
    button.addEventListener('click', function(evt) {
        console.log(evt.path[0].id);
    })
}
newGameButton.addEventListener('click', function() {
    gameObj = new Game;
    gameObj.playGame();
});

let gameObj = new Game;
firstGameObj.playGame();