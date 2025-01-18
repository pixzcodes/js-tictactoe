console.log("Hello and welcome to Tic-Tac-Toe");

const game = (function() {
    // PUBLIC VARIABLES
    const gameBoard = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ];
    // PRIVATE VARIABLES
    // x goes first
    let whosTurn = 'x';
    let winner = null;

    // METHODS
    // returns the winning player (or 'tie' in the case of a tie) or null if none
    const checkWinner = () => {
        // first row
        if ([gameBoard[0], gameBoard[1], gameBoard[2]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[0], gameBoard[1], gameBoard[2]].every((v) => v === 'o')) {
            return 'o';
        }
        // second row
        if ([gameBoard[3], gameBoard[4], gameBoard[5]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[3], gameBoard[4], gameBoard[5]].every((v) => v === 'o')) {
            return 'o';
        }
        // third row
        if ([gameBoard[6], gameBoard[7], gameBoard[8]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[6], gameBoard[7], gameBoard[8]].every((v) => v === 'o')) {
            return 'o';
        }
        // first column
        if ([gameBoard[0], gameBoard[3], gameBoard[6]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[0], gameBoard[3], gameBoard[6]].every((v) => v === 'o')) {
            return 'o';
        }
        // second column
        if ([gameBoard[1], gameBoard[4], gameBoard[7]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[1], gameBoard[4], gameBoard[7]].every((v) => v === 'o')) {
            return 'o';
        }
        // third column
        if ([gameBoard[2], gameBoard[5], gameBoard[8]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[2], gameBoard[5], gameBoard[8]].every((v) => v === 'o')) {
            return 'o';
        }
        // forward diagnal
        if ([gameBoard[2], gameBoard[4], gameBoard[6]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[2], gameBoard[4], gameBoard[6]].every((v) => v === 'o')) {
            return 'o';
        }
        // backward diagnal
        if ([gameBoard[0], gameBoard[4], gameBoard[8]].every((v) => v === 'x')) {
            return 'x';
        }
        if ([gameBoard[0], gameBoard[4], gameBoard[8]].every((v) => v === 'o')) {
            return 'o';
        }

        // default returns
        // check if theres a tie, if not then nothing
        if (!gameBoard.includes(' ')) {
            return 'tie';
        } else {
            return null;
        }
    };
    const flipTurn = () => {
        // flips the turn flag
        whosTurn = whosTurn === 'x' ? 'o' : 'x';
        winner = checkWinner();

        if (winner != null) {
            handleDOM.endGame();
        }
    };

    const gameBoardToString = () => {
        return `
             ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
            -------
             ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
            -------
             ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}
        `;
    }

    const reset = () => {
        winner = null;
        whosTurn = 'x';
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = " ";
        }
    };

    // GETTERS
    const getWinner = () => winner;
    const getWhosTurn = () => whosTurn;

    // return object with all of the public properties and functions
    return { gameBoard, flipTurn, gameBoardToString, getWinner, getWhosTurn, reset };
})();

function createPlayer(name, symbol) {

    return { name, symbol };
}

const handleDOM = (function() {
    // PUBLIC VARIABLES
    const cellList = document.querySelectorAll(".gameboard > div");
    // PRIVATE VARIABLES
    let playerOne = {};
    let playerTwo = {};
    const startModal = document.querySelector("#new-game");
    const gameBoardContainer = document.querySelector(".gameboard");
    const endModal = document.querySelector("#end-game-results");
    const gameOverText = document.querySelector("#gameover-text");

    // METHODS
    const updateCell = (cellNum) => {
        const symbolLetter = game.getWhosTurn();
        const symbol = document.createElement("span");
        symbol.textContent = symbolLetter.toUpperCase();
        cellList[cellNum].appendChild(symbol);
        game.gameBoard[cellNum] = symbolLetter;
    };

    const endGame = () => {
        gameBoardContainer.classList.add("hidden");
        if (game.getWinner() == "tie") {
            gameOverText.textContent = "Oh no the game ended in a tie!!";
        }
        else {
            gameOverText.textContent = `${game.getWinner() === 'x' ? playerOne.name : playerTwo.name} is the winner!!`;
        }
        endModal.classList.remove("hidden");
    };

    const startGame = () => {
        // grab id of start modals
        // display the board and hide the other modal
        // grab player names
        const playerOneNameInput = document.querySelector("#playerone-name");
        const playerTwoNameInput = document.querySelector("#playertwo-name");

        startModal.classList.add("hidden");
        gameBoardContainer.classList.remove("hidden");

        // default name for players is player1/2
        let playerOneName = "Player 1";
        let playerTwoName = "Player 2";

        if (playerOneNameInput.value.trim() != "") {
            playerOneName = playerOneNameInput.value;
        }
        if (playerTwoNameInput.value.trim() != "") {
            playerTwoName = playerTwoNameInput.value;
        }

        playerOne = createPlayer(playerOneName, "x");
        playerTwo = createPlayer(playerTwoName, "o");
    };
    const resetGame = () => {
        // reset game board
        // hide
        // display start modal
        game.reset();
        for (const cell of cellList) {
            if (cell.hasChildNodes()) {
                cell.removeChild(cell.firstChild);
            }
        }
        endModal.classList.add("hidden");
        startModal.classList.remove("hidden");
    }

    // adding click events to all of the cells here
    const addClickEvents = () => {
        const startButton = document.querySelector("#start-button");
        const restartButton = document.querySelector("#restart-button");
        startButton.addEventListener("click", () => startGame());
        restartButton.addEventListener("click", () => resetGame());

        for (let i = 0; i < game.gameBoard.length; i++) {
            cellList[i].addEventListener("click", () => {
                if (game.getWinner() != null || game.gameBoard[i] != " ") {
                    return;
                }
                updateCell(i);
                game.flipTurn();

            }, false);
        }
    };
    // GETTERS

    return { cellList, updateCell, addClickEvents, endGame, startGame, resetGame };
})();


// TESTING
handleDOM.addClickEvents();
