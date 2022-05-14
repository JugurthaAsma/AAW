import React from "react";
import { useParams } from "react-router-dom";

const EditPlanning = () => {
  let { id } = useParams();

  return <h1 className="text-center mt-5">Edit planning #{id}</h1>;
};

export default EditPlanning;
