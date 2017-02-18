/*
  This version of the quiz utilizes prototype programming
  based on Eloquent JavaScript's World Project
*/

var questions = [{
    question: "Where am I from?",
    choices: ["Dallas", "Austin", "Boston", "New York"],
    correctAnswer: 0
  }, {
    question: "When was I born?",
    choices: ["1998", "1979", "2005", "1988"],
    correctAnswer: 3
  }, {
    question: "What is my favorite band?",
    choices: ["Modest Mouse", "Squarepusher", "Aphex Twin", "Green Day"],
    correctAnswer: 1
  }, {
    question: "Who is the best kitty?",
    choices: ["Gus", "Rocky", "Fatty", "Chester"],
    correctAnswer: 0
  }, {
    question: "What is 548 + 23?",
    choices: ["265", "565", "571", "575"],
    correctAnswer: 2
  }];

// set up the question object
function Question(question) {
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}
// returns a new question
Question.prototype.getQuestion = function(newQuestion) {
  return new Question(this.newQuestion)
};

// controls array
var controls = ["next", "previous", "reset"];

/* build quiz, creating new question objects
  - should determine size of quiz
*/
function Quiz(questions) {

}
/* high order function to loop through questions and do something
  - can this be used to determine function to call after button click?
*/
Quiz.prototype.forEach = function(q, context) {
  // context determines action
  for (var q = 0; q < questions.length; q++) {

  }
};
Quiz.prototype.showQuestion = function() {
  return new Question(question);
};
// gets element from DOM
Quiz.prototype.getEl = function() {

};
// sets element in the DOM
Quiz.prototype.setEl = function() {

}
Quiz.prototype.tallyScore = function() {

};
Quiz.prototype.clearBoard = function() {

};
Quiz.prototype.resetQuiz = function() {

};

var quiz = new Quiz(questions);
console.log(quiz);
