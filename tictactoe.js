const board = document.querySelector('.board');
const GRID_SIZE = 3;

function calculateGridDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gridSize = Math.min(screenWidth, screenHeight) * 0.65; // Adjust the factor as needed
    return gridSize;
}

function createGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
        const gridDimension = calculateGridDimensions();
        const itemSize = Math.floor((gridDimension)/GRID_SIZE);
        const rowItem = document.createElement("div");
        rowItem.classList.add("row")
        rowItem.id= row;
        for (let column = 0; column < GRID_SIZE; column++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `${itemSize}px`;
            gridItem.style.height = `${itemSize}px`;
            gridItem.setAttribute("draggable", "false");
            gridItem.id = `${row},${column}`;
            rowItem.appendChild(gridItem);
        }
        board.appendChild(rowItem);
    }
}

createGrid();

const Gameboard = (() => {
    const board = [["", "", ""], ["", "", ""], ["", "", ""]];
  
    const getBoard = () => board;
  
    const makeMove = (row,col, playerSymbol) => {
      if (board[row][col] === "") {
        board[row][col] = playerSymbol;
        // Update the game display or check for a win here
      }
    };
  
    return {
      getBoard,
      makeMove,
      
    };
  })();