const HomeGetController = require("../controllers/HomeGetController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/", AuthMiddleware, HomeGetController);

module.exports = {
  path: "/",
  router: router,
};
