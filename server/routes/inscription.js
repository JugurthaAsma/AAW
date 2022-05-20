const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
// inscription

/**
 * get all inscriptions
 */
app.get("/", async (req, res) => {
  console.log("GET /inscription");

  myQuery("SELECT * FROM inscription", [], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows);
    }
  });
});

/**
 * Create a new inscription for a planning, a personne and a manche
 */
app.post("/", async (req, res) => {
  log("POST /inscription");
  // destructure the request body to get the name and ordre
  const { planning_id, personne_id, manche_id } = req.body;
  console.log("create a new inscription ", planning_id, personne_id, manche_id);
  // create a new manche

  myQuery("INSERT INTO inscription (planning_id, personne_id, manche_id) VALUES ($1, $2, $3) RETURNING *", [planning_id, personne_id, manche_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Get all inscriptions for a planning
 */
app.get("/planning/:planning_id", async (req, res) => {
  log("GET /inscription/planning/:planning_id");

  const { planning_id } = req.params;
  console.log("get all inscriptions for a planning ", planning_id);

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
app.get("/personne/:personne_id", async (req, res) => {
  log("GET /inscription/personne/:personne_id");
  const { personne_id } = req.params;
  console.log("get all inscriptions for a personne ", personne_id);

  myQuery("SELECT * FROM inscription WHERE personne_id = $1", [personne_id], (err, result) => {
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
  log("GET /inscription/manche/:manche_id");
  const { manche_id } = req.params;
  console.log("get all inscriptions for a manche ", manche_id);

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
  console.log("GET /inscription/:id");
  const { id } = req.params;
  console.log("get an inscription by id ", id);

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
 */
app.put("/:id", async (req, res) => {
  console.log("PUT /inscription/:id");

  const { id } = req.params;
  const { planning_id, personne_id, manche_id } = req.body;
  console.log("update inscription ", id, planning_id, personne_id, manche_id);

  myQuery("UPDATE inscription SET planning_id = $1, personne_id = $2, manche_id = $3 WHERE id = $4 RETURNING *", [planning_id, personne_id, manche_id, id], (err, result) => {
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
