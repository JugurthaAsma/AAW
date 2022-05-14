import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/components/NavBar.css";

const MyNavLink = ({ title, to, icon, className = "my-navlink navbar-brand" }) => {
  return (
    <NavLink className={className} to={to}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </NavLink>
  );
};

export default MyNavLink;
