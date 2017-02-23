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
  },
  {
    question: "How may house plants should one have per room?",
    choices: ["1", "5", "8", "6"],
    correctAnswer: 3
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
  return currentQuestion.correctAnswer == choice;
};
Quiz.prototype.endQuiz = function(score) {
  this.score = score;
  game.resetQuiz(this.score);
};


/* VIEW
  - displays data to user and handles click events

  - click events probably need to be moved within game object
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
Game.prototype.showQuestion = function(currentQuestion) {
  this.currentQuestion = currentQuestion;
  var radios = "";

  $("#question").text(this.currentQuestion.question);
  for (var i = 0; i < this.currentQuestion.choices.length; i++) {
    radios += "<label><input type='radio' class='choice' name='choice' value='" + i + "'>" + this.currentQuestion.choices[i] + "</label>";
  }
  $(".choices").html(radios);
};
Game.prototype.resetQuiz = function(score) {
  this.score = score;

  $("#score").text("You scored " + this.score + " points!");
  $("#question").text("Game over!");

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
