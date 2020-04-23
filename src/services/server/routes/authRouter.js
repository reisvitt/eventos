const AuthCtrl = require("../controllers/AuthController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

routes.get("/login", AuthCtrl.login);
routes.post("/refresh-token", AuthCtrl.refreshToken, Auth.authMiddleware)

module.exports = routes;
