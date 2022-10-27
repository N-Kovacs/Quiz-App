////    Take the Quiz Client Side Functions and jQuery!
////
let currentQuestionIndex = 0;
let counter = 1;
let questions = undefined;
let question_results = [];
let quiz_results = [];

// const quizID =
// window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1);

$(() => {
  loadQuestions();
  console.log("* INSIDE doc ready()");
});


////    Fetch JSON Quizzes
////
const loadQuestions = () => {
  //.get.then(don't need ajax params object)
  $.get("/api/questions")
    .then(data => {
      questions = data; // Questions is an ARRAY
      quiz_results.push({

        quiz_id: questions[0].quiz_id //OVERRDIDE problem with cookie
      })
      showCurrentQuestion();
      console.log("* INSIDE loadQuestion()", quiz_results);
    })

};


const showCurrentQuestion = () => {

  const question = questions[currentQuestionIndex];
  console.log("* INSIDE showCurrentQuestion()", question);

  const randomAnswers = scrambleAnswers(question);
  const renderQuiz = makeQuiz(question, randomAnswers);

  $('#quiz-attempt').empty(renderQuiz);
  $('#quiz-attempt').append(renderQuiz);
  $('.quiz-header').css((
    { 'background-image': 'linear-gradient(to bottom, transparent 0%, #19191963 25%, #1d1d20 95%), url(' + question.image_url + ')' }));
  $('#next-question').hide();
  $('#next-question').on('click', () => { counter++; });
  $('#next-question').on('click', getNextQuestion);

  $('.answers').on('click', (event) => {
    const btnVal = event.target.value;
    const $buttonTxt = $(`button[value="${btnVal}"]`).text();

    if ($buttonTxt.trim() === question.correct_answer) {
      $('.quiz-dyn-buttons > h4').html('Yes, you are correct!');
      $('.answers button').prop('disabled', true);
      $(`button[value="${btnVal}"]`).css('background-color', 'green');
      $('#next-question').show();

      question_results.push({
        questions_multiple_choice_id: question.id,
        correct: true
      });
    } else {
      $('.quiz-dyn-buttons > h4').html('Sorry, that is incorrect!');
      $('.answers button').prop('disabled', true);
      $(`button[value="${btnVal}"]`).css('background-color', 'firebrick');
      $('#next-question').show();

      question_results.push({
        questions_multiple_choice_id: question.id,
        correct: false,
      });
    }
    if (counter === questions.length) {
      $('#next-question').replaceWith(`<a href="/results/${quiz_results[0].quiz_id}"><button id="next-question">See Results!</button><a>`).show();
      //AJAX post the array of obj key:values
      $('#next-question').on('click', () => {
        $.post('/results',
        { data: { quiz_results, question_results } })
        .then((res) => {
          $.get(`/results/${quiz_results[0].quiz_id}`);
        })
        .catch((err) => {
          alert("Error!");
        });
      });
    }
  });
  console.log("Q_RESULTS", quiz_results, question_results);
};


const getNextQuestion = () => {
  console.log("* INSIDE getNextQuestion()");
  currentQuestionIndex++;
  if (currentQuestionIndex > questions.length - 1) return;
  showCurrentQuestion();
};


const scrambleAnswers = (answers) => {
  const answerArr = [
    answers.incorrect_answer_one, answers.incorrect_answer_two, answers.incorrect_answer_three, answers.correct_answer
  ];
  const randomArr = answerArr.sort(() => Math.random() - 0.5);
  return randomArr;
};

const makeQuiz = (quiz, randomAnswers) => {
  let $quizStructure =
    $(`
  <section class="make-quiz">
        <div class="question">
          <p>Question ${counter}</p>
          <h3 id="question">${quiz.question}</h3>
        </div>

        <div class="quiz-dyn-buttons">
            <h4>&nbsp</h4>
            <div class="quiz-dyn-next">
              <button id="next-question">Next</button>
            </div>
        </div>

        <div class="answers">
          <button value="1">${randomAnswers[0]}
          </button>
          <button value="2">${randomAnswers[1]}
          </button>
          <button value="3">${randomAnswers[2]}
          </button>
          <button value="4">${randomAnswers[3]}
          </button>
        </div>
      </section>
  `);
  return $quizStructure;
};
