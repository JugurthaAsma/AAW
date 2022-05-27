import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import Input from "../../components/form/Input";
import MySelect from "../../components/form/MySelect";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const AddManche = () => {
  const [name, setName] = useState("");
  const [ordre, setOrdre] = useState();
  const [planning_id, setPlanning_id] = useState(0);
  console.log(planning_id);

  return (
    <RoleNeedComponent neededRole="admin">
      <h1 className="text-center mt-5">Add a manche</h1>
      <div className="d-flex mt-5 row" style={{ width: "35rem" }}>
        <MySelect url="/planning" setData={setPlanning_id} placeholder="Select the planning" />
      </div>
      <div className="d-flex mt-5 row">
        <div className="col-md-5">
          <Input value={name} placeholder="Manche's name" onChange={(e) => setName(e.target.value)} autoFocus />
        </div>
        <div className="col-md-5">
          <Input value={ordre} type="number" min={1} placeholder="Manche's order" onChange={(e) => setOrdre(e.target.value)} />
        </div>
        <div className="col-md-1">
          <AddButton url="/manche/admin" body={{ planning_id, name, ordre }} redirect={"/manches/planning/" + planning_id} />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddManche;
