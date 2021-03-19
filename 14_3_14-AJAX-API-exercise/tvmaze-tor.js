/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
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
        console.log(returnArrOfObjs);
        return returnArrOfObjs;
    } catch (err) {
        displayShowError(err);
        return `error ${err}`;
    }
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();
    episodeButtons.splice(0, episodeButtons.length);

    for (let show of shows) {
        const episodesId = `${show.id}-episodes-div`;
        const episodesUlId = `${show.id}-episodes-list`;
        let $item = $(`
        <div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
          <div class="card" data-show-id="${show.id}">
            <div class="card-body">
              <img class="card-img-top" src=${show.image} alt="Card image cap">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">${show.summary}</p>
                <button class="cart-text btn btn-block btn-secondary episode-buttons" id="${show.id}">see episode list</button>
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
        $showsList.append($item);
        episodeButtons.unshift(document.getElementById(show.id));
    }
}

function displayShowError(err) {
    console.log('show error ', err)
    let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="">
           <div class="card" data-show-id="">
             <div class="card-body">
               <h5 class="card-title">Error</h5>
                // TODO: might want to make more user-friendly error message(s)
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

//  $("#search-form").on("submit", async function handleSearch (evt) {
//   evt.preventDefault();

//   let query = $("#search-query").val();
//   if (!query) return;

//   $("#episodes-area").hide();

//   let shows = await searchShows(query);

//   populateShows(shows);
// });

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
            episodesOutput.unshift({
                id,
                name,
                season,
                number
            });
        }
        episodesOutput.unshift(id);
        return episodesOutput;
    } catch (err) {
        displayEpisodeError(err);
        return [`error ${err}`];
    }
    // TODO: get episodes from tvmaze
    //       you can get this by making GET request to
    //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

    // TODO: return array-of-episode-info, as described in docstring above
}

function displayEpisodes(episodes) {
    console.log('display episodes?');
    try {
        console.log(episodes);
        console.log(episodes.length);
        // debugger;
        const showUlId = `${episodes[0]}-episodes-list`;
        const episodesUl = document.getElementById(showUlId);
        for (let i = 1; i < episodes.length; i++) {
            console.log(`loop of i=${i}`);
            console.log(episodes[i]);
            const liOfI = document.createElement('li');
            liOfI.id = episode.id;
            liOfI.innerText = `${episode.name} (season ${episode.season}, number ${episode.number})`;
            episodesUl.appendChild(liOfI);
            //       episodesUl.innerHTML += `
            //   <li ID="${episode.id}">${episode.name} (season ${episode.season}, number ${episode.number})</li>
            // `;
        }
        episodesUl.classList.remove(Hide);
        episodesUl.classList.add(Show);
    } catch (err) {
        return `episode display error ${err}`;
    }
}

function displayEpisodeError(err) {
    console.log('episode error ', err);
}

// TODO: can probably purify this code even further and get rid of this...
const episodeButtons = [];

$("#search-form").on("submit", async function handleSearch(evt) {
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return;

    // $("#episodes-area").hide();

    // TODO: error messages still aren't working, but at least I've got it to display the show and not hide everything when there's an error
    let shows = await searchShows(query);
    if (typeof shows[0] === "string" && shows[0].startsWith("error")) {
        shows.splice(0, 1);
        return;
    } else(populateShows(shows));

    // TODO: (see purification idea above) ...by putting a querySelectAll here for the episode buttons
    if (episodeButtons.length > 0) {
        for (let button of episodeButtons) {
            button.addEventListener('click', async function handleEpisodes(evt) {
                evt.preventDefault();
                const episodesArr = [];
                // I think this next line is the root of my problems
                // maybe I should go back to the way I did the shows 
                // with putting the button.ids in an array, 
                // checking [0] for error message,
                // THEN iterating

                const episodeArray = (await getEpisodes(button.id));
                // console.log(episodeArray);
                if (typeof episodeArray[0] === "string" && !episodeArray[0].startsWith("error")) {
                    // console.log("got some, now let's display them");
                    displayEpisodes(episodeArray);
                };
            });
        };
    };
});