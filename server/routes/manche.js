const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
const { logger } = require("../utils/util");

// manches

/**
 * get all manches
 */
app.get("/", async (req, res) => {
  logger("GET /manche");

  myQuery("SELECT * FROM manche", [], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Create a new manche for a planning
 * as admin
 */
app.post("/:planning_id/admin", async (req, res) => {
  log("POST /manche");

  // destructure the request body to get the name and ordre
  const { name, ordre } = req.body;
  logger("create a new manche ", name, ordre);
  // create a new manche
  myQuery("INSERT INTO manche (name, ordre, planning_id) VALUES ($1, $2, $3) RETURNING *", [name, ordre, req.params.planning_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get all manches for a planning
 */
app.get("/planning/:planning_id", async (req, res) => {
  logger("GET /manche/planning/:planning_id");

  const { planning_id } = req.params;
  logger("get all manches for a planning ", planning_id);

  myQuery("SELECT * FROM manche WHERE planning_id = $1", [planning_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get a manche by id
 */
app.get("/:id", async (req, res) => {
  logger("GET /manche/:id");
  const { id } = req.params;
  logger("get a manche by id : ", id);

  myQuery("SELECT * FROM manche WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Update a manche
 * as admin
 */
app.put("/:id/admin", async (req, res) => {
  logger("PUT /manche/:id");

  const { id } = req.params;
  const { name, ordre } = req.body;
  logger("update a manche by id : ", id, " name : ", name, " ordre : ", ordre);

  myQuery("UPDATE manche SET name = $1, ordre = $2 WHERE id = $3", [name, ordre, id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete a manche
 * as admin
 */
app.delete("/:id/admin", async (req, res) => {
  logger("DELETE /manche/:id");
  const { id } = req.params;
  logger("delete a manche by id : ", id);

  myQuery("DELETE FROM manche WHERE id = $1 RETURNING *", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete all manches for a planning
 * as admin
 */
app.delete("/planning/:planning_id/admin", async (req, res) => {
  logger("DELETE /manche/planning/:planning_id");
  const { planning_id } = req.params;
  logger("delete all manches for a planning : ", planning_id);

  myQuery("DELETE FROM manche WHERE planning_id = $1 RETURNING *", [planning_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

module.exports = {
  mancheRouter: app,
};
