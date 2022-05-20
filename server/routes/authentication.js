const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");
const { tokenExpirationDate } = require("../utils/util");
const { myQuery } = require("../database/db");
const roles = {
  admin: "admin",
  user: "user",
  unknown: "unknown",
};

// routes

/**
 * for login
 * Get the person firstname and lastname
 * serach him in the database
 * if he is found, create a token in the token table
 * and send it back to the client
 */
app.post("/login", async (req, res) => {
  console.log("POST /authentication/login");

  const { firstName, lastName } = req.body;
  myQuery("SELECT * FROM person WHERE first_name = $1 AND last_name = $2", [firstName, lastName], (err, result) => {
    if (err || result.rows.length === 0) {
      res.sendStatus(401);
    } else {
      const person = result.rows[0];
      const expiration = tokenExpirationDate();
      console.log("person found", person.id, " token expiration date: ", expiration);
      myQuery("INSERT INTO token (person_id, expired_date) VALUES ($1, $2) RETURNING *", [person.id, expiration], (err, result) => {
        if (err) {
          res.sendStatus(401);
        } else {
          const token = result.rows[0].token;
          console.log("token created", token);
          res.cookie("token", token);
          res.sendStatus(200);
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
app.get("/logout/:token", async (req, res) => {
  console.log("GET /logout/:token");
  const { token } = req.params;
  myQuery("DELETE FROM token WHERE token = $1", [token], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send("logout success");
    }
  });
});

/**
 * for getting the role
 * get the token from the request
 * search the token in the token table
 * if the token is found, get the role from the person table
 * and send it back to the client
 * if the token is not found, send an error message
 * if the token is expired, send an error message
 */
app.get("/role/:token", async (req, res) => {
  console.clear();
  const { token } = req.params;
  console.log("GET /role/:token : ", token);

  const response = {
    error: null,
    role: roles.unknown,
  };

  try {
    const tokenResult = await pgClient.query("SELECT * FROM token WHERE token = $1", [token]);
    if (tokenResult.rows.length === 0) {
      response.error = "Token not found, you're not authenticated";
    } else {
      const expiredDate = tokenResult.rows[0].expired_date;
      const now = new Date();
      if (now > expiredDate) {
        response.error = "Token expired, you have been disconnected";
        console.error(now, " ====> ", expiredDate, " : ", response);
      } else {
        const personResult = await pgClient.query("SELECT * FROM person WHERE id = $1", [tokenResult.rows[0].person_id]);
        response.role = roles.user;
        console.error("*****************  send ", response, ", for user : ", personResult.rows[0].first_name, personResult.rows[0].last_name);
      }
    }
  } catch (error) {
    response.error = error.message;
    console.error("*****************  error : ", error.message);
  } finally {
    res.send(response);
  }
});

module.exports = {
  authenticationRouter: app,
};
