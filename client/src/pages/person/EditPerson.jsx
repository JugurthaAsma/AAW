import React from "react";
import { useParams } from "react-router-dom";

const EditPerson = () => {
  let { id } = useParams();
  return <h1 className="text-center mt-5">Edit Person #{id}</h1>;
};

export default EditPerson;
