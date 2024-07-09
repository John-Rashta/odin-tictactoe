CREATE a board object  
    CREATE a board  
    WHEN round function is called  
        IF board spot is taken do nothing  
        ELSE  
            ADD the play to the board  
    ENDIF  
    WHEN move counts gets called  
        RETURN how many moves the symbol given has made  
    WHEN get board is called  
        RETURN the board  

CREATE a player object  
    CREATE a player score variable  
    CREATE a player symbol variable  
    WHEN get score function is called  
        RETURN score  
    WHEN add score function is called  
        ADD 1 to score  
    WHEN get symbol function is called  
        RETURN the symbol  


CREATE game object  
    CREATE players  
    CREATE board  
    WHEN playerTurn is called   
        CALL moveCount  
        RETURN whichever has less moves  
    WHEN playRound is called  
        CALL playerTURN  
        CALL makeMove  
        CHECK winning conditions  

CREATE display object
    CREATE references to the DOM
    CREATE reference to the game
    CREATE a board
        CREATE all the buttons for the board
        UPDATE/ADD the score and player names
    WHEN displaymove is called
        acess the button and change its symbol
    


