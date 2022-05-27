const { myQuery } = require("../database/db");
const { tokenExpirationDate, logger, toLocaleDate } = require("../utils/util");

/**
 * data base SQL queries
 */
module.exports = {
  /**
   * get the person data from person table
   * with the token from the token table
   * by checking if the token not expired_date is greater than now
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} callback - callback function to call after the query
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
   * add a person to the person table
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} callback - callback function to call after the query
   * @returns {Object} person
   */
  addPerson: (req, res, callback) => {
    // destructure the request body to get the firstname and lastname
    const { firstName, lastName } = req.body;
    logger("add a new person ", firstName, lastName);

    // create a new person
    myQuery("INSERT INTO person (first_name, last_name) VALUES ($1, $2) RETURNING *", [firstName, lastName], (err, result) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const person = result.rows[0];
        // put the person in the response object
        res.person = person;
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
          // format the planning_date of each inscription
          const inscriptions = result.rows.map((inscription) => {
            inscription.planning_date = toLocaleDate(inscription.planning_date);
            return inscription;
          });
          res.send(inscriptions);
        }
      }
    );
  },
};
