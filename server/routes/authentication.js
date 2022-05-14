const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");
const { tokenExpirationDate } = require("../utils/util");

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
app.get("/login/:firstName/:lastName", async (req, res) => {
  console.log("GET /person/:firstName/:lastName");
  try {
    const { firstName, lastName } = req.params;
    const person = await pgClient.query("SELECT * FROM person WHERE first_name = $1 AND last_name = $2", [firstName, lastName]);
    if (person.rows.length === 0) {
      res.send({ error: "Person not found" });
    } else {
      console.log("person found", person.rows[0].id, " token expiration date: ", tokenExpirationDate());
      const token = await pgClient.query("INSERT INTO token (person_id, expired_date) VALUES ($1, $2) RETURNING *", [person.rows[0].id, tokenExpirationDate()]);
      res.send({
        token: token.rows[0].token,
        role: roles.user,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * for logout
 * delete the token from the token table
 * and send a success message
 */
app.get("/logout/:token", async (req, res) => {
  console.log("GET /logout/:token");
  try {
    const { token } = req.params;
    const result = await pgClient.query("DELETE FROM token WHERE token = $1", [token]);
    if (result.rowCount === 0) {
      res.send({ error: "Token not found" });
    } else {
      res.send({ success: "Logout successful" });
    }
  } catch (error) {
    console.error(error.message);
  }
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
