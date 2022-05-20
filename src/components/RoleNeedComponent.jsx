import useAuthentication from "../hooks/useAuthentication";

const RoleNeedComponent = ({ neededRole = "visitor", children }) => {
  const { role } = useAuthentication(neededRole);
  console.log("******************* the role ", role, "********************* neededRole :", neededRole);
  console.log(role === neededRole ? "YEEEEEEEEEEES children" : "NOOOOOOOOOOOOOOOO null");
  return role === neededRole ? children : null;
};

export default RoleNeedComponent;
