import React from "react";
import { useParams } from "react-router-dom";
import RoleNeedComponent from "../../components/RoleNeedComponent";

const EditPlanning = () => {
  let { id } = useParams();

  return (
    <RoleNeedComponent neededRole="user">
      <h1 className="text-center mt-5">Edit planning #{id}</h1>;
    </RoleNeedComponent>
  );
};

export default EditPlanning;
