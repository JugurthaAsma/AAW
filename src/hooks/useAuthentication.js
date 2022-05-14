import { useContext, useState, useEffect } from "react";
import authenticationContext from "./AuthenticationContext";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const useAuthentication = (expected = "user", redirect = "/login") => {
  let navigate = useNavigate();

  const [role, setRole] = useState(null);
  const { token } = useContext(authenticationContext);
  const { data /*error, loading*/ } = useFetch("/authentication/role/" + token);

  // console.log("data: ", data);

  useEffect(() => {
    if (data) {
      console.log("setting role: ", data.role);
      if (data.role === expected) {
        setRole(data.role);
      } else {
        navigate(redirect);
      }
    }
  }, [data]);

  return { role };
};

export default useAuthentication;
