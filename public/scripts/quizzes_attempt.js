////

// Make createQuestionElement function with template literals HTML

let currentQuestionIndex = 0;
let questions = undefined;

$(() => {
  //.get.then(don't need ajax params object)
  loadQuestions();
  $('#next-question').on('click', getNextQuestion);

    //fetch questions inside click
});

const loadQuestions = () => {
  $.get("/api/questions")
      .then(data => {
        questions = data // Questions is an ARRAY
        showCurrentQuestion();
      })
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
  };

const showCurrentQuestion = () => {
  const question = questions[currentQuestionIndex];
  console.log(question);
}

const getNextQuestion = () => {
  currentQuestionIndex++
  if (currentQuestionIndex > questions.length-1) return;
  showCurrentQuestion();
}
