const express = require("express");
const app = express.Router();
const { tokenExpirationDate } = require("../utils/util");
const { myQuery } = require("../database/db");
const { addPerson } = require("../database/dbQueries");
const { logger } = require("../utils/util");

// persons

/**
 * Create a new person (for sign up request)
 */
app.post("/", async (req, res) => {
  logger("POST /person");

  addPerson(req, res, () => {
    const { person } = res;
    const expiration = tokenExpirationDate();
    logger("person found", person.id, " token expiration date: ", expiration);
    myQuery("INSERT INTO token (person_id, expired_date) VALUES ($1, $2) RETURNING *", [person.id, expiration], (err, result) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const token = result.rows[0].token;
        logger("token created", token);
        res.cookie("token", token);
        res.send(person);
      }
    });
  });
});

/**
 * Create a new person (for admin adding person )
 * as admin
 */
app.post("/admin", async (req, res) => {
  logger("POST /person/admin");

  addPerson(req, res, () => {
    const { person } = res;
    logger("person Added", person.id);
    res.send(person);
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
 * as user
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
 * as admin
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
