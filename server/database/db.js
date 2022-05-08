// connect to postgres database
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "AAW",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
