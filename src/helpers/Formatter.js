/**
 * Format a item by concatenating the it's attributes.
 * @param {Object} item - The item to be formatted
 * @param {String} key - The key of the item to be formatted
 * @returns {string} - The formatted item value in lowercase
 */
export const format = (item) => {
  let result = Object.keys(item).reduce((acc, key) => {
    acc += item[key] + " ";
    return acc;
  }, "");
  console.log(result);
  return result.toLowerCase();
};

/**
 * Format an object by concatenating the it's attributes except the id.
 * used for MySelect component
 * @param {Object} object - The object to be formatted
 * @returns {string} - The formatted object
 */
export const formatOption = (object) => {
  // id is the value of the select
  // label is the conatenation of all the properties of the object that are not the id includes "name" in the name of the properties
  return object.map((elem) => ({
    value: elem.id,
    label: Object.keys(elem).reduce((acc, key) => {
      if (!key.includes("id")) {
        acc += elem[key] + " ";
      }
      return acc;
    }, ""),
  }));
};
