# Samir Nasser Eddine 
## Connect Four code review

### first impressions
1. he recommends solving the starter code before starting on my own, but he is also impressed by how I did it
1. my code shows signs of beginning coder, specifically: 
- started writing code before knowing where it was going
- that makes for a lot of patching
- write it out in pseudo-code first
3. my thought was coming up with function names/what they're doing first, whereas he suggests telling the story of the code in plain english, then writing pseudo code and starting to map out functions, e.g.
"First an empty board appears on the screen, determined by size parameters. The code will have a board array corresponding to that board. The first player will click at the top of a column and the code will not which column (or x coordinate) that click was in. Then the code will determine the lower-most available empty space in the board (the y coordinate)." &c.

### to review:
1. story of the code
2. pseudo code
3. test code (see below)
3. code

### other tips:
1. avoid floater code (code that's not in a function or object or whatever): then the only floading code is *document.addEventListener('load', onLoad());*
2. there's a lot of repetive code, which is a good indication of refactoring opportunity

### testing:
It's probably a good idea to put the test code inbetween writing pseudo code and code.

### he doesn't recommend javascript as a first programming language, but that's what I've got
#### downsides of JavaScript:
1. it encourages global variables

### returning more than one variable from a function
- that's a sign of something wrong
- so you don't need to return the win and the winning player (e.g.): each function should have only one purpose
- check for win should just be checking for a win, with a separate function to check for tie, both of those should be returning a boolean
- also my checkForWin call passed the parameter gameResult, which was the return and should not have been in the call
- instead: *if (checkForWin(boardArray)) { gameResult = 'win' }* &c.
- *** single-responsibility functions ***

### summing up:
1. I've got the skills
2. take my time
3. follow the steps, tell the story
4. he says I'll be writing "world-class, quality code"