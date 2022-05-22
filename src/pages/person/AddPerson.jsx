import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import Input from "../../components/form/Input";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const AddPerson = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <RoleNeedComponent neededRole="user">
      <h1 className="text-center mt-5">Add a person</h1>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={firstName} placeholder="Enter the first name" onChange={(e) => setFirstName(e.target.value)} autoFocus />
        </div>
        <div className="col-md-5">
          <Input value={lastName} placeholder="Enter the last name" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url="/person/admin" body={{ firstName, lastName }} redirect="/persons" />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddPerson;
