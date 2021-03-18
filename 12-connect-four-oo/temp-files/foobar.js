    const newGameBtn = document.querySelector('#new-game');
    newGameBtn.addEventListener('click', function() {
        console.log('restart');
    });
//     function playerInfoGrid() {
//     const playerTable = createElement('table');
//     playerTable.setAttribute('id', 'players');
//     const playerNumbers = createElement('tr');
//     playerNumbers.setAttribute('id', 'player-numbers');
//     const playerNames = createElement('tr');
//     playerNames.setAttribute('id', 'player-names');
//     const playerColors = createElement('tr');
//     playerColors.setAttribute('id', 'player-colors');

//     const player1Number = createElement('td');
//     player1Number.setAttribute('id', 'player1-number');
//     player1Number.innerText = '1';
//     const player1Name = createElement('td');
//     // player1Name.setAttribute('id', 'player1-name');
//     // player1Name.innerText = this.name;
//     const player1Color = createElement('td');
//     // player1Color.setAttribute('id', 'player1-color');
//     player1Color.innerText = 'blue';

//     const player2Number = createElement('td');
//     // player2Number.setAttribute('id', 'player2-number');
//     player2Number.innerText = '2';
//     const player2Name = createElement('td');
//     // player2Name.setAttribute('id', 'player2-name');
//     // player2Name.innerText = this.name;
//     const player2Color = createElement('td');
//     player2Color.setAttribute('id', 'player2-color');
//     player2Color.innerText = 'blue';

//     body.appendChild(playerTable);
//     playerTable.appendChild(playerNumbers);
//     playerNumbers.appendChild(player1Number);
//     playerNumbers.appendChild(player2Number);
//     playerTable.appendChild(playerNames);
//     playerNames.appendChild(player1Name);
//     playerNames.appendChild(player2Name);
//     playerTable.appendChild(playerColors);
//     playerColors.appendChild(player1Color);
//     playerColors.appendChild(player2Color);
// }