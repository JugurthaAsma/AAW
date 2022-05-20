const express = require("express");
const app = express();
//const cors = require("cors");
const pgClient = require("./database/db");
const { myQuery } = require("./database/db");
const cookieParser = require("cookie-parser");

const path = require("path");

//middleware
//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// filters

// admin filter
app.use("*/admin", (req, res, next) => {
  console.log("je suis dans le filtre admin");
  // get the token from the cookie
  const { token } = req.cookies;
  console.log("token: ", token);

  // get the person role from person table with the token from the token table
  myQuery("SELECT * FROM person WHERE id = (SELECT person_id FROM token WHERE token = $1)", [token], (err, result) => {
    if (err || result.rows.length === 0 || result.rows[0].role !== "admin") {
      res.sendStatus(401);
    } else {
      next();
    }
  });
});

// user filter
app.use("*/user", (req, res, next) => {
  console.log("je suis dans le filtre user");
  // get the token from the cookie
  const { token } = req.cookies;
  console.log("token: ", token);

  // get the person role from person table with the token from the token table
  myQuery("SELECT * FROM person WHERE id = (SELECT person_id FROM token WHERE token = $1)", [token], (err, result) => {
    if (err || result.rows.length === 0 || result.rows[0].role !== "user") {
      res.sendStatus(401);
    } else {
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

/**
 * Create a new event_person
 */
app.post("/event_person", async (req, res) => {
  try {
    // destructure the request body to get the event_id and person_id
    const { eventId, personId } = req.body;
    // create a new event_person
    const newEventPerson = await pgClient.query("INSERT INTO event_person (event_id, person_id) VALUES ($1, $2) RETURNING *", [eventId, personId]);
    res.send(newEventPerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get an event by id and all the persons that are attending it
 */
app.get("/event/:id/persons", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pgClient.query("SELECT * FROM event WHERE id = $1", [id]);
    const persons = await pgClient.query("SELECT * FROM person WHERE id IN (SELECT person_id FROM event_person WHERE event_id = $1)", [id]);
    res.send({
      event: event.rows[0],
      persons: persons.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get a person by id and all the events that he is attending
 */
app.get("/person/:id/events", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await pgClient.query("SELECT * FROM person WHERE id = $1", [id]);
    const events = await pgClient.query("SELECT * FROM event WHERE id IN (SELECT event_id FROM event_person WHERE person_id = $1)", [id]);
    res.send({
      person: person.rows[0],
      events: events.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
