const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");
const { myQuery } = require("../database/db");

// persons

/**
 * Create a new person
 */
app.post("/", async (req, res) => {
  console.log("POST /person");
  // destructure the request body to get the firstname and lastname
  const { firstName, lastName } = req.body;
  // create a new person
  myQuery("INSERT INTO person (first_name, last_name) VALUES ($1, $2) RETURNING *", [firstName, lastName], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get all persons
 */
app.get("/", async (req, res) => {
  console.log("GET /person");

  myQuery("SELECT * FROM person", [], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get a person by id
 */
app.get("/:id", async (req, res) => {
  console.log("GET /person/:id");

  const { id } = req.params;

  myQuery("SELECT * FROM person WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get a person by firstname and lastname
 *
app.get("/:firstName/:lastName", async (req, res) => {
  console.log("GET /person/:firstName/:lastName");
  try {
    // console.log(req.params);
    const { firstName, lastName } = req.params;
    const person = await pgClient.query("SELECT * FROM person WHERE first_name = $1 AND last_name = $2", [firstName, lastName]);
    console.log(person.rows[0]);
    res.send(person.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
*/

/**
 * Update a person by id
 */
app.put("/:id", async (req, res) => {
  console.log("PUT /person/:id");
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  myQuery("UPDATE person SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *", [firstName, lastName, id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete a person by id
 */
app.delete("/:id", async (req, res) => {
  console.log("DELETE /person/:id");
  const { id } = req.params;

  myQuery("DELETE FROM person WHERE id = $1 RETURNING *", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

module.exports = {
  personRouter: app,
};
