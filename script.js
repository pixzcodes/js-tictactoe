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

    // GETTERS
    const getWinner = () => winner;
    const getWhosTurn = () => whosTurn;

    // return object with all of the public properties and functions
    return { gameBoard, flipTurn, gameBoardToString, getWinner, getWhosTurn };
})();

function createPlayer(name, symbol) {

    return { name, symbol };
}

const handleDOM = (function() {
    // PUBLIC VARIABLES
    const cellList = document.querySelectorAll(".gameboard > div");
    // PRIVATE VARIABLES

    // METHODS
    const updateCell = (cellNum) => {
        const symbolLetter = game.getWhosTurn();
        const symbol = document.createElement("span");
        symbol.textContent = symbolLetter.toUpperCase();
        symbol.classList.add(symbolLetter.toUpperCase());
        cellList[cellNum].appendChild(symbol);
        game.gameBoard[cellNum] = symbolLetter;
    };

    const endGame = () => {
        alert("The game is finished. " + game.getWinner() + " has won.")
    };

    // adding click events to all of the cells here
    const addClickEvents = () => {
        for (let i = 0; i < game.gameBoard.length; i++) {
            cellList[i].addEventListener("click", () => {
                if (game.getWinner() != null || game.gameBoard[i] != " ") {
                    if (game.getWinner() != null) {
                        endGame();
                    }
                    return;
                }
                updateCell(i);
                game.flipTurn();

            }, false);
        }
    };
    // GETTERS

    return { cellList, updateCell, addClickEvents };
})();


// TESTING
handleDOM.addClickEvents();

