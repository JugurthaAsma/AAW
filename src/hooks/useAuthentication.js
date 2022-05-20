import { useContext } from "react";
import authenticationContext from "./AuthenticationContext";

/**
 * Get the role of the current user
 * will be useful if we change the authentication logic in the future
 * for now, we just return the role of the current user in the context
 * @returns {string} The role of the current user
 */
const useAuthentication = () => {
  const { person } = useContext(authenticationContext);

  return { role: person.role };
};

export default useAuthentication;
