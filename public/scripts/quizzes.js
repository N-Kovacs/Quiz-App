// CLIENT facing SCRIPTS here - - QUIZZES

// $(() => {
//   $('#fetch-quizzes').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/quizzes'
//     })
//     .done((response) => {
//       const $quizList = $('#quizzes');
//       $quizList.empty();

//       for(const quiz of response.quizzes) {
//         $(`<li class="quiz">`).text(quiz.title).appendTo($quizList);
//       }
//     });
//   });
// });
