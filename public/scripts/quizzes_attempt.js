////    Take the Quiz Functions and jQuery!
////
let currentQuestionIndex = 0;
let questions = undefined;

let question_results = []; //fill with answers
//

$(() => {

  loadQuestions();
  console.log("* INSIDE doc ready()");

});

const loadQuestions = () => {
  //.get.then(don't need ajax params object)
  $.get("/api/questions")
    .then(data => {

      questions = data; // Questions is an ARRAY
      showCurrentQuestion();

      console.log("* INSIDE loadQuestion()");
    });
};

const showCurrentQuestion = () => {
  const question = questions[currentQuestionIndex];
  console.log("* INSIDE showCurrentQuestion()", question);

  const renderQuiz = makeQuiz(question);
  $('#quiz-attempt').empty(renderQuiz);
  $('#quiz-attempt').append(renderQuiz);
  $('#next-question').hide();
  $('#next-question').on('click', getNextQuestion);

  $('.answers').on('click', (event) => {
    // $('.quiz-dyn-buttons > h4').html('Yes! You are correct!');
    // $('.quiz-dyn-buttons > h4').html('Sorry. That is incorrect!');
    $('#next-question').show();


  });



  // $('.quiz-header').css('background-image', question.image_url);

};

const getNextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex > questions.length - 1) return;
  showCurrentQuestion();
};

const makeQuiz = (quiz) => {
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
          <button value="1">${quiz.incorrect_answer_one}
          </button>
          <button value="2">${quiz.incorrect_answer_two}
          </button>
          <button value="3">${quiz.incorrect_answer_three}
          </button>
          <button value="4">${quiz.correct_answer}
          </button>
        </div>
      </section>
  `);
  return $quizStructure;
};

//target answer button, when click, read id.

/* <div class="true-false">
<h4>You are correct!</h4>
<h4>Nope, incorrect!</h4>
</div>
<button id="next-question">Next</button> */

//$(".answers button").click(event => (console.log(event.target.value)));



//
// do not scramble button scramble ANSWER

/* <div>
  <img src="" />
</div> */
