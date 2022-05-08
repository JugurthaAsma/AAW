const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database/db");

//middleware
app.use(cors());
app.use(express.json());

// Routes

/**
 * Create a new person
 */
app.post("/person", async (req, res) => {
  try {
    // destructure the request body to get the firstname and lastname
    const { firstName, lastName } = req.body;
    // create a new person
    const newPerson = await pool.query("INSERT INTO person (first_name, last_name) VALUES ($1, $2) RETURNING *", [firstName, lastName]);

    res.json(newPerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all persons
 */
app.get("/persons", async (req, res) => {
  try {
    const persons = await pool.query("SELECT * FROM person");
    res.json(persons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get a person by id
 */
app.get("/person/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const person = await pool.query("SELECT * FROM person WHERE id = $1", [id]);
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Update a person by id
 */
app.put("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const updatePerson = await pool.query("UPDATE person SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *", [firstName, lastName, id]);
    res.json(updatePerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete a person by id
 */
app.delete("/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePerson = await pool.query("DELETE FROM person WHERE id = $1 RETURNING *", [id]);
    res.json(deletePerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Create a new event
 */
app.post("/event", async (req, res) => {
  try {
    // destructure the request body to get the name and date
    const { name, date } = req.body;
    // create a new event
    const newEvent = await pool.query("INSERT INTO event (name, date) VALUES ($1, $2) RETURNING *", [name, date]);
    res.json(newEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all events
 */
app.get("/events", async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM event");
    res.json(events.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get an event by id
 */
app.get("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pool.query("SELECT * FROM event WHERE id = $1", [id]);
    res.json(event.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Update an event by id
 */
app.put("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;
    const updateEvent = await pool.query("UPDATE event SET name = $1, date = $2 WHERE id = $3 RETURNING *", [name, date, id]);
    res.json(updateEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete an event by id
 */
app.delete("/event/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await pool.query("DELETE FROM event WHERE id = $1 RETURNING *", [id]);
    res.json(deleteEvent.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Create a new event_person
 */
app.post("/event_person", async (req, res) => {
  try {
    // destructure the request body to get the event_id and person_id
    const { eventId, personId } = req.body;
    // create a new event_person
    const newEventPerson = await pool.query("INSERT INTO event_person (event_id, person_id) VALUES ($1, $2) RETURNING *", [eventId, personId]);
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
    const event = await pool.query("SELECT * FROM event WHERE id = $1", [id]);
    const persons = await pool.query("SELECT * FROM person WHERE id IN (SELECT person_id FROM event_person WHERE event_id = $1)", [id]);
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
    const person = await pool.query("SELECT * FROM person WHERE id = $1", [id]);
    const events = await pool.query("SELECT * FROM event WHERE id IN (SELECT event_id FROM event_person WHERE person_id = $1)", [id]);
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
