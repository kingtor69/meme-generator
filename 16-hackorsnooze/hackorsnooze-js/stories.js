"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
    storyList = await StoryList.getStories();
    $storiesLoadingMsg.remove();

    putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
    // favorite checkbox added by Tor
    const hostName = story.getHostName();
    const storyId = story.storyId;
    let favClass = "far";
    if (currentUser) {
        if (currentUser.isStoryFavorited(storyId)) {
            favClass = "fas"
        };
    };
    // console.log(story);
    // console.log(currentUser);
    // debugger;
    try {
        if (currentUser.username === story.username) {
            return $(`
                <li id="${story.storyId}">
                  <a href="${story.url}" target="a_blank" class="story-link">
                    ${story.title}
                  </a>
                  <small class="story-hostname">(${hostName})</small>
                  <small class="story-author">by ${story.author}</small>
                  <br>
                  <label for="fav-${story.storyId}">favorite <i id="heart-${story.storyId}" class="${favClass} fa-heart"></i> &nbsp;</label>
                  <input type="checkbox" class="story-favorite" id="fav-${story.storyId}">
                  <small class="story-user">posted by ${story.username}</small>
                  <label for="delete-${story.storyId}">&nbsp; delete <i class="fas fa-trash-alt"></i></label>
                  <input type="checkbox" class="story-delete" id="delete-${story.storyId}">
                </li>
              `);
        };
        // <button class="btn btn-warning btn-sm" id="delete-${story.storyId}">delete</button>
    } catch (err) {
        console.log("dagnabbit");
        console.log(err);
    }
    return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <br>
        <label for="fav-${story.storyId}">favorite <i id="heart-${story.storyId}" class="${favClass} fa-heart"></i> &nbsp;</label>
        <input type="checkbox" class="story-favorite" id="fav-${story.storyId}">
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
        if (currentUser.isStoryFavorited(story.id)) {
            markFavorite(story.storyId);
        }
    }
    $inputStoryFavorite = $('.story-favorite');
    $inputStoryFavorite.on('change', handleFavoriteClicks);

    $allStoriesList.show();
}

// all following written by Tor

async function submitNewStory(evt) {
    evt.preventDefault();
    console.debug("submitNewStory");

    const title = $("#submit-story-title").val();
    const author = $("#submit-story-author").val();
    const url = $("#submit-story-url").val();
    const user = {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
    };

    storyList.stories.unshift(await StoryList.addStory(user, { title, author, url }));

    $submitStoryForm.trigger("reset");
    $submitStoryForm.hide();
    putStoriesOnPage();
    $allStoriesList.show();
}

$submitStoryForm.on("submit", submitNewStory);

async function deleteStory(evt) {
    evt.preventDefault();
    console.debug("deleteStory", evt);

    const storyId = evt.target.parentNode.id
    StoryList.deleteStory(storyId);

    putStoriesOnPage();
    $allStoriesList.show();
}

$deleteStoryForm.on("submit", deleteStory);