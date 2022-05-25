const { myQuery } = require("../database/db");
const { tokenExpirationDate, logger } = require("../utils/util");

/**
 * data base SQL queries
 */
module.exports = {
  /**
   * get the person data from person table
   * with the token from the token table
   * by checking if the token not expired_date is greater than now
   * @param {string} token
   * @returns {Object} person
   */
  getPerson: (req, res, callback) => {
    // get the token from the cookie
    const { token } = req.cookies;

    logger("getPerson with token : ", token);

    /**
     * get the person data from person table
     * with the token from the token table
     * by checking if the token not expired_date is greater than now
     */
    myQuery("SELECT * FROM person WHERE id = (SELECT person_id FROM token WHERE token = $1 AND expired_date > NOW())", [token], (err, result) => {
      if (err || result.rows.length === 0) {
        res.sendStatus(401);
      } else {
        /**
         * Update the token expiration date
         */
        myQuery("UPDATE token SET expired_date = $1 WHERE token = $2", [tokenExpirationDate(), token], (err, result) => {
          if (err) {
            logger("error updating token expiration date: ", err);
          }
        });
        req.person = result.rows[0];
        logger("person found : ", req.person.id);
        callback();
      }
    });
  },

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
          res.send(result.rows);
        }
      }
    );
  },
};
