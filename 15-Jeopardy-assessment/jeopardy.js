class Game {

    constructor() {
        this.board = [];
    }

    async playGame() {
        this.showLoadingView();
        const categoryIds = await this.getCategoryIds();
        const categories = [];
        for (let catId of categoryIds) {
            categories.push(await this.getCategory(catId));
        };
        await this.buildBoard(categories);
        this.hideLoadingView();
        await this.fillHtmlTable();
    }

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

    async replaceFalsyCategory(categories) {
        // get a new offset between 1st and 9,999th
        const offset = Math.floor(Math.random() * 10000);
        // get the category at that offset
        const probyCat = await axios.get(`http://jservice.io/api/categories?offset=${offset}`);
        for (let i = 0; i < categories.length; i++) {
            if (probyCat.data.id === categories[i].data.id) {
                this.replaceFalsyCategory(categories);
            }
            if (!categories[i]) {
                categories.slice(categories[i], 1, probyCat);
            }
        }
        return categories;
    };

    async getCategory(catId) {
        const category = await axios.get(`http://jservice.io/api/category?id=${catId}`);
        return category;
    }

    buildBoard(categories) {
        this.board = [];
        let c = 0;
        for (let category of categories) {
            const clues = this.get5Clues(category);
            if (!clues) {
                this.replaceFalsyCategory(categories);
            }
            const objeeDuLoupe = { category };
            objeeDuLoupe[c] = clues;
            this.board.push(objeeDuLoupe);
        }
    }

    get5Clues(category) {
        const clues = [];
        let unusedCluesCount = category.data.clues_count;
        try {

            if (unusedCluesCount === 5) {
                let a = 0;
                for (let clue of category.data.clues) {
                    if (!(clue.invalid_count < 1)) {
                        // note: I had that at 2 and found a clue without any question (category 17930, data.clues[3])
                        // I tried to use the http://jservice.io/api/invalid?id=130153 (the clue ID), but it gave me a 404
                        // so I lowered the invalid-count threshhold to at least get fewer of these
                        category = null;
                        return null;
                    }
                    clues.push(clue);
                };
                // category.data.clues = clues;
                // return clues;
            } else if (unusedCluesCount > 5) {
                let a = 0;
                while (a < 5) {
                    if (!false) {
                        console.log('you are here (line 99)');
                        // TODO: get some logic here and a test that isn't !false
                        a++;
                    } else if (category.data.clues_count === a) {
                        category = null;
                        this.replaceFalsyCategory(category);
                    } else {
                        throw new Error("you got in an infinite loop. mah bad.");
                    }
                }
            } else {
                category = null;
                this.replaceFalsyCategory(categories);
            }
            return clues;
        } catch (err) {
            alert("Oops. Looks like I made an infinite loop. Sorry.");
        }
    }

    fillHtmlTable() {
        // if I can figure out a way to have these load randomly every 100ms or so
        // and change their classess as they do
        // THAT would be badass
        for (let c = 0; c < this.board.length; c++) {
            const $catC = $(`#${c}`);
            $catC.text(this.board[c].category.data.title);
        };
        const $tds = $('td');
        $tds.text('???');
        $tds.addClass('blank');
    }

    handleClick(evt) {
        const clickedId = evt.path[0].id;
        const $clickedTd = $(`#${clickedId}`);
        const clickedClass = $clickedTd.attr('class');
        const categoryNum = clickedId[0];
        const answerNum = clickedId[2];
        if (clickedClass.includes("questioned")) {
            $clickedTd.html(this.board[categoryNum].category.data.clues[answerNum].answer);
            $clickedTd.addClass('answered');
            return;
        } else if (clickedClass.includes("answered")) {
            return;
        } else {
            $clickedTd.html(this.board[categoryNum].category.data.clues[answerNum].question);
            $clickedTd.addClass('questioned');
            return;
        }
    }

    showLoadingView() {
        $('th').removeClass('loaded');
        $('td').removeClass('loaded');
        $('button').removeClass('loaded');
    }

    hideLoadingView() {
        $('th').addClass('loaded');
        $('td').addClass('loaded');
        $('button').addClass('loaded');
    }

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
        <thead>
            <tr>
                <th id="0"></th>
                <th id="1"></th>
                <th id="2"></th>
                <th id="3"></th>
                <th id="4"></th>
                <th id="5"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="0-0"></td>
                <td id="1-0"></td>
                <td id="2-0"></td>
                <td id="3-0"></td>
                <td id="4-0"></td>
                <td id="5-0"></td>
            </tr>
            <tr>
                <td id="0-1"></td>
                <td id="1-1"></td>
                <td id="2-1"></td>
                <td id="3-1"></td>
                <td id="4-1"></td>
                <td id="5-1"></td>
            </tr>
            <tr>
                <td id="0-2"></td>
                <td id="1-2"></td>
                <td id="2-2"></td>
                <td id="3-2"></td>
                <td id="4-2"></td>
                <td id="5-2"></td>
            </tr>
            <tr>
                <td id="0-3"></td>
                <td id="1-3"></td>
                <td id="2-3"></td>
                <td id="3-3"></td>
                <td id="4-3"></td>
                <td id="5-3"></td>
            </tr>
            <tr>
                <td id="0-4"></td>
                <td id="1-4"></td>
                <td id="2-4"></td>
                <td id="3-4"></td>
                <td id="4-4"></td>
                <td id="5-4"></td>
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
        GameOn.handleClick(evt);
    })
}
for (let button of gameBtns) {
    button.addEventListener('click', function(evt) {
        GameOn.handleClick(evt);
    })
}
newGameButton.addEventListener('click', function() {
    GameOn = new Game;
    GameOn.playGame();
});

let GameOn = new Game;
GameOn.playGame();