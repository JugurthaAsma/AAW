import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" activeClassName to="/persons">
        Persons
      </NavLink>

      <NavLink className="navbar-brand" activeClassName={"nav-item active"} to="/add-person">
        Add Person
      </NavLink>
      <NavLink className="navbar-brand" activeClassName={"nav-item active"} to="/edit-person">
        Edit Person
      </NavLink>

      <NavLink className="navbar-brand" activeClassName={"nav-item active"} to="/events">
        Events
      </NavLink>
      <NavLink className="navbar-brand" activeClassName={"nav-item active"} to="/add-event">
        Add Event
      </NavLink>
      <NavLink className="navbar-brand" activeClassName={"nav-item active"} to="/edit-event">
        Edit Event
      </NavLink>
    </nav>
  );
};

export default NavBar;
