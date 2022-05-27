import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import Input from "../../components/form/Input";
import MySelect from "../../components/form/MySelect";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const AddManche = () => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState();
  const [planningId, setPlanningId] = useState();
  console.log(planningId);

  return (
    <RoleNeedComponent neededRole="admin">
      <h1 className="text-center mt-5">Add a manche</h1>
      <div className="d-flex mt-5 row">
        <MySelect url="/planning" setData={setPlanningId} placeholder="Select the planning" />
      </div>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={name} placeholder="Manche's name" onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="col-md-5">
          <Input value={order} type="number" min={1} placeholder="Manche's order" onChange={(e) => setOrder(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url="/manche/admin" body={{ name, order, planningId }} redirect="/manches" />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddManche;
