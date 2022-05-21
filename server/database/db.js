// import librairies
const pg = require("pg");
const dotenv = require("dotenv");
const { logger } = require("../utils/util");

// initialize dotenv to read the .env file
dotenv.config();
logger("connecting to database : ", process.env.POSTGRESQL_ADDON_URI);

// initialize the database configuration
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);

// connect to postgres database
pgClient.connect();

const myQuery = (query, values, callback) => {
  try {
    pgClient.query(query, values, (err, result) => {
      if (err) {
        console.error(err.message);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  } catch (error) {
    console.error(error.message);
    callback(error, null);
  }
};

module.exports = {
  pgClient,
  myQuery,
};
