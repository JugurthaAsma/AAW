/**
 * function to format date to dd/mm/yyyy format
 */
export const formatDate = (date) => {
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
export const toLocaleDate = (date) => {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString(undefined, options);
  return formattedDate;
};
