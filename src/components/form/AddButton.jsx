import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ url, body, redirect, content = "+", successMessage = "Your adding request completed successfully" }) => {
  let navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("add ", data, ", redirect to ", redirect);
        window.flash(successMessage);
        navigate(redirect);
      })
      .catch((error) => window.flash("Your adding request failed (" + error.message + ")", "danger"));
  };

  return (
    <button className="btn btn-success" onClick={handleAdd}>
      {content}
    </button>
  );
};

export default AddButton;
