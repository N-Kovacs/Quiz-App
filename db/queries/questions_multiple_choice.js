const db = require('../connection');

//async recursive function to fill all questions into the database
const postQuestionsMultipleChoice = async (quiz_id, questionNum, questions) => {

  let count = Math.round(((Object.keys(questions).length - 4) /5))
  if (questionNum > 1) {
    //console.log("I was here")
    await postQuestionsMultipleChoice(quiz_id, questionNum-1, questions)
  }

  let path1 = "question_" + questionNum;
  let path2 = "correct_answer_" + questionNum;
  let path3 = "first_incorrect_answer_" + questionNum;
  let path4 = "second_incorrect_answer_" + questionNum;
  let path5 = "third_incorrect_answer_" + questionNum;

  return db
  .query(`
  INSERT INTO questions_multiple_choice (quiz_id, question, correct_answer, incorrect_answer_one, incorrect_answer_two, incorrect_answer_three)
  VALUES ($1, $2, $3, $4, $5, $6 )
  RETURNING *;
  `, [quiz_id, questions[path1], questions[path2], questions[path3], questions[path4], questions[path5]])
  .then((result) => {
    return result.rows[0].id
  })
  .catch((err) => {
    console.log(err.message);
  });

}

module.exports = {postQuestionsMultipleChoice};
