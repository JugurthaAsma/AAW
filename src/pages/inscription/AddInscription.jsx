import React, { useState } from "react";
import AddButton from "../../components/form/AddButton";
import MySelect from "../../components/form/MySelect";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const AddInscription = () => {
  const [planning_id, setPlanning_id] = useState();
  const [manche_id, setManche_id] = useState(0);
  const [person_id, setPerson_id] = useState();

  return (
    <RoleNeedComponent neededRole="admin">
      <h1 className="text-center mt-5">Add an inscription</h1>
      <div className="d-flex mt-5 row" style={{ width: "30rem" }}>
        <MySelect url="/planning" setData={setPlanning_id} placeholder="Select the planning" />
      </div>
      <div className="d-flex mt-5 row" style={{ width: "30rem" }}>
        <MySelect url={"/manche/planning/" + planning_id} setData={setManche_id} placeholder="Select the manche" />
      </div>
      <div className="d-flex mt-5 row" style={{ width: "30rem" }}>
        <MySelect url="/person" setData={setPerson_id} placeholder="Select the person" />
      </div>
      <div className="d-flex mt-3 row">
        <div className="col-md-1">
          <AddButton url="/inscription/admin" body={{ person_id, manche_id, planning_id }} redirect={"/inscriptions/manche/0"} content="Submit" />
        </div>
      </div>
    </RoleNeedComponent>
  );
};

export default AddInscription;
