// redefine buttons to clear individual memes to get the new one:
clearMemeBtns = document.querySelectorAll('.delete-meme');
console.log(`clearMemeBtns inside form event listener. clearMemeBtns = ${clearMemeBtns}, .length = ${clearMemeBtns.length}`);
// this loop isn't getting the right numbers, maybe needs to be a 
// for (let item in localStorage) kind of deal, but with ids....
const displayedMemes = memeSection.querySelectorAll('.container-containers');
console.log (displayedMemes);
for (let i = 0; i < clearMemeBtns.length; i ++) {
    console.log(`getting button ${i}`)
    const thisEvent = clearMemeBtns[i];
    thisEvent.onclick = function (e) {
        // console.log(`now you've clicked button ${i}`);
        const deleteId = e.target.parentNode.id;
        const deleteNumber = deleteId.replace("meme-id", "");
        const deleteStorageId = `memeNumber${deleteNumber}`;
        let deleteElement = document.getElementById(deleteId);
        deleteElement.remove();
        localStorage.removeItem(deleteStorageId);
        // memeNumber--;
    }
}