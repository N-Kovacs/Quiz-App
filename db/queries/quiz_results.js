const db = require('../connection');

const getCorrectAnswersForQuizResults = (id) => {
  return db.query(`SELECT COUNT(question_results.*) as correct_answers
  FROM question_results
  JOIN quiz_results ON quiz_results.id = quiz_results_id
  WHERE correct = TRUE
  GROUP BY quiz_results.id
  HAVING quiz_results.id = $1;`, [id])
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    });
};
module.exports = {
  getCorrectAnswersForQuizResults
};
