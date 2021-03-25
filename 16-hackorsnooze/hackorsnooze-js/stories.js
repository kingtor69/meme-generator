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
    let favoriteChecked = false;
    if (currentUser) {
        if (currentUser.isStoryFavorited(storyId)) {
            favClass = "fas";
            favoriteChecked = true;
        };
    };
    if (!!currentUser && currentUser.username === story.username) {
        return $(`
                <li id="${story.storyId}">
                  <a href="${story.url}" target="a_blank" class="story-link">
                    ${story.title}
                  </a>
                  <small class="story-hostname">(${hostName})</small>
                  <small class="story-author">by ${story.author}</small>
                  <br>
                  <label class="small" for="fav-${story.storyId}">favorite <i id="heart-${story.storyId}" class="${favClass} fa-heart"></i> &nbsp;</label>
                  <input type="checkbox" class="story-favorite" id="fav-${story.storyId}" checked="${favoriteChecked}">
                  <small class="story-user">posted by ${story.username}</small>
                  <label class="small" for="delete-${story.storyId}">&nbsp; delete <i class="fas fa-trash-alt"></i></label>
                  <input type="checkbox" class="story-delete" id="delete-${story.storyId}">
                </li>
              `);
    };
    return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <br>
        <label class="small" for="fav-${story.storyId}">favorite <i id="heart-${story.storyId}" class="${favClass} fa-heart"></i> &nbsp;</label>
        <input type="checkbox" class="story-favorite" id="fav-${story.storyId}" checked="${favoriteChecked}">
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function removeStoryFromList(deletedId) {
    const tempArray = storyList.stories.filter(function(val, ind, arr) {
        return storyList.stories[ind].storyId !== deletedId;
    });
    storyList.stories = tempArray;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
        if (!!currentUser && currentUser.isStoryFavorited(story.id)) {
            markFavorite(story.storyId);
        }
    }
    const $inputStoryFavorite = $('.story-favorite');
    $inputStoryFavorite.on('change', handleFavoriteClicks);
    const $inputStoryDelete = $('.story-delete');
    $inputStoryDelete.on('change', deleteStory);

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
    console.debug("deleteStory");

    const storyId = evt.target.parentNode.id;
    StoryList.deleteStory(storyId);

    $allStoriesList.hide();
    removeStoryFromList(storyId);
    putStoriesOnPage();
    $allStoriesList.show();
    $navSubmitStory.show();
}