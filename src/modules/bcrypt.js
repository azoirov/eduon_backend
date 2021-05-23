const bcrypt = require("bcrypt");

module.exports.generateHash = async function generateHash(word) {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(word, salt);
};

module.exports.compare = function compare(word, crypt) {
  return bcrypt.compare(word, crypt);
};
