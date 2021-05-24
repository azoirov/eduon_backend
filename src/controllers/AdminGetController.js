const AdminSessionsGetController = require("./AdminSessionsGetController");

module.exports = async (req, res) => {
  const { route } = req.params;

  switch (route) {
    case "sessions":
      await AdminSessionsGetController(req, res);
      break;

    default:
      break;
  }
};
