import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/NavBar.css";

const MyNavLink = ({ text, to, icon }) => {
  return (
    <NavLink className="my-navlink  navbar-brand" activeClassName={"nav-item active"} to={to}>
      <div className="icon">{icon}</div>
      <div className="title">{text}</div>
    </NavLink>
  );
};

export default MyNavLink;
