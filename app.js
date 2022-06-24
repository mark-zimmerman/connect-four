const boardDisplay = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');
const playerDisplay = document.querySelector('#player-display');
const colorDisplay = document.querySelector('#color-display');


const board = [];

for (let i = 0; i < 7; i++) {
    board.push([])
}


//EVENT LISTENERS
boardDisplay.addEventListener('click', columnCheck);


//OBJECTS
const gameState = {
    board: board,
    playerTurn: 'red',
    move: 1
}
console.log(gameState.board);

//FUNCTIONS
function columnCheck(event) {
   let columnOpen = false;
   let currentCol = event.target.closest('.col');
   for (let i = 0; i < 6; i++) {
        if (currentCol.children[i].classList.contains('open')) {
            columnOpen = true;
            dropToken(currentCol.children[i], i, currentCol);
            addToBoardObj(i, currentCol);
            return;
            
        }
    }
}
//Need to push the color to the board array
//We will pass the columnIndex and row index
function dropToken(dropSpace) {
    if (gameState.move % 2 !== 0) {
        dropSpace.children[0].style.backgroundColor = 'red';
        gameState.playerTurn = 'red';
        playerDisplay.innerHTML = 'Player 2';
        colorDisplay.style.backgroundColor = 'yellow';

    } else {
        dropSpace.children[0].style.backgroundColor = 'yellow';
        gameState.playerTurn = 'yellow';
        playerDisplay.innerHTML = 'Player 1';
        colorDisplay.style.backgroundColor = 'red';
    }
    dropSpace.classList.remove('open');
    gameState.move++;
}
//create a for loop
function addToBoardObj(rowIndex, currentCol) {
    
    for (let i = 0; i < 7; i++) {
        if (boardDisplay.children[i] === currentCol) {
            board[i].push(gameState.playerTurn);
        }
    }
    checkForWin(rowIndex, currentCol);
}

function checkForWin(row, column) {
    let colIndex;
    
    for (let i = 0; i < 7; i++) {
        if (boardDisplay.children[i] === column) {
            colIndex = i;
        }
    }
    checkVertical(row, colIndex);
    checkForwardDiagonal(row, colIndex);

}

//We have the coordinates of the current token
//we need to loop through board column to see if the space is a match
//If it is a match add 1 to vmcount and continue looping
//if it is not a match exit loop
//Now we do the same loop for down
//once it fails we will see what the vertMatchCount is
//If its 4 we call the win function
function checkVertical(row, colIndex) {
    let vertMatchCount = 0;
    for (let i = 0; i < 4; i++) {
        let testRow = row - i;
        if (board[colIndex][row] === board[colIndex][testRow]) {
            vertMatchCount++;
        } else {
            return;
        }
    }
    if (vertMatchCount === 4) {
        console.log('you win downward!!!');
    }
}

//For forward diagonal
//we have the coordinates of the current space
// we need to loop through 4 times
//each time adding 1 to the colIndex and one to the row
// So we have the upward direction match count
// Now we need to count the downward count
function checkForwardDiagonal(row, colIndex) {
    let fDMatchCount = 0;
    let backMatchCount = 0;
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex + i;
        let testRow = row + i;
        if (board[colIndex][row] === board[testCol][testRow]) {
            fDMatchCount++; 
        } else {
            break;
        }
    }
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex - i;
        let testRow = row - i;
        if (board[colIndex][row] === board[testCol][testRow]) {
            backMatchCount++; 
        } else {
            break;
        }
        console.log(backMatchCount);
    }
    
    if (backMatchCount + fDMatchCount > 4) {
        console.log('You win Diagonal')
    }
}


