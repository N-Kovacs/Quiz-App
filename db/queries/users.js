const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      return users.rows;
    });
};

////    Get 1 USER
const getUser = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1;
  `, [email])
  .then(user => {
    return user.rows;
  })
}

module.exports = { getUsers, getUser };
