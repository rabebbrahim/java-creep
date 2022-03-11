var myQuestions = [
	{
		question: 'Je suis le plus petit pays , qui suis-je ?',
		answers: {
			a: 'Malte',
			b: 'Monaco',
			c: 'Vatican',
		},
		correctAnswer: 'c',
	},
	{
		question: 'Je suis le pays le plus peuplé, qui suis-je ?',
		answers: {
			a: 'Chine',
			b: 'Inde',
			c: 'Singapore',
		},
		correctAnswer: 'a',
	},
	{
		question: 'Je suis le fleuve le plus long, qui suis-je ?',
		answers: {
			a: 'Mississippi',
			b: 'Amazone',
			c: 'Nil',
		},
		correctAnswer: 'b',
	},
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submitQuiz');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(
	questions,
	quizContainer,
	resultsContainer,
	submitButton
) {
	function showQuestions(questions, quizContainer) {
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for (var i = 0; i < questions.length; i++) {
			// first reset the list of answers
			answers = [];

			// for each available answer...
			for (letter in questions[i].answers) {
				// ...add an html radio button
				answers.push(
					'<li>' +						
						'<input type="radio" name="question' +
						i +
						'" value="' +
						letter +
						'">' +
						"<div>"+
						letter +
						': ' +
						questions[i].answers[letter] +
						"</div>"+						
						'</li>'
				);
			}

			// add this question and its answers to the output
			output.push(
				'<div class="question">' +
					'<h3>' +
					questions[i].question +
					'</div>' +
					'<ul class="answers">' +
					answers.join('') +
					'</h3>' +
					'</ul>'
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join('');
	}

	function showResults(questions, quizContainer, resultsContainer) {
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll('.answers');

		// keep track of user's answers
		var userAnswer = '';
		var numCorrect = 0;

		// for each question...
		for (var i = 0; i < questions.length; i++) {
			// find selected answer
			userAnswer = (
				answerContainers[i].querySelector(
					'input[name=question' + i + ']:checked'
				) || {}
			).value;

			// if answer is correct
			if (userAnswer === questions[i].correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[i].style.backgroundColor = '#7cf078';
			}
			// if answer is wrong or blank
			else {
				// color the answers red
				answerContainers[i].style.backgroundColor = '#dd7878';
			}
		}

		// show number of correct answers out of total
		resultsContainer.innerHTML =
			'<h2>' +
			numCorrect +
			' out of ' +
			questions.length +
			'<br> ' +
			Math.round((numCorrect / questions.length) * 100) +
			'%' +
			'</h2>';
	}

	// show questions right away
	showQuestions(questions, quizContainer);

	// on submit, show results
	submitButton.onclick = function () {
		showResults(questions, quizContainer, resultsContainer);
	};
}
