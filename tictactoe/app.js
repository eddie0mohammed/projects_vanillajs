
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn;

const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const winningMessageElement = document.querySelector('#winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');


//restart
document.querySelector('#restartButton').addEventListener('click', restart);


init();

function handleClick(e) {
    
    let cell = e.target;

    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    
    //place mark
    placeMark(cell, currentClass);



    //check for win
    if (checkWin(currentClass)){
        endGame(false);
    
    
        
    }else if (isDraw()){
        //check for Draw
        endGame(true);

    }else{
        //switch turns
    swapTurns();
    setBoardHoverClass();

    }





    

}

function init(){
    circleTurn = false;
    cells.forEach(elem => {
        elem.addEventListener('click', handleClick, {once: true});
    });

    setBoardHoverClass();
    

}

function placeMark(cell, mark){
    cell.classList.add(mark);
}

function swapTurns(){
    if (circleTurn){
        circleTurn = false;
    }else{
        circleTurn = true;
    }
}

function setBoardHoverClass(){
    board.classList.remove('x');
    board.classList.remove('circle');

    if (circleTurn){
        board.classList.add('circle');
    }else{
        board.classList.add('x');
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every((elem) => {
            
            return cells[elem].classList.contains(currentClass);
        })
    })
}

function endGame(draw){

    if (draw){
        //draw scenario
        winningMessageTextElement.textContent = 'DRAW';

        
    }else{
        //winning scenario
        winningMessageTextElement.textContent = circleTurn ?  "O's WINS!" : "X's WINS!" ;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){

    return Array.from(cells).every(elem => {
        return elem.classList.contains(X_CLASS ) || elem.classList.contains(CIRCLE_CLASS);
    });

}

function restart(){
    winningMessageElement.classList.remove('show');
    cells.forEach(elem => {
        elem.classList.remove('x');
        elem.classList.remove('circle');
        elem.removeEventListener('click', handleClick);
    });

    init();


}