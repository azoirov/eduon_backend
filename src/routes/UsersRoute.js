const UsersGetController = require("../controllers/UsersGetController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.use(AuthMiddleware);

router.get("/:user_id", UsersGetController);

module.exports = {
  path: "/users",
  router: router,
};
