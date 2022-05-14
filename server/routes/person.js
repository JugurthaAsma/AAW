const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");

// persons

/**
 * Create a new person
 */
app.post("/", async (req, res) => {
  console.log("POST /person");
  try {
    // destructure the request body to get the firstname and lastname
    const { firstName, lastName } = req.body;
    // create a new person
    const newPerson = await pgClient.query("INSERT INTO person (first_name, last_name) VALUES ($1, $2) RETURNING *", [firstName, lastName]);

    res.json(newPerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all persons
 */
app.get("/", async (req, res) => {
  console.log("GET /person");
  try {
    const persons = await pgClient.query("SELECT * FROM person");
    res.json(persons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get a person by id
 */
app.get("/:id", async (req, res) => {
  console.log("GET /person/:id");
  try {
    // console.log(req.params);
    const { id } = req.params;
    const person = await pgClient.query("SELECT * FROM person WHERE id = $1", [id]);
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get a person by firstname and lastname
 */
app.get("/:firstName/:lastName", async (req, res) => {
  console.log("GET /person/:firstName/:lastName");
  try {
    // console.log(req.params);
    const { firstName, lastName } = req.params;
    const person = await pgClient.query("SELECT * FROM person WHERE first_name = $1 AND last_name = $2", [firstName, lastName]);
    console.log(person.rows[0]);
    res.json(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Update a person by id
 */
app.put("/:id", async (req, res) => {
  console.log("PUT /person/:id");
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const updatePerson = await pgClient.query("UPDATE person SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *", [firstName, lastName, id]);
    res.json(updatePerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete a person by id
 */
app.delete("/:id", async (req, res) => {
  console.log("DELETE /person/:id");
  try {
    const { id } = req.params;
    const deletePerson = await pgClient.query("DELETE FROM person WHERE id = $1 RETURNING *", [id]);
    res.json(deletePerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = {
  personRouter: app,
};
