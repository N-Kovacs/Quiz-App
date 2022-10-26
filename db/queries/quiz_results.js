const db = require('../connection');

const getCorrectAnswersForQuizResults = (id) => {
  return db.query(`SELECT COUNT(question_results.*) as correct_answers
  FROM question_results
  JOIN quiz_results ON quiz_results.id = quiz_results_id
  WHERE correct = TRUE
  GROUP BY quiz_results.id
  HAVING quiz_results.id = $1;`, [id])
    .then(data => {
      return data.rows[0];
    });
};

const getAttemptsAverageScoreFromQuizID = (id) => {
  return db.query(`SELECT COUNT(quiz_results.*) as global_attempts, AVG(score) as average_score, max_score
  FROM quiz_results
  JOIN quizzes ON quiz_results.quiz_id = quizzes.id
  GROUP BY quizzes.id, score, max_score
  HAVING quizzes.id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

// INSERT to quiz_results
// quiz_id, user_id, score, max_score

const postQuizResults = (quiz) => {
  console.log(quiz);
  return db.query(`
  INSERT INTO quiz_results (quiz_id, user_id, score, max_score)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `, [quiz.quiz_id, quiz.user_id, quiz.score, quiz.max_score])
  .then((result) => {
    console.log(result.rows)
    return result.rows[0].quiz_id
  })
  .catch((err) => {
    console.log(err.message);
  });

}


module.exports = {
  getCorrectAnswersForQuizResults, getAttemptsAverageScoreFromQuizID, postQuizResults
};
