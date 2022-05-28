const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
const { logger, toLocaleDate } = require("../utils/util");

// plannings

/**
 * Create a new planning
 * as admin
 */
app.post("/admin", async (req, res) => {
  // destructure the request body to get the name and date
  const { name, date } = req.body;
  logger("create a new planning ", name, date);
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
  logger("get all plannings");
  myQuery("SELECT id, date, name FROM planning", [], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      // format the date of each planning
      const plannings = result.rows.map((planning) => {
        planning.date = toLocaleDate(planning.date);
        return planning;
      });
      res.send(plannings);
    }
  });
});

/**
 * Get an planning by id
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  logger("get an planning by id : ", id);

  myQuery("SELECT * FROM planning WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      // format the date of the planning
      const planning = result.rows[0];
      planning.date = toLocaleDate(planning.date);
      res.send(planning);
    }
  });
});

/**
 * Update an planning by id
 * as admin
 */
app.put("/:id/admin", async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;
  logger("update an planning by id : ", id, " name : ", name, " date : ", date);
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
 * as admin
 */
app.delete("/:id/admin", async (req, res) => {
  const { id } = req.params;
  logger("delete a planning by id : ", id);
  myQuery("DELETE FROM planning WHERE id = $1 RETURNING *", [id], (err, result) => {
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
