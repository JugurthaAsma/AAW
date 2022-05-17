import useAuthentication from "../hooks/useAuthentication";

const RoleNeedComponent = ({ neededRole = null, children }) => {
  const { role } = useAuthentication();

  return role === neededRole ? children : null;
};

export default RoleNeedComponent;
