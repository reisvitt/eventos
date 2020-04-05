const EventCtrl = require("../controllers/EventController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

// rotas devem estar autenticadas

routes.post("/event", EventCtrl.create);
routes.put("/event/:id", Auth.authMiddleware, EventCtrl.update);
routes.delete("/event/delete", EventCtrl.deleteEvents);
routes.delete("/event/:id", Auth.authMiddleware, EventCtrl.deleteEvent);
routes.get("/event/list", EventCtrl.index);
routes.get("/event/:id", EventCtrl.get); // retorna um evento em especifico

module.exports = routes;
