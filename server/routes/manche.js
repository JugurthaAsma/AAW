const express = require("express");
const app = express.Router();
const { myQuery } = require("../database/db");
// manches

/**
 * get all manches
 */
app.get("/", async (req, res) => {
  console.log("GET /manche");

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
 */
app.post("/:planning_id", async (req, res) => {
  log("POST /manche");

  // destructure the request body to get the name and ordre
  const { name, ordre } = req.body;
  console.log("create a new manche ", name, ordre);
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
  console.log("GET /manche/planning/:planning_id");

  const { planning_id } = req.params;
  console.log("get all manches for a planning ", planning_id);

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
  console.log("GET /manche/:id");
  const { id } = req.params;
  console.log("get a manche by id : ", id);

  myQuery("SELECT * FROM manche WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 *  Update a manche
 */
app.put("/:id", async (req, res) => {
  console.log("PUT /manche/:id");

  const { id } = req.params;
  const { name, ordre } = req.body;
  console.log("update a manche by id : ", id, " name : ", name, " ordre : ", ordre);

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
 */
app.delete("/:id", async (req, res) => {
  console.log("DELETE /manche/:id");
  const { id } = req.params;
  console.log("delete a manche by id : ", id);

  myQuery("DELETE FROM manche WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

/**
 * Delete all manches for a planning
 */
app.delete("/planning/:planning_id", async (req, res) => {
  console.log("DELETE /manche/planning/:planning_id");
  const { planning_id } = req.params;
  console.log("delete all manches for a planning : ", planning_id);

  myQuery("DELETE FROM manche WHERE planning_id = $1", [planning_id], (err, result) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(result.rows[0]);
    }
  });
});

module.exports = {
  mancheRouter: app,
};
