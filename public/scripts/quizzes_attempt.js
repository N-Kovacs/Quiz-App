////    Take the Quiz Client Side Functions and jQuery!
////
let currentQuestionIndex = 0;
let questions = undefined;
let question_results = [];
//questions_multiple_choice_id, BOOLEAN

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

      showCurrentQuestion();

      console.log("* INSIDE loadQuestion()", data);
    });
};


const showCurrentQuestion = () => {
  const question = questions[currentQuestionIndex];
  console.log("* INSIDE showCurrentQuestion()", question);

  const randomAnswers = scrambleAnswers(question);
  const renderQuiz = makeQuiz(question, randomAnswers);
  $('#quiz-attempt').empty(renderQuiz);
  $('#quiz-attempt').append(renderQuiz);
  // $('.quiz-header').css('background-image', question.image_url);
  $('#next-question').hide();
  $('#next-question').on('click', getNextQuestion);

  $('.answers').on('click', (event) => {
    const btnVal = event.target.value;
    const $buttonTxt = $(`button[value="${btnVal}"]`).text();

    if ($buttonTxt.trim() === question.correct_answer) {
      $('.quiz-dyn-buttons > h4').html('Yes! You are correct!');
      $('#next-question').show();
      question_results.push({
        questions_multiple_choice_id: question.id,
        correct: true
      });
    } else {
      $('.quiz-dyn-buttons > h4').html('Sorry. That is incorrect!');
      $('#next-question').show();
      question_results.push(
        { questions_multiple_choice_id: question.id,
          correct: false }
          );
        }
        if (question.id === questions.length) {
          $('#next-question').replaceWith('<button id="next-question">See Results!</button>').show();
        }
  });
  // console.log("Q_RESULTS", question_results);
  console.log(question, "===", questions.length);
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
          <p>Question ${quiz.id}</p>
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

/* <div>
  <img src="" />
</div> */
