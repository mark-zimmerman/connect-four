const board = document.querySelector('#board');
const column = document.querySelector('.col')
const space = document.querySelector('.space');

for (let i = 0; i < 7; i++) {
    let currentCol = board.children[i];
    // currentCol.style.backgroundColor = 'yellow';
    for (let i = 0; i < 6; i++) {
    currentSpace = currentCol.children[i];
    
    
    currentSpace.style.backgroundColor = 'orange';
    }
}