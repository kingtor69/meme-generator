async function searchShows(query) {
    try {
        const returnArrOfObjs = [];
        const showResponse = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
        // debugger;
        for (let showDuLoupe of showResponse.data) {
            let image;
            if (!!showDuLoupe.show.image.original) {
                image = showDuLoupe.show.image.original;
            } else {
                image = "https://tinyurl.com/tv-missing";
            };
            returnArrOfObjs.unshift({
                id: showDuLoupe.show.id,
                name: showDuLoupe.show.name,
                summary: showDuLoupe.show.summary,
                image
            });
        }
        return returnArrOfObjs;
    } catch (err) {
        displayShowError(err);
        return `error ${err}`;
    }
}

function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();

    for (let show of shows) {
        const episodesId = `${show.id}-episodes-div`;
        const episodesUlId = `${show.id}-episodes-list`;
        let $showCard = $(`
        <div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
          <div class="card" data-show-id="${show.id}">
            <div class="card-body">
              <img class="card-img-top" src=${show.image} alt="Card image cap">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">${show.summary}</p>
                <button class="cart-text btn btn-block btn-secondary episode-buttons" data-show-name="${show.name}" id="${show.id}">see episode list</button>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" style="display: none" id="${episodesId}">
          <div class="card" data-show-id="">
            <div class="card-body">
              <h5 class="card-title">Episodes</h5> 
              <ul class="card-text" id="${episodesUlId}">
              </ul>
            </div>
          </div>
        </div>
      `);
        $(`#${show.id}`).data("name", show.name);
        $showsList.append($showCard);
    }
}

// TODO -- I don't think this works
function displayShowError(err) {
    console.log('show error ', err)
    // TODO: might want to make more user-friendly error message(s)
    let $showCard = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="">
           <div class="card" data-show-id="">
             <div class="card-body">
               <h5 class="card-title">Error</h5>
               <p class="card-text">${err}</p>
             </div>
           </div>
         </div>
        `);
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
    try {
        const episodesResponse = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
        const episodesOutput = [];
        for (let episode of episodesResponse.data) {
            const id = episode.id;
            const name = episode.name;
            const season = episode.season;
            const number = episode.number;
            episodesOutput.push({
                id,
                name,
                season,
                number
            });
        }
        // episodesOutput.unshift(id);
        return episodesOutput;
    } catch (err) {
        displayEpisodeError(err);
    }
}

function displayEpisodes(showName, episodes) {
    try {
        const $episodesList = $('#episodes-list');
        $episodesList.empty();
        const $episodesHeader = $(`<h3>${showName}</h3>`);
        $episodesList.prepend($episodesHeader);
        for (let episode of episodes) {
            const $episodeLi = $(`<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>`);
            $episodesList.append($episodeLi);
        }
        $('#episodes-area').show();
    } catch (err) {
        displayEpisodeError(err);
    }
}

function displayEpisodeError(err) {
    console.log('episode error ', err);
}

$("#search-form").on("submit", async function handleSearch(evt) {
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return;

    $("#episodes-area").hide();

    let shows = await searchShows(query);
    populateShows(shows);

    const $episodeButtons = $('.episode-buttons');
    for (button of $episodeButtons) {
        button.addEventListener('click', async function handleEpisodes(evt) {
            evt.preventDefault();
            const clickedId = evt.path[0].id;
            let episodes = await getEpisodes(clickedId);
            const $buttonOfId = $(`#${clickedId}`);
            const showName = $buttonOfId.data();
            displayEpisodes(showName.showName, episodes);
        })
    };
});