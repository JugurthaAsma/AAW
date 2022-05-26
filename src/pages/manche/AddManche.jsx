import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import Input from "../../components/form/Input";

const AddManche = () => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState(1);
  const [planningId, setPlanningId] = useState();

  return (
    <RoleNeedComponent neededRole="admin">
      <h1 className="text-center mt-5">Add a manche</h1>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={name} placeholder="Manche's name" onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="col-md-5">
          <Input value={order} type="number" placeholder="Manche's order" onChange={(e) => setOrder(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url="/manche/admin" body={{ name, order, planningId }} redirect="/manches" />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddManche;
