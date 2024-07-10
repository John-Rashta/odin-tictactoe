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


function makeGame(playerone, playertwo) {

    const playerOne = Player(playerone, "X");
    const playerTwo = Player(playertwo, "O");

    const gameBoard = (function () {

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
    
            return true;
    
    
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
    
    })();

    const controller = (function (game, round, newgame) {

        game.round = round;
        game.newgame = newgame;
    
        if (document.querySelector(".boardContainer")) {
    
            document.querySelector(".boardContainer").remove();
        }
    
        if (document.querySelector(".gameContainer>button")) {
    
            document.querySelector(".gameContainer>button").remove();
        }
        const board = document.createElement("div");
        board.classList.toggle("boardContainer");
        const gameDiv = document.querySelector(".gameContainer");
        gameDiv.appendChild(board);

        const result = document.querySelector(".result");
        result.textContent = "";
    
    
        for (let i = 0; i < 3; i++) {
    
            for (let j = 0; j < 3; j++) {
    
                const button = document.createElement("button");
                button.dataset.row = i;
                button.dataset.cell = j;
                board.appendChild(button);
            }
        }
    
        board.addEventListener("click", buttonEvent);
    
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.addEventListener("click", restartEvent);
    
        function restartEvent() {
    
            game.newgame();
        }
    
        function buttonEvent(event) {
    
            if (event.target.tagName === "BUTTON") {
    
                row = event.target.dataset.row;
                cell = event.target.dataset.cell;
                game.round(row, cell);
            }
        }
    
        gameDiv.appendChild(restartButton);
     
        function clearDisplay() {
    
            const buttons = board.children;
            
    
            for (child in buttons) {
    
    
                buttons.item(child).textContent = "";
            }
    
            const resultBoard = document.querySelector(".result");
            resultBoard.textContent = "";
        }
    
        function displayMove(row, cell, symbol) {
    
            const button = document.querySelector(`button[data-row="${row}"][data-cell="${cell}"]`);
            button.textContent = `${symbol}`;
    
        }
    
        function updateScore() {
    
            const playerOneDiv = document.querySelector(".playerOne");
            const playerTwoDiv = document.querySelector(".playerTwo");
    
            playerOneDiv.textContent = `${playerOne.name}:${playerOne.getScore()}`;
            playerTwoDiv.textContent = `${playerTwo.name}:${playerTwo.getScore()}`;
    
        }
    
        function displayResult(...winner) {
    
            const resultBoard = document.querySelector(".result");
    
            if (winner.length === 0) {
    
                resultBoard.textContent = "Tie!";
                
    
    
            } else {
                resultBoard.textContent = `${winner[0].name} Wins!`;
            }
    
        }
    
        return {displayResult, updateScore, displayMove, clearDisplay};
    
    
    })(this, playRound, newGame);
    controller.updateScore(playerOne, playerTwo);

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

        if (!gameBoard.makeMove(row, cell, activeSymbol)) {

            return;
        }

        controller.displayMove(row, cell, activeSymbol);

        currentBoard = gameBoard.getBoard();

        if (currentBoard.flat().length === 9) {

            gameEnd = true;
            controller.displayResult();

        }

        if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[0][1] && activeSymbol === currentBoard[0][2]) ||
            (activeSymbol === currentBoard[1][0] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[1][2]) ||
            (activeSymbol === currentBoard[2][0] && activeSymbol === currentBoard[2][1] && activeSymbol === currentBoard[2][2])) {

                gameEnd = true;
                gameOver(activePlayer);
            
            } else if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[1][0] && activeSymbol === currentBoard[2][0]) ||
                (activeSymbol === currentBoard[0][1] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][1]) ||
                (activeSymbol === currentBoard[0][2] && activeSymbol === currentBoard[1][2] && activeSymbol === currentBoard[2][2])) {

                    gameEnd = true;
                    gameOver(activePlayer);

                } else if ((activeSymbol === currentBoard[0][0] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][2]) ||
                    (activeSymbol === currentBoard[0][2] && activeSymbol === currentBoard[1][1] && activeSymbol === currentBoard[2][0])) {

                        gameEnd = true;
                gameOver(activePlayer);

                    }


    }

    function newGame() {

        gameBoard.clearBoard();
        gameEnd = false;
        controller.clearDisplay();
    }

    function gameOver(winner) {

        winner.addScore();
        controller.displayResult(winner);
        controller.updateScore();
    }

    return {playRound, newGame};
}


document.querySelector(".new").addEventListener("click", (event) => {

    event.preventDefault();
    const newform = document.querySelector("#gameForm");
    formData = new FormData(newform);

    makeGame(formData.get("first_player"), formData.get("second_player"));
})


