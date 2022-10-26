const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      return users.rows;
    });
};

////    Get 1 USER by email
const getUser = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email])
  .then(user => {
    return user.rows;
  })
}
////    Get 1 USER by id
////        (**COMBINE THIS AND PREV ONE?)
const getUserByID = (id) => {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1;
  `, [id])
  .then(user => {
    return user.rows;
  })
}

const getUserStats = (id) => {
  let output = []
  return db.query(`
  SELECT
  (SELECT COUNT(quiz_results.*) as quizzes_taken
  FROM users
  JOIN quiz_results on quiz_results.user_id = users.id
  GROUP BY users.id, quiz_results
  HAVING users.id = $1),

  (SELECT COUNT(quizzes.*) as quizzes_made
  FROM users
  JOIN quizzes on quizzes.owner_id = users.id
  GROUP BY users.id
  HAVING users.id = $1);
`, [id])
  .then(user => {
    console.log(user.rows)

    return user.rows;

  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = { getUsers, getUser, getUserByID, getUserStats };
