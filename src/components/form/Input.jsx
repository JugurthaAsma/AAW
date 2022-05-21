import React from "react";

const Input = ({ value, onChange, type = "text", placeholder = "Enter text here", required = true, ...rest }) => {
  return <input type={type} className="form-control" placeholder={placeholder} value={value} onChange={onChange} required={required} {...rest} />;
};

export default Input;
