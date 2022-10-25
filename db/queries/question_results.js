const db = require('../connection');

const getAnswersForQuizResultsID = (id) => {
  return db.query(`SELECT id, correct
  FROM question_results
  WHERE quiz_results_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
}


module.exports = {getAnswersForQuizResultsID};