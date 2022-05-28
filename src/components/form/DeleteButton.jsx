import React from "react";
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
const DeleteButton = ({ url, id, role, callback = () => console.log("delete success"), redirect, content = <Trash />, className = "btn btn-danger" }) => {
  //let navigate = useNavigate();
  const handleDelete = () => {
    let fianlUrl = url;
    fianlUrl += id ? "/" + id : "";
    fianlUrl += role ? "/" + role : "";
    //console.log( fianlUrl);
    fetch(process.env.REACT_APP_API_URL + fianlUrl, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("delete ", data, ", redirect to ");
        // navigate(redirect); // redirect to the same page seems to be buggy (it doesn't remove the row)
        // so we use a callback instead, (callback expected to be the setState of the parent component)
        callback();
      })
      .catch((error) => window.flash(error.message, "danger"));
  };

  return (
    <button className={className} onClick={handleDelete}>
      {content}
    </button>
  );
};

export default DeleteButton;
