import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";

/**
 *
 * @param {Function} setData The function to filter the data expcted to be setState of the parent component
 */
const FilterSearch = ({ setData }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setData(event);
  };

  return (
    <div className="w-25 m-5 input-group md-form form-sm form-2 pl-0">
      <input onChange={handleChange} className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
      <span className="input-group-text red lighten-3" id="basic-text1">
        <Search className="fas fa-search text-grey" />
      </span>
    </div>
  );
};

export default FilterSearch;
