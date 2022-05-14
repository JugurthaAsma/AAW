const express = require("express");
const app = express.Router();
const pgClient = require("../database/db");

// plannings

/**
 * Create a new planning
 */
app.post("/", async (req, res) => {
  try {
    // destructure the request body to get the name and date
    const { name, date } = req.body;
    // create a new planning
    const newPlanning = await pgClient.query("INSERT INTO planning (name, date) VALUES ($1, $2) RETURNING *", [name, date]);
    res.send(newPlanning.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get all plannings
 */
app.get("/", async (req, res) => {
  try {
    const plannings = await pgClient.query("SELECT * FROM planning");
    res.send(plannings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Get an planning by id
 */
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const planning = await pgClient.query("SELECT * FROM planning WHERE id = $1", [id]);
    res.send(planning.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Update an planning by id
 */
app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;
    const updatePlanning = await pgClient.query("UPDATE planning SET name = $1, date = $2 WHERE id = $3 RETURNING *", [name, date, id]);
    res.send(updatePlanning.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

/**
 * Delete an planning by id
 */
app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlanning = await pgClient.query("DELETE FROM planning WHERE id = $1 RETURNING *", [id]);
    res.send(deletePlanning.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = {
  planningRouter: app,
};
