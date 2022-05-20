import React from "react";
import PersonForm from "../../components/form/PersonForm";

const Login = () => {
  return <PersonForm title="Login" url="/authentication/login" method="POST" />;
};

export default Login;
