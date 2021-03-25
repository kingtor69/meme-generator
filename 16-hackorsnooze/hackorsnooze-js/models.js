"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/* contains classes to manage the data of the app and the connection to the API. 
 * The name models.js to describe a file containing these kinds of classes that focus 
 * on the data and logic about the data. UI stuff shouldn’t go here.
 * 
 * Read this file thoroughly. There is a new keyword here, static. 
 * Make sure you understand what it means before moving on.
 * 
 * const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
 */

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

    /** Make instance of Story from data object about story:
     *   - {title, author, url, username, storyId, createdAt}
     */

    constructor({ storyId, title, author, url, username, createdAt }) {
        this.storyId = storyId;
        this.title = title;
        this.author = author;
        this.url = url;
        this.username = username;
        this.createdAt = createdAt;
    }

    /** Parses hostname out of URL and returns it. */

    getHostName() {
        // UNIMPLEMENTED: complete this function!
        return "hostname.com";
    }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
    constructor(stories) {
        this.stories = stories;
    }

    /** Generate a new StoryList. It:
     *
     *  - calls the API
     *  - builds an array of Story instances
     *  - makes a single StoryList instance out of that
     *  - returns the StoryList instance.
     */

    static async getStories() {
        // Note presence of `static` keyword: this indicates that getStories is
        //  **not** an instance method. Rather, it is a method that is called on the
        //  class directly. Why doesn't it make sense for getStories to be an
        //  instance method?

        // query the /stories endpoint (no auth required)
        const response = await axios({
            url: `${BASE_URL}/stories`,
            method: "GET",
        });

        // turn plain old story objects from API into instances of Story class
        const stories = response.data.stories.map(story => new Story(story));

        // build an instance of our own class using the new array of stories
        return new StoryList(stories);
    }

    /** Adds story data to API, makes a Story instance, adds it to story list.
     * - user - the current instance of User who will post the story
     * - obj of {title, author, url}
     *
     * Returns the new Story instance
     */

    // the rest of this class written by Tor
    // at one point, addStory was working and deleteStory was working with the query IN the URL
    // with both of these static, but I wonder if they should be in the User class and be NOT static
    // or, at least, I should add some logic to make sure someone is logged in
    // let's see if I can make this work any better

    static async addStory(user, newStory) {
        const postResponse = await axios.post(`${BASE_URL}/stories`, {
            token: user.token,
            story: newStory
        });
        return new Story({
            storyId: postResponse.data.story.storyId,
            title: postResponse.data.story.title,
            author: postResponse.data.story.author,
            url: postResponse.data.story.url,
            createdAt: postResponse.data.story.createdAt,
            username: postResponse.data.story.username
        });
    };

    static async deleteStory(storyId) {
        await axios.delete(`${BASE_URL}/stories/${storyId}?token=${currentUser.loginToken}`);
        // await axios.delete(`${BASE_URL}/stories/${storyId}`, {
        //     token: currentUser.loginToken
        // });
        return;
    }
}

/*
Response
{
  "story": {
    "author": "Elie Schoppik",
    "createdAt": "2018-11-14T01:36:12.710Z",
    "storyId": "991b95a0-507f-472e-9f94-e3bd4b6fe882",
    "title": "Four Tips for Moving Faster as a Developer",
    "updatedAt": "2018-11-14T01:36:12.710Z",
    "url": "https://www.rithmschool.com/blog/developer-productivity",
    "username": "test"
  }
}
    constructor({ storyId, title, author, url, username, createdAt }) {
        this.storyId = storyId;
        this.title = title;
        this.author = author;
        this.url = url;
        this.username = username;
        this.createdAt = createdAt;
    }
*/

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
    /** Make user instance from obj of user data and a token:
     *   - {username, name, createdAt, favorites[], ownStories[]}
     *   - token
     */

    constructor({
            username,
            name,
            createdAt,
            favorites = [],
            ownStories = []
        },
        token) {
        this.username = username;
        this.name = name;
        this.createdAt = createdAt;

        // instantiate Story instances for the user's favorites and ownStories
        this.favorites = favorites.map(s => new Story(s));
        this.ownStories = ownStories.map(s => new Story(s));

        // store the login token on the user so it's easy to find for API calls.
        this.loginToken = token;
    }

    /** Register new user in API, make User instance & return it.
     *
     * - username: a new username
     * - password: a new password
     * - name: the user's full name
     */

    static async signup(username, password, name) {
        const response = await axios({
            url: `${BASE_URL}/signup`,
            method: "POST",
            data: { user: { username, password, name } },
        });

        let { user } = response.data

        return new User({
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories
            },
            response.data.token
        );
    }

    /** Login in user with API, make User instance & return it.

     * - username: an existing user's username
     * - password: an existing user's password
     */

    static async login(username, password) {
        const response = await axios({
            url: `${BASE_URL}/login`,
            method: "POST",
            data: { user: { username, password } },
        });

        let { user } = response.data;

        return new User({
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories
            },
            response.data.token
        );
    }

    /** When we already have credentials (token & username) for a user,
     *   we can log them in automatically. This function does that.
     */

    static async loginViaStoredCredentials(token, username) {
        try {
            const response = await axios({
                url: `${BASE_URL}/users/${username}`,
                method: "GET",
                params: { token },
            });

            let { user } = response.data;

            return new User({
                    username: user.username,
                    name: user.name,
                    createdAt: user.createdAt,
                    favorites: user.favorites,
                    ownStories: user.stories
                },
                token
            );
        } catch (err) {
            console.error("loginViaStoredCredentials failed", err);
            return null;
        }
    }

    // the rest of this class written by Tor
    async favoriteAStory(storyId, areWeFavoriting) {
        try {
            let postOrDelete;
            if (areWeFavoriting) {
                postOrDelete = "POST";
            } else {
                postOrDelete = "DELETE";
            }
            const favResponse = await axios({
                url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
                method: postOrDelete,
                params: { token: this.loginToken }
            });
        } catch (err) {
            // console.log(favResponse);
            console.error("D'oh!", err);
        }
    }

    isStoryFavorited(storyId) {
        for (let story of this.favorites) {
            if (story.storyId === storyId) return true;
        }
    }
}

// ?token=${this.loginToken}