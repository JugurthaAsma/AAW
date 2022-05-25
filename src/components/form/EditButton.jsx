import React from "react";
import { useNavigate } from "react-router-dom";

const EditButton = ({ url, body, redirect, text = "Confirm edit" }) => {
  let navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();

    fetch(url, {
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
      .catch((error) => console.log(error));
  };
  return (
    <button onClick={handleEdit} className="btn btn-warning">
      {text}
    </button>
  );
};

export default EditButton;
