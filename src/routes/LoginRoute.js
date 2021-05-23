const LoginPostController = require("../controllers/LoginPostController");

const router = require("express").Router();

router.post("/", LoginPostController);

module.exports = {
  path: "/login",
  router,
};
