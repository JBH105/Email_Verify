const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
var path = require("path");

const user = require("./routes/api/User");
const event = require("./routes/api/Event");
const verifyToken = require("./middleware/auth");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.use("/api", user);
app.use("/api/event", event);

app.listen(PORT, () => {
  connectDB();
  console.log(`server listing ${PORT}`);
});
