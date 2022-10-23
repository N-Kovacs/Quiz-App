// CLIENT facing SCRIPTS here - - QUIZZES_new

const createAdditionalQuestion = function(numOfQuestion) {
  const markup = `
  <div class="form-group" id = "quiz_question_${numOfQuestion}">
  <input type="text" class="form-control question" placeholder="Question">
  <input type="text" class="form-control correct_answer_${numOfQuestion}" placeholder="Correct Answer">
  <input type="text" class="form-control first_incorrect_answer_${numOfQuestion}" placeholder="Incorrect Answer 1">
  <input type="text" class="form-control second_incorrect answer_${numOfQuestion}" placeholder="Incorrect Answer 2">
  <input type="text" class="form-control third_incorrect answer_${numOfQuestion}" placeholder="Incorrect Answer 3">
  </div>
  `
  return markup;

};

const generateRandomString = function () {
  let poschar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += poschar.charAt(Math.floor(Math.random() * poschar.length));
  }
  return result;
};

$(() => {
  let numberOfQuestions = 1
  $('#random_url_button').on('click', () => {
    $('#custom_url').val(generateRandomString())
  });
  $('#add_question').on('click', () => {
    let $addedQuestion = createAdditionalQuestion(numberOfQuestions)
    $('#Questions').append($addedQuestion);
    numberOfQuestions++
    console.log(numberOfQuestions)


  });
  $('#remove_question').on('click', () => {
    console.log("?")
    if (numberOfQuestions > 1 ){
      numberOfQuestions--
      let removed = `quiz_question_${numberOfQuestions}`
      $('#' + removed).remove()
      console.log(numberOfQuestions)
    }
  });
});





const addUser = function (user) {
  //CODE HERE
  return pool
  .query(`INSERT INTO users (
    name, email, password)
    VALUES (
    $1, $2, $3)
    RETURNING *;
`, [user.name, user.email, user.password])
  .then((result) => {
    return result;
  })
  .catch((err) => {
    return null;
  });

};
