const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const sports = require("./routes/sports")
const news = require("./routes/news")
const weather = require("./routes/weather")
const clothes = require("./routes/clothes")
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/api/user", user);
app.use("/api/news", news);
app.use("/api/weather", weather);
app.use("/api/sports", sports);
app.use("/api/clothes", clothes);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});