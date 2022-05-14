const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");

// inscription

/**
 * get all inscriptions
 */
app.get("/", async (req, res) => {
  try {
    const inscriptions = await pgClient.query("SELECT * FROM inscription");
    res.send(inscriptions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Create a new inscription for a planning, a personne and a manche
 */
app.post("/", async (req, res) => {
  try {
    // destructure the request body to get the name and ordre
    const { planning_id, personne_id, manche_id } = req.body;
    // create a new manche
    const newInscription = await pgClient.query("INSERT INTO inscription (planning_id, personne_id, manche_id) VALUES ($1, $2, $3) RETURNING *", [planning_id, personne_id, manche_id]);
    res.send(newInscription.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all inscriptions for a planning
 */
app.get("/planning/:planning_id", async (req, res) => {
  try {
    const { planning_id } = req.params;
    const inscriptions = await pgClient.query("SELECT * FROM inscription WHERE planning_id = $1", [planning_id]);
    res.send(inscriptions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all inscriptions for a personne
 */
app.get("/personne/:personne_id", async (req, res) => {
  try {
    const { personne_id } = req.params;
    const inscriptions = await pgClient.query("SELECT * FROM inscription WHERE personne_id = $1", [personne_id]);
    res.send(inscriptions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all inscriptions for a manche
 */
app.get("/manche/:manche_id", async (req, res) => {
  try {
    const { manche_id } = req.params;
    const inscriptions = await pgClient.query("SELECT * FROM inscription WHERE manche_id = $1", [manche_id]);
    res.send(inscriptions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get an inscription by id
 */
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const inscription = await pgClient.query("SELECT * FROM inscription WHERE id = $1", [id]);
    res.send(inscription.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Update an inscription
 */
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { planning_id, personne_id, manche_id } = req.body;
    const updateInscription = await pgClient.query("UPDATE inscription SET planning_id = $1, personne_id = $2, manche_id = $3 WHERE id = $4 RETURNING *", [planning_id, personne_id, manche_id, id]);
    res.send(updateInscription.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
