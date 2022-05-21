import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import AuthenticationContext from "../../hooks/AuthenticationContext";

const Logout = () => {
  let navigate = useNavigate();
  const { setPerson } = useContext(AuthenticationContext);
  useEffect(() => {
    fetch(config.SERVER_ADDRESS + "/authentication/logout", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setPerson({
            firstName: "",
            lastName: "",
            role: "visitor",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <h1>Loging out ...</h1>;
};

export default Logout;
