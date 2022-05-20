import React from "react";

export default React.createContext({
  person: {
    firstName: "",
    lastName: "",
    role: "visitor",
  },
  setPerson: () => {},
});
