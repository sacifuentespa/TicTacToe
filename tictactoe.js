const boardFront = document.querySelector('.board');
const GRID_SIZE = 3;
const resetButton = document.querySelector('button')
const announcement = document.querySelector('h2')

function calculateGridDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gridSize = Math.min(screenWidth, screenHeight) * 0.65; // Adjust the factor as needed
    return gridSize;
}

function createGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
        const gridDimension = calculateGridDimensions();
        const itemSize = Math.floor((gridDimension) / GRID_SIZE);
        const rowItem = document.createElement("div");
        rowItem.classList.add("row")
        rowItem.id = row;
        for (let column = 0; column < GRID_SIZE; column++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `${itemSize}px`;
            gridItem.style.height = `${itemSize}px`;
            gridItem.setAttribute("draggable", "false");
            gridItem.id = `${row},${column}`;
            rowItem.appendChild(gridItem);
        }
        boardFront.appendChild(rowItem);
    }
}

createGrid();

const Gameboard = (() => {
    const board = [["", "", ""], ["", "", ""], ["", "", ""]];

    const getBoard = () => board;

    const makeMove = (row, col, playerSymbol) => {
        if (board[row][col] === "") {
            board[row][col] = playerSymbol;
            // Update the game display or check for a win here
        }
    };
    const reset = () => {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                board[row][col] = "";
            }
        }
    }

    return {
        getBoard,
        makeMove,
        reset,
    };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {
        getName,
        getMarker,
    };
};

const GameControl = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameboard = Gameboard;

    const startGame = () => {
        //variable name due to the fact that board has been declared before
        const board = gameboard.getBoard();
        console.log(board);
        const gridItems = document.querySelectorAll('.grid-item');
        announcement.innerHTML = `${currentPlayer.getMarker()} moves` 
        gridItems.forEach((item) => {
            item.addEventListener('click', (event) => {
                // Check if the clicked grid item is empty
                const [row, col] = event.target.id.split(',');
                item.innerHTML = currentPlayer.getMarker();
                if (gameboard.getBoard()[row][col] === "") {
                    // Make a move for the current player
                    gameboard.makeMove(row, col, currentPlayer.getMarker());
                    // Check for a win or a draw
                    if (checkWinner()) {
                        announcement.innerHTML = checkWinner();
                        switchPlayer();
                    }
                    else {
                        // Switch to the other player
                        switchPlayer();
                        announcement.innerHTML = `${currentPlayer.getMarker()} moves` 
                    }
                }
            });
        });
        resetButton.addEventListener('click',()=>{
            gameboard.reset();
            gridItems.forEach((item)=>{
                item.innerHTML = "";
                announcement.innerHTML = `${currentPlayer.getMarker()} moves`;
            })
        })
        /* This was for console check
        while (checkWinner() === false && isBoardFull() == false) {
            let playerChoice = prompt("Choose coordinate for the move").split(",");
            if (gameboard.getBoard()[playerChoice[0]][playerChoice[1]] == "") {
                gameboard.makeMove(playerChoice[0], playerChoice[1], currentPlayer.getMarker())
                console.log(`the player ${currentPlayer.getMarker()} chooses ${playerChoice}`)
            }
            if (checkWinner() === false && isBoardFull() == false) {
                switchPlayer();
            } else {
                console.log(checkWinner())
                let decision = prompt("do you want to reset?")
                if (decision == "yes") {
                    gameboard.reset();
                }
            }

        }
        */
        // Initialize the game, display, and event listeners
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {

        const board = gameboard.getBoard();

        // Check rows, columns, and diagonals for a win
        if (checkRows() || checkColumns() || checkDiagonals()) {
            // If any of the checks return true, a player has won
            return (`${currentPlayer.getName()} with marker ${currentPlayer.getMarker()} wins`);
        } else if (isBoardFull()) {
            // If the board is full and no player has won, it's a draw
            return (`draw`);
        } else {
            return false;
        }
    };

    const checkRows = () => {
        const board = gameboard.getBoard();
        for (let row = 0; row < 3; row++) {
            if (board[row][0] !== "" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                return true;
            }
        }
        return false;
    };

    const checkColumns = () => {
        const board = gameboard.getBoard();
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[0][col] !== "" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                return true;
            }
        }
        return false;
    };

    const checkDiagonals = () => {

        const board = gameboard.getBoard();
        if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }
        if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }
        return false;
    };

    const isBoardFull = () => {
        const board = gameboard.getBoard();
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (board[row][col] === "") {
                    return false;
                }
            }
        }
        return true;
    };

    // Other game control methods and logic

    return {
        startGame,
        checkWinner,
        // Other public methods and properties
    };
})();

GameControl.startGame();