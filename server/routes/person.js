const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
const { logger } = require("../utils/util");

// persons

/**
 * Create a new person
 */
app.post("/", async (req, res) => {
  logger("POST /person");
  // destructure the request body to get the firstname and lastname
  const { firstName, lastName } = req.body;
  logger("create a new person ", firstName, lastName);
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
  logger("GET /person");

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
  logger("GET /person/:id");

  const { id } = req.params;
  logger("get a person by id : ", id);

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
app.put("/:id/user", async (req, res) => {
  logger("PUT /person/:id");
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  logger("update a person by id : ", id, " firstName : ", firstName, " lastName : ", lastName);

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
app.delete("/:id/admin", async (req, res) => {
  logger("DELETE /person/:id");
  const { id } = req.params;
  logger("delete a person by id : ", id);

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
