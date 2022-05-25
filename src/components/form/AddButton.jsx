import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ url, body, redirect, content = "+" }) => {
  let navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("add ", data, ", redirect to ", redirect);
        navigate(redirect);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="btn btn-success" onClick={handleAdd}>
      {content}
    </button>
  );
};

export default AddButton;
