const UserCtrl = require("../controllers/UserController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

//routes.use(Auth.authMiddleware)

routes.post("/user", UserCtrl.createUser);
routes.put("/user/:id", UserCtrl.updateUser);
routes.delete("/user/delete", UserCtrl.deleteUsers);
routes.delete("/user/:id", UserCtrl.deleteUser);
routes.get("/user", UserCtrl.getUser);
routes.get("/user/list", Auth.authMiddleware, UserCtrl.showUsers);
routes.get("/me", Auth.authMiddleware, UserCtrl.me);

module.exports = routes;
