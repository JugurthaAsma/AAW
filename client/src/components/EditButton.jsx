import React from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ to, text = "Edit" }) => {
  let navigate = useNavigate();
  return (
    <button onClick={navigate({ to })} className="btn btn-warning">
      {text}
    </button>
  );
};

export default EditButton;
