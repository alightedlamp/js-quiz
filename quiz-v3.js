/*
  This version of the quiz utilizes prototype programming
  based on Eloquent JavaScript's World Project

  here is a completed example: https://bl.ocks.org/shiftyp/0e2516f91a044acfb396
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


/* MODEL
  - functions that deal with the data
*/
function Question(num) {
  this.num = num;
  this.question = questions[num].question;
  this.choices = questions[num].choices;
  this.correctAnswer = questions[num].correctAnswer;
}
Question.prototype.getQuestion = function(num) {
  return questions[num];
};

/* CONTROLLER
  - logic that coordinates between model and view
*/
function Quiz(questions) {
  this.questions = questions;
  this.num = 0;
  this.score = 0;
}
Quiz.prototype.forEach = function(q, context) {

};
Quiz.prototype.startQuiz = function(game) {
  var question = new Question(this.num);
  game.showQuestion(question.getQuestion(this.num));
};
Quiz.prototype.nextQuestion = function(choice) {
  /* if (this.checkAnswer(choice, this.question.getQuestion(this.num))) {
    quiz.score++;
  } */
  if (this.num + 1 >= questions.length) {
    this.endQuiz(this.score);
  }
  else {
    this.num++;
  }
  var question = new Question(this.num);
  game.showQuestion(question.getQuestion(this.num));
};
Quiz.prototype.checkAnswer = function(choice, currentQuestion) {
  this.currentQuestion = currentQuestion;
  this.choice = choice;
  return currentQuestion.correctAnswer === choice;
};
Quiz.prototype.endQuiz = function(score) {
  this.score = score;
  // this needs to move down to view
  $("#question").text("You scored " + score + " points!");
};


/* VIEW
  - displays data to user and handles click events
*/
function Game(quiz) {
  this.quiz = quiz;
}
$("#next").click(function() {
  var choice = $(".choices input[name=choice]:checked").val()
  quiz.nextQuestion(choice);
});
$("#reset").click(function() {
  this.resetQuiz();
});
Game.prototype.showQuestion = function(currentQuestion) {
  this.currentQuestion = currentQuestion;
  var radios = "";

  $("#question").text(this.currentQuestion.question);
  for (var i = 0; i < this.currentQuestion.choices.length; i++) {
    radios += "<label><input type='radio' class='choice' name='choice' value='" + i + "'>" + this.currentQuestion.choices[i] + "</label>";
  }
  $(".choices").html(radios);
}
Game.prototype.resetQuiz = function() {

};

var game = new Game();
var quiz = new Quiz(questions);
quiz.startQuiz(game);