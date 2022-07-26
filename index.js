const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require("cors");
var path = require("path");
const rateLimit = require("express-rate-limit");
const verifyToken = require("./middleware/auth");
const PORT = process.env.PORT || 8080;

const user = require("./routes/api/User");
const event = require("./routes/api/Event");

const login = require("./routes/api/Login.js");
const bill = require("./routes/api/Bill");
const image = require("./routes/api/image");
const tailor = require("./routes/api/Tailor");
const fabric = require("./routes/api/Fabric");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   })
// );
// IMAGES
app.use("/public", express.static("Images"));

// API ROUTES
app.use("/api", user);
app.use("/api/event", event);
app.use("/api/event", event);
app.use("/api/login", login);
app.use("/api/bill", bill);
app.use("/api/img", image);
app.use("/api/ta", tailor);
app.use("/api/fa", fabric);

app.listen(PORT, () => {
  connectDB();
  console.log(`server listing ${PORT}`);
});
