const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
var path = require("path");

const user = require("./routes/api/User");
const event = require("./routes/api/Event");
const verifyToken = require("./middleware/auth");

const login = require("./routes/api/Login.js");
const bill = require("./routes/api/Bill");
const image = require("./routes/api/image")
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

// IMAGES
app.use("/public", express.static("Images"))

// API ROUTES
app.use("/api", user);
app.use("/api/event", event);
app.use("/api/event", event)
app.use("/api/login", login)
app.use("/api/bill", bill)
app.use("/api/img", image)


app.listen(PORT, () => {
  connectDB();
  console.log(`server listing ${PORT}`);
});
