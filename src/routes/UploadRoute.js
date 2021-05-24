const UploadUserAvatarController = require("../controllers/UploadUserAvatarPostController");
const fileUpload = require("express-fileupload");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.use(AuthMiddleware);

router.post("/user", fileUpload(), UploadUserAvatarController);

module.exports = {
  path: "/upload",
  router: router,
};
