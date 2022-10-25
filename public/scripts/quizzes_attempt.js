////

// Make createQuestionElement function with template literals HTML

let currentQuestionIndex = 0;
let questions = undefined;

let question_results = []; //fill that with answers
//

$(() => {
  //.get.then(don't need ajax params object)
  loadQuestions();
  $('#next-question').on('click', getNextQuestion);
  console.log("* INSIDE doc ready()");
    //fetch questions inside click
    

});

const loadQuestions = () => {
  $.get("/api/questions")
      .then(data => {
        questions = data // Questions is an ARRAY
        console.log("* INSIDE loadQuestions()", questions);
        showCurrentQuestion();
      })
  };

const showCurrentQuestion = () => {
  const question = questions[currentQuestionIndex];
  console.log(question);
  let makeQuiz = makeQuiz(question);
  $('quiz-attempt').append(makeQuiz);
  $('quiz-attempt').empty(makeQuiz);

}

const getNextQuestion = () => {
  console.log("* INSIDE getNextQuestion()");
  currentQuestionIndex++
  if (currentQuestionIndex > questions.length-1) return;
  showCurrentQuestion();
}

const makeQuiz = (quiz) => {
  let $quizStructure =
  $(`
  <section class="make-quiz">
        <div class="question">
          <h3 id="question">QUESTION.......</h3>
        </div>

        <div>
          <img src="" />
        </div>


        <div class="quiz-dyn-buttons">
          <h4>correct!/ nope!</h4>
          <button id="next-question">Next</button>
        </div>

        <div class="answers">
          <button id="asnwer_1">ANSWERs and more text 1 - ANSWER</button>
          <button id="asnwer_1">ANSWER 2 - ANSWER</button>
          <button id="asnwer_1">ANSWER 3 - ANSWER</button>
          <button id="asnwer_1">ANSWER 4 - ANSWER</button>
        </div>
      </section>
  `)
};















    // $.get('/quizzes/3')
    //   .then((questions) => {

    //   // createQuestionElement(questions[currentQuestionsIndex]);
    //   console.log("********", questions);

    //   // const $questionList = $('#question');
    //   // $quizList.empty();

    //   // for(const qu in response.quizzes) {
    //   //   $(`<li class="question">`).text(quiz.title).appendTo($quizList);
    //   // }
    // });
