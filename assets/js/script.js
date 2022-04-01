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

// Grab reference to element

// Define other variables
// High Score Array
var HighScores = [];
// assign array details for questions
var arrayShuffledQuestions;
var questionIndex = 0;


// Functions

// When I click the start button, timer starts
var totalTime = 100;
var newQuiz = function() {
    questionIndex = 0;
    totalTime = 99;
    timeLeftEl.textContent = totalTime;
    initialInput.textContent = '';

    // NEED TO CONTINUE SLEEPY
}

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
// startQuizBtnEl.addEventListener("click", newQuiz);
