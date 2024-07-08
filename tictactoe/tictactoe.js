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

    const gameboard = [
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

        movesCount = gameBoard.flat().filter((value) => {
            return value === symbol;
          }).length;
    }

    return {moveCount, getBoard, makeMove};

}