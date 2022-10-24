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

module.exports = { getUsers, getUser, getUserByID };
