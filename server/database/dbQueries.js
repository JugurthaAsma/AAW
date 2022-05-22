const { myQuery } = require("../database/db");

/**
 * data base SQL queries
 */
module.exports = {
  /**
   * get all inscriptions with their manches, plannings and persons
   */
  getAllInscriptions: (res) => {
    return myQuery(
      "SELECT " +
        "planning.id planning_id, planning.date planning_date, planning.name planning_name, " +
        "manche.id manche_id, manche.name manche_name, " +
        "person.id person_id, person.first_name person_first_name, person.last_name person_last_name " +
        "FROM inscription " +
        "INNER JOIN manche ON inscription.manche_id = manche.id " +
        "INNER JOIN planning ON inscription.planning_id = planning.id " +
        "INNER JOIN person ON inscription.person_id = person.id",
      [],
      (err, result) => {
        if (err) {
          res.sendStatus(401);
        } else {
          console.log(result.rows);
          res.send(result.rows);
        }
      }
    );
  },
};
