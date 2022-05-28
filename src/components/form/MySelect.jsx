import React, { useState, useEffect } from "react";
import Select from "react-select";
import { formatOption } from "../../helpers/Formatter";

/**
 * @Component MySelect - Custom select component that fetches data from the server and updates the state of the parent component.
 * @param {string} url - The url to fetch the data from
 * @param {Function} setData - The function to call when the select value is changed (supposed to be setState of the parent component)
 * @returns {JSX.Element} - The select component
 */
const MySelect = ({ url, setData, ...rest }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + url)
      .then((res) => res.json())
      .then((data) => setOptions(formatOption(data)))
      .catch((error) => window.flash("Can't get data (" + error.message + ")", "danger"));
  }, [url, setData]);

  return <Select options={options} onChange={(selectedOption) => setData(selectedOption.value)} isSearchable {...rest} className="form-select-lg" />;
};

export default MySelect;
