import React from "react";
import { Search } from "react-bootstrap-icons";
import { format } from "../../helpers/Formatter";

/**
 * @Component FilterSearch - Search input for filtering the list of items.
 * @param {Array} data - Array of items to be filtered.
 * @param {Function} setData - The function to filter the data expcted to be setState of the parent component
 */
const FilterSearch = ({ data, setData }) => {
  const handleChange = (event) => {
    setData(data.filter((item) => format(item).includes(event.target.value.toLowerCase())));
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
