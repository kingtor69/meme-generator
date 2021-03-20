// global variable definitions
const form = document.querySelector('#meme-form');
const image = document.querySelector('#image-link');
const textInputBottom = document.querySelector('#bottom-text');
const textInputTop = document.querySelector('#top-text');
const memeSection = document.querySelector('#memes');
let clearMemeBtns = document.querySelectorAll('.delete-meme');
let clearMemeId;
let memeNumber = localStorage.getItem('memeNumber') || 0;
let currentDisplayedMemes = memeSection.querySelectorAll('.container-containers');

// functions
function memesFromStorage () {
    for (let item in localStorage) {
        if (item.includes('memeNumber')) {
            const thisMemeArr = JSON.parse(localStorage.getItem(item));
            makeMeme(thisMemeArr);   
        }
    };
}

function makeMeme (arr) {
    const containerContainer = document.createElement('div');
    containerContainer.classList.add('container-container');
    containerContainer.id = `meme-id${arr[3]}`;
    const newMemeContainer = document.createElement('div');
    newMemeContainer.classList.add('meme-container');
    // newMemeContainer.id = `meme-id${arr[3]}`;
    newMemeContainer.innerHTML = `<img src="${arr[0]}" class="meme-image"></img>`
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

    memeSection.appendChild(containerContainer);
    containerContainer.appendChild(newMemeContainer);
    newMemeContainer.appendChild(newTopTextDiv);
    newMemeContainer.appendChild(newBottomTextDiv);
    newMemeContainer.appendChild(newClearBtn);
    const divNewMeme = memeSection.querySelector('.meme-container');
    
    clearMemeBtns = document.querySelectorAll('.delete-meme');
    memeNumber++;
}

// what makes it go:
memesFromStorage();

// defines buttons to clear individual memes for localStorage:
// clearMemeBtns = document.querySelectorAll('.delete-meme');
currentDisplayedMemes = memeSection.querySelectorAll('.container-container'); 
for (let i = 0; i < currentDisplayedMemes.length; i++) {
    const currentDisplayedMeme = currentDisplayedMemes[i];
    const memeIdToDelete = currentDisplayedMeme.id;
    const numberToDelete = memeIdToDelete.replace("meme-id", "");
    const deleteBtn = currentDisplayedMemes[i].querySelector('button');
    deleteBtn.onclick = function (e) {
        currentDisplayedMeme.remove();
        for (let item in localStorage) {
            if (item.includes('memeNumber')) {
                const thisMemeArr = JSON.parse(localStorage.getItem(item));
                if (thisMemeArr[3] == numberToDelete) {
                    localStorage.removeItem(item);
                }
            }
        }
    }
}

// new meme form submitted:
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let textTop = textInputTop.value;
    let textBottom = textInputBottom.value;
    textTop = textTop.toUpperCase();
    textBottom = textBottom.toUpperCase();
    const thisMemeArr = [image.value, textTop, textBottom, memeNumber];
    makeMeme (thisMemeArr);
    
    // copy pasted logic from meme buttons found after loading memes from storage (line 54)
    currentDisplayedMemes = memeSection.querySelectorAll('.container-container'); 
    for (let i = 0; i < currentDisplayedMemes.length; i++) {
        const currentDisplayedMeme = currentDisplayedMemes[i];
        const memeIdToDelete = currentDisplayedMeme.id;
        const numberToDelete = memeIdToDelete.replace("meme-id", "");
        const deleteBtn = currentDisplayedMemes[i].querySelector('button');
        deleteBtn.onclick = function (e) {
            currentDisplayedMeme.remove();
            for (let item in localStorage) {
                if (item.includes('memeNumber')) {
                    const thisMemeArr = JSON.parse(localStorage.getItem(item));
                    if (thisMemeArr[3] == numberToDelete) {
                        localStorage.removeItem(item);
                    }
                }
            }
        }
    }    
    
    // store new meme to localStorage
    const thisMemeStringified = JSON.stringify(thisMemeArr);
    localStorage.setItem(`memeNumber${memeNumber}`, thisMemeStringified);
    
    // get ready for the next one
    form.reset();
});



// TODO LIST:
// placement of subsequent memes. god. damn.