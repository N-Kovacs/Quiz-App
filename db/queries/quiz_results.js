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

const getResultsByOwnerID = (id) => {
  return db.query(`
  SELECT score, max_score, quizzes.title, quizzes.url as quiz_url, quiz_results.id as id
  FROM quiz_results
  JOIN quizzes ON quiz_results.quiz_id = quizzes.id
  JOIN users ON quiz_results.user_id = users.id
  WHERE users.id = $1;
  `, [id])
    .then(quizzes => {
      return quizzes.rows;
    });
};



module.exports = {
  getCorrectAnswersForQuizResults, getAttemptsAverageScoreFromQuizID, getResultsByOwnerID
};
