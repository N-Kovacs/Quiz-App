const db = require('../connection');

//returns quizzes
const getQuizzes = () => {
  return db.query(`SELECT quizzes.*, ROUND(AVG(quiz_results.score))*10 AS avg,
  COUNT(questions_multiple_choice.*) AS total_questions
  FROM quizzes
  JOIN quiz_results ON quiz_id = quizzes.id
  LEFT JOIN questions_multiple_choice ON questions_multiple_choice.quiz_id = quizzes.id
  GROUP BY quizzes.id;`)
    .then(data => {
      return data.rows;
    });
};

//returns quiz deatils given an id
const getQuizByID = (id) => {
  return db.query(`
  SELECT * FROM quizzes
  WHERE id = $1;
  `, [id])
  .then(quizzes => {
    return quizzes.rows;
  })
}

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
  })
}

//post quizes to database
//returns just the id of the posted quiz
// NOTE OWNER ID IS DUMMY 1 AT THE MOMENT
const postQuizzes = (quiz) => {
  let public = false
  //trim url input to allow only valid url
  let customURLTrim = quiz.custom_url.replace(/\s/g, '');
  //console.log(quiz.title)
  //console.log(quiz.owner_id)
  if (quiz.public === "on") {
    public = true
  }
  return db
  .query(`
  INSERT INTO quizzes (owner_id, public, title, subject, url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `, [1, public, quiz.title, quiz.subject, customURLTrim ])
  .then((result) => {

    console.log(result.rows[0].id)
    return result.rows[0].id
  })
  .catch((err) => {

    console.log(err.message);
  });
}



module.exports = { getQuizzes, postQuizzes, getQuizByID, getQuizQuestionCountByID };
