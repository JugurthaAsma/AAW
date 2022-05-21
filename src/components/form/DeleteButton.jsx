import React from "react";
import config from "../../config";
import { Trash } from "react-bootstrap-icons";

//import { useNavigate } from "react-router-dom";

const DeleteButton = ({ url, id, callback, redirect, content = <Trash /> }) => {
  //let navigate = useNavigate();
  const handleDelete = () => {
    fetch(config.SERVER_ADDRESS + url + "/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        // console.log("delete ", data, ", redirect to ", redirect);
        // navigate(redirect); // redirect to the same page seems to be buggy (it doesn't remove the row)
        // so we use a callback instead, (callback expected to be the setState of the parent component)
        callback((elems) => elems.filter((elem) => elem.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      {content}
    </button>
  );
};

export default DeleteButton;
