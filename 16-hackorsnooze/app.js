// I created the new user with curl and did this to post my first story instead of doing it in curl or in the console

const kingTorUser = { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtpbmd0b3IiLCJpYXQiOjE2MTY0NDkyODR9.9LM7jrEC2uPSb-Og_DjxcX5AZfaop12DiVP5NY4-lYw", "user": { "createdAt": "2021-03-22T21:41:24.117Z", "favorites": [], "name": "Tor Kingdon", "stories": [], "updatedAt": "2021-03-22T21:41:24.117Z", "username": "kingtor" } };
const hackOrSnoozeApiUrlBase = "https://hack-or-snooze-v3.herokuapp.com"
let hearKittyIsTheStory = {
    author: "Tor at Hear Kitty Studios",
    title: "Hear Kitty Studios",
    url: "http://hearkitty.com/"
}
// I believe that object that is sent to theAPI/stories is what the other code is calling the "story instance"
async function createNewStory(author, title, url) {
    const postResponse = await axios.post(`${hackOrSnoozeApiUrlBase}/stories`, {
        token: kingTorUser.token,
        story: { author, title, url }
    });
    console.log(postResponse);
}
// or maybe the "story instance" is the return value...?