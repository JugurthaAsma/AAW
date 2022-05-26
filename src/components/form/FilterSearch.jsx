import React, { useState } from "react";

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
    <div className="md-form my-0">
      <input className="form-control" value={value} onChange={handleChange} type="text" placeholder="Search" aria-label="Search" />
      <i className="fas fa-search text-white ml-3" aria-hidden="true"></i>
    </div>
  );
};

export default FilterSearch;
