import React, { useState } from "react";
import Input from "./Input";
import config from "../../config";
import "../../styles/components/PersonForm.css";

const PersonForm = ({ title, url, method = "GET" }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalUrl = config.SERVER_ADDRESS + url;
    let body = JSON.stringify({ firstName, lastName });

    if (method === "GET") {
      finalUrl += "/" + firstName + "/" + lastName;
      body = null;
    }

    console.log("fetching : ", finalUrl);

    fetch(finalUrl, {
      method: method,
      headers: { "Content-Type": "application/json" }, // making preflight request ???
      // if method is GET, we don't need to send the body
      body,
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log("person ", data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="person-form">
      <h1 className="text-center mt-5">{title}</h1>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="form-group was-validated">
          <label htmlFor="firstName">First Name</label>
          <Input onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
          <div className="invalid-feedback">Please enter your first name</div>
        </div>
        <div className="form-group was-validated">
          <label htmlFor="lastName">Last Name</label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
          <div className="invalid-feedback">Please enter your last name</div>
        </div>
        <input type="submit" className="btn btn-success w-100" value="Submit" />
      </form>
    </div>
  );
};

export default PersonForm;
