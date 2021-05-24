const AdminGetController = require("../controllers/AdminGetController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.use(AuthMiddleware);

router.get("/:route", AdminGetController);

module.exports = {
  path: "/admin",
  router,
};
