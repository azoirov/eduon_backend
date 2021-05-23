const HomeGetController = require("../controllers/HomeGetController");

const router = require("express").Router();

router.get("/", HomeGetController);

module.exports = {
  path: "/",
  router: router,
};
