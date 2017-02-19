/*

	- how can this be made better?
	- can use map to create array mapping user answers to correct answers?

*/

$(document).ready(function() {
	var numQuestion = 0;
	var score = 0;
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

	var userAnswers = [];
	var correctAnswers = [];

	// build array of correct answers to compare against when quiz is done
	_.each( questions, function(i) {
		correctAnswers.push(i.choices[i.correctAnswer]);
	});

	// element variables for simpler reference later
	var $question = $("#question");
	var $next = $("#next");
	var $choices = $(".choices");

	// display a new question
	var showQuestion = function() {
		// pull question and choices from questions list
		var currentQuestion = questions[numQuestion].question;
		var questionChoices = questions[numQuestion].choices;

		// set it up
		$question.text(currentQuestion);

		_.each( questionChoices, function(i) {
			var $label = $("<label>");
			var $text = $("<span class=\"choice\">" + i + "</span>");
			var $input = $("<input>", {
				type: 'radio',
				name: 'choice',
				class: 'choice',
				value: i
			});

			$label.appendTo($choices);
			$input.appendTo($label);
			$text.insertAfter($input);
		});
	}

	// do some stuff when user clicks 'next' - magic!
	$next.on("click", function() {
		var checkAnswers = function() {
			clearBoard();

			// compare user's answer to correct answers, tally up the points
			_.each( userAnswers, function(userAnswer) {
				_.each ( correctAnswers, function(correctAnswer) {
					if ( userAnswer == correctAnswer ) {
						score++;
					}
				});
			});

			return score;
		}
		var clearBoard = function() { 
			$choices.empty();
			$("#show-answers").remove();
			$next.text("Next");
		}
		var startOver = function() {
			userAnswers = [];
			numQuestion = 0;
			score = 0;
			clearBoard();
			showQuestion();
		}

		if ( $(".choices input[name=choice]:checked").val() == undefined && numQuestion != questions.length - 1 ) {
			$( "#question-group" ).effect( "shake" );
		}
		else {
			if ( numQuestion < questions.length - 1 ) {
				// add user answer to array to compare later
				userAnswers.push( $(".choices input[name=choice]:checked").val() );

				numQuestion++;
				clearBoard();
				showQuestion();
			} 
			else if ( $next.text() == "Try again!" ) {
				startOver();
			} 
			else {
				score = checkAnswers();

				// end quiz, display score
				$question.text("You're done!");
				$choices.append("<p>You got " + score + " out of " + questions.length + " right!</p>");
				$next.after("<button id=\"show-answers\">Show Answers</button>");
				$next.text("Try again!");

				$("#show-answers").on("click", function() {

					var showAnswers = function() {
						var num = 1;
						var $answersList = $("<ol>");
						_.each(correctAnswers, function(i) {
							$answersList.append("<li>" + i + "</li>");
							num++;
						});
						$answersList.appendTo(".choices");
					}

					$(".choice-group").append(showAnswers());
					$("#show-answers").attr("disabled", "disabled");
				});
			}
		}
	});

	showQuestion();
});