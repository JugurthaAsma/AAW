import React from "react";
import MyNavLink from "./MyNavLink";
import { NavBarData } from "./NavBarData";
import "../../styles/components/NavBar.css";
import RoleNeedComponent from "../RoleNeedComponent";

const NavBar = () => {
  return (
    <nav className="my-navbar d-flex flex-column navbar navbar-expand-lg navbar-dark">
      {NavBarData.map((nav) => (
        <RoleNeedComponent key={nav.title} name={nav.title} neededRole={nav.neededRole}>
          <MyNavLink title={nav.title} to={nav.link} icon={nav.icon} />
        </RoleNeedComponent>
      ))}
    </nav>
  );
};

export default NavBar;
