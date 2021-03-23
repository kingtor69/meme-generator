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
    }
    $inputStoryFavorite = $('.story-favorite');
    $inputStoryFavorite.on('change', handleFavoriteClicks);

    $allStoriesList.show();
}

// all following written by Tor

function submitNewStory(evt) {
    console.debug("submitNewStory", evt);
    evt.preventDefault();

    const title = $("#submit-story-title").val();
    const author = $("#submit-story-author").val();
    const url = $("#submit-story-url").val();
    const user = {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
    };

    StoryList.addStory(user, { title, author, url });

    $submitStoryForm.trigger("reset");
    $submitStoryForm.hide();
    $allStoriesList.show();
}

$submitStoryForm.on("submit", submitNewStory);