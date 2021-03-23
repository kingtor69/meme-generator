const kingTorUser = { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtpbmd0b3IiLCJpYXQiOjE2MTY0NDkyODR9.9LM7jrEC2uPSb-Og_DjxcX5AZfaop12DiVP5NY4-lYw", "user": { "createdAt": "2021-03-22T21:41:24.117Z", "favorites": [], "name": "Tor Kingdon", "stories": [], "updatedAt": "2021-03-22T21:41:24.117Z", "username": "kingtor" } };
const hackOrSnoozeApiUrlBase = "https://hack-or-snooze-v3.herokuapp.com"

async function createNewStory(author, title, url) {
    const postResponse = await axios.post(`${hackOrSnoozeApiUrlBase}/stories`, {
        token: kingTorUser.token,
        story: { author, title, url }
    });
    console.log(postResponse);
}