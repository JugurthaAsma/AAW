const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");

// plannings

/**
 * Create a new planning
 */
app.post("/", async (req, res) => {
  // destructure the request body to get the name and date
  const { name, date } = req.body;
  console.log("create a new planning ", name, date);
  // create a new planning
  myQuery("INSERT INTO planning (name, date) VALUES ($1, $2) RETURNING *", [name, date], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get all plannings
 */
app.get("/", async (req, res) => {
  console.log("get all plannings");
  myQuery("SELECT * FROM planning", [], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get an planning by id
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get an planning by id : ", id);

  myQuery("SELECT * FROM planning WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Update an planning by id
 */
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  console.log("update an planning by id : ", id, " name : ", name, " date : ", date);
  myQuery("UPDATE planning SET name = $1, date = $2 WHERE id = $3", [name, date, id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete an planning by id
 */
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("delete an planning by id : ", id);
  myQuery("DELETE FROM planning WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

module.exports = {
  planningRouter: app,
};
