/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//define variables 

var scores, roundScore, activePlayer, dice, gameOver;

init();


//rolling the dice

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (!gameOver){

        // 1. generate random Number
        //random number for dice
        dice = Math.floor(Math.random() * 6) + 1;

        // 2. display result
        //show dice
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = `dice-${dice}.png`;

        
        // 3. update current number is rolled number is not a 1
        if (dice !== 1){
            roundScore += dice;

            //set current score to value of dice
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }else{
            //next player
            nextPlayer();

        }
    }
});


// hold functionality

document.querySelector('.btn-hold').addEventListener('click', function(){

    if (!gameOver){

    
        //1. add roundScore to total score
        scores[activePlayer] += roundScore;

        //2. display score
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];


        //check if player won the game
        if (scores[activePlayer] >= 20){
            gameOver = true;
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner';

            //hide dice
            document.querySelector('.dice').style.display = 'none';
            //remove active class 
            document.querySelector(`.player-0-panel`).classList.remove('active');
            document.querySelector(`.player-1-panel`).classList.remove('active');
            // add winner class
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');

        }else{
            //3. next player
            nextPlayer();
        }
    }
   

});


function nextPlayer(){
    activePlayer = activePlayer == 0 ? 1 : 0;
        roundScore = 0;

        document.getElementById(`current-0`).textContent = "0";
        document.getElementById(`current-1`).textContent = "0";

        document.querySelector(`.player-0-panel`).classList.toggle('active');
        document.querySelector(`.player-1-panel`).classList.toggle('active');


        //hide dice if player rolls a 1
        document.querySelector('.dice').style.display = 'none';

}


//btn-new
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameOver = false;
    
    
    //hide dice initially
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    document.querySelector(`.player-0-panel`).classList.add('active');
}