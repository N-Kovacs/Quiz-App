const db = require('../connection');

const getQuizQuestions = (id) => {
  return db.query(`
  SELECT questions_multiple_choice.*, quizzes.title, quizzes.subject, quizzes.image_url
    FROM questions_multiple_choice
  JOIN quizzes ON quizzes.id = quiz_id
  WHERE quizzes.id = $1;
  `, [id])
  .then(quiz_questions => {
    return quiz_questions.rows;
  });
};

module.exports = {
  getQuizQuestions
}
