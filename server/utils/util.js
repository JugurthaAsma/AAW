const fs = require("fs");

/**
 * return the current date + .env.POSTGRES_TOKEN_DURATION in seconds
 * @returns {Date}
 */
const tokenExpirationDate = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + process.env.POSTGRES_TOKEN_DURATION * 1000);
  console.log("tokenExpirationDate: " + expirationDate);
  return expirationDate;
};

/**
 * logger function to log in file and console
 */
const logger = (...args) => {
  console.log(...args);
  fs.writeFile(__dirname + "/logs/log.txt", `${new Date()} - ${args.join(" ")}\n`, { flag: "a+" }, (err) => {
    if (err) {
      console.error("error writing to log file : ", err);
    }
  });
};

module.exports = {
  tokenExpirationDate,
  logger,
};
