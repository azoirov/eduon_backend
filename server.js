const express = require("express");
const glob = require("glob");
const path = require("path");
const { PORT } = require("./config");
const psql = require("./src/modules/postgres")();

const app = express();

app.listen(PORT, () => console.log(`SERVER READY AT PORT ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.psql = await psql;
  next();
});

glob("src/routes/*Route.js", (err, files) => {
  files.forEach((file) => {
    const Route = require(path.join(__dirname, file));
    if (Route.path && Route.router) app.use(Route.path, Route.router);
  });
});
