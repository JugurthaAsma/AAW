import React from "react";
import { useParams } from "react-router-dom";

const EditEvent = () => {
  let { id } = useParams();

  return <h1 className="text-center mt-5">Edit event #{id}</h1>;
};

export default EditEvent;
