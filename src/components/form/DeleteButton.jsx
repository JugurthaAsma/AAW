import React from "react";
import config from "../../config";
import { Trash } from "react-bootstrap-icons";

//import { useNavigate } from "react-router-dom";

/**
 *
 * @param {string} url The url to delete the resource
 * @param {string} id The id of the item to delete
 * @param {function} callback The function to call after delete
 * @param {string} redirect The path to redirect to after delete (optional)
 * @param {JSX} content The content to be displayed inside the button (default: <Trash />)
 * @returns
 */
const DeleteButton = ({ url, id, callback, redirect, content = <Trash /> }) => {
  //let navigate = useNavigate();
  const handleDelete = () => {
    console.log(config.SERVER_ADDRESS + url + "/" + id);
    fetch(config.SERVER_ADDRESS + url + "/" + id, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete ", data, ", redirect to ");
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
