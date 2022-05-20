const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");

// persons

/**
 * Create a new person
 */
app.post("/", async (req, res) => {
  console.log("POST /person");
  // destructure the request body to get the firstname and lastname
  const { firstName, lastName } = req.body;
  console.log("create a new person ", firstName, lastName);
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
  console.log("get a person by id : ", id);

  myQuery("SELECT * FROM person WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Update a person by id
 */
app.put("/:id", async (req, res) => {
  console.log("PUT /person/:id");
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  console.log("update a person by id : ", id, " firstName : ", firstName, " lastName : ", lastName);

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
  console.log("delete a person by id : ", id);

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
