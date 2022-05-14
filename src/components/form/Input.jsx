import React from "react";

const Input = ({ value, onChange, type = "text", placeholder = "Enter text here", required = true }) => {
  return <input type={type} className="form-control" placeholder={placeholder} value={value} onChange={onChange} required={required} />;
};

export default Input;
