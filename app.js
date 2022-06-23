const boardDisplay = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');


const board = [];

const gameState = {
    board: board,
    players: ['red', 'yellow']
}

//EVENT LISTENERS
boardDisplay.addEventListener('click', columnCheck);
//Check to see if there is an empty spot in column
//If there is return true else return false
function columnCheck(event) {
   let columnOpen = false;
   let currentCol = event.target.closest('.col');
   for (let i = 0; i < 6; i++) {
        
        console.log(currentCol.children[i]);
        if (currentCol.children[i].classList.contains('open')) {
            columnOpen = true;
        }
    }
    console.log(columnOpen);
    return columnOpen;
}

function dropToken(event) {

}

for (let i = 0; i < 7; i++) {
    board.push([])
}
console.log(board);

// for (let i = 0; i < 7; i++) {
//     let currentCol = boardDisplay.children[i];
    
//     for (let i = 0; i < 6; i++) {
//         currentSpace = currentCol.children[i];
//         currentSpot = currentSpace.children[0];
//         if (currentSpace.classList.contains('occupied')) {
//             currentSpot.style.backgroundColor = Player.tokenColor;
//         }
//     }
// }

