"use strict"
var questions = [
  {
    question: "Where am I from?",
    choices: ["Dallas", "Austin", "Boston", "New York"],
    correctAnswer: 0
  },
  {
    question: "When was I born?",
    choices: ["1998", "1979", "2005", "1988"],
    correctAnswer: 3
  },
  {
    question: "What is my favorite band?",
    choices: ["Modest Mouse", "Squarepusher", "Aphex Twin", "Green Day"],
    correctAnswer: 1
  },
  {
    question: "Who is the best kitty?",
    choices: ["Gus", "Rocky", "Phatty", "Chester"],
    correctAnswer: 0
  },
  {
    question: "What is 548 + 23?",
    choices: ["265", "565", "571", "575"],
    correctAnswer: 2
  }
];


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

  this.userAnswers = [];
}
Quiz.prototype.startQuiz = function(game) {
  this.num = 0;
  this.score = 0;

  var currentQuestion = new Question(this.num);
  game.showQuestion(currentQuestion.getQuestion(this.num));
};
Quiz.prototype.nextQuestion = function(choice) {
  var currentQuestion = new Question(this.num);
  if (this.checkAnswer(choice, currentQuestion.getQuestion(this.num))) {
    quiz.score++;
  }
  if (this.num + 1 >= questions.length) {
    this.endQuiz(this.score);
  }
  else {
    this.num++;
    var currentQuestion = new Question(this.num);
    game.showQuestion(currentQuestion.getQuestion(this.num));
  }
};
Quiz.prototype.checkAnswer = function(choice, currentQuestion) {
  this.currentQuestion = currentQuestion;
  this.choice = choice;
  this.userAnswers.push(this.choice);
  return currentQuestion.correctAnswer == choice;
};
Quiz.prototype.showAnswers = function() {
  var answers = "The correct answers are: ";

  this.questions.forEach(function(question, index) {
    // if the correct answer doesn't match the user's answer, change styling
    if (question.correctAnswer !== this.userAnswers[index]) { // broken
      answers += "<b class='red'>" + question.choices[question.correctAnswer] + "</b>";
    }
    else {
      answers += question.choices[question.correctAnswer];
    }
    // if it's the last question, don't add a comma to the string
    if (questions.indexOf(question) < questions.length) {
      answers += ", ";
    }
  });
  return answers;
};
Quiz.prototype.endQuiz = function(score) {
  this.score = score;
  // this.answers = this.showAnswers();
  game.resetQuiz(this.score, this.answers);
};


/* VIEW
  - displays data to user and handles click events
*/
function Game(quiz) {
  this.quiz = quiz;
}
$("#next").click(function() {
  var choice = $(".choices input[name=choice]:checked").val()
  if (choice == undefined) {
    $("#question-group").effect("shake");
    return;
  }
  quiz.nextQuestion(choice);
});
$("#reset").click(function() {
  $("#next").toggleClass("hide");
  $("#reset").toggleClass("hide");

  $("#score").empty();
  game.newGame();
});
$("#show-answers").click(function() {
  $(this).parent().toggleClass("hide");
});
Game.prototype.showQuestion = function(currentQuestion) {
  this.currentQuestion = currentQuestion;
  var radios = "";

  $("#question").text(this.currentQuestion.question);
  for (var i = 0; i < this.currentQuestion.choices.length; i++) {
    radios += "<label><input type='radio' class='choice' name='choice' value='" + i + "'>" + this.currentQuestion.choices[i] + "</label>";
  }
  $(".choices").html(radios);
};
Game.prototype.resetQuiz = function(score, answers) {
  this.score = score;

  $("#question").text("Game over!");
  $("#score").text("You scored " + this.score + " points!");
  // $("#answers").text(answers);

  $(".choices").empty();
  $("#next").toggleClass("hide");
  $("#reset").toggleClass("hide");
};
Game.prototype.newGame = function() {
  this.quiz = new Quiz(questions);
  game = new Game(this.quiz);
  quiz.startQuiz(game);
};

var quiz = new Quiz(questions);
var game = new Game(quiz);
quiz.startQuiz(game);
