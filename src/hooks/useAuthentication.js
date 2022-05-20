import { useContext, useState, useEffect } from "react";
import authenticationContext from "./AuthenticationContext";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuthentication = (expected = "user", redirect = "/home") => {
  let navigate = useNavigate();

  const { person } = useContext(authenticationContext);
  //console.log("useAuthentication person:", person);

  console.log("useAuthentication role:", person.role, "------------------------------ expected:", expected);

  useEffect(() => {
    if (person.role !== expected) {
      //navigate(redirect);
    }
  }, [person.role, expected, navigate, redirect]);

  return { role: person.role };
};

export default useAuthentication;
