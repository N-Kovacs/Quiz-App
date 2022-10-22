////
///   USER Passsword Verification
//

const verifyPassword = function(password, userData) {
  if (!password || !userData) {
    return false;
  }
  if (password !== userData.password) {
    return false;
  }
  return true;
};

module.exports = verifyPassword;
