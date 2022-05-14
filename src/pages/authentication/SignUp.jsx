import React from "react";
import PersonForm from "../../components/form/PersonForm";
const SignUp = () => {
  return <PersonForm title="Sign Up" url="/person" method="POST" />;
};

export default SignUp;
