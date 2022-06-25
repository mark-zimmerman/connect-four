const boardDisplay = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');
const playerDisplay = document.querySelector('#player-display');
const colorDisplay = document.querySelector('#color-display');
const gameoverHeading = document.querySelector('.gameover');
let winnerH1 = document.createElement('h1');
let restartBtn = document.createElement('btn');
let endGameContainer = document.createElement('div');
let winningPlayer; 
const spaces = document.querySelectorAll('.space');
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
    checkBackwardDiagonal(row, colIndex)
    checkHorizontal(row, colIndex);
}

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
    if (vertMatchCount > 3) {
        console.log('you win downward!!!');
        if(gameState.playerTurn === 'red') {
            winningPlayer = 'Player 1';
        } else {
            winningPlayer = 'Player 2';
        }
        gameOver();
    }
}

function checkForwardDiagonal(row, colIndex) {
    let fDMatchCount = 0;
    let backMatchCount = 0;
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex + i;
        let testRow = row + i;
        if (testCol > 6) {
            break;
        }
        if (board[colIndex][row] === board[testCol][testRow]) {
            fDMatchCount++; 
        } else {
            break;
        }
    }
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex - i;
        let testRow = row - i;
        if (testCol < 0) {
            break;
        }
        if (board[colIndex][row] === board[testCol][testRow]) {
            backMatchCount++; 
        } else {
            break;
        }
    }
    
    if (backMatchCount + fDMatchCount > 4) {
        console.log('You win Diagonal')
        if(gameState.playerTurn === 'red') {
            winningPlayer = 'Player 1';
        } else {
            winningPlayer = 'Player 2';
        }
        gameOver();
    }
}


function checkBackwardDiagonal(row, colIndex) {
    let fDMatchCount = 0;
    let backMatchCount = 0;
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex + i;
        let testRow = row - i;
        if (testCol > 6) {
            break;
        }
        if (board[colIndex][row] === board[testCol][testRow]) {
            fDMatchCount++; 
        } else {
            break;
        }
    }
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex - i;
        let testRow = row + i;
        if (testCol < 0) {
            break;
        }
        if (board[colIndex][row] === board[testCol][testRow]) {
            backMatchCount++; 
        } else {
            break;
        }
    }
    
    if (backMatchCount + fDMatchCount > 4) {
        console.log('You win Back Diagonal')
        if(gameState.playerTurn === 'red') {
            winningPlayer = 'Player 1';
        } else {
            winningPlayer = 'Player 2';
        }
        gameOver();
    }
}

function checkHorizontal(row, colIndex) {
    let fDMatchCount = 0;
    let backMatchCount = 0;
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex + i;
        if (testCol > 6) {
            break;
        }
         if (board[colIndex][row] === board[testCol][row]) {
            fDMatchCount++; 
        } else {
            break;
        }
    }
    
    for (let i = 0; i < 4; i++) {
        let testCol = colIndex - i;
        if (testCol < 0) {
            break;
        }
        if (board[colIndex][row] === board[testCol][row]) {
            backMatchCount++; 
        } else {
            break;
        }
    }
    
    if (backMatchCount + fDMatchCount > 4) {
        console.log('You win horizontal')
        if(gameState.playerTurn === 'red') {
            winningPlayer = 'Player 1';
        } else {
            winningPlayer = 'Player 2';
        }
        
        gameOver();
    }
}

function gameOver() {
    setTimeout(
        function() {
        boardDisplay.style.display = 'none';
        document.body.appendChild(endGameContainer);
        endGameContainer.className = 'end-game-container'
        winnerH1.className = 'gameover';
        endGameContainer.appendChild(winnerH1);
        winnerH1.innerHTML = `${winningPlayer} wins!`
        restartBtn.className = 'restart';
        restartBtn.innerHTML = 'Restart';
        endGameContainer.appendChild(restartBtn);
        playerDisplay.style.display = 'none';
        colorDisplay.style.display = 'none';
    }, 1000);
    
}
restartBtn.addEventListener('click', function() {
    boardDisplay.style.display = 'flex';
    winnerH1.remove();
    restartBtn.remove();
    endGameContainer.remove();
    console.log(spaces[0].children[0])
    gameState.move = 1;
    colorDisplay.style.backgroundColor = 'red';
    playerDisplay.innerHTML = 'Player 1';
    colorDisplay.style.display = 'block';
    playerDisplay.style.display = 'block';
    for (let i = 0; i < 42; i++) {
        
        spaces[i].children[0].removeAttribute('style');
        console.log(spaces[i]);
        if (!spaces[i].classList.contains('open')) {
            spaces[i].classList.add("open");
        }
    }
    
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 6; i++) {
            board[j].pop();
        }
    }
    console.log(board)
});