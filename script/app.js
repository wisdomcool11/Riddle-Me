// // importing files
// import { riddles } from "../script/riddles.js";


// let riddleHtml = '';

// riddles.forEach((riddle) =>{

//     riddleHtml =`
//         <div class="riddle-card">
                            
//             <div class="question js-question">
//                 ${riddle.question}
//             </div>

//             <div class="answer-wrap">

//                 <div class ="input">
//                     <input type="text" class="input-answer js-input-answer" placeholder="Your answer">
//                 </div>

//                <div class = "answer-body">

//                     <div class ="answer-btn-wrap js-answer-btn-wrap">
                    
//                         <button class="answer-btn js-answer-btn js-answer-btn-${riddle.id}" data-riddle-id="${riddle.id}">
//                             Answer
//                         </button>

//                     </div>

//                     <p class="answer js-answer">
//                         ${riddle.answer}
//                     </p>
//                </div>

//             </div>
            
//             <div class="card-button">
//                 <a href="#" class="previous button js-previous" data-riddle-id="${riddle.question}">
//                     Previous
//                 </a>

//                 <a href="#" class="next-btn button js-next">
//                     Next
//                 </a>

//             </div>

//         </div>
//     `;
// })

// document.querySelector('.riddle-body').innerHTML = riddleHtml;

// // getting the current index of the riddle card
// let currentRiddleIndex = 0;
// let riddleHistory = [currentRiddleIndex];


// // display the initial riddle
// displayRiddle();

// // creating the display function

// function displayRiddle (){
//     let currentRiddle = riddles[currentRiddleIndex];

//     document.querySelector('.js-question').innerHTML = `${currentRiddle.question}`;

//     document.querySelector('.js-answer').innerHTML = `${currentRiddle.answer}`;

//     document.querySelector(`.js-answer-btn-wrap`).innerHTML =`
//         <button class="answer-btn js-answer-btn js-answer-btn-${currentRiddle.id}" data-riddle-id = "${currentRiddle.id}">
//             Answer
//         </button>  
//     `;

//     console.log(currentRiddle.id);

// }



// //  next riddle link
// document.querySelectorAll('.js-next').forEach((link) => {
//     link.addEventListener('click', () => {
//         const riddleBody = document.querySelector('.js-riddle-body');

//         riddleBody.classList.remove('showAnswer');

//         const inputElement = document.querySelector(`.js-input-answer`);  
//         inputElement.value = '';

//         nextRiddleLink();
//     })
// })



// function nextRiddleLink(){
//     let previousRiddleIndex = currentRiddleIndex;

//     do{
//         currentRiddleIndex = Math.floor(Math.random () * riddles.length);
//     }while (currentRiddleIndex === previousRiddleIndex)

//     riddleHistory.push(currentRiddleIndex);

//     displayRiddle()
// }

// // previous riddle link
// document.querySelectorAll('.js-previous').forEach((link) => {
//     link.addEventListener('click', () => {
//         const riddleBody = document.querySelector('.js-riddle-body');

//         riddleBody.classList.remove('showAnswer');

//         const inputElement = document.querySelector(`.js-input-answer`);  
//         inputElement.value = '';
    

//         previousRiddleLink();
//     })
// })

// function previousRiddleLink (){
//     // check if their is a previous riddle
//     if(riddleHistory.length > 1){
//         riddleHistory.pop();

//         // update the current fruit index
//         currentRiddleIndex = riddleHistory[riddleHistory.length - 1];

//         displayRiddle();
//     }
// }

// // answer display 

// document.querySelectorAll('.js-answer-btn').forEach((button) => {  
//     button.addEventListener('click', () => {  
//         const riddleId = button.dataset.riddleId;  
//         // container  
//         const riddleBody = document.querySelector('.js-riddle-body');  

//         // getting the input   
//         const inputElement = document.querySelector(`.js-input-answer`);  
//         const inputValue = inputElement.value.trim();  

//         let riddleAnswer = '';   

//         riddles.forEach((riddle) => {  
//             if (riddle.id === riddleId) {  
//                 riddleAnswer = riddle.answer; 
//             }  
//         });  

//         // if (inputValue === '') {  
//         //     inputElement.value = 'Enter an answer';  
//         //     inputElement.style.borderColor = 'red';  

//         //     setTimeout(() => {  
//         //         inputElement.value = '';  
//         //         inputElement.style.borderColor = '#ccc';  
//         //     }, 1300);  
//         //     return; // Exit early if input is empty  
//         // }   

//         if (riddleAnswer === inputValue) {  
//             inputElement.style.color = 'green';  
//             riddleBody.classList.toggle('showAnswer');  
//         } else {  
//             inputElement.style.textDecoration = "line-through";  
//             inputElement.style.textDecorationColor = 'red';  

//             setTimeout(() => {  
//                 inputElement.value = '';  
//                 inputElement.style.textDecoration = "none";  
//             }, 1500);  
//         }  

//         console.log('input Answer: ' + inputValue);  
//         console.log('riddle Answer: ' + riddleAnswer);  
//         console.log(riddleId);  
//     });  
// });


// importing files  
import {riddles} from "../script/riddles.js";  

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
    });  
});  


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



let scoreHtml = '';
let isWorking = false;

const score = {
    win: 0,
    loss: 0
}

localStorage.getItem('score', JSON.stringify(score))

// Answer display  
document.querySelectorAll('.js-answer-btn').forEach((button) => {  
    
    // let win = 0;
    // let loss = 0;

    button.addEventListener('click', () => {  
        const riddleId = button.dataset.riddleId; 

        const inputElement = document.querySelector(`.js-input-answer`);  

        const answer = document.querySelector('.js-answer');

        const inputValue = inputElement.value.trim().toLowerCase(); 

        const currentRiddle = riddles[currentRiddleIndex];  

        if (inputValue === currentRiddle.answer) {  
            inputElement.style.color = 'green'; 
     
            answer.classList.add('showAnswer');
            score.win += 1;

        } else {  
            inputElement.style.color = 'red';  
            score.loss += 1;
        }  

        let winScore = score.win;
        let lossScore = score.loss;

        // get the score inside the obj and update it from the game output.
        
        getScore(winScore, lossScore);
        
    });  
    
});  


function getScore(win, loss){
    scoreHtml = ` 
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
    
        document.querySelector('.js-game-over-win').innerText= win;
    
        document.querySelector('.js-game-over-loss').innerText= loss;

    })
}


// function


// Search function  
// document.querySelector('.js-input-answer').addEventListener('input', (e) => {  

//     const searchValue = e.target.value.trim().toLowerCase();  
//     const matches = riddles.filter(riddle => riddle.name.toLowerCase().includes(searchValue));  
//     console.log('Matches:', matches); 
     
// });
