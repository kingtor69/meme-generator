const catBtns = document.querySelectorAll('th');
const gameBtns = document.querySelectorAll('td');

console.log(catBtns);
console.log(gameBtns);
for (let button of catBtns) {
    button.addEventListener('click', function(evt) {
        console.log(evt.path[0].id);
    })
}
for (let button of gameBtns) {
    button.addEventListener('click', function(evt) {
        console.log(evt.path[0].id);
    })
}