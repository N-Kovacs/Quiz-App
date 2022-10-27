const db = require('../connection');

const getAnswersForQuizResultsID = (id) => {
  return db.query(`SELECT id, correct
  FROM question_results
  WHERE quiz_results_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

const postQuestionResultsbyID = (data, user_id, quiz_results_id) => {
  let postquery = `
INSERT INTO question_results
(questions_multiple_choice_id, user_id, quiz_results_id, correct)
VALUES `;
  let x = 1;
  let values = [];
  for (let i = 0; i < data.length; i++) {

    if (i !== data.length - 1) {
      postquery += `($${x}, $${x + 1}, $${x + 2}, $${x + 3}),
      `;
    } else {
      postquery += `($${x}, $${x + 1}, $${x + 2}, $${x + 3})
      `;
    }
    values.push(data[i].questions_multiple_choice_id);
    values.push(user_id);
    values.push(quiz_results_id);

    values.push(eval((data[i].correct)));
    x += 4;
  }
  postquery += `
  RETURNING *;`;

  console.log("* * * postQuestionResultbyID", postquery);
  console.log("* * * postQuestionResultbyID", values);

  return db.query(postquery, values)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {
  getAnswersForQuizResultsID, postQuestionResultsbyID
};
