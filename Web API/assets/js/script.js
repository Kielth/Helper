var counter = 75;
var questionIndex = 0;
var score = 0;
var questionTextArea = document.querySelector("#questions");
var timerDisplay = document.querySelector("#timer");
var answerDisplayArea = document.querySelector("#answers");
var startButton = document.querySelector("#startButton");
var highScores = [];
//var quizArea = document.querySelector("quizArea");

function countDown(){

var countdown = function () {
    timerDisplay.textContent = "Time Left: " + counter + "s";
    counter--;
    if(counter === 0) {
        clearInterval(startCountdown);
    };
};

var startCountdown = setInterval(countdown, 1000);
}


// Reference to Questions and Answers taken from Michael Rudolph/ReindeerCode https://github.com/ReindeerCode/Web-APIs-Code-Quiz/blob/master/JS/questions.js
var questions = [
    {
        question: "Which one is a looping structure in JavaScript?",
        answers: ["All the below", "For", "While", "do-while loops"],
        correct: "All the below"
    },
    {
        question: "What are the two basic groups of data types in JavaScript?", 
        answers: ["Primitive and attribute", "Primitive and reference types", "Reference types and attribute", "None of the above"],
        correct: "Primitive and reference types"
    },
    {
        question: "Commonly used data types DO NOT include:", 
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },
    {
        question: "Boolean operators that can be used in JavaScript include:", 
        answers: ["'And' Operator &&", "'Or' Operator ||", "'Not' Operator !", "All the above"],
        correct: "All the above"
    },
    {
        question: "Which one of these is not among the three different types of errors in JavaScript?", 
        answers: ["Animation time errors", "Load time errors", "Run time errors", "Logical Errors"],
        correct: "Animation time errors"
    },
    {
        question: "What is the data type of variables in JavaScript?", 
        answers: ["Object data types", "Function data type", "None of the above", "All of the above"],
        correct: "Object data types"
    },
    {
        question: "The condition in an if / else statement is enclosed within __.", 
        answers:  ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store __.", 
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables.", 
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "quotes"
    },
    {
        question: "What is the type of Pop up boxes available in JavaScript?:", 
        answers: ["Alert",  "Confirm", "Prompt", "All the above"], 
        correct: "All the above"
    }];


   

//main function to control the test
function startTest(){
    loadHighScores();
    startButton.remove();
    countDown();
    displayQuestionAndAnswer();
        
    
}

function displayQuestionAndAnswer(){
    displayQuestion(questionIndex);
    displayAnswers(questionIndex);
}

function checkCorrectAnswer(event){
    
    var chosenAnswer = event.target;

        if (chosenAnswer.textContent === questions[questionIndex].correct){
            showCorrectSnackbar(); // calls the snackbar for being correct
            score ++;
        }else{
            penalty(); // applies a wrong answer penalty 
            showInCorrectSnackbar();  // calls the snackbar for being incorrect
        }
    
    advanceQuestionIndex();
    var tempAnswersOl = document.querySelector("#tempAnswersDiv");
    tempAnswersOl.remove();
    displayQuestionAndAnswer();
}

function displayAnswers(qIndex){

    var answerChoices = questions[qIndex].answers;

    var tempAnswersOl = document.createElement("ol");
    
    tempAnswersOl.setAttribute("id", "tempAnswersDiv");
    answerDisplayArea.appendChild(tempAnswersOl);

    answerChoices.forEach(function(answerText){
        var buttonLi = document.createElement("li");
        var answerButton = document.createElement("button");
        answerButton.textContent = answerText;
        answerButton.setAttribute("class", "startButton");
        answerButton.addEventListener("click", checkCorrectAnswer);
        buttonLi.appendChild(answerButton);
        tempAnswersOl.appendChild(buttonLi);    
   })
}

//display question based on question index
function displayQuestion(qIndex){
    questionTextArea.textContent = questions[qIndex].question;
}
//called after the asnwer is chosen, adds 1 to the questionIndex variable
function advanceQuestionIndex(){
    
    if (questionIndex < questions.length -1){
        questionIndex ++;
    }else{
        finalScore();
        window.location.href = "./scores.html"; // navigates the user to the scores page after collecting their initials
    }    
}

// A function to test code with 
function testFunct(){
    penalty();
    //console.log(questions.length);
}

// penalty for wrong answer
function penalty(){
    counter -= 10;
}   

function finalScore(){
    var playerInitials = prompt("Your score is: " + score + ", please enter your initials"); // capture player initialsd
    highScores.push([playerInitials, score]); // add player score to high scores
    const highScoreString = JSON.stringify(highScores); // turn highScores[] into a string
    localStorage.setItem('highScores', JSON.stringify(highScores)); // store highScores in local starage as a string
}



function loadHighScores(){
    //get from local and store in highScores[]
    highScores = JSON.parse(localStorage.getItem('highScores'));
    sortArray();
}

function sortArray(){
    highScores.sort(function(a,b) {
        return a[1] - b[1];
    });
    highScores.reverse();
}

//show the snackbar for a correct answer
function showCorrectSnackbar(){
       // Get the snackbar DIV
        var correctSnackbar = document.querySelector("#correctSnackbar");
      
        // Add the "show" class to DIV
        correctSnackbar.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ correctSnackbar.className = correctSnackbar.className.replace("show", ""); }, 1000);
}

//show the snackbar for a incorrect answer
function showInCorrectSnackbar(){
    // Get the snackbar from index.hmtl
     var inCorrectSnackbar = document.querySelector("#inCorrectSnackbar");
   
     // Add the "show" class to the snackbar
     inCorrectSnackbar.className = "show";
   
     // After 3 seconds, remove the show class from the snackbar
     setTimeout(function(){ inCorrectSnackbar.className = inCorrectSnackbar.className.replace("show", ""); }, 1000);
}

// Create Button listeners
startButton.addEventListener("click", startTest); //calls the test function when clicked

