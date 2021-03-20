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

    // constructor() {
    //     this.categories = [];
    //     this.board = [];
    // }

    async playGame() {
        const categoryIds = await this.getCategoryIds();
        const categories = [];

        // not sure what this is...
        // async (categoryIds) {
        //     for (let categoryId of categoryIds) {
        //         categories.push(await getCategory(categoryId));
        //     };
        // }

        // const this.board = this.fillTable(categories);
    }

    /** Get NUM_CATEGORIES random category from API.
     *
     * Returns array of category ids
     */



    async getCategoryIds() {
        const categoriesArray = [];
        // const herdOfCats = await <-API call for a batch of categories->
        for (let i = 0; i < 6; i++)
            return categoriesArray;
    }

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

    // this might tickle my brain a bit: the board is in rows (because HTML Tables)
    // but the answers and questions logically belong in columns

    async fillTable(categories) {
        const answers = [];
        const questions = [];

        const board = { categories, answers, questions };
        return board;
    }

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

// this could change in future releases, 
// but the css to size the board will have to become responsive to that change
const numOfCategories = 6;
const answersPerCategory = 5;

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
        <thead>
            <tr id="category-row">
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const categoryRow = gameTable.querySelector('#category-row')
    const answersTbody = gameTable.querySelector('tbody');
    for (let a = 0; a <= answersPerCategory; a++) {
        const rowA = document.createElement('tr');
        rowA.id = `row${a}`;
        answersTbody.appendChild(rowA);
        for (let c = 1; c <= numOfCategories; c++) {
            const headerC = document.createElement('th');
            headerC.id = `${c}`;
            categoryRow.appendChild(headerC);
            const columnC = document.createElement('td');
            columnC.id = `${c}-${a}`;
            rowA.appendChild(columnC);
        };
    };
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
gameObj.playGame();