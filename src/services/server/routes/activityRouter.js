const ActivityCreate = require("../controllers/ActivityController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

// rotas devem estar autenticadas

routes.post("/event/:id/activity", Auth.authMiddleware, ActivityCreate.create);
routes.get(
  "/event/:id/activity/list",
  Auth.authMiddleware,
  ActivityCreate.index
);

module.exports = routes;
