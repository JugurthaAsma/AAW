import React from "react";
import { useNavigate } from "react-router-dom";
import { Pen } from "react-bootstrap-icons";

const RedirectButton = ({ to, content = <Pen />, className = "btn btn-warning" }) => {
  let navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} className={className}>
      {content}
    </button>
  );
};

export default RedirectButton;
