const board = document.querySelector('.board');
const GRID_SIZE = 3;

function createGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
        const rowItem = document.createElement("div");
        rowItem.classList.add("row")
        rowItem.id= row;
        for (let column = 0; column < GRID_SIZE; column++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.setAttribute("draggable", "false");
            gridItem.id = `${row},${column}`;
            rowItem.appendChild(gridItem);
        }
        board.appendChild(rowItem);
    }
}

createGrid();