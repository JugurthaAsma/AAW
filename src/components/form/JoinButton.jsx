import React from "react";
import config from "../../config";
import { PersonPlusFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const JoinButton = ({ url, id, redirect = "/plannings", content = <PersonPlusFill /> }) => {
  let navigate = useNavigate();

  const handleJoin = () => {
    fetch(config.SERVER_ADDRESS + url + "/" + id, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        // console.log("join ", data, ", redirect to ", redirect);
        navigate(redirect);
      })
      .catch((error) => console.log(error));
  };

  return (
    <button className="btn btn-success" onClick={handleJoin}>
      {content}
    </button>
  );
};

export default JoinButton;
