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

let errorIndex = 2;
try {
    throw new Error(errorIndex);
} catch (err) {
    console.log(err);
    console.log(typeof err);
    for (let key in err) {
        console.log(key);
    }
    // err is an object, but I can't seem to destructure it
}

const animationTest = document.querySelector('#animation-test');
animationTest.addEventListener('click', function() {
    console.log('click');
    animationTest.classList.toggle('animate');
});