////
// Make createQuestionElement function with template literals HTML

let currentQuestionIndex = 0;
let questions = undefined;

let question_results = []; //fill with answers
//

$(() => {
  loadQuestions();
  // $('#next-question').on('click', getNextQuestion);
  $('#next-question').on('click', () => {
    alert('boomie');
  });
  console.log("* INSIDE doc ready()");
  //fetch questions inside click

});

const loadQuestions = () => {
  //.get.then(don't need ajax params object)
  $.get("/api/questions")
      .then(data => {
        questions = data // Questions is an ARRAY

        console.log("* INSIDE loadQuestions()", questions);

        showCurrentQuestion();
      })
    };

    const showCurrentQuestion = () => {
      const question = questions[currentQuestionIndex];

      console.log("* INSIDE showCurrentQuestion()", question);

      const renderQuiz = makeQuiz(question);
      $('#quiz-attempt').append(renderQuiz);
      // $('.quiz-header').css('background-image', question.image_url);
      // $('#quiz-attempt').empty(renderQuiz);
}

const getNextQuestion = () => {
  currentQuestionIndex++
  if (currentQuestionIndex > questions.length-1) return;
  showCurrentQuestion();
}

const makeQuiz = (quiz) => {
  let $quizStructure =
  $(`
  <section class="make-quiz">
        <div class="question">
          <p>Question ${quiz.id}</p>
          <h3 id="question">${quiz.question}</h3>
        </div>

        <div>
          <img src=""/>
        </div>
        <div class="quiz-dyn-buttons">
          <div class="true-false">
            <h4>You are correct!</h4>
            <h4>Nope, incorrect!</h4>
          </div>
          <button id="next-question">Next</button>
        </div>

        <div class="answers">
          <button id="answer_1">${quiz.incorrect_answer_one}</button>
          <button id="answer_2">${quiz.incorrect_answer_two}</button>
          <button id="answer_3">${quiz.incorrect_answer_three}</button>
          <button id="answer_4">${quiz.correct_answer}</button>
        </div>
      </section>
  `);
  return $quizStructure;
};
