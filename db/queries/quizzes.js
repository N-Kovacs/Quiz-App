const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;')
    .then(data => {
      return data.rows;
    });
};

const postQuizzes = () => {
  return db.query(`
  `)
}


module.exports = { getQuizzes };
