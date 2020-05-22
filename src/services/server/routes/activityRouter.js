const ActivityCreate = require("../controllers/ActivityController");
const Auth = require("../utils/auth");
const express = require("express");

const routes = express.Router();

routes.post("/event/:id/activity", Auth.authMiddleware, ActivityCreate.create);
routes.get("/event/:eventID/activity/list", ActivityCreate.index);
routes.get("/event/:eventID/activity/:activityID", ActivityCreate.get);
routes.put(
  "/event/:eventID/activity/:activityID",
  Auth.authMiddleware,
  ActivityCreate.update
);
routes.delete(
  "/event/:eventID/activity/:activityID",
  Auth.authMiddleware,
  ActivityCreate.deleteActivity
);

module.exports = routes;
