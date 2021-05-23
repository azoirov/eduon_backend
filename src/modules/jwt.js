const { verify, sign } = require("jsonwebtoken");
const { SECRET_WORD } = require("../../config");

module.exports.generateJWTToken = (data) => {
  try {
    return sign(data, SECRET_WORD);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.checkJWTToken = (key) => {
  try {
    return verify(key, SECRET_WORD);
  } catch (e) {
    throw new Error(e);
  }
};
