// User Story
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers


// Acceptance Criteria
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score







// Variables

// Define a set of questions
var questions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?<br /><br /><p id="demo">This is a demonstration.</p>',
        a: '<script>',
        choices: [
            { choice: '<js>' },
            { choice: '<script>' },
            { choice: '<javascript>' },
            { choice: '<scripting>' }]
    },
    {
        q: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
        a: 'document.getElementById("demo").innerHTML = "Hello World!";',
        choices: [
            { choice: 'document.getElementById("demo").innerHTML = "Hello World!";' },
            { choice: 'document.getElementByName("p").innerHTML = "Hello World!";' },
            { choice: 'document.getElement("p").innerHTML = "Hello World!";' },
            { choice: '#demo.innerHTML = "Hello World!";' }
        ]
    },
    {
        q: 'How do you write "Hello World" in an alert box?',
        a: 'alert("Hello World");',
        choices: [
            { choice: 'alert("Hello World");' },
            { choice: 'msgBox("Hello World");' },
            { choice: 'msg("Hello World");' },
            { choice: 'alertBox("Hello World");' }
        ]
    },
    {
        q: 'How to write an IF statement in JavaScript?',
        a: 'if (i == 5)',
        choices: [
            { choice: 'if (i == 5)' },
            { choice: 'if i = 5' },
            { choice: 'if i = 5 then' },
            { choice: 'if i == 5 then' }
        ]
    },
    {
        q: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        a: 'if (i != 5)',
        choices: [
            { choice: 'if (i <> 5)' },
            { choice: 'if i =! 5 then' },
            { choice: 'if (i != 5)' },
            { choice: 'if i <> 5' }
        ]
    },
    {
        q: 'How does a FOR loop start?',
        a: 'for (i = 0; i <= 5; i++)',
        choices: [
            { choice: 'for (i <= 5; i++)' },
            { choice: 'for (i = 0; i <= 5; i++)' },
            { choice: 'for (i = 0; i <= 5)' },
            { choice: 'for i = 1 to 5' }
        ]
    },
    {
        q: 'What is the correct way to write a JavaScript array?',
        a: 'var colors = ["red", "green", "blue"]',
        choices: [
            { choice: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")' },
            { choice: 'var colors = (1:"red", 2:"green", 3:"blue")' },
            { choice: 'var colors = ["red", "green", "blue"]' },
            { choice: 'var colors = "red", "green", "blue"' }
        ]
    },
    {
        q: 'How do you round the number 7.25, to the nearest integer?',
        a: 'Math.round(7.25)',
        choices: [
            { choice: 'round(7.25)' },
            { choice: 'rnd(7.25)' },
            { choice: 'Math.rnd(7.25)' },
            { choice: 'Math.round(7.25)' }
        ]
    },
    {
        q: 'How do you find the number with the highest value of x and y?',
        a: 'Math.max(x, y)',
        choices: [
            { choice: 'top(x, y)' },
            { choice: 'Math.ceil(x, y)' },
            { choice: 'ceil(x, y)' },
            { choice: 'Math.max(x, y)' }
        ]
    },
    {
        q: 'Which event occurs when the user clicks on an HTML element?',
        a: 'onclick',
        choices: [
            { choice: 'onmouseclick' },
            { choice: 'onclick' },
            { choice: 'onmouseover' },
            { choice: 'onchange' }
        ]
    },
    {
        q: 'Which operator is used to assign a value to a variable?',
        a: '=',
        choices: [
            { choice: '*' },
            { choice: '=' },
            { choice: '-' },
            { choice: 'x' }
        ]
    },
];
// Grab reference to element

// header elements - view high scores and timer
var viewHighScoresEl = document.getElementById("view-high-scores");
var timerEl = document.getElementById("timer");

// first container we see when open the page
var starterContainerEl = document.getElementById("starter-container");

// this is question container. contains answers as well.
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");

// this is the end of the quiz container with banner and initials input and submit button
var endContainerEl = document.getElementById("end-container");
var scoreBannerEl = document.getElementById("score-banner");
var initialsFormEl = document.getElementById("initials-form");
// +one button with submit in the buttons section

// high score container
var highScoreContainerEl = document.getElementById("high-score-container");
var highScoreListEl = document.getElementById("high-score-list");
// +two more buttons look in the buttons section

// correct/wrong answers containers
var correctAnswerEl = document.getElementById("correct");
var wrongAnswerEl = document.getElementById("wrong");

// Buttons
var buttonStartGameEl = document.getElementById("start-game");
var buttonSubmitScoreEl = document.getElementById("submit-score");
var buttonGoBackEl = document.getElementById("go-back");
var buttonClearHighScoreEl = document.getElementById("clear-high-scores");

buttonSubmitScoreEl.addEventListener("click", () => { console.log("I'm submit button") });
buttonStartGameEl.addEventListener("click", () => { console.log("Did you press Start Quiz?") });
buttonGoBackEl.addEventListener("click", () => { console.log("Did you press Go Back button?") });
buttonClearHighScoreEl.addEventListener("click", () => { console.log("Did you press Clear high Scores?") });



// High Score Array
var HighScores = [];
// assign array details for questions
var arrayShuffledQuestions;
var questionIndex = 0;
var score = 0;
var timeLeft;
var gameOver;

// sets timer to 0 before the start of quiz.
timerEl.innerHTML = 0;


// Functions
// choose a random character from an array/it needs an array as an argument

var randomCharacterFromArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

// When I click the start button, timer starts
var startGame = function () {
    // add classes to show/hide start and quiz screen
    starterContainerEl.classList.add('hide'); // we might don't need to have show
    starterContainerEl.classList.remove('show');
    questionContainerEl.classList.remove('hide');
    questionContainerEl.classList.add('show');
    // shuffle the question so they will show in random order
    arrayShuffledQuestions = questions.sort(function () { Math.random() - 0.5; });
    setTime();
    setQuestion();
}

// need to setTime function and setQuestion()
var setTime = function () {
    timeLeft = 90;
    // timer check to see if game can still proceed. setInterval of checking and doing function every 1sec.
    var timerCheck = setInterval(function () {
        timerEl.innerText = timeLeft;
        timeLeft--;
        // if game over clear Interval of timerCheck() function.
        if (gameOver) {
            clearInterval(timerCheck);
        }
        // if timer less than 0 open showScore() function and set timer to the 0 and clear the interval of timeCheck() function.
        if (timeLeft < 0) {
            showScore();
            timerEl.innerText = 0;
            clearInterval(timerCheck);
        }
    }, 1000);
};

var setQuestion = function () {
    resetAnswers();
    displayQuetions(arrayShuffledQuestions[questionIndex]);
}

// Display questions information  including answer buttons
var displayQuetions = function (index) {
    questionEl.innerText = index.q; // check how we get index list index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.innerText = index.choices[i].choice;
        // we need to add a class to the answer button to easy style it
        answerButton.classList.add('btn');
        answerButton.classList.add('answer-btn');
        answerButton.addEventListener('click', answerCheck());
        answerButtonsEl.appendChild(answerButton);
    }
};

// need to add answerCheck() function
var answerCheck = function (event) {
    var selectedAnswer = event.target;
    


// text here!!! Good night




    // go to next question, check if there is more questions
    questionIndex++;
    if(arrayShuffledQuestions.length > questionIndex + 1) {
        setQuestion();
    }
    else {
        gameOver = true;
        showScore();
    }
}
// need to create showScore() function




// Then I am presented with a question and choices

//after I answer a question, show if correct or wrong

// // correct answer, add 1 score to final score

// // wrong answer, deduct 10 second from timer

// Repeat with the rest of questions

// // if no more questions, run game over function

// When all questions are answered or timer reaches 0, game over

// // Show final score

// Enter initial and store high score in local storage

// // Stop function if initial is blank

// Store scores into local storage

// Stringify array in order to store in local

// Show current high scores

// Function to show high scores

// // check if there is any local storage

// Add event Listeners

