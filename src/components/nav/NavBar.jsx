import React from "react";
import MyNavLink from "./MyNavLink";
import { NavBarData } from "./NavBarData";
import "../../styles/components/NavBar.css";

const NavBar = () => {
  return (
    <nav className="my-navbar d-flex flex-column navbar navbar-expand-lg navbar-dark">
      {NavBarData.map((nav) => (
        <MyNavLink key={nav.title} title={nav.title} to={nav.link} icon={nav.icon} />
      ))}
    </nav>
  );
};

export default NavBar;
