import React, { useState } from "react";
import Input from "./Input";
import config from "../../config";
import "../../styles/components/PersonForm.css";

const PersonForm = ({ title, url, method = "GET" }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(config.SERVER_ADDRESS + url + (method === "GET" && "/" + firstName + "/" + lastName));

    fetch(config.SERVER_ADDRESS + url + (method === "GET" && "/" + firstName + "/" + lastName), {
      method: method,
      headers: { "Content-Type": "application/json" },
      // if method is GET, we don't need to send the body
      body: method === "GET" ? null : JSON.stringify({ firstName, lastName }),
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
