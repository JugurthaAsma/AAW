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

module.exports = {
  tokenExpirationDate,
};
