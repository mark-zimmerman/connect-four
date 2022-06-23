const boardDisplay = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');
const playerDisplay = document.querySelector('#player-display');
const colorDisplay = document.querySelector('#color-display');


const board = [];

for (let i = 0; i < 7; i++) {
    board.push([])
}
console.log(board);

//EVENT LISTENERS
boardDisplay.addEventListener('click', columnCheck);


//OBJECTS
const gameState = {
    board: board,
    players: ['red', 'yellow'],
    move: 1
}

//FUNCTIONS
function columnCheck(event) {
   let columnOpen = false;
   let currentCol = event.target.closest('.col');
   for (let i = 5; i >= 0; i--) {
        if (currentCol.children[i].classList.contains('open')) {
            columnOpen = true;
            dropToken(currentCol.children[i]);
            return;
        }
    }
}

function dropToken(dropSpace) {
    if (gameState.move % 2 !== 0) {
        dropSpace.children[0].style.backgroundColor = 'red';
        console.log(gameState.move);
        playerDisplay.innerHTML = 'Player 2';
        colorDisplay.style.backgroundColor = 'yellow';

    } else {
        dropSpace.children[0].style.backgroundColor = 'yellow';
        playerDisplay.innerHTML = 'Player 1';
        colorDisplay.style.backgroundColor = 'red';
    }
    dropSpace.classList.remove('open');
    gameState.move++;
    console.log(gameState);
}



function changeActivePlayer() {

}






