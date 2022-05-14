import useAuthentication from "../hooks/useAuthentication";
import { useEffect, useState } from "react";

const RoleNeedComponent = ({ neededRole = null, element }) => {
  const [userRole, setUserRole] = useState(null);
  const { role } = useAuthentication();
  console.log("________________ ", role); // why logged 3 times ?

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  return userRole === neededRole ? element : <h1>need to be authenticated</h1>;
  //<Navigate to="/login" />;
};

export default RoleNeedComponent;
