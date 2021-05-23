require("dotenv").config();

const { env } = process;

module.exports = {
  PORT: env.PORT,
  CONNECTION_STRING: env.CONNECTION_STRING,
};
