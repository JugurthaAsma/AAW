const express = require("express");
const app = express();
const cors = require("cors");
const { myQuery } = require("./database/db");
const cookieParser = require("cookie-parser");
const { logger } = require("./utils/util");

const path = require("path");

//middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
/* // not working
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
*/
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// filters

// admin filter
app.use("*/admin", (req, res, next) => {
  logger("passing by admin filter");
  // get the token from the cookie
  const { token } = req.cookies;
  logger("token: ", token);

  // get the person role from person table with the token from the token table
  myQuery("SELECT * FROM person WHERE id = (SELECT person_id FROM token WHERE token = $1)", [token], (err, result) => {
    if (err || result.rows.length === 0 || !result.rows[0].role.includes("admin")) {
      res.sendStatus(401);
    } else {
      req.person = result.rows[0];
      next();
    }
  });
});

// user filter
app.use("*/user", (req, res, next) => {
  logger("passing by user filter");
  // get the token from the cookie
  const { token } = req.cookies;
  logger("token: ", token);

  // get the person role from person table with the token from the token table
  myQuery("SELECT * FROM person WHERE id = (SELECT person_id FROM token WHERE token = $1)", [token], (err, result) => {
    if (err || result.rows.length === 0 || result.rows[0].role.includes("user")) {
      res.sendStatus(401);
    } else {
      req.person = result.rows[0];
      next();
    }
  });
});

// Routes
const { personRouter } = require("./routes/person");
const { planningRouter } = require("./routes/planning");
const { mancheRouter } = require("./routes/manche");
const { authenticationRouter } = require("./routes/authentication");

// use the routers
app.use("/person", personRouter);
app.use("/planning", planningRouter);
app.use("/manche", mancheRouter);
app.use("/authentication", authenticationRouter);

app.listen(5000, () => {
  logger("Server is running on port 5000");
});
