import React, { useState, useEffect } from "react";
import Select from "react-select";

const formatOptions = (data) => {
  // id is the value of the select
  // label is the conatenation of all the properties of the object that are not the id includes "name" in the name of the properties
  return data.map((elem) => ({
    value: elem.id,
    label: Object.keys(elem).reduce((acc, key) => {
      if (key !== "id") {
        acc += elem[key] + " - ";
      }
      return acc;
    }, ""),
  }));
};

/**
 * @Component MySelect - Custom select component that fetches data from the server and updates the state of the parent component.
 * @param {string} url - The url to fetch the data from
 * @param {Function} setData - The function to call when the select value is changed (supposed to be setState of the parent component)
 * @returns {JSX.Element} - The select component
 */
const MySelect = ({ url, setData, placeholder = "Select ..." }) => {
  console.log(url);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + url)
      .then((res) => res.json())
      .then((data) => setOptions(formatOptions(data)))
      .catch((err) => console.log(err));
  }, [url, setData]);

  return <Select options={options} onChange={(selectedOption) => setData(selectedOption.value)} isSearchable={true} isClearable={true} placeholder={placeholder} />;
};

export default MySelect;
