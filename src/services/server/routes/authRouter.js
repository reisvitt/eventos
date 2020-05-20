const AuthCtrl = require("../controllers/AuthController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

routes.get("/login", AuthCtrl.login);
routes.post("/refresh-login",  Auth.authMiddleware, AuthCtrl.refreshLogin)

module.exports = routes;
