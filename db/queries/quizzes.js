const db = require('../connection');

const getQuizzes = () => {
  return db.query(`SELECT quizzes.*, ROUND(AVG(quiz_results.score)) AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions
  FROM quizzes
  JOIN quiz_results ON quiz_id = quizzes.id
  LEFT JOIN questions_multiple_choice ON questions_multiple_choice.quiz_id = quizzes.id
  GROUP BY quizzes.id;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getQuizzes };
