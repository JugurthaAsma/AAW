const express = require("express");
const app = express();
//const cors = require("cors");
const pgClient = require("./database/db");

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

app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Routes
const { personRouter } = require("./routes/person");
const { planningRouter } = require("./routes/planning");
const { mancheRouter } = require("./routes/manche");

// use the routers
app.use("/person", personRouter);
app.use("/planning", planningRouter);
app.use("/manche", mancheRouter);

/**
 * Create a new event_person
 */
app.post("/event_person", async (req, res) => {
  try {
    // destructure the request body to get the event_id and person_id
    const { eventId, personId } = req.body;
    // create a new event_person
    const newEventPerson = await pgClient.query("INSERT INTO event_person (event_id, person_id) VALUES ($1, $2) RETURNING *", [eventId, personId]);
    res.json(newEventPerson.rows[0]);
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
    res.json({
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
    res.json({
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
