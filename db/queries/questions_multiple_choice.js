const db = require('../connection');

const postQuestionsMultipleChoice = (quiz_id, questionNum, questions) => {
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
    console.log(result)
    console.log("cool")
    return result.rows[0].id
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = {postQuestionsMultipleChoice};
