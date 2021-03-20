const form = document.querySelector('#meme-form');
const image = document.querySelector('#image-link');
const textInputBottom = document.querySelector('#bottom-text');
const textInputTop = document.querySelector('#top-text');
// const capsOrNo = document.querySelectorAll('input[type=radio]');
const clearAll = document.querySelector('#clear-memes');
// const fontSize = document.querySelectorAll('.font-size');
// const allCaps = document.querySelector('input[type=radio]#all-caps');
// const asWritten = document.querySelector('#as-written');
// const lowerCase = document.querySelector('input[type=radio]#lowerCase');
const memeContainer = document.querySelector('#memes');
let clearMemeBtns;
let clearMemeId;
// console.log(localStorage.getItem(memeNumber));
let memeNumber = localStorage.getItem('memeNumber') || 0;

// generate memes from localStorage
function memesFromStorage () {
    for (let i = 0; i < localStorage.length; i++) {
        // let thisImage = `image${i}`;
        // let thisTextTop = `textTop.value${i}`;
        // let thisTextBottom = `textBottom.value${i}`;
        // let memeNumberX = `memeNumber${i}`;
        const thisMemeArr = JSON.parse(localStorage.getItem(`memeNumber${i}`));
        // [
        //     localStorage.getItem(thisImage), 
        //     localStorage.getItem(thisTextTop), 
        //     localStorage.getItem(thisTextBottom),
        //     localStorage.getItem(memeNumberX)
        // ];
        makeMeme(thisMemeArr);
    };
}

function defineClearBtn (i) {

    console.log(`pushing buttons; clearMeme.value (array) = ${clearMeme.value}`);
    // that returns undefined, clearMeme is an empty Node []
    // console.log(`clearMeme.value[i] = ${clearMeme.value[i]}`);
    // clearMeme[i].addEventListener('click', function (e) {
    //     e.preventDefault();
    //     const idToRemove = document.getElementById(`meme-id${idNumber}`);
    //     idToRemove.remove();
    //     localStorage.removeItem(`memeNumber${idNumber}`)
    // });
}

// function clearBtns () {
//     for (let i=0; i < clearMeme.length; i++) {
//         clearMeme[i].addEventListener('click', function (e) {
//             e.preventDefault();
//             const idToRemove = document.getElementById(`meme-id${idNumber}`);
//             idToRemove.remove();
//             localStorage.removeItem(`memeNumber${idNumber}`)
//         });
//     }
// }

function makeMeme (arr) {
    // debugger;
    // console.log(`array into makeMeme function = ${arr}`);
    // console.log(`memeContainer.innerHTML at start of function = ${memeContainer.innerHTML}`);
    const newMemeContainer = document.createElement('div');
    newMemeContainer.classList.add('meme-container');
    // newMemeContainer. -- now add the id `meme-id${arr[3]}`
    newMemeContainer.id = `meme-id${arr[3]}`;
    const newImageDiv = document.createElement('div');
    newImageDiv.classList.add('meme-image');
    newImageDiv.innerHTML = `<img src="${arr[0]}"></img>`
    const newTopTextDiv = document.createElement('div');
    newTopTextDiv.classList.add('meme-text');
    newTopTextDiv.classList.add('top');
    newTopTextDiv.innerText = arr[1];
    const newBottomTextDiv = document.createElement('div');
    newBottomTextDiv.classList.add('meme-text');
    newBottomTextDiv.classList.add('bottom');
    newBottomTextDiv.innerText = arr[2];
    const newClearBtn = document.createElement('button');
    newClearBtn.classList.add('delete-meme');
    newClearBtn.innerText = "X";
     
    // `<div class="meme-container" id="meme-id-${arr[3]}></div>`;
    memeContainer.appendChild(newMemeContainer);
    newMemeContainer.appendChild(newImageDiv);
    newMemeContainer.appendChild(newTopTextDiv);
    newMemeContainer.appendChild(newBottomTextDiv);
    newMemeContainer.appendChild(newClearBtn);
    
    // console.log(`memeContainer.innerHTML after += new div = ${memeContainer.innerHTML}`);
    
    const divNewMeme = memeContainer.querySelector('.meme-container');
    // console.log(`divNewMeme.innerHTML is ${divNewMeme.innerHTML}`);
    
    // divNewMeme.innerHTML = `
    //     <div>
    //         <img src="${arr[0]}" class="meme-image">
    //     </div>
    //     <div class="meme-text top">${arr[1]}</div>
    //     <div class="meme-text bottom">${arr[2]}</div>
    //     <button class="delete-meme">X</button>
    // ` 
    // defineClearBtn(arr[3]);

    clearMemeBtns = document.querySelectorAll('.delete-meme');

}

memesFromStorage();
// -----tried this:
// clearBtns();
// ------ and this:
// for (let i=0; i < clearMeme.length; i++) {
//     console.log(`trying to clear meme #${i} here`);
//     clearMeme[i].addEventListener('click', function (e) {
//         e.preventDefault();
//         const idToRemove = document.getElementById(`meme-id${idNumber}`);
//         idToRemove.remove();
//         localStorage.removeItem(`memeNumber${idNumber}`)
//     });
// }​
// ---- how about this? 
// -- also tried clearMemeBtns[i].onclick = 
// -- both threw a TypeError: 
// -- Cannot read property 'addEventListener' of undefined

// this worked, but only on stored memes: 
// ----- start something that worked
clearMemeBtns = document.querySelectorAll('.delete-meme');
for (let i = 0; i < clearMemeBtns.length; i ++) {
    const thisEvent = clearMemeBtns[i];
    thisEvent.onclick = function (e) {
        const deleteId = e.target.parentNode.id;
        const deleteNumber = deleteId.replace("meme-id", "");
        const deleteStorageId = `memeNumber${deleteNumber}`;
        let deleteElement = document.getElementById(deleteId);
        deleteElement.remove();
        localStorage.removeItem(deleteStorageId);
    }
}
// ----- end of that thing that worked

    // clearMemeBtns[i].addEventListener('click', function(e) {
    //     console.log (`clear this meme: ${e}`);
    // });

// define clear buttons for stored memes
// for (let i=0; i < clearMeme.length; i++) {
//     defineClearBtn(i);
// }

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let textTop = textInputTop.value;
    let textBottom = textInputBottom.value;
    // console.log (allCaps, lowerCase);
    // if (allCaps.value === "checked") {
        textTop = textTop.toUpperCase();
        textBottom = textBottom.toUpperCase();
    // } else if (lowerCase.value === "checked") {
    //     textTop = textTop.toLowerCase();
    //     textBottom = textBottom.toLowerCase();
    // };
    
    // make this meme:
    const thisMemeArr = [image.value, textTop, textBottom, memeNumber];
    // console.log(`make meme from array: ${thisMemeArr}`);
    makeMeme (thisMemeArr);
    // ----- start something that worked
    clearMemeBtns = document.querySelectorAll('.delete-meme');
    for (let i = 0; i < clearMemeBtns.length; i ++) {
        const thisEvent = clearMemeBtns[i];
        thisEvent.onclick = function (e) {
            const deleteId = e.target.parentNode.id;
            const deleteNumber = deleteId.replace("meme-id", "");
            const deleteStorageId = `memeNumber${deleteNumber}`;
            let deleteElement = document.getElementById(deleteId);
            deleteElement.remove();
            localStorage.removeItem(deleteStorageId);
        }
    }
    // ----- end of that thing that worked

    const thisMemeStringified = JSON.stringify(thisMemeArr);
    // console.log(`store stringified meme array ${thisMemeStringified}`);

    // store meme data to localStorage
    localStorage.setItem(`memeNumber${memeNumber}`, thisMemeStringified);
    // const imageX = `image${memeNumber}`;
    // const textTopX = `textTop.value${memeNumber}`;
    // const textBottomX = `textBottom.value${memeNumber}`;
    // localStorage.setItem(imageX, image.value);
    // localStorage.setItem(textTopX, textTop);
    // localStorage.setItem(textBottomX, textBottom);
    // localStorage.setItem(memeNumberX, memeNumber);

    // const memeNumberX = `memeNumber${memeNumberr}`;
    // const fontSizeTopX = `fontSizeTop.value${memeNumber}`;
    // const fontSizeBottomX = `fontSizeBottom.value${memeNumber}`;

    form.reset();
    // clearBtns();

    // clearMeme[memeNumber].addEventListener('click', function (e) {
    //     console.log(`trying to clear a new meme here`);
    //     e.preventDefault();
    //     const idToRemove = document.getElementById(`meme-id${idNumber}`);
    //     idToRemove.remove();
    //     localStorage.removeItem(`memeNumber${idNumber}`)
    // });
    
    memeNumber++;
    
    // localStorage.setItem('memeNumber', memeNumber);
});

clearAll.addEventListener ('click', function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(false); 
    // a: why is reload struck-through when it seems to work?
    // (do I care?)
    // b: is reloading the best way to clear memes from the page, too?
    // (maybe, but again: do I care?)
});