import React from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ url, body, redirect, text = "Confirm edit" }) => {
  let navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_URL + url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("edit ", data, ", redirect to ", redirect);
        navigate(redirect);
      })
      .catch((error) => window.flash(error.message, "danger"));
  };
  return (
    <button onClick={handleEdit} className="btn btn-warning">
      {text}
    </button>
  );
};

export default EditButton;
