// const api_key = "RAycVgES4T56ucf5t724SVhocrEw3fXY";

class Gif {

    async getRandomGif(tag) {
        this.clearErrors();
        try {
            const queryString = `https://api.giphy.com/v1/gifs/random?api_key=RAycVgES4T56ucf5t724SVhocrEw3fXY&tag=${tag}&rating=g`;
            const gifResponse = await axios.get(queryString);
            this.displayGif(gifResponse.data.data.images.fixed_height.url);
        } catch (err) {
            this.displayError('Something went wrong. Please try again.');
        };
    };

    displayGif(gifUrl) {
        // gather the bits
        const gifDiv = document.querySelector('#gifs');
        const newGifContainer = document.createElement('figure');
        newGifContainer.classList.add('figure');
        const newGif = document.createElement('img');
        newGif.classList.add('figure-img', 'img-fluid', 'bg-info');
        newGif.src = gifUrl;
        const newGifCaption = document.createElement('figcaption');
        newGifCaption.classList.add('figure-caption');
        newGifCaption.innerHTML = `<a href="${gifUrl}" target="_blank" rel="noopener norefferer" class="text-white">direct link</a>`;
        // assemble the container
        newGifContainer.appendChild(newGif);
        newGifContainer.appendChild(newGifCaption);
        // now display it
        gifDiv.appendChild(newGifContainer);
    };

    displayError(err) {
        const errorDiv = document.querySelector('#errors');
        const newError = document.createElement('h3');
        newError.classList.add('bg-danger', 'text-warning', 'text-center', 'col', 'col-md-4', 'border', 'border-warning', 'rounded', 'm-2');
        newError.innerText = err;
        errorDiv.appendChild(newError);

    };

    clearErrors() {
        const errorDiv = document.querySelector('#errors');
        errorDiv.innerHTML = "";
    }
};

const searchButt = document.querySelector('#search');
const clearAll = document.querySelector('#clear-all');

searchButt.addEventListener('click', (e) => {
    e.preventDefault();

    const query = document.querySelector('#query');
    new Gif().getRandomGif(query.value);
    query.value = "";
});

clearAll.addEventListener('click', (e) => {
    console.log(e);
    e.preventDevault();
    const gifDiv = document.querySelector('#gifs');
    gifDiv.innerHTML = "";
});