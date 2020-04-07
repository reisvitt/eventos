const express = require("express");
const cors = require("cors");
const db = require("./database");
const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");
const authRouter = require("./routes/authRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.get("/", (req, res) => {
  res.send("SERVER OK");
});

app.use(`/api`, userRouter);
app.use(`/api`, eventRouter);
app.use("/api", authRouter);

app.listen(3333, () => console.log("Server running - OK"));
