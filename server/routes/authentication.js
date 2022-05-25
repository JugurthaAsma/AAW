const express = require("express");
const app = express.Router();
const { tokenExpirationDate } = require("../utils/util");
const { myQuery } = require("../database/db");
const { logger } = require("../utils/util");
const { getPerson } = require("../database/dbQueries");

// routes

/**
 * for authentication with the token
 * Get the token from the cookie
 * Get the person data from person table
 * with the token from the token table
 * by checking if the token not expired_date is greater than now
 *
 */
app.get("/", (req, res) => {
  /**
   * Call the getPerson function
   * will put in req.person, the the person logged with the token from the cookie
   */
  getPerson(req, res, () => {
    res.send(req.person);
  });
});

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
 * as user
 */
app.delete("/logout/user", async (req, res) => {
  logger("DELETE /logout/user");
  const { token } = req.cookies;
  logger("logout token: ", token);

  myQuery("DELETE FROM token WHERE token = $1", [token], (err, result) => {
    res.sendStatus(err ? 401 : 200);
  });
});

/**
 * for logout a specific person
 * as admin
 */
app.delete("/logout/:id/admin", async (req, res) => {
  const { id } = req.params;
  logger("GET /logout/:id/admin, logout id: ", id);

  myQuery("DELETE FROM token WHERE person_id = $1", [id], (err, result) => {
    res.sendStatus(err ? 401 : 200);
  });
});

/**
 * Logout all the persons
 * as admin
 */
app.delete("/logoutAll/admin", async (req, res) => {
  logger("GET /logoutAll/admin, DISCONNECT ALL");

  // get the token from the cookie
  const { token } = req.cookies;

  // delete all the tokens except the admin token
  myQuery("DELETE FROM token WHERE token != $1", [token], (err, result) => {
    res.sendStatus(err ? 401 : 200);
  });
});

module.exports = {
  authenticationRouter: app,
};
