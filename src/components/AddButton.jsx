import React from "react";
import config from "../config";

const AddButton = ({ url, body, text = "+" }) => {
  const handleAdd = (e) => {
    e.preventDefault();

    fetch(config.SERVER_ADDRESS + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log("add ", data))
      .catch((error) => console.log(error));
  };

  return (
    <button className="btn btn-success" onClick={handleAdd}>
      {text}
    </button>
  );
};

export default AddButton;
