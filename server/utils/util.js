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

/**
 * function to format date to dd/mm/yyyy format
 */
const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

/**
 * function to format date to local string format
 */
const toLocaleDate = (date) => {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString(undefined, options);
  return formattedDate;
};

module.exports = {
  tokenExpirationDate,
  logger,
  toLocaleDate,
};
