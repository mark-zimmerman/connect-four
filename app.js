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
function dropToken(dropSpace, rowIndex, columnIndex) {
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
    console.log(rowIndex);
    console.log(currentCol);
    for (let i = 0; i < 7; i++) {
        if (boardDisplay.children[i] === currentCol) {
            console.log(i);
            board[i].push(gameState.playerTurn);
            console.log(board)
        }
    }
    checkForWin(rowIndex, currentCol);
    console.log(gameState.playerTurn)
}

function checkForWin(row, column) {
    let testCol;
    let testRow; 
    let vertMatchCount = 1;
    let horMatchCount = 1;
    let forDiagMatchCount = 1;
    let backDiagMatchCount = 1;
    console.log('check for win')
    //Up direction
    for (let i = 0; i < 4; i++) {
        testRow = row + 1;
        if(gameState.board[column][testRow] === gameState.board[column][row]) {
            console.log('hi')
            vertMatchCount++;
            console.log(vertMatchCount)
        }
    }
}







