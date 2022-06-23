## User Interface 
# Board
-7 columns
-6 rows in each column
-spaces that have a value
# Tokens 
-Active Token above the board
-How many tokens each player has left
-Color based on which player it belongs to
-tokens in the spaces
# Spaces 
-Spaces assigned to each spot on the board
-Is the spaces taken by a token?
# Players
- Active player
- How many tokens do each of the players have left
- Color of the token that player was assigned
## Logic
- we will use a gameState object to keep track of the board and the players
- First steps: 
- Start Button: will display a board 
- Player 1 is now the active player and he has a red token visible
- He will choose a column.
- We will check if the column has any empty spaces. If it does we will fill the closest space.
- We will now check for 4 in a row. 
- If there is no 4 in a row we will then switch the active player and a yellow token will be visible on the screen.
- Player 2 will now choose a column. We will check if there is an empy space if there is not then nothing will happen if there is then game over alert will be intitiated. 



## Check for win logic
- A token is dropped
- Check up. If the spot above is filled with your color then add one to matchCount.
- Else return
- If matchCount = 4 YOU WIN! If its less than 4 move to up/right
- check space column+1, row+1 if it matches add 1 to matchCount
- Move again in same direction