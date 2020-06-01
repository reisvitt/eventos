const Assist = require("../controllers/AssistantController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

routes.post("/event/:id/assistant", Auth.authMiddleware, Assist.add);
routes.delete(
  "/event/:eventId/assistant/:userId",
  Auth.authMiddleware,
  Assist.remove
);
routes.get("/event/:id/assistant/list/", Auth.authMiddleware, Assist.list);
routes.post("/event/:id/assistant/user", Auth.authMiddleware, Assist.get);

module.exports = routes;
