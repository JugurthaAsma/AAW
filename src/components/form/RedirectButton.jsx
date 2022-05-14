import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectButton = ({ to, content = "redirect", className = "btn btn-warning" }) => {
  let navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} className={className}>
      {content}
    </button>
  );
};

export default RedirectButton;
