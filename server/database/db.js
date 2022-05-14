// import librairies
const pg = require("pg");
const dotenv = require("dotenv");

// initialize dotenv to read the .env file
dotenv.config();
console.log("connecting to database : ", process.env.POSTGRESQL_ADDON_URI);

// initialize the database configuration
const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);

// connect to postgres database
pgClient.connect();

module.exports = pgClient;
