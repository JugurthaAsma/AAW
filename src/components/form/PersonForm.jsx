import React, { useContext, useState } from "react";
import Input from "./Input";
import "../../styles/components/PersonForm.css";
import AuthenticationContext from "../../hooks/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const PersonForm = ({ title, url }) => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("admin");
  const [lastName, setLastName] = useState("admin");

  const { setPerson } = useContext(AuthenticationContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log("fetching : ", process.env.REACT_APP_API_URL + url);

    fetch(process.env.REACT_APP_API_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => handleLoginResponse(data))
      .catch((error) => console.log(error));
  };

  /**
   * login
   * put the token in the AuthenticationContext
   * redirect to /plannings
   * @param {String} data.token - the token
   * @param {String} data.role - the role
   */
  const handleLoginResponse = (data) => {
    setPerson({
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
    });
    navigate("/plannings");
  };

  return (
    <div className="person-form">
      <h1 className="text-center">{title}</h1>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="form-group was-validated">
          <label htmlFor="firstName">First Name</label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" autoFocus />
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
