const AuthCtrl = require("../controllers/AuthController");
const express = require("express");

const routes = express.Router();

routes.get("/login", AuthCtrl.login);

module.exports = routes;
