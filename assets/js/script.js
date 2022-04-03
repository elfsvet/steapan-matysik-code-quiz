// Variables

// Define a set of questions
var questions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?',
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

// High Score Array
var highScores = [];
// assign array details for questions
var shuffledQuestions;
var questionIndex = 0;
var score = 0;
var timeLeft;
var gameOver;

// sets timer to 0 before the start of quiz.
timerEl.innerHTML = 0;

// Functions

// choose a random index from an array.length/it needs an array as an argument
var randomIndexOfArray = function (array) {
    return Math.floor(Math.random() * array.length);
};

// every second, check if game-over is true, or if there is time left. Start time at questions.length * 6 6 second on a question.
var setTime = function () {
    timeLeft = questions.length * 6; // every question has 6 sec to chose the answer.

    var timerCheck = setInterval(function () {
        timerEl.textContent = timeLeft;
        timeLeft--;

        if (gameOver) {
            clearInterval(timerCheck);
        }

        if (timeLeft < 0) {
            showScore();
            timerEl.textContent = 0;
            clearInterval(timerCheck);
        }
    }, 1000);
};

//   WHEN I click the start button - I am presented with a question
var startGame = function () {

    starterContainerEl.classList.add("hide"); //hide content
    questionContainerEl.classList.remove("hide"); //show content
    setTime();
    displayAnswers();

};

var answerCheck = function (event) {
    var selectedAnswer = event.target.textContent;
    if (questions[questionIndex].a === selectedAnswer) {    // if answer correct do next
        answerCorrect();
        score += 10;
    }
    else {      // or if answer wrong do next
        answerWrong();
        score -= 5;      // remove 5 points from Griffindor
        timeLeft -= 3;  // remove 3 secs
    }

    // go to the next question, if we have more questions in array questions
    if (questionIndex + 1 < questions.length) { //don't run if just question cause error in start game with index. TRY WHEN GAME OVER SET
        questionIndex++;
        setQuestion();
    }
    else {
        gameOver = true;
        showScore();
        console.log(correctAnswerEl.className);
    }

};

var setQuestion = function () {
    resetAnswers();
    displayAnswers(questions[questionIndex]);
};

// while we still have some answers in answers container remove first and go for next one which become first if not it stops.
var resetAnswers = function () {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
};


//display question information (including answer buttons)
var displayAnswers = function () {
    questionEl.textContent = questions[questionIndex].q; // display question
    for (var i = 0; i < questions[questionIndex].choices.length; i++) { // to display answers:
        var answerButton = document.createElement("button");
        answerButton.classList.add('btn');
        answerButton.classList.add('answer-btn');
        answerButton.textContent = questions[questionIndex].choices[i].choice;
        // need to check answer here function.
        answerButton.addEventListener('click', answerCheck);
        answerButtonsEl.appendChild(answerButton);
    }
    console.log(questions[questionIndex].a); //log right answer
};




// to display score;
var showScore = function () {
    questionContainerEl.classList.add("hide");
    highScoreContainerEl.classList.remove("hide");

    var scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = "Your final score is: " + score + "!";
    highScoreContainerEl.appendChild(scoreDisplay);

};

// create high score values
var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.getElementById("initials").value;
    if (!initial) {
        alert("Enter your initials!");
        return;
    }
    initialsFormEl.reset();

    var initialScore = {
        initials: initials,
        score: score
    }

    // return sorted array
    var sortedArray = function (a, b) {
        return (b.score - a.score);
    }
    // push and sort scores
    highScores.push(initialScore);
    highScores.sort(function (a, b) {
        return b.score - a.score
    });

    // clear visible list to resort
    while (highScoreListEl.firstChild) {
        highScoreListEl.removeChild(highScoreListEl.firstChild);
    }

    // create elements in order of high scores
    for (var i = 0; i < highScores.length; i++) {
        var highScoreEl = document.createElement('li');
        highScoreEl.className = 'high-score';
        highScoreEl.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoreListEl.appendChild(highScoreEl);
    }

    saveHighScore();
    displayHighScores(); // need a function

};

var displayHighScores = function () {
    highScoreContainerEl.classList.remove("hide");
    gameOver = true;

    if (highScoreContainerEl.className != "hide") {
        starterContainerEl.className = 'hide';
        questionContainerEl.className = 'hide';
        endContainerEl.className = 'hide';
        correctAnswerEl.className = 'hide';
        wrongAnswerEl.className = 'hide';
    }
};




// show a bar with correct and hide wrong if any.
var answerCorrect = () => {
    if (correctAnswerEl.className === "hide") { // if hide already in class properties wont change anything. it wont be class="hide hide" because of = sign. it removes old assignments and rewrites it to be that provided.
        correctAnswerEl.classList.remove("hide");
        wrongAnswerEl.classList.add("hide");
    }
};

var answerWrong = () => {
    if (wrongAnswerEl.className === "hide") {
        wrongAnswerEl.classList.remove("hide");
        correctAnswerEl.classList.add("hide");
    }
};




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















// When I click the start button, timer starts

// need to setTime function and setQuestion()


// Display questions information  including answer buttons


// need to add answerCheck() function

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


// Show current high scores

// Function to show high scores

// // check if there is any local storage
// SCORES
//save high score()
// Stringify array in order to store in local
var saveHighScore = function () {
    localStorage.setItem("highScores", JSON.stringify(highScores));
};


// load values/ called on page load
var loadHighScore = function () {
    var loadedHighScores = localStorage.getItem(JSON.parse("highScores"));
    if (!loadedHighScores) {
        return false;
    }

    loadedHighScores = JSON.parse(loadedHighScores);
    loadedHighScores.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < loadedHighScores.length; i++) {
        var highScoreEl = document.createElement("li");
        highScoreEl.className = "high-score";
        highScoreEl.textContent = loadedHighScores[i].initials + " - " + loadedHighScores[i].score;
        highScoreListEl.appendChild(highScoreEl);

        highScores.push(loadedHighScores[i]);
    }
};

var clearScores = function () {
    highScores = [];

    while (highScoreListEl.firstChild) {
        highScoreListEl.removeChild(highScoreListEl.firstChild);
    }

    localStorage.clear(highScores);
}

// loadHighScore();

// Add event Listeners
viewHighScoresEl.addEventListener("click", displayHighScores);
buttonStartGameEl.addEventListener("click", startGame);
initialsFormEl.addEventListener("click", createHighScore)
buttonSubmitScoreEl.addEventListener("click", () => { console.log("Did you press submit button?") });
buttonGoBackEl.addEventListener("click", () => { console.log("Did you press Go Back button?") });
buttonClearHighScoreEl.addEventListener("click", () => { console.log("Did you press Clear high Scores?") });
