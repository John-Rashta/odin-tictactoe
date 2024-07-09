function Player(name, symbol) {
    
    const playerSymbol = symbol;
    let score = 0;

    function getScore() {
        
        return score;
    }

    function addScore() {

        score++;
    }

    function getSymbol() {

        return playerSymbol;
    }

    return {name, getScore, addScore, getSymbol};
}

function makeBoard() {

    let gameboard = [
        [],
        [],
        []
    ]

    function getBoard() {

        return gameboard;

    }

    function makeMove(row, cell, symbol) {

        if (gameboard[row][cell]) {

            return;
        }

        gameboard[row][cell] = symbol;


    }


    function moveCount(symbol) {

        movesCount = gameboard.flat().filter((value) => {
            return value === symbol;
          }).length || 0;

        return movesCount;
    }

    function clearBoard() {

        gameboard = [
            [],
            [],
            []
        ]
    }

    return {moveCount, getBoard, makeMove, clearBoard};

}

function makeGame(playerone, playertwo) {

    const playerOne = Player(playerone, "X");
    const playerTwo = Player(playertwo, "O");

    const gameBoard = makeBoard();

    let gameEnd = false;

    function playerTurn() {

        const playerOneMoves = gameBoard.moveCount(playerOne.getSymbol());
        const playerTwoMoves = gameBoard.moveCount(playerTwo.getSymbol());

        if (playerOneMoves > playerTwoMoves) {

            return playerTwo;

        } else {
            
            return playerOne;
        }
    }

    function playRound(row, cell) {

        if (gameEnd) {

            return;
        }

        const activePlayer = playerTurn();
        const activeSymbol = activePlayer.getSymbol();

        gameBoard.makeMove(row, cell, activeSymbol);

        console.log(gameBoard.getBoard());

        currentBoard = gameBoard.getBoard();

        if (currentBoard.flat().length === 9) {

            gameEnd = true;

        }

        if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[0][1] && activeSymbol === currentBoard[0][2]) ||
            (activeSymbol === currentBoard[1][0] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[1][2]) ||
            (activeSymbol === currentBoard[2][0] && activeSymbol === currentBoard[2][1] && activeSymbol === currentBoard[2][2])) {

                gameEnd = true;
                activePlayer.addScore();
                console.log(activePlayer.getScore());
                console.log(playerOne.getScore());
                console.log(playerTwo.getScore());
            
            } else if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[1][0] && activeSymbol === currentBoard[2][0]) ||
                (activeSymbol === currentBoard[0][1] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][1]) ||
                (activeSymbol === currentBoard[0][2] && activeSymbol === currentBoard[1][2] && activeSymbol === currentBoard[2][2])) {

                    gameEnd = true;
                activePlayer.addScore();
                console.log(activePlayer.getScore());
                console.log(playerOne.getScore());
                console.log(playerTwo.getScore());
                } else if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][2]) ||
                    (activeSymbol === currentBoard[0][2] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][0])) {

                        gameEnd = true;
                activePlayer.addScore();
                console.log(activePlayer.getScore());
                console.log(playerOne.getScore());
                console.log(playerTwo.getScore());
                    }


    }

    function newGame() {

        gameBoard.clearBoard();
        gameEnd = false;
    }

    return {playRound, newGame};
}


function displayController (game, round, newgame) {

    game.round = round;
    game.newgame = newgame;

    const board = document.querySelector(".boardContainer");

    for (let i = 0; i < 2; i++) {

        for (let j = 0; j < 2; j++) {

            const button = document.createElement("button");
            button.dataset.row = i;
            button.dataset.cell = j;
            board.appendChild(button);
        }
    }

    board.addEventListener("click", (event) => {

        if (event.target.tagName === "BUTTON") {

            row = event.target.dataset.row;
            cell = event.target.dataset.cell;
            game.round(row, cell);
        }
    })

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", () => {

        game.newgame();

    })
 
    function clearDisplay() {

        const buttons = board.children;

        for (child in buttons) {

            child.textContent = "";
        }

        const resultBoard = document.querySelector(".result");
        resultBoard.textContent = "";
    }

    function displayMove(row, cell, symbol) {

        const button = document.querySelector(`button[data-row="${row}"][data-cell="${cell}"]`);
        button.textContent = `${symbol}`;

    }

    function updateScore(playerOne, playerTwo) {

        const playerOneDiv = document.querySelector(".playerOne");
        const playerTwoDiv = document.querySelector(".playerTwo");

        playerOneDiv.textContent = `${playerOne.name}:${playerOne.getScore()}`;
        playerTwoDive.textContent = `${playerTwo.name}:${playerTwo.getScore()}`;

    }

    function displayResult(...winner) {

        const resultBoard = document.querySelector(".result");

        if (winner.length === 0) {

            resultBoard.textContent = "Tie!";


        }

        resultBoard.textContent = `${winner[0].name} Wins!`;
    }

    return {displayResult, updateScore, displayMove, clearDisplay};


}


