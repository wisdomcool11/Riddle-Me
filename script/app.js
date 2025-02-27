
// importing files  
import {riddles} from "../script/riddles.js"; 
// import { startTimer } from "../script/timer.js";/ 

let riddleHtml = '';  

riddles.forEach((riddle) => {  
    
    riddleHtml = `  
        <div class="riddle-card">  
            <div class="question js-question">  
                ${riddle.question}  
            </div>  
            <div class="answer-wrap">  

                <div class="input">  
                    <input type="text" class="input-answer js-input-answer" placeholder="Your answer">  
                </div>  

                <div class="answer-body">  

                    <div class="answer-btn-wrap js-answer-btn-wrap"> 

                        <button class="answer-btn js-answer-btn" data-riddle-id="${riddle.id}">  
                            Answer  
                        </button>  

                    </div>  

                    <p class="answer js-answer">${riddle.answer}</p>  
                </div>  

            </div>  
            <div class="card-button">  
                <a href="#" class="previous button js-previous">  
                    Previous  
                </a>  

                <a href="#" class="tired button js-tired">
                    Tired ?
                </a>

                <a href="#" class="next-btn button js-next">  
                    Next  
                </a>  
            </div>  
        </div>  
    `;  
});  

document.querySelector('.riddle-body').innerHTML = riddleHtml;  

let currentRiddleIndex = 0;  
let riddleHistory = [currentRiddleIndex]; 


// initialize scores
let score = JSON.parse(localStorage.getItem('score')) || { win: 0, loss: 0};

// display initial score
getScore (score.win, score.loss);
displayRiddle();  

// display function of the current riddle
function displayRiddle() {  
    const currentRiddle = riddles[currentRiddleIndex];  
    document.querySelector('.js-question').innerHTML= currentRiddle.question;  
    document.querySelector('.js-answer').innerHTML= currentRiddle.answer;  
}  

// next riddle link


document.querySelectorAll('.js-next').forEach((link) => {  
    link.addEventListener('click', (e) => {  
        e.preventDefault(); // Prevent default anchor behavior

        nextRiddle();
    });  
});  

function nextRiddle (){
    let previousRiddleIndex = currentRiddleIndex;
    
    do{
        currentRiddleIndex = Math.floor(Math.random () * riddles.length);
    }while (currentRiddleIndex === previousRiddleIndex);

    if (currentRiddleIndex < riddles.length - 1) {  
        currentRiddleIndex++;  
        riddleHistory.push(currentRiddleIndex);  

        const inputElement = document.querySelector(`.js-input-answer`);  

        inputElement.value = '';

        const answer = document.querySelector('.js-answer');
        answer.classList.remove('showAnswer');

        displayRiddle();  
    }  
}


// previous riddle link 

document.querySelectorAll('.js-previous').forEach((link) => {  
    link.addEventListener('click', (e) => {  
        e.preventDefault(); // Prevent default anchor behavior  
        
        if (riddleHistory.length > 1) {  
            riddleHistory.pop();  
            currentRiddleIndex = riddleHistory[riddleHistory.length - 1];  
    
            const inputElement = document.querySelector(`.js-input-answer`);  
    
            inputElement.value = '';
    
            const answer = document.querySelector('.js-answer');
            answer.classList.remove('showAnswer');
           
            displayRiddle();  
        }  
    });  
});  


// Answer display  
document.querySelectorAll('.js-answer-btn').forEach((button) => {  

    button.addEventListener('click', () => {  

        const inputElement = document.querySelector(`.js-input-answer`);  

        const answer = document.querySelector('.js-answer');

        const inputValue = inputElement.value.trim().toLowerCase(); 

        const currentRiddle = riddles[currentRiddleIndex];

        if (inputValue === currentRiddle.answer.toLowerCase()) { 
            showAnswer(inputElement, answer);
            loadNewRiddle();

        } else {  
            inputElement.style.color = 'red';  
            score.loss += 1; // increment loss score 
            localStorage.getItem('score', JSON.stringify(score));
        }  

        // get the score inside the obj and update it from the game output.

        getScore(score.win, score.loss);
        
    });  
    
}); 

function showAnswer (inputElement,answer){
    inputElement.style.color = 'green'; 

    score.win += 1; // increment win score
    localStorage.setItem('score', JSON.stringify(score));// save update score

    answer.classList.add('showAnswer');

    // once the riddle answer is correct move to the nexgt riddle after one minute three seconds.
    setTimeout(()=>{
        nextRiddle();
    },3200)
}


function getScore(win, loss){
    const scoreHtml = ` 
        <span class="wins">
            Wins : <span class="score-win js-score-win">
                ${win}
            </span>
        </span>,
        
        <span class="loss">
            Loss : <span class="score-loss js-score-loss">
                ${loss}
            </span>
        </span>
    `;

    document.querySelector('.js-scores').innerHTML= scoreHtml;

    //  Tired button that bring game over pop up
    document.querySelector('.js-tired').addEventListener('click', ()=> {

        const gameOver = document.querySelector('.js-game-over');
    
        gameOver.classList.toggle('game-over-display')
    
        document.querySelector('.js-game-over-win').innerText = win;
    
        document.querySelector('.js-game-over-loss').innerText = loss;

        clearInterval(timer)

    })

}


// continue button
document.querySelector('.js-continue-btn').addEventListener('click', () => {
    const gameOver = document.querySelector('.js-game-over');

    gameOver.classList.remove('game-over-display');
    startTimer();
})

// restart button 
document.querySelector('.js-restart-button').addEventListener('click', () => {
    currentRiddleIndex = 0;
    riddleHistory = [currentRiddleIndex]

    let previousRiddleIndex = currentRiddleIndex;
    
    do{
        currentRiddleIndex = Math.floor(Math.random () * riddles.length);
    }while (currentRiddleIndex === previousRiddleIndex);

    // reset scores
    score.win = 0;
    score.loss = 0;
    
    getScore(score.win, score.loss); // display the reset score 

    const gameOver = document.querySelector('.js-game-over');

    gameOver.classList.remove('game-over-display');

    const inputElement = document.querySelector(`.js-input-answer`);  
    
    inputElement.value = '';

    const answer = document.querySelector('.js-answer');
    answer.classList.remove('showAnswer');

    startTimer();
    displayRiddle();
})


// start timer ####
// timer script file

let timeLimit = 30 ; // setting timer in seconds
let timer ; //variable to hold the time interval
// let losses = 0; //variable to track losses


function startTimer() {
    let timerRemaining = timeLimit;

    document.querySelector ('.js-timer').innerText = `Riddle time: ${timerRemaining}`;

    timer = setInterval (()=> {
        timerRemaining --;
        document.querySelector ('.js-timer').innerText = `Riddle time: ${timerRemaining}`;

        if(timerRemaining <= 0){
            clearInterval(timer);

            handleTimeOut ();; //call function to handle timeout!
        }

    }, 1000)
}

function handleTimeOut(){
    //logic to load the next  riddle  goes  here
    nextRiddle();
    // reset timer  for the next riddle
    clearInterval(timer);
    startTimer(); // Restart the timer again
}

// call startTimer  when the  riddle is displayed 
startTimer();


// call this function to load a new riddle
// this will take in an arguement ( nextriddle to load new riddle);

function loadNewRiddle () {
    // existing code logic to load new riddle 
    displayRiddle();

    clearInterval(timer);// stop timer 
    startTimer(); //start the timer for the new riddle
}



//import and merge the two files to work well###

