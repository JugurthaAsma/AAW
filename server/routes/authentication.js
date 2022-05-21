const express = require("express");
const app = express.Router();
const { tokenExpirationDate } = require("../utils/util");
const { myQuery } = require("../database/db");
const { logger } = require("../utils/util");

// routes

/**
 * for login
 * Get the person firstname and lastname
 * serach him in the database
 * if he is found, create a token in the token table
 * and send it back to the client
 */
app.post("/login", async (req, res) => {
  logger("POST /authentication/login");

  const { firstName, lastName } = req.body;
  myQuery("SELECT * FROM person WHERE first_name = $1 AND last_name = $2", [firstName, lastName], (err, result) => {
    if (err || result.rows.length === 0) {
      res.sendStatus(401);
    } else {
      const person = result.rows[0];
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
    }
  });
});

/**
 * for logout
 * delete the token from the token table
 * and send a success message
 */
app.get("/logout/user", async (req, res) => {
  logger("GET /logout/user");
  const { token } = req.cookies;
  logger("logout token: ", token);

  myQuery("DELETE FROM token WHERE token = $1", [token], (err, result) => {
    res.sendStatus(err ? 401 : 200);
  });
});

/**
 * Logout all the persons
 */
app.get("/logoutAll/admin", async (req, res) => {
  logger("GET /logoutAll/admin, DISCONNECT ALL");
  myQuery("DELETE FROM token", [], (err, result) => {
    res.sendStatus(err ? 401 : 200);
  });
});

module.exports = {
  authenticationRouter: app,
};
