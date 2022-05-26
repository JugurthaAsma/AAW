import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../hooks/AuthenticationContext";

const Logout = () => {
  let navigate = useNavigate();
  const { setPerson } = useContext(AuthenticationContext);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/authentication/logout/user", {
      method: "DELETE",
      credentials: "include",
    });

    setPerson({
      firstName: "",
      lastName: "",
      role: "visitor",
    });
    navigate("/");
    // eslint-disable-next-line
  }, []);
  return <h1>Loging out ...</h1>;
};

export default Logout;
