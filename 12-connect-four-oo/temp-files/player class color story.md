# player classes with colors KISS
## the story
1. users enter names and colors in a form
1. code checks for a game saved in sessionStorage
2. user clicks start new game
2. the form background changes to the named color
3. two new player objects are created with name, color and wincount
4. any time player presses "reset win counter" to start a new game and reset the win counters back to 0
5. game board appears
6. game play continues as it was
7. on winning, alert includes player name and color
7. (instead of an alert, players see a message appear onscreen, perhaps over the player names)
7. (winning pieces are highlighted?)
8. wincount is incremented and player objects are saved to sessionStorage