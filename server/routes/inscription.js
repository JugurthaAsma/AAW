const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
const { logger } = require("../utils/util");

const { getAllInscriptions } = require("../database/dbQueries");

// inscription

/**
 * get all inscriptions
 */
app.get("/", async (req, res) => {
  logger("GET /inscription");

  // get all inscriptions with their manches, plannings and persons
  getAllInscriptions(res);
});

/**
 * Create a new inscription for a planning, a person and a manche
 * as user
 */
app.post("/user", async (req, res) => {
  // get the person_id from the request
  const person_id = req.person.id;
  // destructure the request body to get the manche_id and the planning_id
  const { manche_id, planning_id } = req.body;

  logger("POST /inscription/user, person_id: " + person_id, "manche_id: " + manche_id, "planning_id: " + planning_id);

  // create a new inscription
  myQuery("INSERT INTO inscription (planning_id, person_id, manche_id) VALUES ($1, $2, $3) RETURNING *", [planning_id, person_id, manche_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      logger("create a new inscription for planning : ", planning_id, " person : ", person_id, " and manche :", manche_id);
      res.send(result.rows[0]);
    }
  });
});

/**
 * Create a new inscription for a planning, a person and a manche
 * as admin
 */
app.post("/admin", async (req, res) => {
  // destructure the request body to get the person_id, the manche_id and the planning_id
  const { person_id, manche_id, planning_id } = req.body;

  logger("POST /inscription/admin, person_id: " + person_id, "manche_id: " + manche_id, "planning_id: " + planning_id);

  // create a new inscription
  myQuery("INSERT INTO inscription (planning_id, person_id, manche_id) VALUES ($1, $2, $3) RETURNING *", [planning_id, person_id, manche_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      logger("create a new inscription for planning : ", planning_id, " person : ", person_id, " and manche :", manche_id);
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get all inscriptions for a planning
 */
app.get("/planning/:planning_id", async (req, res) => {
  const { planning_id } = req.params;
  logger("GET /inscription/planning/:planning_id, get all inscriptions for a planning ", planning_id);

  myQuery("SELECT * FROM inscription WHERE planning_id = $1", [planning_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get all inscriptions for a personne
 */
app.get("/personne/:person_id", async (req, res) => {
  const { person_id } = req.params;
  logger("GET /inscription/personne/:person_id, get all inscriptions for a personne ", person_id);

  myQuery("SELECT * FROM inscription WHERE person_id = $1", [person_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get all inscriptions for a manche
 */
app.get("/manche/:manche_id", async (req, res) => {
  const { manche_id } = req.params;
  logger("GET /inscription/manche/:manche_id, get all inscriptions for a manche ", manche_id);

  myQuery("SELECT * FROM inscription WHERE manche_id = $1", [manche_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Get an inscription by id
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  logger("GET /inscription/:id, get an inscription by id ", id);

  myQuery("SELECT * FROM inscription WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Update an inscription
 * as admin
 */
app.put("/:id/admin", async (req, res) => {
  const { id } = req.params;
  const { planning_id, person_id, manche_id } = req.body;
  logger("PUT /inscription/:id, update inscription ", id, planning_id, person_id, manche_id);

  myQuery("UPDATE inscription SET planning_id = $1, person_id = $2, manche_id = $3 WHERE id = $4 RETURNING *", [planning_id, person_id, manche_id, id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete an inscription by planning_id, person_id and manche_id
 */
app.delete("/:planning_id/:person_id/:manche_id/admin", async (req, res) => {
  const { planning_id, person_id, manche_id } = req.params;
  logger("DELETE /inscription/:planning_id/:person_id/:manche_id, delete inscription ", planning_id, person_id, manche_id);

  myQuery("DELETE FROM inscription WHERE planning_id = $1 AND person_id = $2 AND manche_id = $3 RETURNING *", [planning_id, person_id, manche_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

module.exports = {
  inscriptionRouter: app,
};
