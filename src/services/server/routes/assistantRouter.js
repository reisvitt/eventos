const Assist = require("../controllers/AssistantController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router()

routes.put("/event/add-Assistant/:id",Auth.authMiddleware, Assist.add )
routes.delete("/event/add-Assistant/:id",Auth.authMiddleware, Assist.remove )

module.exports = routes;