// CLIENT facing SCRIPTS here - - QUIZZES_new

//markup for creating the additonal question, with name depenedent on how many questions exist
const createAdditionalQuestion = function (numOfQuestion) {
  const markup = `
  <div class="form-group" id = "quiz_question_${numOfQuestion}">
  <input type="text" required maxlength="255" class="form-control" name = "question_${numOfQuestion}" placeholder="Question ${numOfQuestion}">
  <input type="text" required maxlength="255" class="form-control" name = "correct_answer_${numOfQuestion}" placeholder="Correct Answer">
  <input type="text" required maxlength="255" class="form-control" name = "first_incorrect_answer_${numOfQuestion}" placeholder="Incorrect Answer">
  <input type="text" required maxlength="255" class="form-control" name = "second_incorrect_answer_${numOfQuestion}" placeholder="Incorrect Answer">
  <input type="text" required maxlength="255" class="form-control" name = "third_incorrect_answer_${numOfQuestion}" placeholder="Incorrect Answer">
  </div>
  `;
  return markup;
};

//random url string
const generateRandomString = function () {
  let poschar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += poschar.charAt(Math.floor(Math.random() * poschar.length));
  }
  return result;
};

$(() => {
  //append first question
  let numberOfQuestions = 1;
  $("#Questions").append(createAdditionalQuestion(numberOfQuestions));
  //random url button clicked, textbox filled
  $("#random_url_button").on("click", () => {
    $("#custom_url").val(generateRandomString());
  });
  //additonal question clicked
  $("#add_question").on("click", () => {
    numberOfQuestions++;
    let $addedQuestion = createAdditionalQuestion(numberOfQuestions);
    $("#Questions").append($addedQuestion);
    //console.log(numberOfQuestions)
  });

  //remove questions clicked, removes if there is more than one question
  $("#remove_question").on("click", () => {
    //console.log("?")
    if (numberOfQuestions > 1) {
      let removed = `quiz_question_${numberOfQuestions}`;
      $("#" + removed).remove();
      numberOfQuestions--;
      //console.log(numberOfQuestions)
    }
  });
  $("#return").on("click", () => {
    event.preventDefault();
    window.location.href = window.location.origin + "/quizzes"


  });
});
