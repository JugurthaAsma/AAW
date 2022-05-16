import useAuthentication from "../hooks/useAuthentication";
import { useEffect, useState } from "react";

const RoleNeedComponent = ({ neededRole = null, children }) => {

  const [userRole, setUserRole] = useState(null);
  const { role } = useAuthentication();
  //console.log("________________ ", role); // why logged 3 times ?

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  return userRole === neededRole ? children : null;
  //<Navigate to="/login" />;
};

export default RoleNeedComponent;
