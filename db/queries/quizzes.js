const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;')
    .then(data => {
      return data.rows;
    });
};


//post quizes to database
// NOTE OWNER ID IS DUMMY 1 AT THE MOMENT
const postQuizzes = (quiz) => {
  let public = false
  console.log(quiz.title)
  console.log(quiz.owner_id)
  if (quiz.public === "on") {
    public = true
  }
  return db
  .query(`
  INSERT INTO quizzes (owner_id, public, title, subject, url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [1, public, quiz.title, quiz.subject, quiz.custom_url ])
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


module.exports = { getQuizzes, postQuizzes };
