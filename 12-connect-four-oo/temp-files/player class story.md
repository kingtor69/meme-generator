# player classes
## the story
1. a player class is built in the script
2. in the HTML is a table with 4 columns,
- top row are input fields for names--each td is 2 columns wide
- 2nd row shows player numbers and colors together in (1 is red, 2 is blue)--each td is 2 columns wide
3. (only the name field is blank and only that is an input)
4. if local storage is empty, skip this step; if there are player objects in there, load the player objects

5. after the players enter their names and click a submit button, it goes away or turns into the Start New Game button
5.1. there should be instructions on the form for how to reset the names and game counter, maybe a separate button for that which is only active after starting a new game?
6. a player object is made from the player class
7. 
	a. display the names in the table
	c. start the game
8. the information gets committed to the table and a 4th row appears for 
9. the game starts
10. game code has to refer to player objects instead of player variable ingame

## time permitting:
2.
- 3rd row says wins: 0 wins: 0 (1 column each)
7. b. display win count, too

11. at game end, win count increments onscreen
12. and in player object
13. which gets stored into localStorage
