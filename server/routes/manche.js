const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");

// manches

/**
 * get all manches
 */
app.get("/", async (req, res) => {
  try {
    const manches = await pgClient.query("SELECT * FROM manche");
    res.json(manches.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Create a new manche for a planning
 */
app.post("/:planning_id", async (req, res) => {
  try {
    // destructure the request body to get the name and ordre
    const { name, ordre } = req.body;
    // create a new manche
    const newManche = await pgClient.query("INSERT INTO manche (name, ordre, planning_id) VALUES ($1, $2, $3) RETURNING *", [name, ordre, planning_id]);
    res.json(newManche.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all manches for a planning
 */
app.get("/planning/:planning_id", async (req, res) => {
  try {
    const { planning_id } = req.params;
    const manches = await pgClient.query("SELECT * FROM manche WHERE planning_id = $1", [planning_id]);
    res.json(manches.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get a manche by id
 */
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const manche = await pgClient.query("SELECT * FROM manche WHERE id = $1", [id]);
    res.json(manche.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 *  Update a manche
 */
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ordre } = req.body;
    const updateManche = await pgClient.query("UPDATE manche SET name = $1, ordre = $2 WHERE id = $3 RETURNING *", [name, ordre, id]);
    res.json(updateManche.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete a manche
 */
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteManche = await pgClient.query("DELETE FROM manche WHERE id = $1", [id]);
    res.json(deleteManche.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete all manches for a planning
 */
app.delete("/planning/:planning_id", async (req, res) => {
  try {
    const { planning_id } = req.params;
    const deleteManches = await pgClient.query("DELETE FROM manche WHERE planning_id = $1", [planning_id]);
    res.json(deleteManches.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = {
  mancheRouter: app,
};
