import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import Input from "../../components/form/Input";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const AddPlanning = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState();

  return (
    <RoleNeedComponent neededRole="admin">
      <h1 className="text-center mt-5">Add a planning</h1>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={name} placeholder="Enter the planning's name" onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="col-md-5">
          <Input value={date} type="date" placeholder="Enter the planning's date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url="/planning/admin" body={{ name, date }} redirect="/plannings" />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddPlanning;
