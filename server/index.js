const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger } = require("./utils/util");
const { getPerson } = require("./database/dbQueries");
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
  /**
   * Call the getPerson function
   * will put in req.person, the the person logged with the token from the cookie
   */
  getPerson(req, res, () => {
    console.log("***********************************admin found : ", req.person);
    if (req.person.role.includes("admin")) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
});

// user filter
app.use("*/user", (req, res, next) => {
  logger("passing by user filter");
  /**
   * Call the getPerson function
   * will put in req.person, the the person logged with the token from the cookie
   */
  getPerson(req, res, () => {
    console.log("******************************user found : ", req.person);
    if (req.person.role.includes("user")) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
});

// Routes
const { personRouter } = require("./routes/person");
const { planningRouter } = require("./routes/planning");
const { mancheRouter } = require("./routes/manche");
const { inscriptionRouter } = require("./routes/inscription");
const { authenticationRouter } = require("./routes/authentication");

// use the routers
app.use("/person", personRouter);
app.use("/planning", planningRouter);
app.use("/manche", mancheRouter);
app.use("/inscription", inscriptionRouter);
app.use("/authentication", authenticationRouter);

app.listen(5000, () => {
  logger("Server is running on port 5000");
});
