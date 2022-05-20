import useAuthentication from "../hooks/useAuthentication";

const RoleNeedComponent = ({ neededRole = "visitor", children }) => {
  const { role } = useAuthentication(neededRole);
  return role.includes(neededRole) ? children : null;
};

export default RoleNeedComponent;
