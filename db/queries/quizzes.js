const db = require('../connection');

//returns all quizzes
const getQuizzes = () => {
  return db.query(`
<<<<<<< HEAD
  SELECT quizzes.*, ROUND(AVG(quiz_results.score*100/quiz_results.max_score)) AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions
=======
  SELECT quizzes.*, ROUND(AVG(quiz_results.score))*10 AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions, users.name
>>>>>>> master
    FROM quizzes
  LEFT JOIN quiz_results ON quiz_id = quizzes.id
  LEFT JOIN questions_multiple_choice ON questions_multiple_choice.quiz_id = quizzes.id
  JOIN users ON users.id = quizzes.owner_id
  GROUP BY quizzes.id, users.name
  ORDER BY quizzes.id DESC;
  `)
    .then(quizzes => {
      return quizzes.rows;
    });
};

//returns quiz deatils given an id
const getQuizByID = (id) => {
  return db.query(`
  SELECT * FROM quizzes
  WHERE id = $1;
  `, [id])
    .then(quizzes => {
      return quizzes.rows[0];
    });
};

const getQuizByURL = (id) => {
  return db.query(`
  SELECT * FROM quizzes
  WHERE url = $1;
  `, [id])
    .then(quizzes => {
      return quizzes.rows[0];
    });
};

const getQuizByOwnerID = (id) => {
  return db.query(`
  SELECT quizzes.*, ROUND(AVG(quiz_results.score))*10 AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions
    FROM quizzes
  LEFT JOIN quiz_results ON quiz_id = quizzes.id
  LEFT JOIN questions_multiple_choice ON questions_multiple_choice.quiz_id = quizzes.id
  WHERE owner_id = $1
  GROUP BY quizzes.id
  ORDER BY quizzes.id DESC;
  `, [id])
    .then(quizzes => {
      return quizzes.rows;
    });
};

//returns the count of quiz questions given the id of a quiz
const getQuizQuestionCountByID = (id) => {
  return db.query(`
  SELECT COUNT(questions_multiple_choice.*) FROM quizzes
  JOIN questions_multiple_choice ON quiz_id = quizzes.id
  GROUP BY quizzes.id
  having quizzes.id = $1;
  `, [id])
    .then(quizzes => {

      return quizzes.rows;
    });
};
//
const getTitleSubjectByResultsID = (id) => {
  return db.query(`
  SELECT title, subject, image_url, quiz_id
  FROM quizzes
  JOIN quiz_results ON quiz_results.quiz_id = quizzes.id
  WHERE quiz_results.id = $1;
  `, [id])
    .then(quizzes => {

      return quizzes.rows;
    })
};


//INSERT Quizzes to Database
//returns just the id of the posted quiz
// NOTE OWNER ID IS DUMMY 1 AT THE MOMENT
const postQuizzes = (quiz) => {
  let public = true;
  //trim url input to allow only valid url
  let customURLTrim = quiz.custom_url.replace(/\s/g, '');
  //console.log(quiz.title)
  //console.log(quiz.owner_id)
  console.log(quiz)
  if (quiz.private === "on") {

    public = false;
  }
  return db
    .query(`
  INSERT INTO quizzes (owner_id, public, title, subject, url, image_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `, [1, public, quiz.title, quiz.subject, customURLTrim, quiz.image_url])
    .then((result) => {

      console.log(result.rows[0].id);
      return result.rows[0].id;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getQuizzes, postQuizzes, getQuizByID, getQuizQuestionCountByID, getTitleSubjectByResultsID, getQuizByOwnerID, getQuizByURL
};
