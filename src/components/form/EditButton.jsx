import React from "react";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const EditButton = ({ url, body, redirect, text = "Confirm edit" }) => {
  let navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();

    fetch(config.SERVER_ADDRESS + url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("edit ", data);
        console.log("redirect to ", redirect);
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