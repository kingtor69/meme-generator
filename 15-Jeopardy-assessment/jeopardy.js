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
        for (let catId of categoryIds) {
            categories.push(await this.getCategory(catId));
        };
        // TODO: now get questions and answers;

        // const this.board = this.fillTable(categories);
    }

    /** Get NUM_CATEGORIES random category from API.
     *
     * Returns array of category ids
     */


    // 100 100s
    async getCategoryIds() {
        const categoryIds = [];
        const offset = Math.floor(Math.random() * 100) * 100;
        try {
            const herdOfCats = await axios.get(`http://jservice.io/api/categories?count=100&offset=${offset}`);
            for (let i = 0; i < 6;) {
                const catId = herdOfCats.data[Math.floor(Math.random() * 100)].id;
                if (!categoryIds.includes(catId)) {
                    categoryIds.push(catId);
                    i++;
                }
            }
            return categoryIds;
        } catch (err) {
            this.displayError(err);
        }
    }

    displayError(err) {
        alert(`Something went wrong. It's me, not you. Try a new game. ${err}`);
    }

    // I don't think I'll ever use this, but it will be useful when adapted to invalid clues
    async replaceCategoryId(categoryIds) {
        let probyId;
        // get a new ID between 1st and 9,999th
        for (let catId of categoryIds) {
            if (!catId) {
                const offset = Math.floor(Math.random() * 10000);
                const probyCat = await axios.get(`http://jservice.io/api/categories?offset=${offset}`);
                probyId = probyCat.data[0].id
            }
        }
        for (let catId of categoryIds) {
            if (probyId === catId) {
                replaceCategoryId(categoryIds);
            }
        }
        for (let catId of categoryIds) {
            if (!catId) {
                categoryIds.slice(catId, 1, probyId);
            }
        }
    };
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
    async getCategory(catId) {
        const category = await axios.get(`http://jservice.io/api/category?id=${catId}`);
        return category;
    }

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
        console.log(`clicked on ${clickedId}. What are you gonna do about it?`)
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
                <td id="2-1"></td>
                <td id="3-1"></td>
                <td id="4-1"></td>
                <td id="5-1"></td>
                <td id="6-1"></td>
            </tr>
            <tr>
                <td id="1-2"></td>
                <td id="2-2"></td>
                <td id="3-2"></td>
                <td id="4-2"></td>
                <td id="5-2"></td>
                <td id="6-2"></td>
            </tr>
            <tr>
                <td id="1-3"></td>
                <td id="2-3"></td>
                <td id="3-3"></td>
                <td id="4-3"></td>
                <td id="5-3"></td>
                <td id="6-3"></td>
            </tr>
            <tr>
                <td id="1-4"></td>
                <td id="2-4"></td>
                <td id="3-4"></td>
                <td id="4-4"></td>
                <td id="5-4"></td>
                <td id="6-4"></td>
            </tr>
            <tr>
                <td id="1-5"></td>
                <td id="2-5"></td>
                <td id="3-5"></td>
                <td id="4-5"></td>
                <td id="5-5"></td>
                <td id="6-5"></td>
            </tr>
        </tbody>
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
        gameObj.handeClick(evt);
    })
}
newGameButton.addEventListener('click', function() {
    gameObj = new Game;
    gameObj.playGame();
});

let gameObj = new Game;
gameObj.playGame();