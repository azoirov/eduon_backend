const SignUpPostController = require("../controllers/SignUpPostController");

const router = require("express").Router();

router.post("/", SignUpPostController);

module.exports = {
  path: "/signup",
  router: router,
};
