import { useContext, useEffect } from "react";
import authenticationContext from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";

const useAuthentication = (expected = "user", redirect = "/home") => {
  let navigate = useNavigate();

  const { person } = useContext(authenticationContext);

  useEffect(() => {
    if (person.role.includes(expected)) {
      navigate(redirect);
    }
  }, [person.role, expected, navigate, redirect]);

  return { role: person.role };
};

export default useAuthentication;
