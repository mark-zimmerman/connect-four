const boardDisplay = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');
const playerDisplay = document.querySelector('#player-display');
const colorDisplay = document.querySelector('#color-display');
const gameoverHeading = document.querySelector('.gameover');
let winnerH1 = document.createElement('h1');
let restartBtn = document.createElement('btn');
let endGameContainer = document.createElement('div');
let startGameContainer = document.createElement('div');
let objective = document.createElement('li');
let objective2 = document.createElement('li');
let startBtn = document.createElement('btn');
let objectiveH2 = document.createElement('h2');
let objectiveUl = document.createElement('ul');
let playerNameForm = document.createElement('form');
let playerName1Input = document.createElement('input');
let playerName2Input = document.createElement('input');
let playerName1Label = document.createElement('label');
let playerName2Label = document.createElement('label');
let winningPlayer; 
const spaces = document.querySelectorAll('.space');
const board = [];
let tie = false;

for (let i = 0; i < 7; i++) {
    board.push([])
}


//EVENT LISTENERS
boardDisplay.addEventListener('click', columnCheck);


//OBJECTS
const gameState = {
    board: board,
    playerTurn: 'red',
    move: 1,
    playerName_1: '',
    playName_2: ''
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
        playerDisplay.innerHTML = gameState.playerName_2;
        colorDisplay.style.backgroundColor = 'yellow';

    } else {
        dropSpace.children[0].style.backgroundColor = 'yellow';
        gameState.playerTurn = 'yellow';
        playerDisplay.innerHTML = gameState.playerName_1;
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
    checkForTie();
}

function checkForTie() {
    let filled = 0;
    console.log('checking for tie');
    for (let i = 0; i < 42; i++) {
        if (!spaces[i].classList.contains('open')) {
            filled++;
        } 
        console.log(spaces[i]);
    }
    if (filled > 41) {
        console.log('yooooooooooo');
        tie = true;
        gameOver();
    }
    
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
            winningPlayer = gameState.playerName_1;
        } else {
            winningPlayer = gameState.playerName_2;
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
            restartBtn.className = 'restart';
            restartBtn.innerHTML = 'Restart';
            endGameContainer.appendChild(restartBtn);
            playerDisplay.style.display = 'none';
            colorDisplay.style.display = 'none';
            if (tie && winningPlayer !== undefined) {
                winnerH1.innerHTML = 'Tie Game';
            } else {
                winnerH1.innerHTML = `${winningPlayer} wins!`;
            }
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
    playerDisplay.innerHTML = gameState.playerName_1;
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
function startDisplay() {
    boardDisplay.style.display = 'none';
    document.body.appendChild(startGameContainer);
    startGameContainer.className = 'start-game-container';
    startBtn.className = 'start';
    startBtn.innerHTML = 'Start';
    startGameContainer.appendChild(objectiveH2);
    objectiveUl.appendChild(objective);
    objectiveUl.appendChild(objective2);
    startGameContainer.appendChild(objectiveUl);
    startGameContainer.appendChild(playerNameForm);
    playerNameForm.appendChild(playerName1Label);
    playerNameForm.appendChild(playerName1Input);
    playerNameForm.appendChild(playerName2Label);
    playerNameForm.appendChild(playerName2Input);
    playerNameForm.appendChild(startBtn);
    playerName1Input.placeholder = "Enter Name";
    playerName2Input.placeholder = "Enter Name";
    
    playerName1Input.maxLength = 6;
    playerName2Input.maxLength = 6;
    objective2.innerHTML = "Click on the column of the space you would like to fill"
    objective.innerHTML = "To be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally)"
    objectiveH2.innerHTML = "Objective:";
    playerName1Label.innerHTML = "Player 1";
    playerName2Label.innerHTML = "Player 2";

    // playerNameForm.onsubmit((event) => {
    //     gameState.playerName_1 = event.target.value;
    //     console.log(gameState.playerName_1);
    // })
}
startBtn.addEventListener('click', function() {
    gameState.playerName_1 = playerName1Input.value;
    gameState.playerName_2 = playerName2Input.value;
    
    boardDisplay.style.display = 'flex';
    objectiveUl.remove();
    objective.remove();
    objective2.remove();
    startBtn.remove();
    startGameContainer.remove();
   
    playerDisplay.innerHTML = gameState.playerName_1;
});